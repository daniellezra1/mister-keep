import { router } from './routes.js'
import userMsg from './cmps/user-msg.cmp.js'

new Vue({
    el: '#app',
    router,
    template: `
        <section class="main-container">        
            <user-msg ></user-msg>
            <router-view class="main-content"></router-view>
        </section>
    `,
    components: {
        userMsg
    },
    methods: {
        isMobileDevice() {
            return (window.innerWidth < 500 && (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1))
        }
    },
    created() {
        var isMobile = this.isMobileDevice()
        if (isMobile) this.isMenuOpen = true
        else this.isMenuOpen = false
    }
})