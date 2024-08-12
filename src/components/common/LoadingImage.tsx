import Image from "next/image";
import loadingImg from "@/assets/loading-flg.png";

export default function LoadingImage() {
  return (
    <Image
      src={loadingImg}
      alt="laoding"
      height={200}
      className="animate-ping"
    />
  );
}
