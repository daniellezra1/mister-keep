export const globalEventBus = new Vue()

export const EVENT_MSG = 'msg'
export const EVENT_SHOW_MSG = 'showMsg'

globalEventBus.$on(EVENT_MSG, (msg)=>{
    var msg = msg
    globalEventBus.$emit(EVENT_SHOW_MSG, msg)
})