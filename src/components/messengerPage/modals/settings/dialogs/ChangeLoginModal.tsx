import Button from "../../../../common/inputs/Button";
import FormItem from "../../../../common/dataDisplay/FormItem";
import ModalFooter from "../../../../common/modal/ModalFooter";
import ModalHeader from "../../../../common/modal/ModalHeader";
import ModalWindow from "../../../../common/modal/ModalWindow";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import TextInput from "../../../../common/inputs/TextInput";
import useInput from "../../../../../hooks/useInput";
import { changeLogin } from "../../../../../redux/slices/user";
import { CustomPayloadAction } from "../../../../../types/common";
import { FC, useEffect } from "react";
import { RootState } from "../../../../../redux";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { useTranslation } from "react-i18next";

interface ChangeLoginModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ChangeLoginModal: FC<ChangeLoginModalProps> = ({ isOpen, toggle }) => {
  const currentLogin = useAppSelector((state: RootState) => state.user.login);

  const [newLogin, changeNewLogin, , resetLogin] = useInput(currentLogin);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) {
      resetLogin();
    }
  }, [isOpen]);

  const handleSaveClick = () =>
    dispatch(changeLogin({ newLogin })).then((data: CustomPayloadAction) => {
      if (data.meta?.requestStatus === "fulfilled") {
        toggle();
      }
    });

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow>
        <ModalHeader toggle={toggle}>
          {t("messengerPage.modals.changeLoginModal.title")}
        </ModalHeader>
        <FormItem title={t("messengerPage.modals.changeLoginModal.login")}>
          <TextInput value={newLogin} onChange={changeNewLogin} />
        </FormItem>
        <ModalFooter>
          <Button onClick={toggle}>
            {t("messengerPage.modals.changeLoginModal.cancel")}
          </Button>
          <Button onClick={handleSaveClick} disabled={!newLogin}>
            {t("messengerPage.modals.changeLoginModal.save")}
          </Button>
        </ModalFooter>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default ChangeLoginModal;
