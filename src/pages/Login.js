/* eslint-disable no-useless-escape */
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import * as Yup from "yup";
import CustomForm from "../components/CustomForm";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { login } = useContext(UserContext);

  const mailRegex = /^[abcdefghijklmnopqrstuvwxyz@.-0-9]+$/;

  const validationSchema = Yup.object({
    userName: Yup.string().required("Zorunlu Alan").email('Mail Adresini Kontrol Ediniz').matches(mailRegex, 'Mail Adresini Kontrol Ediniz'),
    password: Yup.string().required("Zorunlu Alan"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "admin@gmail.com",
      password: "1Q2w3e4r",
    },
    validationSchema,
    onSubmit: async (data) => {
      let bodyFormData = new FormData();
      bodyFormData.append('userName', data.userName);
      bodyFormData.append('password', data.password);

      await login(bodyFormData);
      formik.resetForm();
    },
  });

  const formItems = [
    {
      label: 'E-Mail',
      name: "userName",
      component: "input",
    },
    {
      label: 'Şifre',
      name: "password",
      component: "password",
    },
  ];

  const containerClassName = classNames("surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden login-page");

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: "56px", padding: "0.3rem", background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)" }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8 justify-content-center flex flex-column align-items-center " style={{ borderRadius: "53px", }}>
            <img src={"/images/logo.png"} style={{ maxWidth: '100px' }} alt="exp logo" className=" mb-5 w-20rem flex-shrink-0 " />
            <div>
              <form onSubmit={formik.handleSubmit}>
                <CustomForm items={formItems} data={formik} handleChange={formik.handleChange} isColumn />
                <Button label="Giriş Yap" type="submit" className="w-full mt-5" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
