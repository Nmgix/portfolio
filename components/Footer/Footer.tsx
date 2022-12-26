import styles from "./Footer.module.scss";
import React, { memo, useState } from "react";
import Image from "next/image";
import { Button, Input } from "nmgix-components/src";
import { Icon } from "components/Icon/Icon";
import { FormattedMessage, useIntl } from "react-intl";
import { JobTypes } from "types/Footer";
import { useAppContext } from "components/AppController/App.Controller";
import {
  PopupContent,
  PopupControls,
  PopupProps,
} from "nmgix-components/src/components/PopupComponentsGroup/Popup/Popup";

const Footer: React.FC = () => {
  const intl = useIntl();
  const context = useAppContext();

  const [email, setEmail] = useState<string>("");
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setEmail(() => e.target.value.trim());
  };
  const [jobType, setJobType] = useState<keyof typeof JobTypes>("mid");

  const FooterPopup: React.FC<Omit<Partial<PopupProps & PopupControls>, "children">> = ({ id, closePopup }) => {
    return (
      <div>
        <span>форма подтверждения отправки сообщения!</span>
        <button onClick={closePopup}>закрыть форму без ошибок</button>
      </div>
    );
  };

  const footerEmailPopup: PopupContent = {
    children: <FooterPopup />,
    onDestroy: (finished: boolean) => {
      if (!finished) {
        setTimeout(
          () =>
            context.alertsControl.current!.addAlert({
              children: <span>вы отказались от прохождения каптчи</span>,
              scheme: "warning",
              type: "WindowFixed",
            }),
          0
        );
      } else {
        setTimeout(
          () =>
            context.alertsControl.current!.addAlert({
              children: <span>вы прошли каптчу</span>,
              scheme: "success",
              type: "WindowFixed",
            }),
          0
        );
      }
    },
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    context.popupsControl.current!.createPopup(footerEmailPopup.children, footerEmailPopup.onDestroy);
  };

  const FormHeader: React.FC = () => (
    <div className={styles.formHeader}>
      <h1>
        <FormattedMessage id='footer.title' />
      </h1>
      <span>
        <FormattedMessage id='footer.subtitile' />
      </span>
    </div>
  );

  const jobOptions = (
    <div className={styles.formBodyOptionsContent}>
      {Object.keys(JobTypes)
        .filter((el) => {
          return isNaN(Number(el));
        })
        .map((key) => (
          <Button
            buttonBorder={true}
            onClick={() => setJobType(key as keyof typeof JobTypes)}
            opacity={jobType === key ? 1 : 0.5}
            size={"m"}
            color={"background-default"}
            key={key}
            backgroundColor={"background-alter"}>
            <FormattedMessage id={`footer.form.work.${key}`} />
          </Button>
        ))}
    </div>
  );

  const selectedJob = intl.formatMessage({ id: `footer.form.work.${jobType}` });
  const leftFormSection = (
    <div className={styles.formBodyOptions}>
      <span className={styles.formBodyNestedHeader}>
        <FormattedMessage id='footer.form.header.purpose' values={{ j: selectedJob }} />
      </span>
      {jobOptions}
    </div>
  );

  const inputSection = (
    <div className={styles.formBodyRequisitesContentControls} key={"emailwrapper"}>
      <Input placeholder='your-favorite@mail.domain' onChange={updateEmail} defaultValue={email} key='someemail' />
      <Button
        type='submit'
        buttonBorder={true}
        size={"m"}
        backgroundColor={"background-alter"}
        color={"background-default"}
        opacity={0.5}>
        <span>
          <FormattedMessage id='footer.form.send.button' />
        </span>
        <Icon icon='arrow-right' width={18} height={15} />
      </Button>
    </div>
  );

  const rightFormSection = (
    <div className={styles.formBodyRequisites}>
      <span className={styles.formBodyNestedHeader}>
        <FormattedMessage id='footer.form.header.email' />
      </span>
      <div className={styles.formBodyRequisitesContent}>
        {inputSection}
        <span>
          <FormattedMessage id='footer.form.send.warning' />
        </span>
      </div>
    </div>
  );

  const formContentSection = (
    <div className={styles.formBody}>
      {leftFormSection}
      <div className={styles.formBodySeparator} />
      {rightFormSection}
    </div>
  );
  const formWrapper = (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormHeader />
      {formContentSection}
    </form>
  );

  const FooterSubtitleInformationSection: React.FC = memo(
    () => (
      <div className={styles.credentials}>
        <span>© 2020 - 2022</span>
        <Image priority src={"/icons/nmgix-logo.png"} width={37} height={22} draggable={false} alt={`nmgix's logo`} />
      </div>
    ),
    () => true
  );

  return (
    <footer className={styles.footer}>
      {formWrapper}
      <FooterSubtitleInformationSection />
    </footer>
  );
};

export default Footer;
