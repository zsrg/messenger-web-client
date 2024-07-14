import ModalWrapper from "../../common/modal/ModalWrapper";
import { FC } from "react";

interface ImageLightboxProps {
  image: string;
  isOpen: boolean;
  toggle: () => void;
}

const ImageLightbox: FC<ImageLightboxProps> = ({ image, isOpen, toggle }) => (
  <ModalWrapper isOpen={isOpen} toggle={toggle}>
    <img className="modal-image" src={image} />
  </ModalWrapper>
);

export default ImageLightbox;
