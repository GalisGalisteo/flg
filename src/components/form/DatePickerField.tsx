import { useField, useFormikContext } from "formik";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerFieldProps {
  name: string;
}

export default function DatePickerField({ name }: DatePickerFieldProps) {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <Datepicker
        asSingle
        useRange={false}
        displayFormat="DD/MM/YYYY"
        inputClassName="w-full py-2 px-3 border border-gray-300 rounded-lg"
        placeholder="dd-mm-aaaa"
        value={field.value}
        onChange={(newValue) => helpers.setValue(newValue)}
      />
    </div>
  );
}
