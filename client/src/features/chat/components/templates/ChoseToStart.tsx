"use client";
import Image from "next/image";
import chose from "../../assets/chose.png";
import StartChat from "../molecules/StartChat";
export const ChoseToStart = () => {
  return (
    <div className="flex h-full w-full ">
      <div className="inset-0 m-auto text-center">
        <Image
          src={chose.src}
          priority={false}
          width={200}
          height={200}
          alt="chose a chat"
          className="mx-auto opacity-80"
        />
        <p>You haven’t chosen a chat yet, or maybe you haven’t started one</p>
        <div className="mt-6 w-full text-center">
          <StartChat />
        </div>
      </div>
    </div>
  );
};
