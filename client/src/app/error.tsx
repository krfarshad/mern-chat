"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  const { error, reset } = props;
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <div className="mb-8 flex items-center justify-center">
        <div className="text-6xl font-extrabold text-blue-600">403</div>
        <div className="ml-4 text-2xl font-medium text-gray-600">
          {error.cause as any}
        </div>
      </div>
      <p className="mb-4 text-lg text-gray-500">
        {error.message ?? "We can't do your request. please try again later."}
      </p>
      <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={reset}
          color="default"
          size="lg"
          className="bg-slate-700"
        >
          Try again
        </Button>
        <Button onClick={handleGoHome} color="primary" size="lg">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
