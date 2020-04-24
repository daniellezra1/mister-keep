import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/utils.service.js'

export const missKeepService = {
    getNotes,
    getNoteById,
    getNoteIndexById,
    addNote,
    deleteNote,
    changeBcgColor,
    changeTxtColor,
    changeInfo,
    tooglePin
}

const NOTES_KEY = 'notes';
var notesDB = _createNotes();


function getNotes() {
    return Promise.resolve(notesDB);
}

function getNoteById(noteId) {
    const note = notesDB.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function getNoteIndexById(noteId) {
    const note = notesDB.findIndex(note => note.id === noteId)
    return Promise.resolve(note)
}

function addNote(note) {
    var newNote = _createNote(note.type, note.info)
    notesDB.unshift(newNote)
    storageService.store(NOTES_KEY, notesDB);
    return Promise.resolve('add')
}

function deleteNote(noteId) {
    getNoteIndexById(noteId)
        .then(idx => {
            notesDB.splice(idx, 1)
            storageService.store(NOTES_KEY, notesDB);
        })
    return Promise.resolve('deleted')
}

function changeBcgColor(bcgColor, noteId) {
    getNoteById(noteId)
        .then(note => {
            note.style.bcgColor = bcgColor
            storageService.store(NOTES_KEY, notesDB);
        })
}

function changeTxtColor(txtColor, noteId) {
    getNoteById(noteId)
        .then(note => {
            note.style.txtColor = txtColor
            storageService.store(NOTES_KEY, notesDB);
        })
}

function changeInfo(noteInfo, noteId){
    getNoteById(noteId)
        .then(note => {
            note.info = noteInfo
            storageService.store(NOTES_KEY, notesDB);
        })
    return Promise.resolve('update')
}

function tooglePin(noteId) {
    getNoteById(noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            storageService.store(NOTES_KEY, notesDB);
        })
}

function _createNotes() {
    var notes = storageService.load(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [_createNote('note-txt', {titleTxt:'My first note', bodyTxt:'Non eram nescius, Brute, cum, quae summis ingeniis exquisitaque doctrina philosophi Graeco sermone tractavissent, ea Latinis litteris mandaremus, fore ut hic noster labor in varias reprehensiones incurreret. nam quibusdam, et iis quidem non admodum indoctis, totum hoc displicet philosophari. quidam autem non tam id reprehendunt, si remissius agatur, sed tantum studium tamque multam operam ponendam in eo non arbitrantur. erunt etiam, et ii quidem eruditi Graecis litteris, contemnentes Latinas, qui se dicant in Graecis legendis operam malle consumere. postremo aliquos futuros suspicor, qui me ad alias litteras vocent, genus hoc scribendi, etsi sit elegans, personae tamen et dignitatis esse negent.'}, '#ffb6b6'), 
                 _createNote('note-todos', {titleTxt:'My list', todos:[{todo: 'learn Javascript', isDone: false},{todo:'do some css changes in my app', isDone: false},{todo: 'learn vue and write a lot of cool components!!!', isDone: false}]}, '#aacfcf'),
                 _createNote('note-img', {titleTxt:'Img Note', url:'https://www.cheatsheet.com/wp-content/uploads/2019/06/Jennifer-Aniston-4-1024x682.jpg'}, '#ffd3b6'), 
                 _createNote('note-audio', {titleTxt:'Audio Note', url:'https://www.computerhope.com/jargon/m/example.mp3'}, '#b590ca'), 
                 _createNote('note-video', {titleTxt:'Video Note', url:'https://www.youtube.com/watch?v=99NyTTA-q-4'}, '#a0ffe6'),
                 _createNote('note-todos', {titleTxt:'My list', todos:[{todo: 'learn Javascript', isDone: false},{todo:'do some css changes in my app', isDone: false},{todo: 'learn vue and write a lot of cool components!!!', isDone: false}]}, '#fde2e2'),
                 _createNote('note-img', {titleTxt:'Img Note', url:'https://www.cheatsheet.com/wp-content/uploads/2019/06/Jennifer-Aniston-4-1024x682.jpg'}, '#ccedd2'), 
                 _createNote('note-audio', {titleTxt:'Audio Note', url:'https://www.computerhope.com/jargon/m/example.mp3'}, '#ffd5e5'), 
                 _createNote('note-video', {titleTxt:'Video Note', url:'https://www.youtube.com/watch?v=99NyTTA-q-4'}, '#ffffdd'),
                 _createNote('note-todos', {titleTxt:'My list', todos:[{todo: 'learn Javascript', isDone: false},{todo:'do some css changes in my app', isDone: false},{todo: 'learn vue and write a lot of cool components!!!', isDone: false}]}, '#679b9b'),
                 _createNote('note-img', {titleTxt:'Img Note', url:'https://www.cheatsheet.com/wp-content/uploads/2019/06/Jennifer-Aniston-4-1024x682.jpg'}, '#e7d39f'), 
                 _createNote('note-audio', {titleTxt:'Audio Note', url:'https://www.computerhope.com/jargon/m/example.mp3'}, '#f3ecb8'), 
                 _createNote('note-video', {titleTxt:'Video Note', url:'https://www.youtube.com/watch?v=99NyTTA-q-4'}, '#f6e5f5'),
                 _createNote('note-todos', {titleTxt:'My list', todos:[{todo: 'learn Javascript', isDone: false},{todo:'do some css changes in my app', isDone: false},{todo: 'learn vue and write a lot of cool components!!!', isDone: false}]}, '#cff1ef'),
                 _createNote('note-img', {titleTxt:'Img Note', url:'https://www.cheatsheet.com/wp-content/uploads/2019/06/Jennifer-Aniston-4-1024x682.jpg'}, '#cbe2b0'), 
                 _createNote('note-audio', {titleTxt:'Audio Note', url:'https://www.computerhope.com/jargon/m/example.mp3'}, '#f6e7e6'), 
                 _createNote('note-video', {titleTxt:'Video Note', url:'https://www.youtube.com/watch?v=99NyTTA-q-4'}, '#fbf4f9'),
                 _createNote('note-todos', {titleTxt:'My list', todos:[{todo: 'learn Javascript', isDone: false},{todo:'do some css changes in my app', isDone: false},{todo: 'learn vue and write a lot of cool components!!!', isDone: false}]}, '#9dd8c8'),
                 _createNote('note-img', {titleTxt:'Img Note', url:'https://www.cheatsheet.com/wp-content/uploads/2019/06/Jennifer-Aniston-4-1024x682.jpg'}, '#effcef'), 
                 _createNote('note-audio', {titleTxt:'Audio Note', url:'https://www.computerhope.com/jargon/m/example.mp3'}, '#b9cced'), 
                 _createNote('note-video', {titleTxt:'Video Note', url:'https://www.youtube.com/watch?v=99NyTTA-q-4'}, '#a0ffe6'),
                _createNote('note-map', {titleTxt:'Map Note', location:'tel aviv'}, '#c2b0c9')];
        storageService.store(NOTES_KEY, notes);
    }
    return notes
}

function _createNote(type, info, bcgColor = 'rgb(212, 209, 209)') {
    return {
        id: utilService.makeId(),
        type: type,
        isPinned: false,
        isMarked: false,
        isOpen: false,
        createdTime: Date.now(),
        style: {
            txtColor: '#000',
            bcgColor
        },
        info: info,       
    }
}