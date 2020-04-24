import {globalEventBus, EVENT_MSG} from '../../../services/eventbus.service.js'

export default {
    template: `
    <section class="note-add">
        <div class="text-area">
            <transition name="fade" class="fade-enter-active fade-leave-active fade-enter fade-leave-to">
            <input @click="openInput($event)" type="text" placeholder="Enter title for the note" v-if="isOn" v-model="noteTitle"/>
            </transition>
            <input @click="openInput($event)" type="text" :placeholder="placeholderByType" v-model="noteBody"/>
        </div>
        <div class="control-area">
            <button @click="setType('note-txt')" :class="{'selected-type': noteType === 'note-txt'}" title="Text note"><i class="fas fa-font fa-2x"></i></button>
            <button @click="setType('note-img')" :class="{'selected-type': noteType === 'note-img'}" title="Image note"><i class="far fa-image fa-2x"></i></button>
            <button @click="setType('note-video')" :class="{'selected-type': noteType === 'note-video'}" title="Video note"><i class="fab fa-youtube fa-2x"></i></button>
            <button @click="setType('note-audio')" :class="{'selected-type': noteType === 'note-audio'}" title="Audio note"><i class="fas fa-volume-up fa-2x"></i></button>
            <button @click="setType('note-todos')" :class="{'selected-type': noteType === 'note-todos'}" title="List note"><i class="fas fa-list fa-2x"></i></button>
            <button @click="setType('note-map')" :class="{'selected-type': noteType === 'note-map'}" title="Map note"><i class="fas fa-map-marked-alt fa-2x"></i></button>
            <button @click="addNote" class="add-btn" title="Add note"><i class="fas fa-plus fa-2x"></i></button>
        </div>
    </section>
    `,
    data() {
        return {
            noteType: 'note-txt',
            noteTitle: '',
            noteBody: '',
            note: {type:'', info: {}},
            isOn: false,
        }
    },
    created() {
        window.addEventListener('click', () => this.isOn = false)
    },
    methods: {
        setType(type) {
            event.stopPropagation()
            this.noteType = type
        },
        openInput(event) {
            event.stopPropagation()
            this.isOn = true
        },
        addNote() {
            if(!this.noteBody || !this.noteTitle) {
                globalEventBus.$emit(EVENT_MSG, {title:'ERROR', body:'You need to add text (title and body)', type: 'error'})
                return
            }
            
            this.note.type = this.noteType
            this.note.info.titleTxt = this.noteTitle

            if (this.note.type === 'note-txt') {
                this.note.info.bodyTxt = this.noteBody
            } else if (this.note.type === 'note-todos') {
                var todos = this.noteBody.split(',')
                todos = todos.map(todo => {
                    todo = {todo: todo.trim(), isDone: false}
                    return todo
                })
                    
                console.log(todos)
                this.note.info.todos = todos
            } else if(this.note.type === 'note-map') {
                this.note.info.location = this.noteBody
            } else if (this.note.type === 'note-img' || 'note-video' || 'note-audio') {
                this.note.info.url = this.noteBody
            } 
            this.$emit('add-note', this.note)
            this.noteTitle = ''
            this.noteBody = ''
            this.note= {type:'', info: {}}
        }
    },
    computed: {
        placeholderByType() {
            switch(this.noteType) {
                case 'note-txt':
                return  `What's on your mind...`
                case 'note-img':
                return  `Enter image URL...`
                case 'note-video':
                return  `Enter video URL...`
                case 'note-audio':
                return  `Enter audio URL...`
                case 'note-todos':
                return  `Enter comma separated list...`
                case 'note-map':
                return  `Enter location...`
            }
        }
    }
    
}