const text = (value, maxLength) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
    console.error('Contact email is not configured in Netlify environment variables.');
    return {
      statusCode: 503,
      body: JSON.stringify({ ok: false, error: 'Contact email is not configured' }),
    };
  }

  let request;
  try {
    request = JSON.parse(event.body || '');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Invalid request body' }),
    };
  }

  const name = text(request.name, 120);
  const email = text(request.email, 254);
  const subject = text(request.subject, 160).replace(/[\r\n]+/g, ' ');
  const message = text(request.message, 5000);

  if (!name || !isEmail(email) || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Please check the contact form details' }),
    };
  }

  const html = `
    <div style="margin:0;padding:32px 16px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#0284c7,#2563eb);color:#ffffff;">
          <div style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">BakurianiSki</div>
          <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;">New contact message</h1>
        </div>
        <div style="padding:24px 28px 30px;">
          <p style="margin:0 0 16px;color:#64748b;font-size:14px;">From <strong style="color:#0f172a;">${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">${escapeHtml(subject)}</h2>
          <div style="padding:16px;background:#f8fafc;border-radius:12px;color:#334155;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
          <p style="margin:22px 0 0;color:#64748b;font-size:13px;">Reply directly to this email to contact the sender.</p>
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
        subject: `Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Resend rejected contact email (${response.status}): ${details}`);
      return {
        statusCode: 502,
        body: JSON.stringify({ ok: false, error: 'Could not send contact message' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error('Contact email request failed:', error);
    return {
      statusCode: 502,
      body: JSON.stringify({ ok: false, error: 'Could not send contact message' }),
    };
  }
};
