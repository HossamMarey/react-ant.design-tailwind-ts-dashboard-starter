
import type { FC } from 'react';
import { useMemo } from 'react';

import { Button, Image } from "antd";


import notFoundImg from '@/assets/images/errors/404.svg';
import errorImg from '@/assets/images/errors/error.svg';

import { ERRORS_STR } from "@/services/constants";
import { useNavigate } from "react-router-dom";



interface ErrorPageProps {
  error?: any;
  is404?: boolean;
}
const ErrorPage: FC<ErrorPageProps> = ({ error, is404 = false }) => {

  const navigate = useNavigate();

  const isNotFound = useMemo(() => {
    return error?.response?.code === 404 || is404;
  }, [error, is404]);

  const errorMessages = useMemo(() => {
    if (!error) return null;
    const defaultErrormessage =
      error?.response?.message ||
      error?.response?.data?.message ||
      error?.message;

    if (error && error.message && error.message.includes('{')) {
      const queryError = JSON.parse(
        '{' + error.message.split('{').splice(1).join('{')
      );

      if (queryError && queryError.response && queryError.response.message) {
        return [queryError.response.message];
      }

      if (queryError && queryError.response && queryError.response.errors) {
        return queryError.response.errors.map(
          (err: { message: any }) => err?.message || err
        );
      }
    }
    return [defaultErrormessage];
  }, [error]);

  const isErrorMsg = errorMessages && errorMessages.length;

  const defaultError = isNotFound
    ? ERRORS_STR.PAGE_NOT_FOUND
    : ERRORS_STR.WENT_WRONG_TRY_AGAIN

  return (
    <main className="py-16 lg:py-20">
      <div className="container flex items-center justify-center">
        <div className="max-w-md lg:max-w-lg px-4 my-4 py-6   flex flex-col  items-center gap-3 rounded-md  ">
          <Image
            src={isNotFound ? notFoundImg : errorImg}
            alt="error icon"
            className="w-full"
          />

          {isErrorMsg ? (
            <div className="w-full  flex flex-col gap-2">
              {errorMessages.map((msg: any, i: number) => (
                <p
                  className="font-bold text-center text-lg lg:text-xl  "
                  key={i}
                >
                  {msg}
                </p>
              ))}
            </div>
          ) : (
            <h3 className="mt-3 mb-2">{defaultError}</h3>
          )}
          <Button
            type="primary"
            block
            className="mt-4"
            size="large"
            onClick={() => navigate('/')}
          >
            go home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
