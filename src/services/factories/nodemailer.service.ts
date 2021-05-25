import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { MailDataInterface } from "../../interface/mail-data.interface";
import { emailHtmlTemplate } from "../../utils/email.template";
import { HOST_EMAIL, HOST_PASSWORD } from "../../utils/handleEnv";

class NodemailerService {
    private transporter: Transporter;
    private transporterOptions: SMTPTransport.Options = {
        host: "smtp.office365.com",
        secure: false,
        requireTLS: true,
        port: 587,
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: HOST_EMAIL,
            pass: HOST_PASSWORD
        }
    }

    static getInstance(): NodemailerService {
        return new NodemailerService();
    }

    sendMail(subject: string, receiversEmail: string, data: MailDataInterface) {
        this.transporter = nodemailer.createTransport(this.transporterOptions);
        return this.transporter.sendMail({
            from: `"JOB-APP" <${HOST_EMAIL}>`,
            to: receiversEmail,
            subject: subject,
            html:  emailHtmlTemplate(data)// html body
        });
    }
}

export const nodemailerService = NodemailerService.getInstance();