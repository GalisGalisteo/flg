import clsx from "clsx";
import { ErrorMessage, Field, FieldAttributes, FieldProps } from "formik";
import { userData } from "./UserDataForm";

interface FieldFormProps {
  name: string;
  labelName: string;
  type: string;
  placeholder?: string;
  data?: userData;
  disabled?: boolean;
}

export default function FieldForm({
  name,
  labelName,
  type,
  placeholder,
  data,
  disabled = false,
}: FieldFormProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold" htmlFor={name}>
        {labelName}
      </label>
      <Field
        name={name}
        type={type}
        placeholder={disabled ? null : placeholder}
        className={clsx(
          "text-lg px-3 py-2 w-full rounded-lg",
          disabled
            ? "disabled:bg-primary-light"
            : "bg-white border border-gray-300"
        )}
        disabled={disabled}
      />
      <ErrorMessage name={name}>
        {(msg) => <p className="text-red-600">{msg}</p>}
      </ErrorMessage>
    </div>
  );
}
