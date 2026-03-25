// src/services/email.service.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // smtp.resend.com oppure smtp-relay.brevo.com
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const emailService = {
  sendMagicLink: async (email: string, token: string, type: 'login' | 'verify-email' = 'login') => {
    const url = `${Bun.env.HOST_URL}/auth/magic/verify?token=${token}`

    const isVerify = type === 'verify-email'

    await transporter.sendMail({
      from: `"Aviability" <${Bun.env.SMTP_FROM}>`,
      to: email,
      subject: isVerify ? 'Verifica la tua email — Aviability' : 'Il tuo magic link — Aviability',
      html: `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f0fdf4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #bbf7d0;box-shadow:0 4px 24px rgba(5,150,105,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#064e3b,#047857);padding:28px 40px;text-align:center;border-bottom:1px solid #bbf7d0;">
              <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:800;letter-spacing:-0.04em;">aviability</h1>
              <p style="margin:6px 0 0 0;font-size:11px;color:#6ee7b7;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">
                ${isVerify ? 'verifica email' : 'magic link login'}
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px;text-align:center;">

              <!-- Emoji icon -->
              <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#059669,#34d399);margin:0 auto 20px;font-size:26px;line-height:56px;text-align:center;">
                ${isVerify ? '✉️' : '🔑'}
              </div>

              <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#0a1628;letter-spacing:-0.03em;">
                ${isVerify ? 'Conferma il tuo account' : 'Entra in Aviability'}
              </h2>

              <p style="margin:0 0 6px;font-size:14px;color:#4b5563;line-height:1.6;">
                ${isVerify
                  ? 'Clicca il bottone qui sotto per verificare la tua email e attivare il tuo account.'
                  : 'Clicca il bottone qui sotto per accedere al tuo account. Nessuna password, solo un click.'}
              </p>
              <p style="margin:0 0 28px;font-size:12px;color:#9ca3af;">
                Il link scade in <strong style="color:#4b5563;">15 minuti</strong> e può essere usato una sola volta.
              </p>

              <!-- CTA -->
              <a href="${url}"
                style="display:inline-block;background:linear-gradient(135deg,#059669,#10b981);color:#ffffff;text-decoration:none;padding:16px 44px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:-0.01em;box-shadow:0 4px 16px rgba(5,150,105,0.3);">
                ${isVerify ? '✓ Verifica email' : '→ Accedi ora'}
              </a>

              <!-- Fallback URL -->
              <p style="margin:24px 0 0;font-size:11px;color:#9ca3af;line-height:1.6;">
                Non riesci a cliccare il bottone? Copia questo link nel browser:<br/>
                <a href="${url}" style="color:#059669;word-break:break-all;font-size:11px;">${url}</a>
              </p>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background-color:#d1fae5;"></div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#fafffe;padding:20px 40px;text-align:center;border-top:none;">
              <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;">
                Non hai richiesto questo? Ignora questa email — il tuo account è al sicuro.
              </p>
              <p style="margin:0;font-size:11px;color:#bbf7d0;font-weight:700;letter-spacing:0.04em;">
                aviability · switch your availability
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    })
  },
}