import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";

type Props = { isOpen: boolean; onOpenChange: () => void; title: string };
export const CustomModal = (props: PropsWithChildren<Props>) => {
  const { children, isOpen, onOpenChange, title } = props;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="mb-4">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
