import { Container } from "@chakra-ui/react";
import { RouterProvider, RouterProviderProps } from "react-router-dom";

interface Props {
  router: RouterProviderProps["router"];
}

export const App = ({ router }: Props) => {
  return (
    <Container minW="100vw" minH="100vh" px={0}>
      <RouterProvider router={router} />
    </Container>
  );
};
