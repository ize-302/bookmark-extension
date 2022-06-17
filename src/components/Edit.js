import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  MenuItem,
  Input,
  VStack,
  FormLabel,
  Box
} from '@chakra-ui/react'

const EditModal = ({hover, bookmark, updateItem}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const titleRef = React.useRef()
  const urlRef = React.useRef()


  const saveBookmark = () => {
    updateItem({title: titleRef?.current.value, url: urlRef?.current.value, id: bookmark.id})
    onClose()
  }

  return (
    <>
    <MenuItem _hover={hover} onClick={onOpen}>Edit</MenuItem>

    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
        <ModalContent bg="#222">
          <ModalHeader fontSize={18} color="white">Edit Bookmark</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack width="100" gap={3}>
            <Box width="100%">
              <FormLabel color="#fff">Title</FormLabel>
              <Input ref={titleRef} variant='filled' bg="#333" _hover={{}} color="#fff" defaultValue={bookmark.title} />
            </Box>
            <Box width="100%">
            <FormLabel color="#fff">URL</FormLabel>
            <Input ref={urlRef} variant='filled' bg="#333" _hover={{}} color="#fff" defaultValue={bookmark.url} />
            </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button bg='#111' color="#fff" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => saveBookmark()}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
 
export default EditModal;