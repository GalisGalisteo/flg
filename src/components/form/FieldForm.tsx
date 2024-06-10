import clsx from "clsx";
import { ErrorMessage, Field, FieldAttributes, FieldProps } from "formik";

interface FieldFormProps {
  name: string;
  labelName: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  // value?: string;
  //  [key: string]: any;
}

export default function FieldForm({
  name,
  labelName,
  type,
  placeholder,
  disabled,
  children,
}: // value,
//  ...props
FieldFormProps) {
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
          "text-lg px-3 py-2 w-full rounded-lg disabled:text-light-dark disabled:opacity-100",
          disabled
            ? "disabled:bg-primary-light"
            : "bg-white border border-gray-300"
        )}
        disabled={disabled}
        as={type === "select" ? "select" : "input"}
        //value={value}
        // {...props}
      >
        {type === "select" ? children : null}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <p className="text-red-600">{msg}</p>}
      </ErrorMessage>
    </div>
  );
}
