import React from 'react';
import {
  Box,
  Text,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
  Circle,
  Icon
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import EditModal from './Edit';
import SetReminderMenu from './SetReminder';
import { MdAlarm } from 'react-icons/md'

const Item = ({ bookmark, removeItem, updateItem, updateReminder, hasReminder, removeReminder }) => {
  const hover = {
    color: '#000'
  }
  return (
    <Box borderBottom="1px solid #fff" className="item" width="100%" _hover={{ bg: '#222' }} paddingX={4} paddingY={2} fontSize={14} color="white">
      <HStack justifyContent='space-between'>
        <HStack maxW="800px" overflowX='hidden' textOverflow="ellipsis" whiteSpace="nowrap">
          <Image
            src={bookmark.favicon}
          />
          <Text fontSize={14}>{bookmark.title}</Text><Text fontSize={12} color="#666" className="url">{bookmark.url}</Text></HStack>
        <HStack>
          {hasReminder && <Circle as={Button} padding={1} bg="green.500"><Icon as={MdAlarm} color="black" /></Circle>}
          <Menu>
            <MenuButton bg="#000" _active={{}} _hover={{}} as={Button}><ChevronDownIcon /></MenuButton>
            <MenuList bg="#111">
              <EditModal hover={hover} bookmark={bookmark} updateItem={(payload) => updateItem(payload)} />
              <MenuItem _hover={hover} onClick={() => removeItem(bookmark.id)}>Delete</MenuItem>
              <MenuDivider />
              <MenuItem _hover={hover} onClick={() => navigator.clipboard.writeText(bookmark.url)}>Copy</MenuItem>
              <MenuItem _hover={hover} onClick={() => window.open(bookmark.url, "_blank")}>Open in new tab</MenuItem>
              <MenuDivider />
              <SetReminderMenu label={hasReminder ? 'Update Reminder' : 'Remind me'} hasReminder={hasReminder} hover={hover} removeReminder={(id) => removeReminder(id)} bookmark={bookmark} updateReminder={(payload) => updateReminder(payload)} />
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
}

export default Item;