import notesAppCmp from './apps/miss-keep/pages/miss-keep.cmp.js'

const routes = [
    { path: '/', component: notesAppCmp }
];

export const router = new VueRouter({ routes })
