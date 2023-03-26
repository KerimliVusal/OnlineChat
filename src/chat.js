import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import logo from '../src/unnamed.png'

const Chat=({socket,room,username})=>{
    const[message,setMessage]=useState("")
    const[list,setList]=useState([])
    const sendMessage= async ()=>{
        if(message!==""){
            const messagedata={
                room:room,
                author:username,
                message:message,
                time: new Date(Date.now()).getHours() 
                + ":" 
                + new Date(Date.now()).getUTCMinutes(),
            };
            await socket.emit("send_data",messagedata)
            setList((list)=>[...list,messagedata])

        }
        setMessage('')
    }
    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setList((list)=>[...list,data])

        })
    },[socket])
    return(
        <div className="chat-window">
             <div className="chat-header">
                <span className="span"></span>
             <p style={{color:'white'}}>{username}</p>
          </div>

          <div className="chat-body">
            <ScrollToBottom className="message-container">
            {list.map((txt)=>(
                <div className="message"   id={username === txt.author ? "you" : "other"}>
                <div className="message-content">{txt.message}</div>
                <div className="message-meta">
                <p id="time">{txt.time}</p>
                <p id="aithor">{txt.author}</p>
                
                </div>
                </div>
            ))}
          </ScrollToBottom>
          </div>
          
          <div className="chat-footer">
          <input type='text' value={message} placeholder="send message..." onChange={(e)=>setMessage(e.target.value)}/>
          <button onClick={()=>sendMessage()}>&#9658;</button>
          </div>
        </div>
    )
}; export default Chat