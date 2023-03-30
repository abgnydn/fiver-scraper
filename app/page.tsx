"use client";
import { useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [url, setUrl] = useState("");
  const [newGigIdeas, setNewGigIdeas] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `/api/gigs?url=${encodeURIComponent(url)}`
      );
      if (data.success) {
        setNewGigIdeas(data.newGigIdeas);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Fiverr URL"
        />
        <button type="submit">Get new gig ideas</button>
      </form>
      {newGigIdeas.length > 0 && (
        <div>
          <h3>New Gig Ideas</h3>
          <ul>
            {newGigIdeas.map((idea, index) => (
              <li key={index}>{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
