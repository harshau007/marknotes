export const getNotes = () => {
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  return storedNotes || [];
};

export const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
