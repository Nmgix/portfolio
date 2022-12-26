import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    token: string;
  };
}

type HCaptchaResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit: boolean;
};

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const tokenUrl = new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET!,
        response: req.body.token,
      });

      const validToken: HCaptchaResponse = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: tokenUrl.toString(),
      }).then((res) => res.json().then((res) => res));

      return res.status(200).json({
        success: validToken.success,
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  } else {
    return res.status(400).json("Под этот метод апи не настроен :(");
  }
}
