import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
const [input, setInput] = useState('');
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

useEffect(() => {
localStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);

useEffect(() => {
document.body.classList.toggle('dark', theme === 'dark');
}, [theme]);

const handleInputChange = (e) => {
setInput(e.target.value);
};

const handleSubmit = (e) => {
e.preventDefault();
if (input.trim()) {
const newNote = {
content: input,
timestamp: new Date().toLocaleString(),
};
setNotes([newNote, ...notes]);
setInput('');
}
};

const handleDelete = (index) => {
setNotes(notes.filter((_, i) => i !== index));
};

const handleEdit = (index) => {
const newContent = prompt('Edit your note:', notes[index].content);
if (newContent !== null) {
const updatedNotes = [...notes];
updatedNotes[index] = {
...updatedNotes[index],
content: newContent,
timestamp: new Date().toLocaleString(),
};
setNotes(updatedNotes);
}
};

const handleThemeToggle = () => {
setTheme(theme === 'dark' ? 'light' : 'dark');
};

const formatNote = (text) => {
return text
.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
.replace(/\*(.*?)\*/g, '<i>$1</i>')
.replace(/\n/g, '<br>');
};


return (
<div className="App">
<header className="App-header">
<h1>📝 Smart Notes</h1>
<button id="theme-toggle" title="Toggle Theme" onClick={handleThemeToggle}>
{theme === 'dark' ? '☀️' : '🌙'}
</button>
</header>
<main className="main-content">
<form id="note-form" onSubmit={handleSubmit}>
<textarea
id="note-input"
maxLength="300"
placeholder="Write something smart..."
value={input}
onChange={handleInputChange}
/>
<div className="form-footer">
<span id="char-count">{input.length}/300</span>
<button type="submit">➕ Add Note</button>
</div>
</form>
<div id="notes-list">
{notes.map((note, index) => (
<div className="note" key={index}>
<div className="content">{formatNote(note.content)}</div>
<time>{note.timestamp}</time>
<div className="actions">
<button onClick={() => handleEdit(index)}>✏️</button>
<button onClick={() => handleDelete(index)}>🗑️</button>
</div>
</div>
))}
</div>
</main>
</div>
);
}

export default App;