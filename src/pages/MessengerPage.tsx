import { deleteSession } from "../services/user";
import { FC, useEffect } from "react";

const MessengerPage: FC = () => {

  useEffect(() => {
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  const handleUnload = () => {
    deleteSession();
  };

  return <></>;
};

export default MessengerPage;
