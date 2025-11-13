import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function MoodInput({ onMoodSubmit }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [loading, setLoading] = useState(false);
  const moods = [
    { emoji: "😊", label: "Happy", color: "#FFD54F" },
    { emoji: "😔", label: "Sad", color: "#64B5F6" },
    { emoji: "😤", label: "Stressed", color: "#E57373" },
    { emoji: "😌", label: "Relaxed", color: "#81C784" },
    { emoji: "🤩", label: "Excited", color: "#BA68C8" },
    { emoji: "😴", label: "Tired", color: "#A1887F" },
  ];

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood.label);
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return alert("Please log in first!");

      // Save to Firestore
      await addDoc(collection(db, "moods"), {
        uid: user.uid,
        mood: mood.label,
        timestamp: serverTimestamp(),
      });

      // Pass to parent component (to fetch activity suggestions next)
      onMoodSubmit(mood.label);
    } catch (err) {
      console.error("Error saving mood:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>
        How are you feeling today? 💭
      </h2>
      <div>
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            disabled={loading}>
            {mood.emoji}
          </button>
        ))}
      </div>

      {loading && <p>Saving mood...</p>}

      {selectedMood && !loading && (
        <p>
          You’re feeling {selectedMood.toLowerCase()} today ✨
        </p>
      )}
    </div>
  );
}
