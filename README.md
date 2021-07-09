Hi.

This comes as a Proof-of-concept repo I've built do test some ideas around sending emails with nodemailer.

I had made it work with Gmail using the less secure feature, but I wasn't happy with it. So I decided to use the API and OAuth.

I've mostly followed this [tutorial](https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a), but then I really wanted to be able to do the same using Typescript.

#### To-dos

1. Get better understanding of Typescript.
2. Remove the `@ts-ignore` in line 39 of `src/index.ts`. Didn't get to understand how to properly pass data to `nodemailer.createTransport` function.
