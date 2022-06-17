import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

const FoldersAccordion = ({ selectedFolder, nestedfolders, setselectedFolder }) => {
  const renderNestedFolders = (node) => {
    if (node?.id === '0') node.title = "All bookmarks!"
    return (
      <AccordionItem border="none">
        {node?.children && (
          <>
            <AccordionButton bg={node.id === selectedFolder.id ? "#fff" : "transparent"} color={node.id === selectedFolder.id ? "#000" : "#fff"} border={node.id === selectedFolder.id ? "1px solid #fff" : "transparent"} _hover={{ bg: '#333', color: "white" }} onClick={() => setselectedFolder(node)} rounded={5}>
              {node.children.length > 0 && <AccordionIcon />}
              <Box flex='1' textAlign='left'>
                {node.title}
              </Box>
            </AccordionButton>
            <AccordionPanel paddingY={0}>
              {node?.children.map((child) => renderNestedFolders(child))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    )
  }

  return (
    <Accordion marginTop={5} padding={0} defaultIndex={[0]} allowMultiple>
      {renderNestedFolders(nestedfolders?.[0])}
    </Accordion>
  );
}

export default FoldersAccordion;