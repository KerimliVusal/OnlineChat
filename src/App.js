import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import {useState,useEffect} from 'react';
import Chat from './chat';
import Load from './load';

const socket=io.connect("http://localhost:3001")

function App() {
  const [username,setUsername]=useState('')
  const [room,setRoom]=useState('')
  const [show,setShow]=useState(false)
  const [load,setload]=useState(true)
  const joinRoom=()=>{
    if(username!==''&&room!==''){
      socket.emit("join_room",room)
      setShow(true)
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      setload(false)
    },3000)
  },[])
  return (
    <div className="App">
      {load?<Load/>
      :
      <div>
      {(!show)?
      <div className='joinChatContainer'>
        <h1>Let's Talk</h1>
    <input type='text' placeholder='username...' onChange={(e)=>setUsername(e.target.value)}/>
    <input type='password' placeholder='password...' onChange={(e)=>setRoom(e.target.value)}/>
    <button onClick={()=>joinRoom()}>Start</button>
    </div>
    :
    <Chat socket={socket} username={username} room={room}/>
  }</div> 
      }
    </div>
  );
}

export default App;
