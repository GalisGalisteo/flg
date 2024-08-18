import React, { useEffect } from "react";
import { ErrorMessage, FieldArray, useFormikContext } from "formik";
import FieldForm from "./FieldForm";

interface ChildrenFieldArrayProps {
  isDisabled: boolean;
}

export default function ChildrenFieldArray({
  isDisabled,
}: ChildrenFieldArrayProps) {
  const { values, setFieldValue } = useFormikContext<{
    children: string[];
    numberChildren: number;
  }>();

  useEffect(() => {
    const currentChildrenCount = values.children.length;
    const targetChildrenCount = values.numberChildren;

    if (values.numberChildren < 0) {
      setFieldValue("numberChildren", 0);
    }

    if (currentChildrenCount !== targetChildrenCount) {
      if (currentChildrenCount < targetChildrenCount) {
        const newChildren = Array(
          targetChildrenCount - currentChildrenCount
        ).fill("");
        setFieldValue("children", [...values.children, ...newChildren]);
      } else if (currentChildrenCount > targetChildrenCount) {
        setFieldValue(
          "children",
          values.children.slice(0, targetChildrenCount)
        );
      }
    }
  }, [values.numberChildren, values.children, setFieldValue]);

  return (
    <>
      <FieldArray
        name="children"
        render={() => (
          <div className="grid grid-cols-2 gap-3">
            {values.children.map((_, i) => (
              <div key={i}>
                <p>Criatura {i + 1}</p>
                <FieldForm
                  name={`children[${i}]`}
                  labelName="Data de naixement"
                  type="date"
                  disabled={isDisabled}
                />
              </div>
            ))}
          </div>
        )}
      />
      <ErrorMessage name="dateBirthChildren">
        {(msg) => <p className="text-red-600">{msg}</p>}
      </ErrorMessage>
    </>
  );
}
