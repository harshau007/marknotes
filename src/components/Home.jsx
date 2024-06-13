import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast, Toaster } from "react-hot-toast";
import { getNotes, saveNotes } from "../data";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    saveNotes(newNotes);
    toast.success("Note deleted!");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    setNotes(reorderedNotes);
    saveNotes(reorderedNotes);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <div className="flex items-center">
          <Link to="/create">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {notes.map((note, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-4 rounded relative hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <Link to={`/preview/${index}`}>
                        <h2 className="text-xl font-bold">{note.topic}</h2>
                      </Link>
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Link to={`/edit/${index}`}>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded">
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(index);
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Home;
