import Image from "next/image";
import loadingImg from "@/assets/loading-flg.png";

interface LoadingImageProps {
  height?: number;
}

export default function LoadingImage({ height = 200 }: LoadingImageProps) {
  return (
    <Image
      src={loadingImg}
      alt="laoding"
      height={height}
      className="animate-ping"
    />
  );
}
