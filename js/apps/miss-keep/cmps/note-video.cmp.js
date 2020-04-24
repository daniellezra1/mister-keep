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
            <iframe width="280" :src="getUrl" frameborder="0" allowfullscreen></iframe>
        </div>
    `,
    props: ['note'],
    data() {
        return {
            txtColor: this.note.style.txtColor,
            bcgColor: this.note.style.bcgColor,
            isEdit: false,
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note', this.note.id)
        },
        getYoutubeId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
            const match = url.match(regExp);
            return (match && match[2].length === 11)
            ? match[2]
            : null
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
        tooglePin() {
            this.$emit('toogle-pin', this.note.id)
        }
    },
    computed: {
        getUrl() {
            const videoId = this.getYoutubeId(this.note.info.url)
            const videoLink = `https://www.youtube.com/embed/${videoId}`
            return  videoLink
        }
    }
}