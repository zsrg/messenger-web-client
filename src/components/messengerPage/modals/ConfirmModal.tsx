import Button from "../../common/inputs/Button";
import MenuItem from "../../common/dataDisplay/MenuItem";
import ModalFooter from "../../common/modal/ModalFooter";
import ModalHeader from "../../common/modal/ModalHeader";
import ModalWindow from "../../common/modal/ModalWindow";
import ModalWrapper from "../../common/modal/ModalWrapper";
import { FC } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  text: string;
  handleAction: () => Promise<any>;
  actionText: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  toggle,
  title,
  text,
  actionText,
  handleAction,
}) => {
  const handleActionClick = () => {
    handleAction().then(toggle);
  };

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <MenuItem text={text} disableHover />
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={handleActionClick}>{actionText}</Button>
        </ModalFooter>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default ConfirmModal;
