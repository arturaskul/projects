export const getEmailTemplate = (type: "signup" | "reset", token: string, redirectTo: string) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const verifyUrl = `${siteUrl}/auth/callback?token=${token}&type=${type}&next=${encodeURIComponent(redirectTo)}`;

  if (type === "signup") {
    return {
      subject: "Verify your email address",
      html: `
        <h1>Welcome!</h1>
        <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
        <a href="${verifyUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        ">
          Verify Email
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${verifyUrl}</p>
      `,
      text: `Welcome!\n\nPlease verify your email address by visiting this link:\n${verifyUrl}`,
    };
  }

  // Password reset email
  return {
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click the button below to reset your password:</p>
      <a href="${verifyUrl}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #0070f3;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin: 10px 0;
      ">
        Reset Password
      </a>
      <p>Or copy and paste this link into your browser:</p>
      <p>${verifyUrl}</p>
      <p>This link will expire in 1 hour.</p>
    `,
    text: `Reset your password by visiting this link:\n${verifyUrl}\n\nThis link will expire in 1 hour.`,
  };
};
