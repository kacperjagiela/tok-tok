import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { useState } from "react";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginModal = (props: Omit<ModalProps, "children">) => {
  const [wantToRegister, setWantToRegister] = useState(false);

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent p={6} pb={2}>
        <ModalCloseButton />
        <ModalBody>
          {wantToRegister ? (
            <RegisterForm onFinish={props.onClose} />
          ) : (
            <LoginForm onFinish={props.onClose} />
          )}
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            variant="link"
            onClick={() => setWantToRegister(!wantToRegister)}
            mb={2}
          >
            {wantToRegister
              ? "Already have an account? Log in!"
              : "Don't have an account? Sign up!"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
