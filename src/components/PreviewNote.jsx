import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getNotes } from "../data";

const PreviewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState(getNotes());
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      const note = notes[parseInt(id, 10)];
      if (note) {
        setTopic(note.topic);
        setBody(note.body);
      }
    }
  }, [id, notes]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="prose max-w-[50rem] mx-auto">
        <h2 className="text-xl font-bold">{topic}</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PreviewNote;
