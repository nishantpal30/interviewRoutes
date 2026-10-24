const COPY = {
  register: {
    subject: "Verify your InterviewRoute account",
    preheader: "Your verification code is inside — it expires soon.",
    badge: "🎉 Welcome aboard",
    title: "Confirm your email",
    intro: (name) =>
      `Hi${name ? ` ${name}` : ""}, thanks for signing up for InterviewRoute! Use the code below to activate your account and start practicing interviews.`,
    ctaLabel: "Activate my account",
    ctaUrl: "https://interviewroute.com/verify",
    footerNote:
      "You're receiving this because you created a new InterviewRoute account.",
  },
  login: {
    subject: "Your InterviewRoute login code",
    preheader: "Use this one-time code to finish logging in.",
    badge: "🔐 Secure sign-in",
    title: "Finish logging in",
    intro: (name) =>
      `Hi${name ? ` ${name}` : ""}, we noticed a login attempt on your InterviewRoute account. Enter the code below to continue. If this wasn't you, you can safely ignore this email.`,
    ctaLabel: "Continue to dashboard",
    ctaUrl: "https://interviewroute.com/login/verify",
    footerNote:
      "For your security, this code expires shortly and can only be used once.",
  },
  resetPassword: {
    subject: "Reset your InterviewRoute password",
    preheader: "A password reset was requested for your account.",
    badge: "🔑 Password reset",
    title: "Reset your password",
    intro: (name) =>
      `Hi${name ? ` ${name}` : ""}, we received a request to reset the password for your InterviewRoute account. Use the code below to set a new password. Didn't request this? No action needed — your password stays unchanged.`,
    ctaLabel: "Reset my password",
    ctaUrl: "https://interviewroute.com/reset-password",
    footerNote:
      "If you did not request a password reset, please contact support immediately.",
  },
};

const DEFAULTS = {
  name: "",
  expiryMinutes: 10,
  supportEmail: "interviewroute@gmail.com",
  companyName: "InterviewRoute",
  companyUrl: "https://interviewroute.com",
  year: new Date().getFullYear(),
};

// Subject
export const emailSubject = (type) =>
  COPY[type]?.subject ?? `${DEFAULTS.companyName} Notification`;

//  Intro (plain-text heading, for previews / notifications)
export const emailIntro = (type) =>
  COPY[type]?.title ?? `Welcome to ${DEFAULTS.companyName}`;

// Full HTML body 
export const emailBody = (type, options = {}) => {
  const cfg = COPY[type];
  if (!cfg) throw new Error(`Unknown email type: ${type}`);

  const {
    name,
    otp,
    expiryMinutes,
    supportEmail,
    companyName,
    companyUrl,
    year,
  } = {
    ...DEFAULTS,
    ...options,
  };

  if (!otp) throw new Error("emailBody requires an `otp` value");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${cfg.subject}</title>
  <!--[if mso]>
  <style>body,table,td{font-family:Arial,sans-serif!important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">

  <!-- Preheader (hidden preview text in inbox) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${cfg.preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6fb;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <a href="${companyUrl}" target="_blank" style="text-decoration:none;">
                <span style="font-size:22px;font-weight:800;letter-spacing:-0.3px;color:#4f46e5;">
                  ${companyName}
                </span>
              </a>
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;box-shadow:0 8px 24px rgba(15,23,42,0.06);overflow:hidden;">

              <!-- Gradient bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:6px;background:linear-gradient(90deg,#4f46e5 0%,#7c3aed 50%,#ec4899 100%);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Body -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:36px 36px 8px 36px;">

                    <!-- Badge -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#eef2ff;border:1px solid #e0e7ff;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:600;color:#4338ca;letter-spacing:0.2px;">
                          ${cfg.badge}
                        </td>
                      </tr>
                    </table>

                    <!-- Title -->
                    <h1 style="margin:20px 0 12px 0;font-size:26px;line-height:1.25;font-weight:800;color:#0f172a;letter-spacing:-0.4px;">
                      ${cfg.title}
                    </h1>

                    <!-- Intro paragraph -->
                    <p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:#4b5563;">
                      ${cfg.intro(name)}
                    </p>

                    <!-- OTP BOX -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding:0 0 8px 0;">
                          <span style="display:inline-block;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;">
                            Your one-time code
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#eef2ff 0%,#faf5ff 100%);border:1px dashed #c7d2fe;border-radius:14px;">
                            <tr>
                              <td style="padding:18px 32px;">
                                <span style="font-family:'Courier New',Courier,monospace;font-size:34px;font-weight:700;letter-spacing:12px;color:#312e81;padding-left:12px;">
                                  ${otp}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:14px 0 0 0;">
                          <span style="font-size:13px;color:#6b7280;">
                            This code expires in <strong style="color:#374151;">${expiryMinutes} minutes</strong>.
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding:28px 0 8px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);border-radius:10px;">
                                <a href="${cfg.ctaUrl}" target="_blank"
                                   style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.2px;">
                                  ${cfg.ctaLabel}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Fallback link -->
                    <p style="margin:20px 0 0 0;font-size:12px;line-height:1.6;color:#9ca3af;text-align:center;word-break:break-all;">
                      Button not working? Copy and paste this link into your browser:<br />
                      <a href="${cfg.ctaUrl}" style="color:#4f46e5;text-decoration:none;">${cfg.ctaUrl}</a>
                    </p>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                      <tr><td style="height:1px;background:#e5e7eb;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>

                    <!-- Footer note -->
                    <p style="margin:20px 0 0 0;font-size:12px;line-height:1.6;color:#6b7280;">
                      ${cfg.footerNote}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Body padding bottom -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 36px 32px 36px;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding:28px 16px 8px 16px;text-align:center;font-size:12px;line-height:1.7;color:#9ca3af;">
              <p style="margin:0 0 6px 0;">
                Need help? Email us at
                <a href="mailto:${supportEmail}" style="color:#4f46e5;text-decoration:none;">${supportEmail}</a>
              </p>
              <p style="margin:0 0 6px 0;">
                © ${year} ${companyName}. All rights reserved.
              </p>
              <p style="margin:0;color:#c0c4cc;">
                This is an automated message — please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
