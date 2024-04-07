// Глобальные переменные.
const addNoteInput = document.querySelector('#inputAdd');
const addNoteForm = document.querySelector('#addNoteForm');
const notesList = document.querySelector('.notes__list');
const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];
const searchNoteInput = document.querySelector('#input-search'); 
const noteFilter = document.querySelector('.note-filter');

// Функции.

const createNewObject = (addNoteInputValue) => {
   const note = {
      value: addNoteInputValue,
      isFavorite: false,
      id: allNotes.length,
   }
   return note;
}

const pushNewNote = () => {
    let addNoteInputValue = addNoteInput.value.trim();
    if (addNoteInputValue.length > 0) {
       
       const newNote = createNewObject(addNoteInputValue)
       
       renderNote(newNote)

        allNotes.push(newNote)

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

const renderNote = (newNote) => {
    const note = 
    `
    <li class="note" id="${newNote.id}">
    <button class="note__icon-star">
       <svg class="star-svg">
          <use xlink:href = "#star"></use>
       </svg>
    </button>
    <textarea class="note__text">${newNote.value}</textarea>
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
      let status;
      element.isFavorite ? status = 'active' : status = '';

        const note = 
        `
         <li class="note" id="${element.id}">
            <button class="note__icon-star ${status}">
               <svg class="star-svg">
                  <use xlink:href = "#star"></use>
               </svg>
            </button>
            <textarea class="note__text">${element.value}</textarea>
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

const delNoteFromStorage = (noteId) => {

   allNotes.forEach(eachNote => {
      if (+noteId === eachNote.id) {
         allNotes.splice(+noteId, 1);
         addToLocal(allNotes);
         console.log(noteId);
         console.log(allNotes);
      }            
   })
}
const delNoteFromRender = (currentNote) => {
   currentNote.remove()
}

const delTextFromAddInput = () => {
   addNoteInput.value = '';
}

const filtreNotes = () => {
   const searchNoteInputValue = searchNoteInput.value.toLowerCase();
   const allTextAreas = document.querySelectorAll('.note__text');

   allTextAreas.forEach(element => {
      let noteTextValue = element.value.toLowerCase();
      if(noteTextValue.indexOf(searchNoteInputValue) == -1){
         element.closest('.note').style.display = 'none';
      }  
      else{
         element.closest('.note').style.display = 'flex';
      }
   })
}

const dyeStarSearchButton = (e) => {
   const star = e.target;
   
   if (star.closest('.note__icon-star')) {
      star.closest('.note__icon-star').classList.toggle('active');
   }
}

const getTextValueFromNote = (e) => {
   const note = e.target.closest('.note');
   const noteTextArea = note.querySelector('.note__text');
   const noteTextAreaValue = noteTextArea.value;
   return noteTextAreaValue;
}

const changeNoteStatus = (e) => {
   if (e.target.closest('.note__icon-star')) {
      const valueFromNote = getTextValueFromNote(e);
      allNotes.forEach(objectNote => {
         if (objectNote.value === valueFromNote){
            if (!objectNote.isFavorite){
               objectNote.isFavorite = true;
               return
            }
            objectNote.isFavorite = false;
         }
      });
   }
}

// События.

showAllNotes(allNotes);

addNoteForm.addEventListener('submit', pushNewNote);

notesList.addEventListener('click', (e) => {
   const trashBtn = e.target;

   if (trashBtn.closest('.trash-btn')) {
      const currentNote = trashBtn.closest('.note');
      delNoteFromStorage(currentNote.id);
      delNoteFromRender(currentNote);
   }
})

searchNoteInput.addEventListener('keyup', filtreNotes);

notesList.addEventListener('click', (e) => {
   dyeStarSearchButton(e);
   changeNoteStatus(e);
   addToLocal(allNotes);
})

noteFilter.addEventListener('click', (e) => {
   dyeStarSearchButton(e);
})


//// Добавление айди!

//// 1. в объект заметки добавить свойство айди
//// 2. перебрать циклом все заметки и проверитьь что в текущей заметке айди на 1 болше чем у предидущей!!!!
//// 2.1. проверить что предидущая заметка существует



// Удаление айди!

//// 1. найти нужную заметку в массиве
//// 1. удалить заметку из массива используя id
// 2. у всех следующих уменьшить id на 1
//// 3. запустить перерендер чтобы изменить idшки в разметке????