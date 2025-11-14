import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import MoodInput from "../components/MoodInput";

export default function Dashboard(){
    const navigate=useNavigate();
    const handleLogout=async()=>{
        await signOut(auth);
        navigate("/");
    };

    const [suggestions, setSuggestions] = useState("");

   async function fetchSuggestions(mood) {
  const res = await fetch("https://mood-backend-ky6i.onrender.com/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood })
  });

  const data = await res.json();
  return data.suggestions;
}


    const handleMoodSubmit = async (mood) => {
    console.log("Selected mood:", mood);
    const result = await fetchSuggestions(mood);
    setSuggestions(result);
    };
  


    return(
    <div >
      <h2>Welcome to your Dashboard 🎨</h2>
      <MoodInput onMoodSubmit={handleMoodSubmit} />
       {suggestions && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Here are some helpful activities ✨</h3>
          <pre>
            {suggestions}
          </pre>
        </div>
      )}
      <button onClick={handleLogout}>Log Out</button>
    </div>
    );

};
