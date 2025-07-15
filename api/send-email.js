// /api/send-email.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const n8nWebhookUrl = "https://mohamedashifm.app.n8n.cloud/webhook/send-email";

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        message: "Failed to call n8n webhook",
        status: response.status,
        responseText: data,
      });
    }

    res.status(200).json({ message: "Email sent", data });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
