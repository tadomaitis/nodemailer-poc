import * as nodemailer from 'nodemailer'
import { google } from 'googleapis'
import * as dotenv from 'dotenv'

dotenv.config()

interface EmailOptions {
  subject: string
  text: string
  to: string
  html: string
  from: string | undefined
}

const OAuth2 = google.auth.OAuth2
const OAUTH_URI = 'https://developers.google.com/oauthplayground'
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const EMAIL = process.env.EMAIL

const createTransporter = async () => {
  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, OAUTH_URI)

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(new Error(`Failed to create access token: ${err}`))
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    // @ts-ignore
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  })

  return transporter
}

// emailOptions - who sends what to whom
const sendEmail = async (emailOptions: EmailOptions) => {
  const emailTransporter = await createTransporter()
  await emailTransporter.sendMail(emailOptions)
}

sendEmail({
  subject: 'test',
  text: 'I am sending an email from nodemailer!',
  to: 'some_random_mail@mail.com',
  html: '<h1>Yeah, science! Bitch!</h1>',
  from: EMAIL
})
