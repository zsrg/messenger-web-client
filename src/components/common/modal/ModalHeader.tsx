import Header from "../layouts/Header";
import IconButton from "../inputs/IconButton";
import If from "../utils/If";
import Title from "../dataDisplay/Title";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ModalHeaderProps {
  children: string;
  toggle: () => void;
  handlePrev?: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  children,
  toggle,
  handlePrev,
}) => (
  <Header
    leftItems={
      <>
        <If condition={handlePrev}>
          <IconButton onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
        </If>

        <Title>{children}</Title>
      </>
    }
    rightItems={
      <IconButton onClick={toggle}>
        <FontAwesomeIcon icon={faXmark} />
      </IconButton>
    }
  />
);

export default ModalHeader;
