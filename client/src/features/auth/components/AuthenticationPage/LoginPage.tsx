"use client";
import { Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../../utils/loginValidationSchecma";
import { FInput, FSubmit } from "@/components/Fields";
import Link from "next/link";

export const LoginPage = () => {
  const initValues = {
    username: "",
    password: "",
    verifyCode: "",
  };

  const submitFormHandler = async (values: typeof initValues) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        onSubmit={submitFormHandler}
        validationSchema={loginValidationSchema}
      >
        <Form>
          <Field component={FInput} label="username" name="username" />
          <div className="pt-1">
            <Field
              component={FInput}
              label="password"
              name="password"
              type="password"
            />
          </div>
          <Field className="mt-4" component={FSubmit} label="submit" />
        </Form>
      </Formik>
      <div className="mt-12 inline-flex items-center justify-center gap-2.5">
        <div className="text-center text-sm font-light leading-[21px] tracking-wide text-white">
          <span className=" ">Don't have an account?</span>
        </div>
        <div>
          <Link
            href="/auth/register"
            className="text-sm font-semibold leading-[21px] tracking-wide text-gray-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div>
        <Link
          href="/auth/forget-password"
          className="w-full text-center text-sm leading-[21px] tracking-wide text-red-400"
        >
          Forget Password
        </Link>
      </div>
    </>
  );
};
