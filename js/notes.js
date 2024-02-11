// Глобальные переменные.
const addNoteInput = document.querySelector('#inputAdd');
const addNoteForm = document.querySelector('#addNoteForm');
const notesList = document.querySelector('.notes__list');
const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];

// Функции.

const pushNewNote = () => {
    let addNoteInputValue = addNoteInput.value.trim();
    if (addNoteInputValue.length > 0) {

        renderNote(addNoteInputValue)

        allNotes.push(addNoteInputValue)

        addToLocal(allNotes);
        
        delTextFromAddInput();
    }
    else if (addNoteInputValue.length === 0) {
        alert('введите заметку!!!!!!!!! 0=')
    }

}

const addToLocal = (allNotes) => {
   localStorage.setItem('allNotes', JSON.stringify(allNotes));
}

const renderNote = (addNoteInputValue) => {
    const note = 
    `
    <li class="note">
    <div class="note__icon-star">
       <svg class="star-svg">
          <use xlink:href = "#star"></use>
       </svg>
    </div>
    <textarea class="note__text">${addNoteInputValue}</textarea>
    <button class="trash-btn">
       <svg class="trash-svg">
          <use xlink:href = "#trash"></use>
       </svg>
    </button>
 </li>
    `;
    notesList.insertAdjacentHTML('afterbegin', note);
}

const showAllNotes = (allNotes) => {
    allNotes.forEach(element => {
        const note = 
        `
        <li class="note">
        <div class="note__icon-star">
           <svg class="star-svg">
              <use xlink:href = "#star"></use>
           </svg>
        </div>
        <textarea class="note__text">${element}</textarea>
        <button class="trash-btn">
           <svg class="trash-svg">
              <use xlink:href = "#trash"></use>
           </svg>
        </button>
     </li>
        `;
        notesList.insertAdjacentHTML('afterbegin', note);
    });
}

const delNoteFromStorage = (noteText) => {
   const noteIndex = allNotes.indexOf(noteText);
   allNotes.splice(noteIndex, 1);
   addToLocal(allNotes);
}
const delNoteFromRender = (currentNote) => {
   currentNote.remove()
}

const delTextFromAddInput = () => {
   addNoteInput.value = '';
}

// События.

showAllNotes(allNotes);

addNoteForm.addEventListener('submit', pushNewNote);


notesList.addEventListener('click', (e) => {
   const trashBtn = e.target;

   if (trashBtn.closest('.trash-btn')) {
      const currentNote = trashBtn.closest('.note');
      const noteInput = currentNote.querySelector('.note__text');
      const noteText = noteInput.value;
      delNoteFromStorage(noteText);
      delNoteFromRender(currentNote)
   }
})

// 1. Delite note from array.
// 2. Add updated array to local storagę.
// 3. Remove ńote from render.