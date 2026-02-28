import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Send email using mailto link approach via a simple SMTP-like fetch
    // For production, integrate a proper email service (Resend, SendGrid, etc.)
    // For now, we'll store the message and return success
    const mailtoRecipient = "tuguldur8000@gmail.com"

    // Log the contact submission (visible in server logs)
    console.log("=== New Contact Form Submission ===")
    console.log(`To: ${mailtoRecipient}`)
    console.log(`From: ${name} <${email}>`)
    console.log(`Message: ${message}`)
    console.log("==================================")

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
      mailto: `mailto:${mailtoRecipient}?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    )
  }
}
