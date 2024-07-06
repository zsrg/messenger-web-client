import If from "./components/common/utils/If";
import LoginPage from "./pages/LoginPage";
import MessengerPage from "./pages/MessengerPage";
import NotificationsList from "./components/common/notifications/NotificationsList";
import { FC, useEffect } from "react";
import { RootState } from "./redux";
import { useAppSelector } from "./redux/hooks";

const App: FC = () => {
  const sessionId = useAppSelector((state: RootState) => state.user.sessionId);
  const theme = useAppSelector((state: RootState) => state.settings.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <If
        condition={sessionId}
        then={<MessengerPage />}
        else={<LoginPage />}
      />
      <NotificationsList />
    </>
  );
};

export default App;
