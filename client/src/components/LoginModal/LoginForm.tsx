import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useUser } from "../../hooks/useUser";

const formSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface Props {
  onFinish: () => void;
}

export const LoginForm = ({ onFinish }: Props) => {
  const [show, setShow] = useBoolean();
  const { apiClient, setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const result = await apiClient.signIn({ ...data });
      console.log("login result", result);

      if (result) {
        setUser(result.user);
        apiClient.setToken();
      }
    } catch (err) {
      console.log(err);
    } finally {
      onFinish();
    }
  };

  console.log(errors);

  console.log("apiClient register", apiClient);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="4xl" align="center" fontWeight="bold" my={5}>
        Log in
      </Text>
      <FormControl isInvalid={!!errors.username}>
        <FormLabel htmlFor="username" textTransform="capitalize">
          Username
        </FormLabel>
        <Input {...register("username")} placeholder="Enter username" />
        {errors.username ? (
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        ) : (
          <FormHelperText visibility="hidden">.</FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password" textTransform="capitalize">
          Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("password")}
            id="password"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={setShow.toggle}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password ? (
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        ) : (
          <FormHelperText visibility="hidden">.</FormHelperText>
        )}
      </FormControl>
      <Button
        variant="link"
        onClick={() => console.log("Forgot password")}
        mb={2}
      >
        Forgot password?
      </Button>

      <Button w="100%" mt={4} type="submit">
        Log in
      </Button>
    </form>
  );
};
