import Button from "../../../../common/inputs/Button";
import FormItem from "../../../../common/dataDisplay/FormItem";
import ModalFooter from "../../../../common/modal/ModalFooter";
import ModalHeader from "../../../../common/modal/ModalHeader";
import ModalWindow from "../../../../common/modal/ModalWindow";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import TextInput from "../../../../common/inputs/TextInput";
import useInput from "../../../../../hooks/useInput";
import { changePassword } from "../../../../../redux/slices/user";
import { CustomPayloadAction } from "../../../../../types/common";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { useTranslation } from "react-i18next";

interface ChangePasswordModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [currentPassword, changeCurrentPassword, , resetCurrentPassword] = useInput();
  const [newPassword, changeNewPassword, , resetNewPassword] = useInput();
  const [confirmPassword, changeConfirmPassword, , resetConfirmPassword] = useInput();

  const isSaveDisabled = !(currentPassword && newPassword && confirmPassword);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSaveClick = () =>
    dispatch(changePassword({ currentPassword, newPassword, confirmPassword }))
      .then((data: CustomPayloadAction) => {
        if (data.meta?.requestStatus === "fulfilled") {
          toggle();
        }
      });

  useEffect(() => {
    if (!isOpen) {
      resetCurrentPassword();
      resetNewPassword();
      resetConfirmPassword();
    }
  }, [isOpen]);

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow>
        <ModalHeader toggle={toggle}>
          {t("messengerPage.modals.changePasswordModal.title")}
        </ModalHeader>
        <FormItem
          title={t("messengerPage.modals.changePasswordModal.currentPassword")}
        >
          <TextInput
            type="password"
            value={currentPassword}
            onChange={changeCurrentPassword}
          />
        </FormItem>
        <FormItem
          title={t("messengerPage.modals.changePasswordModal.newPassword")}
        >
          <TextInput
            type="password"
            value={newPassword}
            onChange={changeNewPassword}
          />
        </FormItem>
        <FormItem
          title={t("messengerPage.modals.changePasswordModal.confirmPassword")}
        >
          <TextInput
            type="password"
            value={confirmPassword}
            onChange={changeConfirmPassword}
          />
        </FormItem>
        <ModalFooter>
          <Button onClick={toggle}>
            {t("messengerPage.modals.changePasswordModal.cancel")}
          </Button>
          <Button onClick={handleSaveClick} disabled={isSaveDisabled}>
            {t("messengerPage.modals.changePasswordModal.save")}
          </Button>
        </ModalFooter>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default ChangePasswordModal;
