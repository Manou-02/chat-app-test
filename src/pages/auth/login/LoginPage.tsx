import { useEffect } from "react";
// import { Color } from "@/shared/config/Colors";
import "./style.login.scss";
import { Card } from "@/shared/ui/card/Card";
import { IMAGES } from "@/shared/config/Images";
import { Form } from "antd";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { PasswordInput } from "@/shared/ui/passwordInput/PasswordInput";
import { Button } from "@/shared/ui/button/Button";
import { AuthServices } from "@/features/auth/services/Auth.services";
import { useState } from "react";
import Spinner from "@/shared/ui/spinner/Spinner";
import { HttpStatus } from "@/shared/config/Status";
import { Alert } from "@/shared/ui/alert/Alert";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resetUserProfileData,
  setUserProfileData,
} from "@/features/auth/reducers/Auth.reducers";
import { Title } from "@/shared/ui/title/Title";
import { store } from "@/app/appStore";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialState, setInitialState] = useState<any>({});

  useEffect(() => {
    Object.keys(store.getState().profileUser)?.length && handleLogout();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...initialState });
  }, [initialState]);

  const handleLogout = async () => {
    const res = await AuthServices.logout();
    navigate("/login", { replace: true });
    dispatch(resetUserProfileData({}));
    if ((res as any).status === HttpStatus.OK) {
      console.log("Response_n", res);
    }
  };

  const handleSubmitForm = async () => {
    console.log(initialState);

    setError("");
    try {
      setIsloading(true);
      const res = await AuthServices.login(initialState);
      if (res.status !== HttpStatus.OK) {
        setError(res?.data?.status?.message);
      } else {
        dispatch(setUserProfileData(res?.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  return (
    <div className="login__container">
      <div className="login__content">
        <Card>
          <div className="login__content-card">
            <div className="login__content-card-item login__content-card-image">
              <img
                src={IMAGES.LOGIN_CHAT}
                className="login__illustration-images"
              />
            </div>
            <div className="login__content-card-item ">
              <div className="login__form">
                {error ? <Alert message={error} type="error" /> : ""}
                <div className="login__form-header">
                  <img
                    src={IMAGES.CHAT}
                    alt="login__logo"
                    className="login__form-logo"
                  />
                  <Title>Se connecter</Title>
                </div>
                <Form className="" form={form} onFinish={handleSubmitForm}>
                  <TextInput
                    label="Email"
                    required
                    name="email"
                    value={initialState["email"]}
                    onChange={handleChange}
                  />
                  <PasswordInput
                    label="Mot de passe"
                    name="password"
                    required
                    value={initialState["password"]}
                    onChange={handleChange}
                  />
                  <div className="login__form-forget-password">
                    {/* <Link path="/">Mot de passe oublié ?</Link> */}
                  </div>
                  <div className="login__form-footer">
                    <a
                      onClick={() => navigate("/register")}
                      className="text-primary cursor-pointer outline-none"
                    >
                      {" "}
                      S'inscrire ?{" "}
                    </a>
                    <p></p>
                    <Button isTypeSubmit onClick={handleSubmitForm}>
                      {isLoading ? <Spinner /> : "Se connecter"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Outlet></Outlet>
    </div>
  );
};
