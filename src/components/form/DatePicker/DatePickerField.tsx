import React from "react";
import { useField } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { birthDate18 } from "@/utils/utils";
import { ca } from "date-fns/locale/ca";

registerLocale("cat", ca);

interface DatePickerFieldProps {
  name: string;
  disabled?: boolean;
}

export default function DatePickerField({
  name,
  disabled,
}: DatePickerFieldProps) {
  const [field, , helpers] = useField(name);

  return (
    <DatePicker
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        helpers.setValue(val);
      }}
      className="text-lg disabled:text-light-dark px-3 py-2 w-full rounded-lg border border-gray-300 disabled:border-none disabled:bg-transparent"
      disabled={disabled}
      dateFormat="dd/MM/yyyy"
      locale="cat"
      placeholderText="DD/MM/AAAA"
      openToDate={!field.value ? birthDate18 : new Date(field.value)}
      maxDate={new Date()}
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      onBlur={() => helpers.setTouched(true)}
      calendarClassName="custom-calendar" // Apply the custom calendar class
    />
  );
}

// import { useField, useFormikContext } from "formik";
// import React from "react";
// import Datepicker from "react-tailwindcss-datepicker";

// interface DatePickerFieldProps {
//   name: string;
//   disabled?: boolean;
// }

// export default function DatePickerField({
//   name,
//   disabled,
// }: DatePickerFieldProps) {
//   const [field, , helpers] = useField(name);
//   const { setFieldTouched, validateField } = useFormikContext();

//   const handleChange = (newValue: {
//     startDate: Date | null;
//     endDate: Date | null;
//   }) => {
//     if (newValue) {
//       helpers.setValue([newValue.startDate, newValue.endDate]);
//     } else {
//       helpers.setValue([null, null]);
//     }
//     setFieldTouched(name, true);
//   };

//   return (
//     <div>
//       <Datepicker
//         asSingle={true}
//         useRange={false}
//         displayFormat="DD/MM/YYYY"
//         inputClassName="w-full py-2 px-3 border border-gray-300 rounded-lg"
//         placeholder="dd-mm-aaaa"
//         value={{
//           startDate: field.value?.[0] || null, // Add safety check here
//           endDate: field.value?.[1] || null, // Add safety check here
//         }}
//         onChange={handleChange}
//         disabled={disabled}
//       />
//     </div>
//   );
// }
