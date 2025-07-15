// /api/send-email.js

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "https://employee-dashboard-puce.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required in body" });
  }

  try {
    const response = await fetch("https://mohamedashifm.app.n8n.cloud/webhook/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return res.status(500).json({
        message: "Failed to call n8n webhook",
        status: response.status,
        responseText,
      });
    }

    return res.status(200).json({
      message: "Email sent successfully",
      responseText,
    });
  } catch (error) {
    console.error("❌ Error calling n8n webhook:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
