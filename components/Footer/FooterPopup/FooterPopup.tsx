import {
  PopupCloseStatues,
  PopupContent,
  PopupControls,
  PopupProps,
} from "nmgix-components/src/components/PopupComponentsGroup/Popup/Popup";
import styles from "./_footer.popup.module.scss";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { MailRequestBody, MailStatus } from "types/Mail";

import getConfig from "next/config";
import { FormattedMessage } from "react-intl";
const { publicRuntimeConfig } = getConfig();
const { HCAPTCHA_SITEKEY } = publicRuntimeConfig;

const FooterPopup: React.FC<Omit<Partial<PopupProps & PopupControls>, "children"> & MailRequestBody> = ({
  id,
  closePopup,
  email,
  job,
}) => {
  return (
    <div className={styles.footerPopup} key={id}>
      <span className={styles.title}>
        <FormattedMessage id='footer.popup.title' />
      </span>
      <HCaptcha
        sitekey={HCAPTCHA_SITEKEY}
        onExpire={() => closePopup!("close")}
        onClose={() => closePopup!("close")}
        onError={() => closePopup!("failure")}
        onVerify={async (token, ekey) => {
          try {
            const res = await fetch("/api/sendmail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                email,
                job,
              }),
            }).then((res) => res.json().then((res: MailStatus) => res));
            return closePopup!(res.sent === true ? "success" : "failure");
          } catch (error) {
            return closePopup!("failure");
          }
        }}
      />
    </div>
  );
};

export const createFooterEmailPopup: (
  onDestroy: (status: keyof typeof PopupCloseStatues) => void,
  mailData: MailRequestBody
) => PopupContent = (onDestroy, mailData) => ({
  children: <FooterPopup {...mailData} />,
  onDestroy,
});
