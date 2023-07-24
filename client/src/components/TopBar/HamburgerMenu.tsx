import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Switch,
  useColorMode,
} from "@chakra-ui/react";

export const HamburguerMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="options-menu" icon={<HamburgerIcon />} />
      </PopoverTrigger>
      <PopoverContent sx={{ w: "200px", p: 1, mr: 2 }}>
        <PopoverArrow sx={{ left: "var(--chakra-space-1) !important" }} />
        <PopoverBody>
          <Flex direction="row" alignContent="center">
            <FormLabel m={0} htmlFor="darkModeSwitch">
              <MoonIcon mr={2} />
              Dark mode
            </FormLabel>
            <Switch
              ml="auto"
              display="inline-flex"
              alignItems="center"
              id="darkModeSwitch"
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
