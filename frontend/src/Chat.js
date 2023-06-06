import React,{useState,useEffect} from 'react'
import "./App.css"
import ScrollToBottom from "react-scroll-to-bottom"
const Chat = ({socket,username,room}) => {
    const [message,setmessage]=useState("")
    const [messagelist,setmessagelist]=useState([])
    const sendMessage=async ()=>{
        if(message!==""){
        var today=new Date().toLocaleString("en-US",{
            hour:"numeric",
            minute:"numeric",
            hour12:true
        })
        const option={
            author:username,
            room:room,
            context:message,
            time:today
        }
        await socket.emit("send_data",option);
        setmessagelist((list)=>[...list,option])
        setmessage("")
    }
    }
    useEffect(()=>{
        socket.on("receive_data",(data)=>{
            console.log(data)
            setmessagelist((list) => [...list,data])
        })//<--
    },[socket])
  return (
    <center>
    <div className="main-container">
      <div className="heading">
        <h4>Your Live Chat</h4>
      </div>
      <div className="your-chat">
        <ScrollToBottom className="my-chat">
        {
            messagelist.map((ele)=>{
                return(
                <div id={username===ele.author?"its-me" :"its-you"}>
                    <div>
                        {ele.context}
                    </div>
                    <p className="venue">
                      <span id="sender">{ele.author}</span>
                      <span id="timings">{ele.time}</span>
                   </p>
                </div>
                )
            })
        }
        </ScrollToBottom>
      </div>
      <div className="footer">
        <input type="text" id="input-message" placeholder="Send Message..." value={message} onChange={(e)=>setmessage(e.target.value)}/>
        <button type="submit" id="button" onClick={sendMessage} onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}><img src="https://cdn-icons-png.flaticon.com/128/3682/3682321.png" alt="not found" height="33px" width="30px"></img></button>
      </div>
    </div>
    </center>
  )
}

export default Chat
