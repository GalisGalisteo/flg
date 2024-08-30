"use client";

import { useEffect } from "react";
import { useExchangeCode } from "@/hooks/useExchangeCode";
import LoadingImage from "@/components/common/LoadingImage";

export default function Home() {
  const { exchangeCode, error } = useExchangeCode();

  useEffect(() => {
    exchangeCode();
  }, [exchangeCode]);

  return (
    <div className="flex justify-center items-center h-[500px]">
      {error ? <p className="text-red-600">{error}</p> : <LoadingImage />}
    </div>
  );
}
