// const allNotes = ['Yabloko', 'banan', 'ogurec'];

// localStorage.setItem('allNotes', JSON.stringify(allNotes));

// const arrayParse = JSON.parse(localStorage.getItem('allNotes'));

const addNoteInput = document.querySelector('#inputAdd');
const addNoteForm = document.querySelector('#addNoteForm');
const allNotes = [];

const pushNewNote = () => {
    let addNoteInputValue = addNoteInput.value.trim();
    if (addNoteInputValue.length > 0) {
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

addNoteForm.addEventListener('submit', pushNewNote);
