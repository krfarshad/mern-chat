"use client";
import { FieldInputProps, useFormikContext } from "formik";
import Image from "next/image";

type Props = {
  field: FieldInputProps<any>;
};
const Previews = (props: Props) => {
  const { field } = props;
  const formikContext = useFormikContext();
  const removeItem = (item: any) => {
    const newValues = field.value.filter((value: FormData) => value != item);
    formikContext.setFieldValue(field.name, newValues);
  };

  return (
    <>
      {field.value.map((item: any) => (
        <div
          className="item relative h-24 w-24 object-cover"
          key={`preview_${item.name}_${item.lastModified}`}
        >
          <button
            onClick={() => removeItem(item)}
            className="group absolute right-1 top-1 rounded-full bg-red-50 p-1 transition-all hover:bg-red-500"
          >
            <span className="h-4 w-4 text-red-500 transition-all group-hover:text-white group-hover:transition-all">
              remove
            </span>
          </button>
          <Image
            src={URL.createObjectURL(item)}
            alt="item"
            width={100}
            height={100}
            className="h-full w-full rounded-md  object-cover object-center"
          />
        </div>
      ))}
    </>
  );
};

export default Previews;
