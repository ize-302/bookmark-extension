import React from 'react';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const Search = ({handleSearch}) => {
  const searchref = React.useRef(null)

  return (
    <Box position="sticky" zIndex={3} top={0} left={0} bg="#111" borderBottom="1px solid #fff" paddingY={5}>
      <InputGroup maxW="1000px" marginX="auto" width="100%">
        <InputLeftElement
          pointerEvents='none'
          children={<Search2Icon color='gray.300' />}
        />
        <Input ref={searchref} onKeyUp={() => handleSearch(searchref)} type='tel' placeholder='Search bookmarks' color="white" />
      </InputGroup>
    </Box>
  );
}
 
export default Search;