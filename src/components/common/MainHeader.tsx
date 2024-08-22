import Image from "next/image";
import Link from "next/link";

import logoImg from "@/assets/logo.png";

export const MainHeader = () => {
  return (
    <header className="flex justify-center">
      <Link href="/">
        <Image
          src={logoImg}
          alt="Logo"
          className="size-36 md:size-48"
          priority
        />
      </Link>
    </header>
  );
};
