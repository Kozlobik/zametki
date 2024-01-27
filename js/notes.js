// const allNotes = ['Yabloko', 'banan', 'ogurec'];

// localStorage.setItem('allNotes', JSON.stringify(allNotes));

// const arrayParse = JSON.parse(localStorage.getItem('allNotes'));

const addNoteInput = document.querySelector('#inputAdd');
const addNoteForm = document.querySelector('#addNoteForm');
const notesList = document.querySelector('.notes__list');
const allNotes = [];

const pushNewNote = () => {
    let addNoteInputValue = addNoteInput.value.trim();
    if (addNoteInputValue.length > 0) {
        renderNote(addNoteInputValue)
        allNotes.push(addNoteInputValue)
        addToLocal(allNotes);
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
addNoteForm.addEventListener('submit', pushNewNote);
