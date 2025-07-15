export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      const response = await fetch("https://mohamedashifm.app.n8n.cloud/webhook/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }

      const result = await response.json();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Server error: " + error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
