import { ErrorMessage, Field, FieldAttributes, useField } from "formik";
import { printFormat } from "iban";
import clsx from "clsx";

interface FieldFormProps extends FieldAttributes<any> {
  name: string;
  labelName: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function FieldForm({
  name,
  labelName,
  type,
  placeholder,
  disabled,
  className,
  children,
}: FieldFormProps) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { type, value, checked } = event.target;

    if (type === "checkbox") {
      helpers.setValue(checked);
    } else if (name === "bankAccount") {
      value = printFormat(value, " ");
      helpers.setValue(value);
    } else {
      helpers.setValue(value);
    }
  };
  return (
    <div
      className={clsx(
        className,
        "flex w-full",
        type === "checkbox" ? "flex-row items-center gap-2" : "flex-col gap-1"
      )}
    >
      <label
        className={clsx("text-sm", type !== "checkbox" ? "font-semibold" : "")}
        htmlFor={name}
      >
        {labelName}
      </label>
      <Field
        name={name}
        type={type}
        placeholder={disabled ? null : placeholder}
        className={clsx(
          "text-lg",
          type !== "checkbox" ? "px-3 py-2 w-full rounded-lg" : "",
          disabled
            ? "disabled:text-light-dark disabled:opacity-100 disabled:bg-transparent"
            : "bg-white border border-gray-300"
        )}
        disabled={disabled}
        as={type === "select" ? "select" : "input"}
        onChange={handleChange}
      >
        {type === "select" ? children : null}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <p className="text-red-600 text-sm">{msg}</p>}
      </ErrorMessage>
    </div>
  );
}
