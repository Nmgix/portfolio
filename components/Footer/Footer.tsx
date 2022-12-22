import styles from "./Footer.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Input } from "nmgix-components/src";
import { Icon } from "components/Icon/Icon";
import { FormattedMessage, useIntl } from "react-intl";

enum JobTypes {
  "small",
  "mid",
  "large",
  "fulltime",
}

const Footer: React.FC = () => {
  const [jobType, setJobType] = useState<keyof typeof JobTypes>("mid");
  const intl = useIntl();
  const selectedJob = intl.formatMessage({ id: `footer.form.work.${jobType}` });

  return (
    <footer className={styles.footer}>
      <form
        className={styles.form}
        onClick={(e) => {
          e.preventDefault();
        }}>
        <div className={styles.formHeader}>
          <h1>
            <FormattedMessage id='footer.title' />
          </h1>
          <span>
            <FormattedMessage id='footer.subtitile' />
          </span>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formBodyOptions}>
            <span className={styles.formBodyNestedHeader}>
              <FormattedMessage id='footer.form.header.purpose' values={{ j: selectedJob }} />
            </span>
            <div className={styles.formBodyOptionsContent}>
              <Button
                border={true}
                onClick={() => setJobType("small")}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                <FormattedMessage id='footer.form.work.small' />
              </Button>
              <Button
                border={true}
                onClick={() => setJobType("mid")}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                <FormattedMessage id='footer.form.work.mid' />
              </Button>
              <Button
                border={true}
                onClick={() => setJobType("large")}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                <FormattedMessage id='footer.form.work.large' />
              </Button>
              <Button
                border={true}
                onClick={() => setJobType("fulltime")}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                <FormattedMessage id='footer.form.work.fulltime' />
              </Button>
            </div>
          </div>
          <div className={styles.formBodySeparator} />
          <div className={styles.formBodyRequisites}>
            <span className={styles.formBodyNestedHeader}>
              <FormattedMessage id='footer.form.header.email' />
            </span>
            <div className={styles.formBodyRequisitesContent}>
              <div className={styles.formBodyRequisitesContentControls}>
                <Input placeholder='your-favorite@mail.domain' />
                <Button
                  icon={{ icon: "arrow-right-long" }}
                  border={true}
                  onClick={() => {}}
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
              <span>
                <FormattedMessage id='footer.form.send.warning' />
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.credentials}>
        <span>© 2020 - 2022</span>
        <Image priority src={"/icons/nmgix-logo.png"} width={37} height={22} draggable={false} alt={`nmgix's logo`} />
      </div>
    </footer>
  );
};

export default Footer;
