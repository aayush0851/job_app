import { MailDataInterface } from "../interface/mail-data.interface";

export const emailHtmlTemplate = (data: MailDataInterface) => {
    const newApplication = `Someone just applied for the vacancy of ${data.jobPosition} that you posted on our job app`;
    const applicationUpdate = `Your application for the Job Opening at ~organizationName~ for the position of ${data.jobPosition} has been ~applicationStatus~`;
    let html = `<html>
        <head>
            <title>JOB-APP</title>
        </head>
        <body>
            <center>
                <h2>Hey User,</h2>
                <h3>Greetings</h3>
                <p>
                    ${data.mailType===1 ? newApplication : applicationUpdate}
                </p>
                </br>
            </center>
        </body>
        </html>
        `;
    if(data.mailType===2){
        html = html.replace("~organizationName~", data.organizationName);
        html = html.replace("~applicationStatus~", data.applicationStatus)
    }
    return html;
};

