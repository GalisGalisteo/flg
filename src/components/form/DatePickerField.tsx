import { birthDate18 } from "@/utils/utils";
import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerFieldProps {
  name: string;
  disabled?: boolean;
}

export default function DatePickerField({
  name,
  disabled,
}: DatePickerFieldProps) {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <Datepicker
        asSingle
        useRange={false}
        displayFormat="DD/MM/YYYY"
        inputClassName={clsx(
          "w-full py-2 px-3 border border-gray-300 rounded-lg",
          {
            "disabled:text-light-dark disabled:opacity-100 disabled:bg-transparent border-none":
              disabled,
          }
        )}
        placeholder="DD-MM-AAAA"
        startFrom={birthDate18}
        value={field.value}
        onChange={(newValue) => helpers.setValue(newValue)}
        disabled={disabled}
        containerClassName={clsx({ "display-none": disabled })}
        primaryColor={"orange"}
      />
    </div>
  );
}
