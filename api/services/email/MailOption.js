export class MailOption {

    constructor(receivers, subject=null, body){
        this.from = process.env.SMTP_USER
        this.to = receivers;
        this.subject = subject;
        this.text = body;
    }

}
