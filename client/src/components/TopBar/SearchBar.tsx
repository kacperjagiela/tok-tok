import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  onSearch: (search: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    console.log(searchTerm);
  };

  return (
    <InputGroup minW="200px" w="500px" mr={14}>
      <Input
        placeholder="Search"
        onChange={handleSearchTermChange}
        value={searchTerm}
        borderRadius={92}
        borderRightRadius={0}
      />
      <InputRightAddon
        px={0}
        borderRightRadius={92}
        children={
          <Button onClick={handleSearch} borderRightRadius={92}>
            <SearchIcon />
          </Button>
        }
      />
    </InputGroup>
  );
};
