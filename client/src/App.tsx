import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { RouterProvider, RouterProviderProps } from "react-router-dom";

import { useUser } from "./hooks/useUser";

interface Props {
  router: RouterProviderProps["router"];
}

export const App = ({ router }: Props) => {
  const { apiClient, setUser } = useUser();

  // Log user in if token is present
  useEffect(() => {
    apiClient
      .getCurrentUser()
      .then((data) => {
        if (data) {
          setUser(data.user);
          apiClient.setToken();

          apiClient.guardTest().then((data) => {
            console.log("guardTest", data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiClient, setUser]);

  return (
    <Container
      minW="100vw"
      minH="100vh"
      bg="background"
      overflowX="hidden"
      px={0}
    >
      <RouterProvider router={router} />
    </Container>
  );
};
