"use server"

export async function sendContactInquiry(formData: FormData) {
  const email = formData.get('email') as string;
  const fullName = formData.get('fullName') as string;
  const companyName = formData.get('companyName') as string;
  const numberOfTrucks = formData.get('numberOfTrucks') as string;
  const message = formData.get('message') as string;

  if (!email || !fullName) {
    return { success: false, error: "Email and Full Name are required" };
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.GROUP_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_GROUP_ID not configured in .env");
    return { success: false, error: "Server configuration error" };
  }

  const text = `
🆕 *New Contact Inquiry*
━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${fullName}
📧 *Email:* ${email}
🏢 *Company:* ${companyName || 'N/A'}
🚛 *Trucks:* ${numberOfTrucks || 'N/A'}
💬 *Message:* 
${message || 'N/A'}
━━━━━━━━━━━━━━━━━━━━
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return { success: false, error: "Failed to send message" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return { success: false, error: "Internal server error" };
  }
}
