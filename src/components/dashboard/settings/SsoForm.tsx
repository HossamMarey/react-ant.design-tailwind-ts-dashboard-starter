import React, { useCallback } from 'react'
import { Button, Checkbox, Collapse, Form, Input, message } from 'antd'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

import { ERRORS_STR } from '@/services/constants';
import { useQueryClient } from "@tanstack/react-query";


interface FormData {
    idp_entity_id: string
    metadata_url: string
    sp_entity_id: string
    attribute_mapping_uid: string
    attribute_mapping_email_verified: string
    attribute_mapping_email: string
    allow_repeat_attribute_name: boolean
    allow_single_label_domains: boolean
    reject_idp_initiated_sso: boolean
    want_attribute_statement: boolean
    want_name_id: boolean
}

const SsoForm = ({ data, checked }: { data?: any, checked: boolean }) => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    const validationSchema = Yup.object().shape({
        idp_entity_id: Yup.string().required(ERRORS_STR.FORM_REQUIRED),
        metadata_url: Yup.string().required(ERRORS_STR.FORM_REQUIRED),
        sp_entity_id: Yup.string().required(ERRORS_STR.FORM_REQUIRED),
        attribute_mapping_uid: Yup.string(),
        attribute_mapping_email_verified: Yup.string(),
        attribute_mapping_email: Yup.string(),
        allow_repeat_attribute_name: Yup.boolean(),
        allow_single_label_domains: Yup.boolean(),
        reject_idp_initiated_sso: Yup.boolean(),
        want_attribute_statement: Yup.boolean(),
        want_name_id: Yup.boolean(),
    });

    const initialValues = {
        idp_entity_id: data?.idp_entity_id || '',
        metadata_url: data?.metadata_url || '',
        sp_entity_id: data?.sp_entity_id || '',
        attribute_mapping_uid: data?.attribute_mapping_uid?.join(',') || '',
        attribute_mapping_email_verified: data?.attribute_mapping_email_verified?.join(',') || '',
        attribute_mapping_email: data?.attribute_mapping_email?.join(',') || '',
        allow_repeat_attribute_name: data?.allow_repeat_attribute_name || false,
        allow_single_label_domains: data?.allow_single_label_domains || false,
        reject_idp_initiated_sso: data?.reject_idp_initiated_sso || false,
        want_attribute_statement: data?.want_attribute_statement || false,
        want_name_id: data?.want_name_id || false,
    };

    const formik = useFormik({
        validateOnMount: false,
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                // const submissionValues = {
                //     ...values,
                //     attribute_mapping_uid: values.attribute_mapping_uid.split(',').map(item => item.trim()),
                //     attribute_mapping_email_verified: values.attribute_mapping_email_verified.split(',').map(item => item.trim()),
                //     attribute_mapping_email: values.attribute_mapping_email.split(',').map(item => item.trim()),
                // };
                // await updateSsoSettings(submissionValues)
                // message.success(t('ssoSettingsupdated'))
                // queryClient.invalidateQueries(GET_SSO_OBJECT_QUERY_KEY)
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
        (key: keyof FormData): { validateStatus: 'error' | ''; help: string | string[] } => {
            const errorMsg = formik.errors[key] || ''
            const isError = !!formik.errors[key] && !!formik.touched[key]
            return {
                validateStatus: isError ? 'error' : '',
                help: ''
                // help: isError ? errorMsg : '', as JSX.Element
            }
        },
        [formik.errors, formik.touched],
    )

    return (
        <div>
            <Form layout='vertical'>
                <Collapse defaultActiveKey='1' className='custom_collabse' ghost expandIcon={({ isActive }) => isActive ? <ArrowUp2 size={22} /> : <ArrowDown2 size={22} />} expandIconPosition='end'>
                    <Collapse.Panel header={t('SAMLIdPConfiguration')} key="1">
                        <Form.Item
                            label={t('IdPEntityID') + ' *'}
                            {...handleErrorsMsg('idp_entity_id')}
                        >
                            <Input
                                value={formik.values.idp_entity_id}
                                name='idp_entity_id'
                                disabled={!checked}
                                onChange={formik.handleChange}
                                className=" !mt-1"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('metadataURL') + ' *'}
                            {...handleErrorsMsg('metadata_url')}
                        >
                            <Input
                                name='metadata_url'
                                value={formik.values.metadata_url}
                                onChange={formik.handleChange}
                                disabled={!checked}
                                className=" !mt-1"
                            />
                        </Form.Item>
                    </Collapse.Panel>

                    <Collapse.Panel header={t('SPConfiguration')} key="2">
                        <Form.Item
                            label={t('SPEntityID') + ' *'}
                            {...handleErrorsMsg('sp_entity_id')}
                        >
                            <Input
                                name='sp_entity_id'
                                value={formik.values.sp_entity_id}
                                onChange={formik.handleChange}
                                disabled={!checked}
                                className=" !mt-1"
                            />
                        </Form.Item>
                    </Collapse.Panel>

                    <Collapse.Panel header={t('advancedSettings')} key="3">
                        <Form.Item
                            label={t('attributeMappingUID')}
                            {...handleErrorsMsg('attribute_mapping_uid')}
                        >
                            <Input
                                name='attribute_mapping_uid'
                                value={formik.values.attribute_mapping_uid}
                                onChange={formik.handleChange}
                                disabled={!checked}
                                placeholder="Comma-separated values"
                                className=" !mt-1"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('attributeMappingEmailVerified')}
                            {...handleErrorsMsg('attribute_mapping_email_verified')}
                        >
                            <Input
                                name='attribute_mapping_email_verified'
                                value={formik.values.attribute_mapping_email_verified}
                                onChange={formik.handleChange}
                                disabled={!checked}
                                placeholder="Comma-separated values"
                                className=" !mt-1"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('attributeMappingEmail')}
                            {...handleErrorsMsg('attribute_mapping_email')}
                        >
                            <Input
                                name='attribute_mapping_email'
                                value={formik.values.attribute_mapping_email}
                                onChange={formik.handleChange}
                                disabled={!checked}
                                placeholder="Comma-separated values"
                                className=" !mt-1"
                            />
                        </Form.Item>

                        <Form.Item
                            {...handleErrorsMsg('allow_repeat_attribute_name')}

                        >
                            <Checkbox
                                checked={formik.values.allow_repeat_attribute_name}
                                disabled={!checked}
                                onChange={(e) => formik.setFieldValue('allow_repeat_attribute_name', e.target.checked)}
                                name='allow-repeat-attribute-name'
                            >{t('allowRepeatAttributeName')}</Checkbox>
                        </Form.Item>
                        <Form.Item
                            {...handleErrorsMsg('allow_single_label_domains')}
                        >
                            <Checkbox
                                checked={formik.values.allow_single_label_domains}
                                disabled={!checked}
                                name='allow_single_label_domains'
                                onChange={(e) => formik.setFieldValue('allow_single_label_domains', e.target.checked)}
                            >{t('allowSingleLabelDomains')}</Checkbox>
                        </Form.Item>
                        <Form.Item
                            {...handleErrorsMsg('reject_idp_initiated_sso')}
                        >
                            <Checkbox
                                checked={formik.values.reject_idp_initiated_sso}
                                disabled={!checked}
                                name='reject_idp_initiated_sso'
                                onChange={(e) => formik.setFieldValue('reject_idp_initiated_sso', e.target.checked)}
                            >{t('rejectIdPInitiatedSSO')}</Checkbox>
                        </Form.Item>
                        <Form.Item
                            {...handleErrorsMsg('want_attribute_statement')}
                        >
                            <Checkbox
                                checked={formik.values.want_attribute_statement}
                                disabled={!checked}
                                name='want_attribute_statement'
                                onChange={(e) => formik.setFieldValue('want_attribute_statement', e.target.checked)}
                            >{t('wantAttributeStatement')}</Checkbox>
                        </Form.Item>

                        <Form.Item
                            {...handleErrorsMsg('want_name_id')}
                        >
                            <Checkbox
                                checked={formik.values.want_name_id}
                                disabled={!checked}
                                name='want_name_id'
                                onChange={(e) => formik.setFieldValue('want_name_id', e.target.checked)}
                            >{t('wantNameID')}</Checkbox>
                        </Form.Item>
                    </Collapse.Panel>

                </Collapse>

                <div className='mt-6'>

                    <Button
                        size='large'
                        type='primary'
                        disabled={!formik.dirty}
                        loading={formik.isSubmitting}
                        onClick={() => formik.submitForm()}
                        className='!shadow-none w-full !rounded-xl text-base font-normal'
                        htmlType='submit'
                    >
                        {t('save')}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default SsoForm