import {globalEventBus, EVENT_SHOW_MSG} from '../services/eventbus.service.js'

export default {
    template: `
        <div class="msg-container" v-if="msg" :class="msg.type">
            <button @click="closeMsg">X</button>
            <div>
                <h3 class="msg-title">{{msg.title}}</h3>
                <div class="msg-body">{{msg.body}}</div>
            </div>
        </div>
    `,
    data() {
        return {
            msg: null,
        }
    },
    created() {
        globalEventBus.$on(EVENT_SHOW_MSG, (msg) => {
            this.msg = msg
            setTimeout(() => {
                this.msg= null
            }, 3000);

        })
    },
    methods: {
        closeMsg() {
            this.msg = null
        }
    }
}