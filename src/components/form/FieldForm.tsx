import { ErrorMessage, Field } from "formik";

interface FieldFormProps {
  name: string;
  labelName: string;
  type: string;
  placeholder?: string;
}

export default function FieldForm({
  name,
  labelName,
  type,
  placeholder,
}: FieldFormProps) {
  return (
    <div>
      <label htmlFor={name}>{labelName}</label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 w-full rounded-lg"
      />
      <ErrorMessage name={name}>
        {(msg) => <p className="text-red-600">{msg}</p>}
      </ErrorMessage>
    </div>
  );
}
