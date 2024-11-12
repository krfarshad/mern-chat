"use client";
import { ClassNameOptionalProps } from "@/types";
import clsx from "clsx";
import { FieldProps } from "formik";
import { useState } from "react";
import { FieldError } from "./FieldError";
import { isPasswordStrong } from "@/utils/checkStrength";
import { Eye, EyeSlash } from "iconsax-react";

type Props = {
  label?: string;
  helperText?: string;
  required?: boolean;
  checkStrength?: string;
  copyable?: boolean;
  isPassword?: boolean;
};
export const FInput: React.FC<FieldProps & ClassNameOptionalProps & Props> = (
  props,
) => {
  const {
    className,
    field,
    form,
    label,
    required,
    checkStrength,
    copyable,
    isPassword = false,
    ...rest
  } = props;

  const [show, setShow] = useState<boolean>(false);

  const ChangeShowStatus = () => {
    setShow(!show);
  };

  const classes = clsx(
    "w-full rounded-[36px] disabled:cursor-not-allowed text-light placeholder:text-gray-300 border border-neutral-800 bg-black px-5 py-2.5 text-sm text-gray-300 outline-none backdrop-blur-3xl transition-all placeholder:text-sm focus:border-light",
    className ? className : "",
  );
  let restOptimize: any = { ...rest };
  if (isPassword) {
    restOptimize = { ...rest, type: show ? "text" : "password" };
  }

  return (
    <div className="mx-auto mb-4 w-full">
      <div className="w-full">
        {label && (
          <label
            htmlFor={field.name}
            className="text-light mb-2 block text-left text-sm capitalize"
          >
            {label}
            {required && <span className="text-secondary ml-1 text-xl">*</span>}
          </label>
        )}
        <div className="relative">
          <input className={classes} {...restOptimize} {...field} />
          {rest.helperText && (
            <p className="text-light mt-1 text-left text-xs font-normal">
              {rest.helperText}
            </p>
          )}

          {isPassword && (
            <button
              type="button"
              className="hover:text-light absolute right-2 top-2 text-gray-400 transition"
              onClick={ChangeShowStatus}
            >
              {show ? <Eye size="20" /> : <EyeSlash size="20" />}
            </button>
          )}
        </div>
        {form.getFieldMeta(field.name).touched &&
        form.getFieldMeta(field.name).error ? (
          <FieldError error={form.getFieldMeta(field.name).error} />
        ) : null}
        {checkStrength && field.value && (
          <div className="error-messages mt-4 pr-2">
            <div className="mb-2 h-1 w-full rounded-[36px] border border-neutral-800 bg-gradient-to-r from-pink-500 to-emerald-300 backdrop-blur-3xl transition-all"></div>
            {isPasswordStrong(field.value) ? (
              <span className="text-success my-1 block text-sm">
                Wow... great, that's hard enough
              </span>
            ) : (
              <span className="text-secondary my-1 block text-sm">
                It's too weak, put a harder phrase
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};