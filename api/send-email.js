// /api/send-email.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const response = await fetch('https://mohamedashifm.app.n8n.cloud/webhook/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({ error: result });
    }

    return res.status(200).json({ message: 'Email sent', result });
  } catch (error) {
    console.error('Error forwarding to n8n:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
