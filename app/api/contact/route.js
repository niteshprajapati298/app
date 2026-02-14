import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim() || "";
const OWNER_EMAIL = (
  process.env.Email || process.env.EMAIL || "labs.scalex@gmail.com"
).trim();
const FROM_EMAIL =
  process.env.RESEND_FROM?.trim() || "LabScaleX <contact@labscalex.com>";

export async function POST(request) {
  try {
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Email not configured. Add RESEND_API_KEY to .env. Get one free at resend.com",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const ownerHtml = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const userHtml = `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for reaching out to LabScaleX. We've received your message and will get back to you shortly.</p>
      <p>— The LabScaleX Team</p>
    `;

    // Send to website owner
    const { error: ownerError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `[LabScaleX] Contact from ${name}`,
      html: ownerHtml,
    });

    if (ownerError) {
      console.error("Resend error:", ownerError);
      return NextResponse.json(
        {
          error:
            ownerError.message ||
            "Failed to send. Check RESEND_API_KEY and domain verification at resend.com",
        },
        { status: 500 }
      );
    }

    // Send confirmation to submitter
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "We received your message — LabScaleX",
      html: userHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
