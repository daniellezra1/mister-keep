import longText from '../../../cmps/long-text.cmp.js'

export default {
    template: `
        <div class="note-prev" :style="{ color: txtColor, backgroundColor: bcgColor }">
            <div class="note-header">
                <h4>{{note.info.titleTxt}}</h4>
                <div class="btn-area">
                    <button title="Pin note" @click="tooglePin" :class="{'pinned': note.isPinned}"><i class="fas fa-thumbtack fa-lg"></i></button>
                    <button title="Edit note" @click="editNote"><i class="fas fa-edit fa-lg"></i></i></button>
                    <button title="Change text color" @click="openTxtColor"><input ref="txtColor" type="color" hidden v-model="txtColor" @change="changeTxtColor"><i class="fas fa-paint-brush fa-lg"></i></button>
                    <button title="Change color" @click="openBcgColor"><input ref="fillColor" type="color" hidden v-model="bcgColor" @change="changeBcgColor"><i class="fas fa-palette fa-lg"></i></button>
                    <button title="Delete note" @click="deleteNote"><i class="fas fa-trash-alt fa-lg"></i></button>
                </div>
            </div>
            <ul>
                <li v-for="todo in note.info.todos" @click="markTodo(todo)" :class="{'mark-line': todo.isDone}">
                    <long-text :text="todo.todo" :length="20"></long-text>
                    <!-- <hr> -->
                    <!-- {{todo.todo}} -->
                </li>
            </ul>
        </div>
    `,
    props: ['note'],
    data() {
        return {
            txtColor: this.note.style.txtColor,
            bcgColor: this.note.style.bcgColor,
            isDone: false,
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note', this.note.id)
        },
        openBcgColor() {
            this.$refs.fillColor.click()
        },
        openTxtColor() {
            this.$refs.txtColor.click()
        },
        changeBcgColor() {
            this.$emit('change-bcg-color', this.bcgColor, this.note.id)
        },
        changeTxtColor() {
            this.$emit('change-txt-color', this.txtColor, this.note.id)
        },
        editNote() {
            this.$emit('edit-note', this.note)
        },
        markTodo(todo) {
            todo.isDone = !todo.isDone
        },
        tooglePin() {
            this.$emit('toogle-pin', this.note.id)
        }
    },
    components: {
        longText
    },
}