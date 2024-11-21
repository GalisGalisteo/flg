import { howCognized } from "@/types/family";
import { birthDate18 } from "@/utils/utils";
import { array, boolean, date, number, object, string } from "yup";
import { isValid } from "iban";

export const familySchema = object({
  members: array().of(
    object({
      name: string().required("*Obligatori"),
      surname: string().required("*Obligatori"),
      birthDate: date()
        .max(birthDate18, "Has de ser major de 18 anys per ser soci")
        .required("*Obligatori"),
      nif: string().required("*Obligatori"),
      email: string()
        .email("Adreça de correu electrònic incorrecte")
        .required("*Obligatori"),
      phone: string().required("*Obligatori"),
      address: object({
        street: string().required("*Obligatori"),
        streetNumber: string().required("*Obligatori"),
        postcode: string().required("*Obligatori"),
        city: string().required("*Obligatori"),
        flatNumber: string(),
        district: string().required("*Obligatori"),
        country: string().required("*Obligatori"),
      }),
    })
  ),
  catResident: string()
    .required("*Obligatori")
    .oneOf(["1", "0"], "escull una de les opcions"),
  bankAccount: string()
    .test("iban", "IBAN no és vàlid", (value) =>
      value ? isValid(value) : true
    )
    .required("*Obligatori"),
  numberUsers: number()
    .required("*Obligatori")
    .oneOf([1, 2], "escull una de les opcions"),
  numberChildren: number()
    .integer()
    .min(0, "no pot ser inferior a 0")
    .max(14, "no pot ser superior a 14")
    .required("*Obligatori"),
  children: array().of(date().required("*Obligatori")),
  howCognized: string()
    .required("*Obligatori")
    .oneOf(howCognized, "escull una de les opcions"),
  agreements: object({
    agreement1: boolean().oneOf([true], "*"),
    agreement2: boolean().oneOf([true], "*"),
    agreement3: boolean(),
  }),
});
