import { useState } from 'react'

import { useCallback, useMemo } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ERRORS_STR } from "@/services/constants";
import { Alert, Button, Form, Input, message, notification } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Sms } from "iconsax-react";

const forgetPassword = async (data: ForgetPasswordData) => {
  return new Promise((resolve) => {
    resolve(data)
  })
}

interface ForgetPasswordData {
  email: string;

}



const ForgetPasswordForm = () => {

  const { t } = useTranslation()

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const initialValues = useMemo(() => {
    return {
      email: '',

    };
  }, []);

  const validationSchema = useMemo(() => {
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return Yup.object().shape({
      email: Yup.string()
        .required(ERRORS_STR.FORM_REQUIRED)
        .email(ERRORS_STR.FORM_EMAIL),
    });
  }, []);


  const formik = useFormik({
    validateOnMount: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      setErrorMsg('');
      try {
        const res = await forgetPassword(values)

        if (res) {
          notification.success({ message: 'res?.result', role: 'status' })
        }
        formik.resetForm()
        navigate('/')

      } catch (error: any) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          Object.keys(errorData).forEach(field => {
            // Use the exact error message from the API
            formik.setFieldError(field, errorData[field]);
          });

          // Display the first error message
          const firstErrorField = Object.keys(errorData)[0];
          const firstErrorMessage = errorData[firstErrorField];
          message.error(firstErrorMessage);
        } else {
          message.error(t('errorOccurred'));
        }
      }
    },
  });

  const handleErrorsMsg = useCallback(
    (
      key: keyof ForgetPasswordData
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


      <div className="my-5 lg:my-6">

        <h1 className="text-2xl font-bold mb-4"> {t('forgtPassword')} </h1>
        <p> {t('enterYourEmail')}</p>
      </div>

      <Form
        layout="vertical"
        onSubmitCapture={formik.handleSubmit}

      >
        <Form.Item
          {...handleErrorsMsg('email')}
        >
          <Input
            className=" !mt-1"
            size="large"
            placeholder={t('email')}
            name="email"
            prefix={<Sms />}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>


        {/* <p className="flex items-center justify-end">

          <Link
            href="/"
            className="font-bold text-primary mb-4"
          >
            or Login
          </Link>
        </p> */}

        {errorMsg && <Alert type="error" message={errorMsg} />}

        <div className="flex justify-center mt-6">
          <Button
            block
            type="primary"
            htmlType="submit"
            className="px-5 md:px-8 font-bold"
            size="large"
            loading={formik.isSubmitting}
          >
            {t('send')}
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center">

          <Link to="/"  >
            <Button block type="text" className="flex items-center -ms-4" >
              <ArrowLeft size={24} className="rtl:rotate-180 " /> {t('goBackToLogin')}
            </Button>
          </Link>

        </div>
      </Form>
    </div>
  )
}

export default ForgetPasswordForm