import { ApplicationStatus } from "../enum/application.enum";
import { MailType } from "../enum/mail.enum";

export interface MailDataInterface{
    mailType: MailType;
    jobPosition: string;
    applicationStatus?: ApplicationStatus,
    organizationName?: string;
}