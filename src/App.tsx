import NotificationsList from "./components/common/notifications/NotificationsList";
import { FC, useEffect } from "react";
import { RootState } from "./redux";
import { useAppSelector } from "./redux/hooks";

const App: FC = () => {
  const theme = useAppSelector((state: RootState) => state.settings.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div>messenger-web-client</div>
      <NotificationsList />
    </>
  );
};

export default App;
