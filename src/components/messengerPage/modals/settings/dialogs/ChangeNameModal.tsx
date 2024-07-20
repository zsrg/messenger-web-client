import Button from "../../../../common/inputs/Button";
import FormItem from "../../../../common/dataDisplay/FormItem";
import ModalFooter from "../../../../common/modal/ModalFooter";
import ModalHeader from "../../../../common/modal/ModalHeader";
import ModalWindow from "../../../../common/modal/ModalWindow";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import TextInput from "../../../../common/inputs/TextInput";
import useInput from "../../../../../hooks/useInput";
import { changeName } from "../../../../../redux/slices/user";
import { CustomPayloadAction } from "../../../../../types/common";
import { FC, useEffect } from "react";
import { RootState } from "../../../../../redux";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { useTranslation } from "react-i18next";

interface ChangeNameModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ChangeNameModal: FC<ChangeNameModalProps> = ({ isOpen, toggle }) => {
  const currentName = useAppSelector((state: RootState) => state.user.name);

  const [newName, changeNewName, , resetName] = useInput(currentName);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) {
      resetName();
    }
  }, [isOpen]);

  const handleSaveClick = () =>
    dispatch(changeName({ newName })).then((data: CustomPayloadAction) => {
      if (data.meta?.requestStatus === "fulfilled") {
        toggle();
      }
    });

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow>
        <ModalHeader toggle={toggle}>
          {t("messengerPage.modals.changeNameModal.title")}
        </ModalHeader>
        <FormItem title={t("messengerPage.modals.changeNameModal.name")}>
          <TextInput value={newName} onChange={changeNewName} />
        </FormItem>
        <ModalFooter>
          <Button onClick={toggle}>
            {t("messengerPage.modals.changeNameModal.cancel")}
          </Button>
          <Button onClick={handleSaveClick} disabled={!newName}>
            {t("messengerPage.modals.changeNameModal.save")}
          </Button>
        </ModalFooter>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default ChangeNameModal;
