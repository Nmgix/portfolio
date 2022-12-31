import Image from "next/image";
import { Button } from "nmgix-components/src";
import { PopupContent } from "nmgix-components/src/components/PopupComponentsGroup/Popup/Popup";
import { RefObject, useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import styles from "./_image.popup.module.scss";

type ImagesPopupProps = {
  images: string[];
  index: number;
};

const ImagesPopup: React.FC<ImagesPopupProps> = ({ images, index }) => {
  const popup: RefObject<HTMLDivElement> = useRef(null);

  const [rendered, setRendered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  useEffect(() => {
    setRendered(true);
    popup.current!.focus();
  }, []);

  return (
    <div className={styles.imagesPopupWrapper} tabIndex={0} ref={popup}>
      <div className={styles.imagesPopupWrapperControls}>
        <Button
          color='background-default'
          buttonBorder={false}
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
          size='xl'>
          &#60;
        </Button>
        <Button
          color='background-default'
          buttonBorder={false}
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))}
          size='xl'>
          &#62;
        </Button>
      </div>
      <Transition in={rendered} timeout={300}>
        <ul className={styles.imagesPopup} style={{ left: `calc(100% * -${currentIndex})` }}>
          {images.map((image) => (
            <li>
              <Image fill src={image} alt='' draggable={false} />
            </li>
          ))}
        </ul>
      </Transition>
      <div className={styles.imagesPopupWrapperImagesStatus}>
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export const createImagesPopup: (imagesData: ImagesPopupProps) => PopupContent = (imagesData) => ({
  children: <ImagesPopup {...imagesData} />,
});
