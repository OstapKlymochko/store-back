import {EEmailActions} from "../enums";

export const allTemplates: { [key: string]: { subject: string, templateName: string } } = {
    [EEmailActions.ACTIVATE]: {
        subject: 'Congratulations on joining our website! Please, verify your email',
        templateName: 'activate'
    }
}