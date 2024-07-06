import Button from "../common/inputs/Button";
import TextInput from "../common/inputs/TextInput";
import useInput from "../../hooks/useInput";
import { createSession } from "../../redux/slices/user";
import { useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const [login, changeLogin] = useInput();
  const [password, changePassword] = useInput();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(createSession({ login, password }));
  };

  return (
    <div className="login-form">
      <TextInput
        placeholder={t("loginPage.loginForm.login")}
        value={login}
        onChange={changeLogin}
      />
      <TextInput
        type="password"
        placeholder={t("loginPage.loginForm.password")}
        value={password}
        onChange={changePassword}
      />
      <Button
        onClick={handleLogin}
        disabled={!login || !password}
      >
        {t("loginPage.loginForm.signIn")}
      </Button>
    </div>
  );
};

export default LoginForm;
