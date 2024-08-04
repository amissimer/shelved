"use client";
import { Box, Stack, Typography, Button, Modal, TextField, Paper, Container} from "@mui/material";
import { firestore, auth} from "@/firebase";
import { collection } from "firebase/firestore";
import { getDocs, query, doc, deleteDoc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { SignedOut } from ".//components/signed-out";
import { SignedIn } from ".//components/signed-in";
import Link from 'next/link'

export default function Home() {

  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [search, setSearch] = useState('');

  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [prev, setPrev] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({
        item: doc.id,
        ...doc.data(),
      })
  
    })
    setPantry(pantryList)
  } 


  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()){
        const {quantity} = docSnap.data()
        await updateDoc(docRef, {quantity: quantity + 1})
      }else{
        await setDoc(docRef, {quantity: 1})
      }
      await updatePantry()
    }

    const removeItem = async (item) => {
      const docRef = doc(collection(firestore, 'pantry'), item)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()){
        const {quantity} = docSnap.data()
        if (quantity === 1){
          await deleteDoc(docRef)
        }else{
          await updateDoc(docRef, {quantity: quantity - 1})
        }
      }
      await updatePantry()
    }

    const editItem = async (prevItem, itemToChange) => {
      const docRef = doc(collection(firestore, 'pantry'), prevItem)
      const docRef2 = doc(collection(firestore, 'pantry'), itemToChange)
      const docSnap = await getDoc(docRef)
      const { quantity } = docSnap.data()
      await setDoc(docRef2, {quantity: quantity})
      await deleteDoc(docRef)

      await updatePantry()
    }
     
  useEffect( () => {
    updatePantry()
  }, [])    

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleEditOpen = (item) => {
    setItemName(item);
    setPrev(item);
    setEditOpen(true);
  }
  const handleEditClose = () => { 
    setEditOpen(false)
  }

  return (
    <>
  <SignedIn>
    <Box width={'100vw'} height={'6vh'} display={'flex'}
    justifyContent={'space-between'} alignItems={'center'}
    sx={{bgcolor: '#44576D',
      padding: 4,
      position: 'absolute'
    }}
    >
      <Typography marginLeft={2} fontSize={26} fontFamily={'Gill Sans'}
      sx={{color: '#E6E6E6'}}
      >
        Shelved
      </Typography>
      <Button variant="contained"  onClick={() => signOut()}
      sx={{
        marginRight: 2,
        color: '#E6E6E6',
        bgcolor: '#AAC7D8',
        '&:hover': {
          bgcolor: '#a3c3d6',
        }
      }}
      >
        Logout
      </Button>

    </Box>
   <Box width={'100vw'} height={'100vh'} display={'flex'}
   justifyContent={'center'} alignItems={'center'}
   flexDirection={'column'} sx={{
    bgcolor: '#29353C',
   }}
   >
    <Modal
    open={open}
    onClose={handleClose}
    >
      <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{transform: 'translate(-50%, -50%)'}}
      width={400}
      bgcolor="#d4d2d2"
      border={"2px solid #44576D"}
      boxShadow={24}
      p={4}
      display={'flex'}
      flexDirection={'column'}
      gap={3}
      >
        <Typography variant="h5"
        color={'#44576D'}
        fontWeight={500}
        >
          Add Item
        </Typography>
        <Stack width="100%"
        direction={'row'}
        spacing = {2}
        fontFamily={'Gill Sans'}
        >
          <TextField variant="outlined"
          fullWidth
          type="text"
          value={itemName}
          fontFamily={'Gill Sans'}
          onChange={(e) => 
            setItemName(e.target.value)
          }
          />
            <Button variant="contained" fontFamily={'Gill Sans'}
            sx={{
              bgcolor: '#AAC7D8',
              color: 'white',
                '&:hover': {
                  bgcolor: '#98bed4',
                }
            }}
            onClick={() => {
              addItem(itemName.toLowerCase())
              setItemName('')
              handleClose()
            }}
            > Add </Button>
        </Stack>
      </Box>
    </Modal>
    <Modal
    open={editOpen}
    onClose={handleEditClose}
    >
      <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{transform: 'translate(-50%, -50%)'}}
      width={400}
      bgcolor="#d4d2d2"
      border={"2px solid #44576D"}
      boxShadow={24}
      p={4}
      display={'flex'}
      flexDirection={'column'}
      gap={3}
      >
        <Typography variant="h5" color={'#44576D'}>Edit Item</Typography>
        <Stack width="100%"
        direction={'row'}
        spacing = {2}
        >
          <TextField variant="outlined"
          fullWidth
          type="text"
          value={itemName}
          onChange={(e) => 
            setItemName(e.target.value)
          }
          />
            <Button variant="contained"
            sx={{
              bgcolor: '#AAC7D8',
              color: 'white',
                '&:hover': {
                  bgcolor: '#98bed4',
                }
            }}
            onClick={() => {
              editItem(prev, itemName.toLowerCase())
              setItemName('')
              handleEditClose()
            }}
            > Edit </Button>
        </Stack>
      </Box>
    </Modal>
    <Stack width="800px" direction={'row'} gap={2}
    display={'flex'} justifyContent={'space-between'}
    >
      <TextField type="text" value={search}
      placeholder="Search Pantry" variant="outlined"
      onChange={(e) => setSearch(e.target.value)}
      sx={{width: "500px",
        marginBottom: 2,
        bgcolor: '#AAC7D8',
        color: '#E6E6E6',
        borderColor: 'white',
      }}
      >
            
      </TextField>
      <Button variant="contained"
      sx={{
        marginBottom: 2,
        bgcolor: '#AAC7D8',
        color: 'white',
        '&:hover': {
          bgcolor: '#98bed4',
        }
      }}
        onClick={() => {
          handleOpen()
        }}
        >
          Add New Item
      </Button>
    </Stack>
    <Box width="800px"
      >
        <Stack height="50px" direction={'row'}
         display={'flex'} alignItems={'center'}
         justifyContent={'space-between'}
         bgcolor={'#44576D'}
        >
          <Typography fontSize={25} color={'#E6E6E6'}
          textAlign={'left'} width="400px" fontFamily={'Gill Sans'} marginLeft={2}
          >
            Item
          </Typography>
          <Typography fontSize={25} fontFamily={'Gill Sans'} marginLeft={-23}
          color={'#E6E6E6'}
          >
            Quantity
          </Typography>
          <Typography fontSize={25} fontFamily={'Gill Sans'} marginRight={2}
          color={'#E6E6E6'}
          >
            Edit
          </Typography>
        </Stack>
      </Box>
    <Stack
    width="800px" height='300px' overflow="auto"
    >
      {
      pantry.filter((item => {
        console.log(typeof item);
        return search.toLowerCase() === "" ? item : JSON.stringify(item).includes(search.toLowerCase());
      })).map(({item, quantity}) => (
        <Box
        key={item} width="100%"
        minHeight={'75px'} display={'flex'}
        alignItems={'center'} justifyContent={'space-between'}
        bgcolor={'#DFEBF6'} border={'0.75px solid black'}
        padding={2} sx={{
          '&:hover': {
            bgcolor: '#dae9f7',
          }
        }}
        >
          <Typography fontSize={35} color="#333"
          textAlign={'left'} width="400px" fontFamily={'Gill Sans'}
          
          >{
            item.charAt(0).toUpperCase() + item.slice(1)
            }
          </Typography>
          <Typography fontSize={35} color="#333"
          textAlign={'center'}
          fontFamily={'Gill Sans'}
          
          >{
            quantity
            }
          </Typography>
          <Stack direction={'row'}
          spacing={2}>
            <Button variant="contained"
            fontFamily={'Gill Sans'}
            sx={{
              bgcolor: '#AAC7D8',
              color: 'white',
              '&:hover': {
                bgcolor: '#98bed4',
              }
            }}
            onClick={() => {
              handleEditOpen(item)
            }}
            >
              Edit
            </Button>


          <Button variant="contained"
          fontFamily={'Gill Sans'}
          sx={{
            bgcolor: '#AAC7D8',
            color: 'white',
              '&:hover': {
                bgcolor: '#98bed4',
              }
          }}
          onClick={() => {
            addItem(item)
          }}
          >
            +
          </Button>
          <Button variant="contained"
          fontFamily={'Gill Sans'}
          sx={{
            bgcolor: '#AAC7D8',
              color: 'white',
              '&:hover': {
                bgcolor: '#98bed4',
              }
          }}
          onClick={() => {
            removeItem(item)
          }}
          > 
            -
          </Button>

          </Stack>
        </Box>
      ))
      }
    </Stack>
   </Box>
  </SignedIn>
  <SignedOut>
    <Box width={'100vw'} height={'100vh'} display={'flex'}
   justifyContent={'center'} alignItems={'center'} gap={2}
   flexDirection={'column'} sx={{
    bgcolor: '#29353C',
   }}
   >
    <Typography fontSize={50} fontFamily={'Gill Sans'}
    color={'#e6e6e6'}
    >
      Welcome to Shelved!
    </Typography>
    <Typography fontSize={20} fontFamily={'Gill Sans'}
    color={'#DFEBF6'}
    >
    Keep your kitchen stocked and minimize food waste with our intuitive pantry tracking app
    </Typography>
    <Link href={'/signin'}>
      <Button variant="contained"
      sx={{
      bgcolor: "#AAC7D8", 
      color: 'white',
      fontFamily: 'Gill Sans',
        '&:hover': {
                bgcolor: '#98bed4',
              }
      }}
      >
        Sign In
      </Button>
    </Link>
    </Box>
  </SignedOut>
  </>
  );
}