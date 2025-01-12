const API_URL = "http://localhost:5000/api/notes";

const fetchNotes = async () => {
  const response = await fetch(API_URL);
  const notes = await response.json();

  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;
    notesDiv.appendChild(noteDiv);
  });
};

const addNote = async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (title && content) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    fetchNotes();
  }
};

const deleteNote = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchNotes();
};

document.getElementById("add-note").addEventListener("click", addNote);

fetchNotes();
