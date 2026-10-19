const allowedLessonTypes = new Set([
  'beginner',
  'intermediate',
  'advanced',
]);

const text = (value, maxLength) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhone = (value) => {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.BOOKING_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.error('Booking email is not configured in Netlify environment variables.');
    return {
      statusCode: 503,
      body: JSON.stringify({ ok: false, error: 'Booking email is not configured' }),
    };
  }

  let booking;
  try {
    booking = JSON.parse(event.body || '');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Invalid request body' }),
    };
  }

  const firstName = text(booking.firstName, 100);
  const lastName = text(booking.lastName, 100);
  const email = text(booking.email, 254);
  const phone = text(booking.phone, 40);
  const instructorName = text(booking.instructorName, 150);
  const lessonType = text(booking.lessonType, 30);
  const date = text(booking.date, 10);
  const time = text(booking.time, 5);
  const notes = text(booking.notes, 2000);
  const total = Number(booking.total);

  if (
    !firstName ||
    !lastName ||
    !isEmail(email) ||
    !isPhone(phone) ||
    !instructorName ||
    !allowedLessonTypes.has(lessonType) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time) ||
    !Number.isFinite(total) ||
    total <= 0
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Please check the booking details' }),
    };
  }

  const message = [
    'New BakurianiSki booking request',
    '',
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Instructor: ${instructorName}`,
    `Lesson type: ${lessonType}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Total: ${total} USD`,
    `Notes: ${notes || '-'}`,
  ].join('\n');
  const fields = [
    ['Name', `${firstName} ${lastName}`],
    ['Email', email],
    ['Phone', phone],
    ['Instructor', instructorName],
    ['Lesson type', lessonType[0].toUpperCase() + lessonType.slice(1)],
    ['Date', date],
    ['Time', time],
    ['Total', `${total} USD`],
    ['Notes', notes || '-'],
  ];
  const rows = fields.map(([label, value]) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`).join('');
  const html = `
    <div style="margin:0;padding:32px 16px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#0284c7,#2563eb);color:#ffffff;">
          <div style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">BakurianiSki</div>
          <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;">New booking request</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:.9;">A new ski lesson request was submitted.</p>
        </div>
        <div style="padding:24px 20px 30px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
          <p style="margin:22px 0 0;color:#64748b;font-size:13px;">Reply directly to this email to contact the customer.</p>
        </div>
      </div>
    </div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `New booking: ${firstName} ${lastName}`,
        text: message,
        html,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Resend rejected booking email (${response.status}): ${details}`);
      return {
        statusCode: 502,
        body: JSON.stringify({ ok: false, error: 'Could not send booking email' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error('Booking email request failed:', error);
    return {
      statusCode: 502,
      body: JSON.stringify({ ok: false, error: 'Could not send booking email' }),
    };
  }
};
