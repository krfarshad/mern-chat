"use client";

import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { CompleteProfile } from "./CompleteProfile";

export const SingUpPage = () => {
  const [step, setStep] = useState<"register" | "complete">("register");

  return (
    <>
      {step === "complete" ? (
        <CompleteProfile />
      ) : (
        <SignUpForm setStep={setStep} />
      )}
    </>
  );
};
