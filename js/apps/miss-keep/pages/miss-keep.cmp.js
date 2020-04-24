import { missKeepService } from '../services/miss-keep.service.js'
import {globalEventBus, EVENT_MSG} from '../../../services/eventbus.service.js'

import noteAdd from '../cmps/note-add.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    template: `
    <div class="miss-keep-app">
        <h1>Mister Keep</h1>
        <note-add @add-note="addNote"></note-add>
        <note-filter @set-filter="setFilter" @set-search="searchByKeyword"></note-filter>
        <note-list :notes="notes" :filterType='filterType' :searchKeyword='searchKeyword' @delete-note="deleteNote" @change-bcg-color="changeBcgColor" @change-txt-color="changeTxtColor" @change-info="changeInfo" @toogle-pin="tooglePin"></note-list>
    </div>
    `,
    data() {
        return {
            notes: [],
            filterType: 'All',
            searchKeyword: ''
        }
    },
    created() {
        missKeepService.getNotes()
            .then(notes => this.notes = notes)
    },
    methods: {
        addNote(note) {
            missKeepService.addNote(note)
                .then(res => {
                    globalEventBus.$emit(EVENT_MSG, {title:'SUCCESS', body:'The note was successfully added', type: 'success'})
                })
                .catch(res => {
                    globalEventBus.$emit(EVENT_MSG, {title:'ERROR', body:'Your request has been rejected', type: 'error'})
                })

        },
        deleteNote(noteId) {
            missKeepService.deleteNote(noteId)
                .then(res => {
                    globalEventBus.$emit(EVENT_MSG, {title:'SUCCESS', body:'The note was successfully deleted', type: 'success'})
                })
                .catch(res => {
                    globalEventBus.$emit(EVENT_MSG, {title:'ERROR', body:'Your request has been rejected', type: 'error'})
                })
        },
        changeBcgColor(bcgColor, noteId) {
            missKeepService.changeBcgColor(bcgColor, noteId)
        },
        changeTxtColor(txtColor, noteId) {
            missKeepService.changeTxtColor(txtColor, noteId)
        },
        changeInfo(noteInfo, noteId){
            missKeepService.changeInfo(noteInfo, noteId)
                .then(res => {
                    globalEventBus.$emit(EVENT_MSG, {title:'SUCCESS', body:'Your note was successfully update', type: 'success'})
                })
                .catch(res => {
                    globalEventBus.$emit(EVENT_MSG, {title:'ERROR', body:'Your request has been rejected', type: 'error'})
                })
        },
        tooglePin(noteId) {
            missKeepService.tooglePin(noteId)
        },
        setFilter(filterType) {
            this.filterType = filterType
        },
        searchByKeyword(searchKeyword) {
            this.searchKeyword = searchKeyword
        }

    },
    components: {
        noteAdd,
        noteFilter,
        noteList
    }

}