import List from "../../../common/layouts/List";
import MenuItem from "../../../common/dataDisplay/MenuItem";
import Toggle from "../../../common/inputs/Toggle";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../../../redux";
import { setTheme } from "../../../../redux/slices/settings";
import { Theme } from "../../../../types/settings";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useTranslation } from "react-i18next";

const AppearancePage: FC = () => {
  const theme = useAppSelector((state: RootState) => state.settings.theme);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark));
  };

  return (
    <>
      <List>
        <MenuItem
          primaryElement={<FontAwesomeIcon icon={faCircleHalfStroke} />}
          text={t("messengerPage.modals.settings.appearancePage.darkMode")}
          secondaryElement={
            <Toggle
              type="checkbox"
              checked={theme === Theme.Dark}
              onChange={handleToggleTheme}
            />
          }
        />
      </List>
    </>
  );
};

export default AppearancePage;
