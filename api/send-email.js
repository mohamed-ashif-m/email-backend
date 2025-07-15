const sendEmail = async (email) => {
  try {
    const response = await fetch("https://mohamedashifm.app.n8n.cloud/webhook/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error("Failed to send: " + errText);
    }

    const result = await response.json(); // optional
    console.log("📧 Email Response:", result);

    alert("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    alert("❌ Failed to send email.");
  }
};
