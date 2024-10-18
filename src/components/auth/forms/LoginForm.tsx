import { useState } from 'react'

import { useCallback, useMemo } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ERRORS_STR } from "@/services/constants";
import { Alert, Button, Form, Input } from "antd";

import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Lock, Profile } from "iconsax-react";
import { useQueryClient } from "@tanstack/react-query";


interface LoginFormData {
  username: string;
  password: string;
}



const LoginForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const { t } = useTranslation()

  const [errorMsg, setErrorMsg] = useState('');

  const initialValues = useMemo(() => {
    return {
      username: '',
      password: '',
    };
  }, []);

  const validationSchema = useMemo(() => {
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return Yup.object().shape({
      username: Yup.string()
        .required(ERRORS_STR.FORM_REQUIRED)
      ,
      password: Yup.string()
        .required(ERRORS_STR.FORM_REQUIRED)
      // .min(8, ERRORS_STR.FORM_PASSWORD).matches(PASSWORD_REGEX, ERRORS_STR.FORM_PASSWORD)

    });
  }, []);


  const formik = useFormik({
    validateOnMount: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      setErrorMsg('');
      try {

        // await login(values)
        // refetch all queries 
        queryClient.invalidateQueries();
        // get user  data
        // if (refetch) await refetch()
        navigate("/dashboard")

      } catch (error: Error | any) {
        setErrorMsg(error?.response?.data?.message || ERRORS_STR.INVALID_CREDENTIALS);

        if (typeof error?.response?.data === 'object') {
          formik.setErrors(error?.response?.data)
        }
        if (error?.response?.data?.non_field_errors) {
          setErrorMsg(error?.response?.data?.non_field_errors || ERRORS_STR.INVALID_CREDENTIALS);
        }
      }
    },
  });

  const handleErrorsMsg = useCallback(
    (
      key: keyof LoginFormData
    ): { validateStatus: 'error' | ''; help: string } => {
      const errorMsg = formik.errors[key] || '';
      const isError = !!formik.errors[key] && !!formik.touched[key];

      return {
        validateStatus: isError ? 'error' : '',
        help: isError ? errorMsg : '',
      };
    },
    [formik.errors, formik.touched]
  );


  return (
    <div>
      <div className="my-4 lg:my-6">
        <h1 className="text-3xl"> {t('logIntoYourAccount')} </h1>
        <p className="mt-4" > {t('youNeedToLogIn')} </p>
      </div>
      <Form
        layout="vertical"
        onSubmitCapture={formik.handleSubmit}

      >
        <Form.Item


          className="!mb-8"
          {...handleErrorsMsg('username')}
        >
          <Input
            className="!mt-1"
            size="large"
            placeholder={t('username')}
            name="username"
            prefix={<Profile />}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item


          className="mb-1"
          {...handleErrorsMsg('password')}
        >
          <Input.Password
            className="  !mt-1"
            size="large"
            prefix={<Lock />}
            placeholder={t('password')}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <p className="flex items-center justify-end">

          <Link
            to="/forget-password"
            className="font-bold text-primary mb-4"
          >
            {t('forgtPassword')}?
          </Link>
        </p>

        {errorMsg && <Alert type="error" message={errorMsg} />}

        <div className="flex justify-center mt-6">
          <Button
            block
            type="primary"
            htmlType="submit"
            className="px-5 md:px-8 font-bold"
            size="large"
            loading={formik.isSubmitting}
            data-action='login'
          >
            {t('login')}
          </Button>
        </div>


      </Form>
    </div>
  )
}

export default LoginForm