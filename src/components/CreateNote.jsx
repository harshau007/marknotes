import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast, Toaster } from "react-hot-toast";
import { getNotes, saveNotes } from "../data";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState(getNotes());
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      const note = notes[parseInt(id, 10)];
      if (note) {
        setTopic(note.topic);
        setBody(note.body);
      }
    }
  }, [id, notes]);

  const saveNote = () => {
    if (topic.trim() === "" || body.trim() === "") {
      toast.error("Topic and body cannot be empty");
      return;
    }

    const newNotes = [...notes];
    const note = { topic, body };

    if (id === undefined) {
      newNotes.push(note);
      toast.success("Note added!");
    } else {
      newNotes[parseInt(id, 10)] = note;
      toast.success("Note updated!");
    }

    setNotes(newNotes);
    saveNotes(newNotes);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 relative">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <button
        onClick={() => setPreview(!preview)}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 ml-4"
      >
        {preview ? (
          <FontAwesomeIcon icon={faEyeSlash} />
        ) : (
          <FontAwesomeIcon icon={faEye} />
        )}
      </button>
      {preview ? (
        <div className="prose dark:prose-dark">
          <h2 className="text-xl font-bold">{topic}</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Topic"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 mb-4 h-[40rem] border rounded"
            placeholder="Write your note here..."
          ></textarea>
          <button
            onClick={saveNote}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {id === undefined ? "Add Note" : "Save Note"}
          </button>
        </div>
      )}

      <div className="absolute top-5 right-0 mt-2 mr-2 text-sm text-gray-500">
        Markdown supported
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default CreateNote;
