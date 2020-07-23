const sgMail = require('@sendgrid/mail')

const sendgridApiKey = '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'

sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sandheep17102@gmail.com',
        subject: 'Welcome to Desika foods!',
        text: `Hello ${name}. Welcome to the healthy family of desika foods. Order the healthy-grown grains and be vitalized`
    })
}

module.exports = {
    sendWelcomeEmail
}