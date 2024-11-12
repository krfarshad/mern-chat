"use client";
import { ClassNameOptionalProps } from "@/types";
import { FieldProps, useFormikContext } from "formik";
import { ChangeEvent } from "react";
import Previews from "./Previews";
import PreviewDefaultImages from "./PreviewDefaultImages";
import { toast } from "react-toastify";
import { FieldError } from "./FieldError";

interface Props {
  label?: string;
  multiple?: boolean;
  removeCallback?: (uuid: string) => void;
  removeLoading?: boolean;
  images: any;
  defaultImages: any;
}
export const FUpload: React.FC<FieldProps & ClassNameOptionalProps & Props> = (
  props,
) => {
  const {
    field,
    form,
    multiple = false,
    images,
    removeCallback,
    removeLoading,
    defaultImages,
    ...rest
  } = props;
  const formikContext = useFormikContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const currentLength = field?.value?.length ?? 0;
    const uploadedLength = e.currentTarget?.files?.length ?? 0;
    if (currentLength + uploadedLength > 10) {
      toast.error("You can not add more than 10 images.");
    } else {
      if (e.currentTarget.files && e.currentTarget.files?.length > 0) {
        const filteredImages = e.currentTarget.files;

        const newValue = multiple
          ? [...field?.value, filteredImages]
          : [filteredImages[0]];
        formikContext.setFieldValue(field.name, newValue);
      }
    }
  };

  return (
    <>
      <div className="relative mt-2">
        <label
          htmlFor="images"
          className="border-light text-light flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-3xl border bg-slate-800 px-4  py-0 transition-all hover:opacity-80 hover:transition-all"
        >
          <p className="text-light">{rest?.label ?? ""}</p>
        </label>
        <input
          name="images"
          id="images"
          type="file"
          multiple={multiple}
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleChange}
          // accept="image/png, image/jpg, image/jpeg , image/webp"
        />
      </div>

      <div className="preview-items flex flex-wrap items-start gap-2.5">
        {defaultImages && defaultImages.length > 0 && (
          <PreviewDefaultImages
            images={defaultImages}
            removeCallback={removeCallback}
            removeLoading={removeLoading}
          />
        )}
        {field?.value && <Previews field={field} />}
        {form.getFieldMeta(field.name).touched &&
        form.getFieldMeta(field.name).error ? (
          <FieldError error={form.getFieldMeta(field.name).error} />
        ) : null}
      </div>
    </>
  );
};
