import './App.css';
import {useState} from "react"
import io from "socket.io-client"
import Chat from "./Chat.js"
const socket=io.connect("http://localhost:3001")
function App() {
  const [state,setstate]=useState(false)
  const [username,setusername]=useState("")
  const [room,setroom]=useState("")
  const Hello=()=>{
    if(username!==""&&room!==""){
      socket.emit("join_room",room);
      setstate(true);
    }
  }
  return (
    <>
    <div className="App">
      {!state?
      (
      <center>
      <div className="joinChat">
      <p className="heading1">Let's Have A Chat!</p>
      <input type="text" id="input-name" onChange={(e)=>setusername(e.target.value)} placeholder="Your Name..." maxlength="10" required pattern="[a-zA-Z][a-zA-Z\s]*" />
      <input type="text" id="input-room" onChange={(e)=>setroom(e.target.value)} placeholder="Room Id..."/>
      <button className="submit" onClick={Hello}>Join The Room</button>
    </div>
    </center>)
    :
    (
      <Chat socket={socket} username={username} room={room}/>
    )
}
</div>
</>

)
}
export default App;
