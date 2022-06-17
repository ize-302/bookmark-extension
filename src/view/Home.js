/*global chrome*/
import React from "react";
import {
  Box, Heading,
  Flex,
  Grid,
} from '@chakra-ui/react'
import Item from "../components/Item";
import Search from "../components/Search";
import FoldersAccordion from "../components/Accordion";
import { ReminderService } from "../storage_service/reminder_service";

function Home() {
  let [folders, setfolders] = React.useState([]);
  let [bookmarks, setbookmarks] = React.useState([]);
  const [nestedfolders, setnestedfolders] = React.useState([]);
  const [selectedFolder, setselectedFolder] = React.useState(null);
  const [viewingBookmarks, setviewingBookmarks] = React.useState([]);
  const [reminders, setreminders] = React.useState([]);
  const service = new ReminderService()

  const handleSearch = (searchref) => {
    // const value = searchref.current.value.trim().toLowerCase();
    // setviewingBookmarks(viewingBookmarksBackup)
    // const filtered = [...viewingBookmarks].filter(boomark => boomark.title.trim().toLowerCase().includes(value))
    // console.log(filtered)
    // setviewingBookmarks(filtered)
  }

  /* REMINDER START*/
  const loadRemindersFromDb = async () => {
    try {
      const getReminders = await service.getReminders()
      setreminders(getReminders)
    }
    catch (ex) {
      alert(ex.message);
      console.error(ex);
    }
  }

  const updateReminder = async (payload) => {

    var reminder = {
      date: payload.date,
      time: payload.time,
      bookmarkId: payload.id,
    }
    // add reminder into indexeddb

    const newReminders = [...reminders]
    try {
      const addReminder = await service.addReminder(reminder)
      console.log(addReminder)
      newReminders.push(addReminder[0]);
      setreminders(newReminders);
    }
    catch (ex) {
      alert(ex.message);
      console.error(ex);
    }
    chrome.notifications.create(47, new Date.now())
  }

  const hasReminder = (id) => {
    const getBookmarkReminder = reminders.find(reminder => reminder.bookmarkId === id)
    return getBookmarkReminder
  }

  const removeReminder = async (bookmarkId) => {
    try {
      const rowsDeleted = await service.removeReminder(bookmarkId);
      if (rowsDeleted) {
        const filtered = reminders.filter(reminder => reminder.bookmarkId !== bookmarkId)
        setreminders(filtered)
      }
      // reminders.push(rowsDeleted[0]);
      // setreminders(reminders);
      // fetchBookmarks()
      // if (rowsDeleted > 0) {
      //     const index = reminders.findIndex(value => value.id === '1');
      //     this.state.students.splice(index, 1);
      //     this.setState({ student: this.state.students });
      //     alert("Row Deleted");
      // }

    }
    catch (ex) {
      alert(ex.message);
      console.error(ex);
    }
  }
  /* REMINDER END*/

  chrome.bookmarks.onChanged.addListener(() => {
    fetchBookmarks()
  })

  React.useEffect(() => {
    showViewingBookmarks(selectedFolder?.id)
  }, [selectedFolder]);

  const deepSearch = (object, key, predicate) => {
    if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) return object

    for (let i = 0; i < Object.keys(object).length; i++) {
      let value = object[Object.keys(object)[i]];
      if (typeof value === "object" && value != null) {
        let o = deepSearch(object[Object.keys(object)[i]], key, predicate)
        if (o != null) return o
      }
    }
    return null
  }

  const showViewingBookmarks = (id) => {
    if (id === '0') {
      setviewingBookmarks(bookmarks)
    } else {
      const filteredBookmarks = bookmarks.filter(bookmark => parseInt(bookmark.parentId) === parseInt(selectedFolder?.id))
      setviewingBookmarks(filteredBookmarks)
    }
  }

  // separate folders from bookmarks(actual bookmarks)
  let newBookmarks = []
  let newFolders = []
  const separateFolderFromBookmarks = (node) => {
    if (node?.children) {
      /*
      * check if children of node are bookmarks
      * only bookmarks have url property so we use that
      * */
      const hasBookmarks = node?.children.some(child => child.url)
      newFolders.push({ ...node, children: [], hasBookmarks: hasBookmarks })
      folders = newFolders
      node.children.forEach((child) => separateFolderFromBookmarks(child))
    } else {
      // generate favicon for a node
      let favicon = 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + node.url
      newBookmarks.push({ ...node, favicon })
      bookmarks = newBookmarks
    }
    setfolders(folders)
    setbookmarks(bookmarks)
  }

  const handleNestingFolders = () => {
    const nested_folders = []
    // iterate over folders
    folders.forEach(folder => {
      // if folder does not have parentId value, push to new nested array
      if (!folder.parentId) {
        nested_folders.push(folder)
      } else {
        // if folder has parentId value, perform deepsearch() to find parent, and push to parent children
        var parent = deepSearch(nested_folders, 'id', (k, v) => v === folder.parentId);
        parent.children.push(folder)
      }
    });
    setnestedfolders(nested_folders)
    setselectedFolder(selectedFolder ? selectedFolder : nested_folders?.[0])
    showViewingBookmarks(selectedFolder?.id)
  }

  const fetchBookmarks = async () => {
    setfolders([])
    // setnestedfolders([])
    await chrome.bookmarks.getTree((response) => {
      separateFolderFromBookmarks(response[0])
      handleNestingFolders()
    })
  }

  const removeItem = async (id) => {
    await chrome.bookmarks.remove(id)
  }

  const updateItem = async (payload) => {
    await chrome.bookmarks.update(
      payload.id,
      { title: payload.title, url: payload.url }
    )
  }

  React.useEffect(() => {
    loadRemindersFromDb()
    fetchBookmarks()
  }, []);

  return (
    <>
      <Flex gap={0} position="relative" height="100vh" top={0} overflow="none">
        <Box paddingX={5} bg="#111" borderRight="1px solid #fff" height="100vh" overflowY='auto' position="sticky" left={0} top={0} minWidth="350px">
          <FoldersAccordion nestedfolders={nestedfolders} selectedFolder={selectedFolder} setselectedFolder={(folder) => setselectedFolder(folder)} />
        </Box>
        <Box bg="#000" width="100%" maxHeight="100%" overflowY="auto" position="relative">
          {/* begin search component */}
          <Search handleSearch={(searchref) => handleSearch(searchref)} />
          {/* end search component */}
          <Heading marginTop={50} marginBottom={5} maxW="1000px" fontSize={24} width="100%" marginX="auto" color="white">
            {selectedFolder?.title}
          </Heading>
          {selectedFolder?.['hasBookmarks'] || selectedFolder?.id === '0' ? (
            <Flex direction='column' marginBottom={50} gap={0} alignItems="flex-start" maxW="1000px" marginX="auto" width="100%" rounded={5} bg="#111" border="1px solid #fff">
              {viewingBookmarks?.map(bookmark => (
                <Item hasReminder={hasReminder(bookmark.id)} removeReminder={(id) => removeReminder(id)} bookmark={bookmark} removeItem={(id) => removeItem(id)} updateItem={(payload) => updateItem(payload)} updateReminder={(payload) => updateReminder(payload)} />
              ))}
            </Flex>
          ) : (<Grid maxW="1000px" fontSize={24} width="100%" marginX="auto" placeItems='center' marginTop={200}>
            <Heading>No saved bookmarks here!</Heading>
          </Grid>)}
        </Box>
      </Flex>
    </>
  );
}

export default Home;