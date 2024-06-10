import RegistrationForm from "@/components/form/RegistrationForm";

// comes from Cognito, I think the best is save it in useContext
const data = {
  email: "montsegarcialopez@gmail.com",
};

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center pt-5 gap-10 mx-5">
      <h1 className="text-2xl">Et donem la benvinguda a l'app de FLG!</h1>
      <h2 className="text-lg">
        Si us plau, acabeu ompliu les vostres dades personals i les de la
        familia.
      </h2>
      <div className="w-full max-w-[600px] flex flex-col gap-5">
        <RegistrationForm />
      </div>
    </main>
  );
}
