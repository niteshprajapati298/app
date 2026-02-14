import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Support multiple env variable names (case varies across systems)
const OWNER_EMAIL = (
  process.env.Email || process.env.EMAIL || process.env.GMAIL_USER || "lab.scalex@gmail.com"
).trim();
const EMAIL_PASSWORD = (
  process.env.Password ||
  process.env.PASSWORD ||
  process.env.EMAIL_PASSWORD ||
  process.env.GMAIL_APP_PASSWORD ||
  ""
)
  .replace(/\s/g, "")
  .trim();

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_PASSWORD) {
      console.error("Missing Email or Password in .env");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: OWNER_EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

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
    await transporter.sendMail({
      from: `"LabScaleX Website" <${OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `[LabScaleX] Contact from ${name}`,
      html: ownerHtml,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\nMessage:\n${message}`,
    });

    // Send confirmation to submitter
    await transporter.sendMail({
      from: `"LabScaleX" <${OWNER_EMAIL}>`,
      to: email,
      subject: "We received your message — LabScaleX",
      html: userHtml,
      text: `Hi ${name},\n\nThanks for reaching out to LabScaleX. We've received your message and will get back to you shortly.\n\n— The LabScaleX Team`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    const isAuthError =
      err.code === "EAUTH" ||
      err.response?.includes("535") ||
      /username and password not accepted/i.test(err.message || "");
    const message = isAuthError
      ? "Gmail rejected the login. Use a Gmail App Password (not your normal password). Enable 2-Step Verification, then create one at myaccount.google.com/apppasswords"
      : err.message || "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
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
