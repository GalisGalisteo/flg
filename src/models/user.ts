export interface User {
  name: string;
  lastName: string;
  birthDate: string;
  email: string;
  dni: string;
  phoneNumber: string;
  address: {
    street: string;
    streetNumber: string;
    postcode: string;
    city: string;
    flatNumber: string;
    district: string;
    country: string;
  };
}
