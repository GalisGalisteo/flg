import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation ($code: String!) {
    login(code: $code) {
      loginResponse
      registrationResponse {
        hasFamilyAccount
        email
      }
    }
  }
`;

export const createFamilyAccount = gql`
  mutation (
    $members: [MemberData]
    $familyData: FamilyData
    $expectedMembers: String
  ) {
    createFamilyAccount(
      members: $members
      familyData: $familyData
      expectedMembers: $expectedMembers
    ) {
      familyId
    }
  }
`;

export const updateFamilyProperties = gql`
  mutation (
    $familyAccountId: String
    $updatedFamilyProperties: UpdatedFamilyProperties
  ) {
    updateFamilyProperties(
      familyAccountId: $familyAccountId
      updatedFamilyProperties: $updatedFamilyProperties
    ) {
      id
      foundingMemberExternalId
      members {
        id
        name
        surname
        birthDate
        email
        phone
        nif
        address {
          street
          streetNumber
          flatNumber
          postcode
          city
          district
          country
        }
        memberExternalId
        adminAssignatedId
      }
      bankAccount
      children
      agreements {
        agreement1
        agreement2
        agreement3
      }
      isActive
      activationDate
      inactivationDate
      howCognized
    }
  }
`;

export const updateMember = gql`
  mutation ($familyAccountId: String!, $updatedMember: UpdateMember!) {
    updateMember(
      familyAccountId: $familyAccountId
      updatedMember: $updatedMember
    ) {
      id
      name
      surname
      birthDate
      email
      phone
      nif
      address {
        street
        streetNumber
        flatNumber
        postcode
        city
        district
        country
      }
      memberExternalId
      adminAssignatedId
    }
  }
`;

export const getFamilyAccount = gql`
  query GetFamilyAccount {
    getFamilyAccount {
      id
      foundingMemberExternalId
      members {
        id
        name
        surname
        birthDate
        email
        phone
        nif
        address {
          street
          streetNumber
          flatNumber
          postcode
          city
          district
          country
        }
        memberExternalId
        adminAssignatedId
      }
      bankAccount
      children
      agreements {
        agreement1
        agreement2
        agreement3
      }
      isActive
      activationDate
      inactivationDate
      howCognized
    }
  }
`;

export const getPrices = gql`
  query GetPrices {
    getPrices {
      cataloniaBased
      outsideCatalonia
    }
  }
`;

export const listFamilyAccount = gql`
  query ListFamilyAccounts {
    listFamilyAccounts {
      id
      foundingMemberExternalId
      members {
        id
        name
        surname
        birthDate
        email
        phone
        nif
        address {
          street
          streetNumber
          flatNumber
          postcode
          city
          district
          country
        }
        memberExternalId
        adminAssignatedId
      }
      bankAccount
      children
      agreements {
        agreement1
        agreement2
        agreement3
      }
      isActive
      activationDate
      inactivationDate
      howCognized
    }
  }
`;
