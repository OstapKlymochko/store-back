import nodemailer, {Transporter} from 'nodemailer';
import {configs} from "../configs";
import EmailTemplates from 'email-templates';
import path from "path";
import {EEmailActions} from "../enums";
import {allTemplates} from "../constants";
import {ApiError} from "../error";

class EmailServices {
    private transporter: Transporter;
    private templateParser;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configs.EMAIL,
                pass: configs.EMAIL_PASSWORD,
            }
        });
        this.templateParser = new EmailTemplates({
            views: {
                root: path.join(process.cwd(), 'src', 'statics'),
                options: {
                    extension: 'hbs'
                }
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path.join(process.cwd(), 'src', 'statics', 'styles'),
                }
            }
        });
    }

    public async sendMail(email: string | string[], emailAction: EEmailActions, locals: Record<string, string>) {
        try {
            const templateInfo = allTemplates[emailAction];
            locals.frontUrl = configs.FRONT_URL;

            const html = await this.templateParser.render(templateInfo.templateName, locals);

            return this.transporter.sendMail({
                from: 'No reply',
                to: email,
                subject: templateInfo.subject,
                html
            });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const emailServices = new EmailServices();