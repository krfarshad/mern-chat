"use client";
import Image from "next/image";
import LoginBg from "../assets/login-bg.svg";
import { memo } from "react";

const Background = () => {
  return (
    <div className="absolute bottom-0 -z-10 w-full text-center">
      <div className="inline-flex flex-row items-center justify-center">
        <div className="w-1/2">
          <Image
            style={{ transform: "rotateY(180deg)" }}
            width={500}
            height={150}
            src={LoginBg.src}
            alt="welcome back"
            className="h-auto max-w-full"
          />
        </div>
        <div className="w-1/2">
          <Image
            width={500}
            height={150}
            src={LoginBg.src}
            alt="welcome back"
            className="h-auto max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Background);
