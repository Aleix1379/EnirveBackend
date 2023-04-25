import nodemailer from 'nodemailer'

interface SendMailParams {
  name: string
  email: string
  message: string
}

export const sendMail = async ({ name, email, message }: SendMailParams) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const options = {
    to: process.env.EMAIL_TO,
    subject: `Message from ${name}, ${email}`,
    text: message
  }

  return await transporter.sendMail(options)
}
