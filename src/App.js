import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='app-container'>
        <header className="App-header">
         <h1>📝 Smart Notes</h1>
         <button id="theme-toggle" title="Toggle Theme">🌙</button>
        </header>
        <main className='main-content'>
         <form id="note-form">
          <textarea id="note-input" maxlength="300" placeholder="Write something smart..."></textarea>
          <div class="form-footer">
           <span id="char-count">0/300</span>
           <button type="submit">➕ Add Note</button>
          </div>
         </form>
      <div id="notes-list"></div>
    </main>
      </div>
  </div>  
  );
}
const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');
const count = document.getElementById('char-count');
const toggleTheme = document.getElementById('theme-toggle');

// Theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleTheme.textContent = '☀️';
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  toggleTheme.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// Char count
input.addEventListener('input', () => {
  count.textContent = `${input.value.length}/300`;
});

// Notes logic
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
  list.innerHTML = '';
  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note';

    div.innerHTML = `
      <div class="content">${formatNote(note.content)}</div>
      <time>${note.timestamp}</time>
      <div class="actions">
        <button onclick="editNote(${index})">✏️</button>
        <button onclick="deleteNote(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function formatNote(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\n/g, "<br>");
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = input.value.trim();
  if (val) {
    notes.unshift({
      content: val,
      timestamp: new Date().toLocaleString()
    });
    input.value = '';
    count.textContent = '0/300';
    saveNotes();
    renderNotes();
  }
});

window.deleteNote = (i) => {
  notes.splice(i, 1);
  saveNotes();
  renderNotes();
};

window.editNote = (i) => {
  const newContent = prompt('Edit your note:', notes[i].content);
  if (newContent !== null) {
    notes[i].content = newContent;
    notes[i].timestamp = new Date().toLocaleString();
    saveNotes();
    renderNotes();
  }
};

renderNotes();

export default App;
