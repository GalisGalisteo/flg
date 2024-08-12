"use client";

import { useEffect } from "react";
import { useExchangeCode } from "@/hooks/useExchangeCode";
import LoadingImage from "@/components/common/LoadingImage";

export default function Home() {
  const { exchangeCode } = useExchangeCode();

  useEffect(() => {
    exchangeCode();
  }, [exchangeCode]);

  return (
    <div className="flex justify-center items-center h-[500px]">
      <LoadingImage />
    </div>
  );
}
