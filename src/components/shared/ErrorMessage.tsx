import { Button, Image } from "antd";
import { useMemo } from 'react';


import { FiRotateCw } from 'react-icons/fi'
import type { FC } from 'react';
import { ERRORS_STR } from "@/services/constants";

import errorImg from '@/assets/images/errors/error.png';


interface ErrorMessageProps {
  error: any;
  refetch?: () => void;
}
const ErrorMessage: FC<ErrorMessageProps> = ({ error, refetch }) => {


  const errorMessages = useMemo(() => {
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

  return (
    <div className="px-4 my-4 py-6 bg-red-100 bg-opacity-25 flex flex-col  items-center gap-3 rounded-md  ">
      <Image src={errorImg} preview={false} alt="error icon" className="w-12 lg:w-20 object-contain" />
      <h3 className="mt-3 mb-2 text-center"> {ERRORS_STR.WENT_WRONG}  </h3>
      <div className="w-full bg-red-200 bg-opacity-25 p-2 rounded-md flex flex-col gap-2">
        {errorMessages.map((msg: any, i: number) => (
          <p className="font-bold text-center" key={i}>
            {msg}
          </p>
        ))}
      </div>
      {refetch ? (
        <div>
          <Button
            type="primary"
            danger
            ghost
            block
            size="large"
            onClick={refetch}
          >
            <div className="flex items-center justify-center gap-1 font-bold">
              try again
              <FiRotateCw />
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
