import Header from "../layouts/Header";
import IconButton from "../inputs/IconButton";
import Title from "../dataDisplay/Title";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ModalHeaderProps {
  children: string;
  toggle: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({ children, toggle }) => (
  <Header
    leftItems={
      <Title>{children}</Title>
    }
    rightItems={
      <IconButton onClick={toggle}>
        <FontAwesomeIcon icon={faXmark} />
      </IconButton>
    }
  />
);

export default ModalHeader;
