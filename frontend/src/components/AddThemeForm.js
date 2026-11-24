import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

function AddThemeForm() {
  const [themeName, setThemeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addTheme = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/add-theme`,
        {
          name: themeName,
          imageUrl: imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Theme added successfully:", response);
    } catch (error) {
      console.error("Error adding theme:", error);
    }
  };

  return (
    <div>
      <h2>Add New Theme</h2>
      <input
        type="text"
        placeholder="Enter theme name"
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={addTheme}>Add Theme</button>
    </div>
  );
}

export default AddThemeForm;
