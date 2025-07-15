export default async function handler(req, res) {
  // Allow requests from any origin (or restrict to your frontend)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Your existing email sending logic here
  const { email } = req.body;

  try {
    // [🟢 Replace with your email sending logic]
    console.log("Sending email to:", email);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Email failed", error: err.message });
  }
}
