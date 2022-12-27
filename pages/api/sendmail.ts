import { NextApiResponse } from "next";

import nodemailer from "nodemailer";
import { JobTypes } from "types/Footer";
import { ExtendedNextApiRequest, TokenResponse } from "types/Mail";

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      if (req.body.email.trim().length === 0) {
        return res.status(200).json({ sent: false });
      }

      const validToken = await fetch(`${process.env.HOST}/api/verifycaptcha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: req.body.token,
        }),
      }).then((res) => res.json().then((res: TokenResponse) => res));

      if (validToken) {
        let transport = nodemailer.createTransport({
          host: "smtp-relay.sendinblue.com",
          port: 587,
          auth: {
            user: process.env.SMTP_LOGIN,
            pass: process.env.SMTP_PASS,
          },
        });

        let sentMail = await transport.sendMail({
          from: `<${process.env.SMTP_LOGIN}>`,
          replyTo: req.body.email,
          to: process.env.REQUESTS_MAIL,
          subject: `Новая заявка, ${JobTypes[req.body.job as keyof typeof JobTypes]}`,
          text: `Почта отправителя ${req.body.email}`,
        });

        if (sentMail.accepted[0] === process.env.REQUESTS_MAIL) {
          return res.status(200).json({ sent: true });
        } else {
          return res.status(200).json({ sent: false });
        }
      } else {
        return res.status(200).json({ sent: false });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json({ sent: false });
    }
  } else {
    return res.status(400).json("Под этот метод апи не настроен :(");
  }
}
