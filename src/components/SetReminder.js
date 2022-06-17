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

const SetReminderMenu = ({ hover, bookmark, updateReminder, label, hasReminder, removeReminder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dateRef = React.useRef()
  const timeRef = React.useRef()


  const setReminder = () => {
    updateReminder({ date: dateRef?.current.value, time: timeRef?.current.value, id: bookmark.id })
    onClose()
  }

  return (
    <>
      <MenuItem _hover={hover} onClick={onOpen}>{label}</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc closeOnOverlayClick>
        <ModalOverlay />
        <ModalContent bg="#222">
          <ModalHeader fontSize={18} color="white">{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack width="100" gap={3}>
              <Box width="100%">
                <FormLabel color="#fff">Date</FormLabel>
                <Input ref={dateRef} variant='filled' bg="#333" _hover={{}} color="#fff" defaultValue={hasReminder?.date} />
              </Box>
              <Box width="100%">
                <FormLabel color="#fff">time</FormLabel>
                <Input ref={timeRef} variant='filled' bg="#333" _hover={{}} color="#fff" defaultValue={hasReminder?.time} />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            {hasReminder ? (
              <Button bg='red.500' color="#fff" mr={3} onClick={() => {
                removeReminder(bookmark.id)
                onClose()
              }}>
                Remove reminder
              </Button>
            ) : <Box></Box>}
            <Button onClick={() => setReminder()}>{hasReminder ? 'Update' : 'Save'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SetReminderMenu;