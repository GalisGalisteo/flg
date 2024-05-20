import UserDataForm from "@/components/form/UserDataForm";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center pt-5 gap-10">
      <h1 className="text-2xl">Et donem la benvinguda a l'app de FLG!</h1>
      <h2 className="text-lg">
        Si us plau, acabeu d'omplir les vostres dades personals i de la vostra
        família.
      </h2>
      <div className="w-full max-w-[600px] flex flex-col gap-5">
        <h3 className="text-xl">Dades personals del primer familiar:</h3>
        <UserDataForm disabled />
      </div>
    </main>
  );
}
