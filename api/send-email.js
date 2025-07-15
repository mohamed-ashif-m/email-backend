// /api/send-email.js

export default async function handler(req, res) {
  // ✅ Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "https://employee-dashboard-puce.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // ✅ Allow requests from your frontend
  res.setHeader("Access-Control-Allow-Origin", "https://employee-dashboard-puce.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  try {
    const response = await fetch("https://mohamedashifm.app.n8n.cloud/webhook/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ message: "Failed to call n8n", details: errorText });
    }

    return res.status(200).json({ message: "Email sent successfully via n8n" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
