import { ChakraProvider } from "@chakra-ui/react";
import Home from "./view/Home";
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
