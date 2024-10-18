
import React, { useCallback, useState } from 'react'
import { Button, DatePicker, Form, Input, Select, message, } from "antd"


import * as Yup from 'yup';
import { useFormik } from 'formik';

import TextArea from 'antd/es/input/TextArea';
import { ArrowDown2 } from 'iconsax-react';
import UserGroups from './UserGroups';
const { RangePicker } = DatePicker;

const EditInfoForm = () => {



  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    UserGroups: Yup.array().required('User group is required'),
  });

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    userGroups: [],

  };




  const formik = useFormik({
    validateOnMount: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {




    },
  });





  return (
    <div className='card !bg-bg-light mx-auto max-w-lg p-6'>
      <Form
        layout="vertical"
        className="relative"

      >
        <div className="grid grid-cols-1  p-6">

          <Form.Item
            label='Email'
            className='!mb-4 font-semibold'

          >

            <Input
              className=''
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}

            />

          </Form.Item>
          <Form.Item
            label='First Name'
            className='!mb-4 font-semibold'

          >

            <Input
              className=''
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />

          </Form.Item>

          <Form.Item
            label='Last Name'
            className='!mb-4 font-semibold'

          >

            <Input
              className=''
              name='lastName'
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />

          </Form.Item>




          <Form.Item
            label='User Groups'
            className='!mb-4 font-semibold'
          >
            <Select
              options={[
                { label: 'Global - Administrator', value: '1' },
                { label: 'Global - TEST', value: '2' },
                { label: 'Global - buguard', value: '3' },
              ]}
              className='p-1'
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['Global - Administrator', 'buguard_project - Analyst']}
              onChange={() => formik.setFieldValue('userGroups', formik.values.userGroups)}

            />
          </Form.Item>











          <div className='w-full grid grid-cols-[1fr_2fr] gap-2.5'>
            <Button type='text' className='bg-bg-dark text-text !rounded-xl !text-base !font-normal'>
              Cancel
            </Button>
            <Button
              size='large'
              type='primary'
              loading={formik.isSubmitting}
              onClick={() => formik.submitForm()}
              className='!shadow-none w-full !rounded-xl text-base font-normal'
              htmlType='submit'
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditInfoForm;
