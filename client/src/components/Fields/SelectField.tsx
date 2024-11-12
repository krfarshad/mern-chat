"use client";
import { OptionProp } from "@/types";
import Select, { Props as SelectProps } from "react-select";

interface Props extends SelectProps<OptionProp> {
  onChange: any;
  isMulti?: boolean;
  defaultValue?: any;
}

export const SelectField = (props: Props) => {
  const { options, onChange, isMulti, defaultValue, ...rest } = props;

  const defaultValues: any =
    defaultValue && isMulti
      ? options?.filter((option: any) =>
          (defaultValue as OptionProp[]).some(
            (value) => value.value === option?.value,
          ),
        )
      : options?.find((option: any) => option?.value === defaultValue);

  return (
    <Select
      isMulti={isMulti}
      classNamePrefix="mf"
      defaultValue={defaultValues}
      onChange={onChange}
      options={options}
      {...rest}
    />
  );
};
