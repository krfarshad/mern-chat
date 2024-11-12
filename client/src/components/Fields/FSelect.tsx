"use client";
import { ClassNameOptionalProps, OptionProp } from "@/types";
import clsx from "clsx";
import { FieldProps } from "formik";
import { Props as SelectProps } from "react-select";
import { FieldError } from "./FieldError";
import { SelectField } from "./SelectField";

type Props = {
  label?: string;
  helperText?: string;
  required?: boolean;
  isMulti?: boolean;
  defaultValue?: string;
} & SelectProps<OptionProp>;

export const FSelect: React.FC<FieldProps & ClassNameOptionalProps & Props> = (
  props,
) => {
  const {
    className,
    field,
    form,
    label,
    helperText,
    isMulti = false,
    required,
    defaultValue,
    ...rest
  } = props;
  const classes = clsx(className ? className : "text-left");
  const handleChange = (option: OptionProp) => {
    if (option) {
      if (isMulti) {
        const options = Array.prototype.concat(option).map((i) => i.value);
        form.setFieldValue(field.name, options);
      } else {
        form.setFieldValue(field.name, option.value);
      }
    } else {
      form.setFieldValue(field.name, null);
    }
  };

  return (
    <div className="mx-auto mb-2 w-full">
      <div className="w-full">
        {label && (
          <label
            htmlFor={field.name}
            className="text-light focus:border-light-gray mb-2 block  text-left text-sm capitalize"
          >
            {label}
            {required && <span className="text-secondary ml-1 text-xl">*</span>}
          </label>
        )}
        <SelectField
          isMulti={isMulti}
          className={classes}
          defaultValue={defaultValue}
          {...rest}
          onChange={handleChange}
        />
        {form.getFieldMeta(field.name).touched &&
        form.getFieldMeta(field.name).error ? (
          <FieldError error={form.getFieldMeta(field.name).error} />
        ) : null}

        {helperText && (
          <span className="text-light mb-5 mt-3 block text-left text-sm">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};
