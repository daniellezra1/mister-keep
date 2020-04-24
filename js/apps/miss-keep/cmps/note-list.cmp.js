import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteAudio from '../cmps/note-audio.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteMap from '../cmps/note-map.cmp.js'
import noteEdit from '../cmps/note-edit.cmp.js'

export default {
    template:  `
    <section>

        <h1 v-if="pinnedOn">Pinned Notes:</h1>
            <ul v-if="pinnedOn" class="notes">
                <li class="note" v-for="note in pinnedNotes">
                    <component :is="note.type" :note="note" @edit-note="editNote" @delete-note="deleteNote" @change-bcg-color="changeBcgColor" @change-txt-color="changeTxtColor" @toogle-pin="tooglePin">
                    </component>
                </li>
            </ul>

        <h1 v-if="pinnedOn">Other Notes:</h1>
        <h1 v-else>Notes:</h1>
            <ul class="notes">
                <li class="note" v-for="note in otherNotes">
                    <component :is="note.type" :note="note" @edit-note="editNote" @delete-note="deleteNote" @change-bcg-color="changeBcgColor" @change-txt-color="changeTxtColor" @toogle-pin="tooglePin">
                    </component>
                </li>
            </ul>

        <transition name="fade" class="fade-enter-active fade-leave-active fade-enter fade-leave-to">
        <note-edit v-if="editMode" :note="selectedNote" @close-edit="closeEdit" @delete-edit="deleteNote" @save-changes="changeInfo"></note-edit>
        </transition>
        <div class="screen" v-if="editMode"></div>

    </section>
    `,
    props: ['notes', 'filterType', 'searchKeyword'],
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteAudio,
        noteMap,
        noteEdit
    },
    data() {
        return {
            editMode: false,
            selectedNote: {},
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete-note', noteId)
        },
        changeBcgColor(bcgColor, noteId) {
            this.$emit('change-bcg-color', bcgColor, noteId)
        },
        changeTxtColor(txtColor, noteId) {
            this.$emit('change-txt-color', txtColor, noteId)
        },
        editNote(note) {
            this.selectedNote = note
            this.editMode = true
        },
        closeEdit() {
            this.editMode = false
        },
        changeInfo(noteInfo, noteId) {
            this.$emit('change-info', noteInfo, noteId)
        },
        tooglePin(noteId) {
            this.$emit('toogle-pin', noteId)
        }
    },
    computed: {
        pinnedNotes() {
            var notes = this.notes
            notes = notes.filter(note => note.info.titleTxt.toLowerCase().includes(this.searchKeyword.toLowerCase()))
            if (this.filterType === 'All') return notes.filter(note => note.isPinned === true)
            else return notes.filter(note => note.isPinned === true && note.type === this.filterType)
        },
        otherNotes() {
            var notes = this.notes
            notes = notes.filter(note => note.info.titleTxt.toLowerCase().includes(this.searchKeyword.toLowerCase()))
            if (this.filterType === 'All') return notes.filter(note => note.isPinned === false)
            else return notes.filter(note => note.isPinned === false && note.type === this.filterType)
        },
        // pinnedNotes() {
        //     if (this.filterType === 'All') return this.notes.filter(note => note.isPinned === true)
        //     else return this.notes.filter(note => note.isPinned === true && note.type === this.filterType)
        // },
        // otherNotes() {
        //     if (this.filterType === 'All') return this.notes.filter(note => note.isPinned === false)
        //     else return this.notes.filter(note => note.isPinned === false && note.type === this.filterType)
        // },
        pinnedOn() {
            if (this.pinnedNotes.length === 0) return false
            else return true
        }
    }
}