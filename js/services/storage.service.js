const BOOKS_KEY = 'books';
const MAILS_KEY = 'mails';
const NOTES_KEY = 'notes';

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
}


export const storageService = {
    store,
    load
}