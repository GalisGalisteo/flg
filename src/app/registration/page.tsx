"use client";

import ProtectedRoute from "@/components/common/ProtectedRoutes";
import LoadingImage from "@/components/common/LoadingImage";
import FamilyForm from "@/components/form/FamilyForm";
import { useCognitoContext } from "@/contexts/cognito/useCognitoContext";
import { useQuery } from "@apollo/client";
import { getPrices } from "@/graphql/mutations";

export default function RegistrationPage() {
  const { userEmail } = useCognitoContext();
  const { loading, error, data } = useQuery(getPrices);
  console.log(data?.getPrices);
  return (
    <ProtectedRoute>
      <div className="max-w-screen-sm mx-auto">
        <div className="text-center space-y-3 p-5">
          <h1 className="text-2xl">Et donem la benvinguda a l'app de FLG!</h1>
          <p className="text-lg">
            Si us plau, acabeu ompliu les vostres dades personals i les de la
            familia.
          </p>
        </div>
        {error && !loading ? <p>An error ocurred: {error.message}</p> : null}
        {!loading && data ? (
          <FamilyForm
            userEmail={userEmail}
            prices={{
              cataloniaBased: "10",
              outsideCatalonia: "20",
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-[500px]">
            <LoadingImage />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
