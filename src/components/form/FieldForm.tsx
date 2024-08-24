import { ErrorMessage, Field, useField } from "formik";
import { ChangeEvent } from "react";
import clsx from "clsx";
import DatePickerField from "./DatePickerField";

interface FieldFormProps {
  name: string;
  labelName: string;
  type: "text" | "email" | "number" | "select" | "checkbox" | "tel" | "date";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  formatValue?: (value: string) => string;
  placeholder?: string;
}

export default function FieldForm({
  name,
  labelName,
  type,
  children,
  className,
  disabled,
  formatValue,
  placeholder,
}: FieldFormProps) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, value, checked } = event.target;

    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (formatValue && type === "text") {
      newValue = formatValue(value);
    } else {
      newValue = value;
    }

    helpers.setValue(newValue);
  };

  return (
    <div
      className={clsx(
        "flex w-full",
        {
          "flex-row items-center gap-2": type === "checkbox",
          "flex-col gap-1": type !== "checkbox",
        },
        className
      )}
    >
      <label
        className={clsx("text-sm", {
          "font-semibold": type !== "checkbox",
        })}
        htmlFor={name}
      >
        {labelName}
      </label>
      {type === "date" ? (
        <DatePickerField name={name} disabled={disabled} />
      ) : (
        <Field
          name={name}
          type={type}
          placeholder={disabled ? null : placeholder}
          className={clsx(
            "text-lg",
            {
              "px-3 py-2 w-full rounded-lg": type !== "checkbox",
              "disabled:text-light-dark disabled:opacity-100 disabled:bg-transparent border-none":
                disabled,
            },
            "bg-white border border-gray-300"
          )}
          disabled={disabled}
          as={type === "select" ? "select" : "input"}
          onChange={handleChange}
        >
          {type === "select" ? children : null}
        </Field>
      )}
      <ErrorMessage name={name}>
        {(msg) => (msg ? <p className="text-red-600 text-sm">{msg}</p> : null)}
      </ErrorMessage>
    </div>
  );
}
