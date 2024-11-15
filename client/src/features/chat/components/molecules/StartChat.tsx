"use client";
import { CustomModal } from "@/components";
import { useDisclosure } from "@nextui-org/modal";
import React, { memo } from "react";
import { StartChatForm } from "./StartChatForm";

const StartChat = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };
  return (
    <>
      <button
        className="flex-1 rounded-md bg-primary px-4 py-2 text-sm text-slate-900"
        onClick={handleClick}
      >
        New Chat
      </button>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Start new Chat"
      >
        <StartChatForm />
      </CustomModal>
    </>
  );
};

export default memo(StartChat);
