const sgMail = require('@sendgrid/mail')

const sendgridApiKey = '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'

sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: {
            email: 'sandheep17102@gmail.com',
            name: 'Desika foods'
        },
        subject: 'Welcome to Desika foods!',
        html: `<!DOCTYPE html>
            <html>
                <head>
                    <style>
                    .button {
                        font: bold 11px Arial;
                        text-decoration: none;
                        background-color: #EEEEEE;
                        color: #333333;
                        padding: 2px 6px 2px 6px;
                        border-top: 1px solid #CCCCCC;
                        border-right: 1px solid #333333;
                        border-bottom: 1px solid #333333;
                        border-left: 1px solid #CCCCCC;
                      }
                    </style>
                </head>
                <body>
                    <h3>Hello ${name},</h3>
                    <h4>Welcome to the healthy society of Desika foods where only 100% orgainc products are sold to you</h4>
                    <h4>For security reasons, you need to verify your email before you can start your purchase.</h4>
                    <h4>Click the button below to verify your email:</h4>
                    <a href="https://desikafood.herokuapp.com/verification/${email}" class="button">Verify</a>
                    <h4>If this email wasn't meant for you click the one below to unsubscribe</h4>
                    <a href="#" class="button">Unsubscribe</a>
                </body>
            </html>`
    })
}

module.exports = {
    sendWelcomeEmail
}