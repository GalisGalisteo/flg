import { heardFrom } from "@/models/family";
import { birthDate18 } from "@/utils/utils";
import { array, date, number, object, string } from "yup";

export const registrationSchema = object({
  firstName: string()
    .min(2, "Ha de tenir al menys dos lletres")
    .required("*Obligatori"),
  lastName: string()
    .min(2, "Ha de tenir al menys dos lletres")
    .required("*Obligatori"),
  birthDate: date()
    .max(birthDate18, "Has de ser major de 18 anys per ser soci")
    .required("*Obligatori"),
  dni: string().required("*Obligatori"),
  email: string()
    .email("Adreça de correu electrònic incorrecte")
    .required("*Obligatori"),
  phoneNumber: string().required("*Obligatori"),
  bankAccount: string().required("*Obligatori"),
  numberUsers: number().required("*Obligatori").oneOf([1, 2]),
  price: string().required("*Obligatori"),
  numberChildren: number().integer().min(0).max(14).required("*Obligatori"),
  dateBirthChildren: array().of(date().required("*Obligatori")),
  heardFrom: string().required("*Obligatori").oneOf(heardFrom),
});
