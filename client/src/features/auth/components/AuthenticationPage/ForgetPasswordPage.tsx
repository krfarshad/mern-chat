"use client";
import { Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../../utils/loginValidationSchecma";
import { FInput, FSubmit } from "@/components/Fields";
import { useRouter } from "next/navigation";

export const ForgetPasswordPage = () => {
  const router = useRouter();
  const initValues = {
    email: "",
  };

  const submitFormHandler = async (values: typeof initValues) => {
    console.log(values);
  };

  const handleBackClick = () => {
    router.back();
  };
  return (
    <>
      <Formik
        initialValues={initValues}
        onSubmit={submitFormHandler}
        validationSchema={loginValidationSchema}
      >
        <Form>
          <Field
            component={FInput}
            label="Email address"
            name="email"
            type="email"
          />
          <Field
            className="mt-4"
            component={FSubmit}
            label="Restore password"
          />
        </Form>
      </Formik>
      <div className="mt-12 inline-flex items-center justify-center gap-2.5">
        <div>
          <span
            onClick={handleBackClick}
            className="cursor-pointer bg-transparent text-sm font-semibold leading-[21px] tracking-wide text-gray-200 shadow-none !outline-none hover:text-red-500"
          >
            Back
          </span>
        </div>
      </div>
    </>
  );
};
