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
   <header class="note__header">
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
   </header>
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
         <header class="note__header">
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
         </header>
         </li>
        `;
        notesList.insertAdjacentHTML('afterbegin', note);
    });
}

const delNoteFromStorage = (noteId) => {
   for (let i = 0; i < allNotes.length; i++) {
      if (+noteId === allNotes[i].id) {
         for (let j = +noteId + 1; j < allNotes.length; j++) {
            allNotes[j].id = allNotes[j].id - 1;
         }
         allNotes.splice(+noteId, 1);
         addToLocal(allNotes);
      }
   }
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

const dyeStarSearchButton = (targetElement) => { 
   
   targetElement.classList.toggle('active');
};

const getTextValueFromNote = (e) => {
   const note = e.target.closest('.note');
   const noteTextArea = note.querySelector('.note__text');
   const noteTextAreaValue = noteTextArea.value;
   return noteTextAreaValue;
}

const changeNoteStatus = (e) => {
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

const reduceId = () => {
   for (let currentId; currentId < allNotes.length; currentId++) {
      
   }
}

// События.

showAllNotes(allNotes);

addNoteForm.addEventListener('submit', pushNewNote);

notesList.addEventListener('click', (e) => {
   const targetElement = e.target;

   

   if (targetElement.closest('.trash-btn')) {
      const currentNote = targetElement.closest('.note');
      delNoteFromStorage(currentNote.id);
      delNoteFromRender(currentNote);
   }

   if (targetElement.closest('.note__icon-star')){
      const starBtn = targetElement.closest('.note__icon-star');
      dyeStarSearchButton(starBtn);
   }



   changeNoteStatus(e);
})

searchNoteInput.addEventListener('keyup', filtreNotes);

notesList.addEventListener('click', (e) => {
   dyeStarSearchButton(e);
   addToLocal(allNotes);
})

noteFilter.addEventListener('click', (e) => {
   dyeStarSearchButton(e);
})



// дописать функцию уменьшения id для всех последующих заметок после удалённой заметки
//скрыть из разметки интерфейс редактирования заметки (display: none), если на заметке нет класса open
//