import { NextApiRequest } from "next";
import { JobTypes } from "./Footer";

export type MailRequestBody = {
  email: string;
  job: keyof typeof JobTypes;
};

export type MailStatus = {
  sent: boolean;
};

export interface ExtendedNextApiRequest extends NextApiRequest {
  body: MailRequestBody & { token: string };
}

export interface TokenResponse {
  success: boolean;
}
