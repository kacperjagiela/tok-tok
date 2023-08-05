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
import { useNavigate } from "react-router-dom";

import { RoutesEnum } from "../../routes";
import { Nullable } from "../../types/Nullable";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface Props extends Omit<ModalProps, "children"> {
  navigateOnLogin: Nullable<RoutesEnum>;
}

export const LoginModal = (props: Props) => {
  const [wantToRegister, setWantToRegister] = useState(false);

  const navigate = useNavigate();

  const onFinish = () => {
    props.onClose();

    if (props.navigateOnLogin) {
      navigate(props.navigateOnLogin);
    }
  };

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent p={6} pb={2}>
        <ModalCloseButton />
        <ModalBody>
          {wantToRegister ? (
            <RegisterForm onFinish={onFinish} />
          ) : (
            <LoginForm onFinish={onFinish} />
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
