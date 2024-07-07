import Header from "../common/layouts/Header";
import TextInput from "../common/inputs/TextInput";
import { ChangeEvent, FC } from "react";
import { RootState } from "../../redux";
import { setFilter } from "../../redux/slices/dialogs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

const DialogsHeader: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const filter = useAppSelector((state: RootState) => state.dialogs.filter);

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Header
      leftItems={
        <TextInput
          placeholder={t("messengerPage.dialogsHeader.search")}
          value={filter || ""}
          onChange={handleChangeFilter}
        />
      }
    />
  );
};

export default DialogsHeader;
