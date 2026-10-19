const allowedLessonTypes = new Set([
  'beginner',
  'intermediate',
  'advanced',
  'kids',
  'group',
  'private',
]);

const text = (value, maxLength) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
    !phone ||
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
    `Duration: 2 hours`,
    `Total: ${total} USD`,
    `Notes: ${notes || '-'}`,
  ].join('\n');

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
