import { MdInfoOutline } from "react-icons/md";

import { Button, DatePicker, Form, Input, message, } from "antd"


import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Eye, EyeSlash, Lock } from 'iconsax-react';
import { useNavigateNext } from "@/services/hooks";

import { useTranslation } from "react-i18next";

import { ERRORS_STR } from "@/services/constants";
import { useQueryClient } from "@tanstack/react-query";


const ChangePasswordForm = () => {
  const { navigateNext } = useNavigateNext()
  const { t } = useTranslation()
  const queryClient = useQueryClient()



  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required(ERRORS_STR.FORM_REQUIRED),
    new_password: Yup.string().required(ERRORS_STR.FORM_REQUIRED),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref('new_password'), undefined], ERRORS_STR.FORM_PASSWORD_MATCH)
      .required(ERRORS_STR.FORM_REQUIRED),
  });

  const initialValues = {
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  };




  const formik = useFormik({
    validateOnMount: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      try {
        // await changePassword(values);
        // message.success(t('passwordSuccessfullyChanged'));
        // queryClient.invalidateQueries(GET_PROFILE_QUERY_KEY)
        navigateNext()
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

  const handleCancel = () => {
    navigateNext()
  }





  return (
    <div className='card !bg-bg-light mx-auto max-w-lg p-6'>
      <Form
        layout="vertical"
        className="relative !w-full"

      >
        <div className='flex flex-col gap-3 items-center justify-center px-6'>
          <div className='icon-gradient w-fit p-6 rounded-full flex items-center justify-center'>
            <Lock variant='Bulk' size={36} className='!text-primary' />
          </div>
          <div className="grid grid-cols-[32px_1fr] items-center gap-1.5 bg-primary-light p-3 rounded-xl">
            <MdInfoOutline size={24} className="w-6 text-text" />
            <span className="text-sm font-normal text-text-dark">{t('changePasswordText')}</span>
          </div>
        </div>
        <div className="grid grid-cols-1  p-6">


          <Form.Item
            label={t('oldPassword') + ' *'}
            className='!mb-4 font-normal text-base text-text-dark'

          >

            <Input.Password
              placeholder="Enter your old password"
              name='old_password'
              value={formik.values.old_password}
              onChange={formik.handleChange}
              iconRender={(visible) => (visible ? <EyeSlash className="text-text cursor-pointer" /> : <Eye className="text-text cursor-pointer" />)}
            />

          </Form.Item>
          <Form.Item
            label={t('newPassword') + ' *'}
            className='!mb-4 font-normal text-base text-text-dark'

          >

            <Input.Password
              placeholder="Enter your new password"
              name='new_password'
              value={formik.values.new_password}
              onChange={formik.handleChange}
              iconRender={(visible) => (visible ? <EyeSlash className="text-text cursor-pointer" /> : <Eye className="text-text cursor-pointer" />)}
            />

          </Form.Item>
          <Form.Item
            label={t('confirmNewPassword') + ' *'}
            className='!mb-4 font-normal text-base text-text-dark'

          >

            <Input.Password
              placeholder="Confirm your new password"
              name='confirm_new_password'
              value={formik.values.confirm_new_password}
              onChange={formik.handleChange}
              iconRender={(visible) => (visible ? <EyeSlash className="text-text cursor-pointer" /> : <Eye className="text-text cursor-pointer" />)}
            />

          </Form.Item>










          <div className='w-full grid grid-cols-[1fr_2fr] gap-2.5'>
            <Button type='text' className='bg-bg-dark text-text !rounded-xl !text-base !font-normal' onClick={() => handleCancel()}>
              {t('cancel')}
            </Button>
            <Button
              size='large'
              type='primary'
              loading={formik.isSubmitting}
              onClick={() => formik.submitForm()}
              className='!shadow-none w-full !rounded-xl text-base font-normal'
              htmlType='submit'
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
