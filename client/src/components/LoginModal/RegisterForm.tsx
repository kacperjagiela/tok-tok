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
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useUser } from "../../hooks/useUser";
import { exclude } from "../../utils/exclude";

const formSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

interface Props {
  onFinish: () => void;
}

type FormSchemaType = z.infer<typeof formSchema>;

type FormSchemaKeys = keyof FormSchemaType;

const defaultValues: FormSchemaType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = ({ onFinish }: Props) => {
  const [show, setShow] = useBoolean();
  const [showConfirm, setShowConfirm] = useBoolean();
  const { apiClient } = useUser();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log("onSubmit");
    try {
      const result = await apiClient.register({ ...data });
      console.log("register result", result);

      if (result) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        console.log("regiister:", result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      onFinish();
    }
  };

  const commonInputs = Object.keys(
    exclude(defaultValues, ["password", "confirmPassword"])
  ).map((input) => input as FormSchemaKeys);

  console.log("apiClient register", apiClient);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="4xl" align="center" fontWeight="bold" my={5}>
        Register on TokTok
      </Text>
      {commonInputs.map((input) => (
        <FormControl key={input} isInvalid={!!errors[input]}>
          <FormLabel htmlFor={input} textTransform="capitalize">
            {input}
          </FormLabel>
          <Input
            {...register(input)}
            id={input}
            placeholder={`Enter ${input}`}
          />
          {errors[input] ? (
            <FormErrorMessage>{errors[input]?.message}</FormErrorMessage>
          ) : (
            <FormHelperText visibility="hidden">.</FormHelperText>
          )}
        </FormControl>
      ))}

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

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirmPassword" textTransform="capitalize">
          Confirm password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            pr="4.5rem"
            type={showConfirm ? "text" : "password"}
            placeholder="Enter confirmPassword"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={setShowConfirm.toggle}>
              {showConfirm ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.confirmPassword ? (
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        ) : (
          <FormHelperText visibility="hidden">.</FormHelperText>
        )}
      </FormControl>

      <Button w="100%" mt={4} type="submit">
        Register
      </Button>
    </form>
  );
};
