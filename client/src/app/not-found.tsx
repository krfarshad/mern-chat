"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/");
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <div className="mb-8 flex items-center justify-center">
        <div className="text-6xl font-extrabold text-blue-600">404</div>
        <div className="ml-4 text-2xl font-medium text-gray-600">
          Page Not Found
        </div>
      </div>
      <p className="mb-4 text-lg text-gray-500">
        Oops! The page you are looking for does not exist.
      </p>
      <Button onClick={handleGoHome} color="primary" size="lg" className="mt-4">
        Go to Home
      </Button>
    </div>
  );
}
