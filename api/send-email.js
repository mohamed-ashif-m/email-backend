// api/send-email.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Example: use nodemailer
    // (you must set SMTP credentials in Vercel's environment settings)
    return res.status(200).json({ message: "Email sent (mocked)" });
  } catch (error) {
    console.error("Send error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
