import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MoodInput from "../components/MoodInput";

export default function Dashboard(){
    const navigate=useNavigate();
    const handleLogout=async()=>{
        await signOut(auth);
        navigate("/");
    };

    const handleMoodSubmit = (mood) => {
    console.log("Selected mood:", mood);
    };

    return(
    <div >
      <h2>Welcome to your Dashboard 🎨</h2>
      <MoodInput onMoodSubmit={handleMoodSubmit} />
      <button onClick={handleLogout}>Log Out</button>
    </div>
    );

};
