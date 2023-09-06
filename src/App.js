import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import music from './So far away_01.mp3'

const localStorageKey = "packing_list_items"; // Key for storing items in localStorage
const initialItems = [
  // { id: 1, description: "Passports", quantity: 2, packed: false },
  // { id: 2, description: "Toiletries", quantity: 1, packed: false },
  // { id: 3, description: "Charger", quantity: 4, packed: false },
];
export default function App() {
  const [items, setItems] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  // Load items from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(localStorageKey);
      if (storedItems) {
        setItems(JSON.parse(storedItems), () => {
          console.log("Data loaded from localStorage:", items);
        });
      } else {
        setItems(initialItems, () => {
          console.log("Data loaded from localStorage:", items);
        });
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setItems(initialItems); // Use initialItems as a fallback value
    }
  }, []);

  // Save the data to local storage whenever the items change
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
    console.log("Data saved to localStorage:", items);
  }, [items]);
  
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const cF = window.confirm("Are you sure you want to delete all items?");
    if (cF) setItems([]);
  }

  function toggleMute() {
    setIsMuted(!isMuted);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
      
      {/* Audio Element */}
      <audio
        src={music}
        loop
        muted={isMuted}
        autoPlay={!isMuted}
      />
      
      {/* Mute/Unmute Button */}
      <button onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
