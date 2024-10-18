import { useState } from 'react'
import { useCallback, useMemo } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ERRORS_STR, PASSWORD_REGEX } from "@/services/constants";
import { Alert, Button, Form, Input, notification } from "antd";

import { BsArrowLeft } from "react-icons/bs";
import { useSetSingleSearchParam } from "@/services/hooks";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  password_confirmation: string;

}



const ResetPasswordForm = () => {

  const navigate = useNavigate()

  const [searchParams] = useSetSingleSearchParam()
  const token = searchParams.get('token')


  const [errorMsg, setErrorMsg] = useState('');

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
      password_confirmation: '',

    };
  }, []);

  const validationSchema = useMemo(() => {
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return Yup.object().shape({
      email: Yup.string()
        .required(ERRORS_STR.FORM_REQUIRED)
        .email(ERRORS_STR.FORM_EMAIL),
      password: Yup.string()
        .required(ERRORS_STR.FORM_REQUIRED)
        .min(8, ERRORS_STR.FORM_PASSWORD).matches(PASSWORD_REGEX, ERRORS_STR.FORM_PASSWORD)
      ,
      password_confirmation: Yup.string().required(ERRORS_STR.FORM_REQUIRED)
        .min(8, ERRORS_STR.FORM_PASSWORD).matches(PASSWORD_REGEX, ERRORS_STR.FORM_PASSWORD)
        .oneOf([Yup.ref('password')], ERRORS_STR.FORM_PASSWORD_MATCH),
    });
  }, []);


  const formik = useFormik({
    validateOnMount: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      if (!token) {
        notification.error({ message: 'Token is required', role: 'status' })
        return
      }

      setErrorMsg('');
      try {
        // const res = await resetPassword({ ...values, token })

        // if (res?.result) {
        //   notification.success({ message: res?.result, role: 'status' })
        // }
        formik.resetForm()
        navigate('/')

      } catch (error: Error | any) {
        // setErrorMsg(error?.response?.data?.message || ERRORS_STR.INVALID_CREDENTIALS);

        if (typeof error?.response?.data?.message === 'string') {
          notification.error({ message: error?.response?.data?.message, role: 'status' })
        }


        if (error?.response?.data?.message?.email) {
          formik.setErrors({
            email: error?.response?.data?.message?.email
          });
        }

        if (error?.response?.data?.message?.password) {
          formik.setErrors({
            password: error?.response?.data?.message?.password
          });
        }

        if (error?.response?.data?.message?.password_confirmation) {
          formik.setErrors({
            password_confirmation: error?.response?.data?.message?.password_confirmation
          });
        }


      }
    },
  });

  const handleErrorsMsg = useCallback(
    (
      key: keyof FormData
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
      <div className="mb-4">
        <Link to="/" >
          <Button type="text" className="flex items-center -ms-4" >
            <BsArrowLeft size={24} className="text-white" />
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <Form
        layout="vertical"
        onSubmitCapture={formik.handleSubmit}
        className="flex flex-col gap-3"
      >
        <Form.Item

          label="Email"
          {...handleErrorsMsg('email')}
        >
          <Input
            size="large"
            placeholder="Enter Your Mail"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item

          label="New password"
          className="font-bold"
          {...handleErrorsMsg('password')}
        >
          <Input.Password
            placeholder="Enter Your New Password"
            size="large"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item

          label="Confirm new password"
          className="font-bold"
          {...handleErrorsMsg('password_confirmation')}
        >
          <Input.Password
            placeholder="Enter Your Confirm New Password"
            size="large"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>


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
            Send
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ResetPasswordForm