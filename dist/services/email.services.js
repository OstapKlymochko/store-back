"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailServices = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const configs_1 = require("../configs");
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const error_1 = require("../error");
class EmailServices {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: configs_1.configs.EMAIL,
                pass: configs_1.configs.EMAIL_PASSWORD,
            }
        });
        this.templateParser = new email_templates_1.default({
            views: {
                root: path_1.default.join(process.cwd(), 'src', 'statics'),
                options: {
                    extension: 'hbs'
                }
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path_1.default.join(process.cwd(), 'src', 'statics', 'styles'),
                }
            }
        });
    }
    async sendMail(email, emailAction, locals) {
        try {
            const templateInfo = constants_1.allTemplates[emailAction];
            locals.frontUrl = configs_1.configs.FRONT_URL;
            const html = await this.templateParser.render(templateInfo.templateName, locals);
            return this.transporter.sendMail({
                from: 'No reply',
                to: email,
                subject: templateInfo.subject,
                html
            });
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
}
exports.emailServices = new EmailServices();
