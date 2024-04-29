import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center pt-5 gap-3">
      <Link href="/registration">
        <h1 className="text-xl">Comença a registrar-te</h1>
      </Link>
    </main>
  );
}
