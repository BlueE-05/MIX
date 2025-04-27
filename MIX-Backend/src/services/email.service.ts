import nodemailer from "nodemailer";
import { smtpConfig } from "@/config/smtp";

export class EmailService {
    private transporter: nodemailer.Transporter;
    private host = smtpConfig.host;
    private port = smtpConfig.port;
    private auth = smtpConfig.auth;

    constructor() {
        this.transporter = nodemailer.createTransport({
          host: this.host,
          port: this.port,
          secure: this.port === 465,
          auth: this.auth,
        });
      }

    async sendResetPassword(toEmail: string, resetLink: string): Promise<void> {
        const mailOptions = {
            from: smtpConfig.from,
            to: toEmail,
            subject: "Reset your password",
            html: `
            <h2>Reset your password</h2>
            <p>Please click the following link to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }
}