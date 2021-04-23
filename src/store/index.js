import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export const store = new VueX.Store({
    state: {
        todoList: [],
        filterMode: "all"
    },
    mutations: {
        addItem(state, newItem) {
            state.todoList.push(newItem)
        },
        updateItem(state, item) {
            // update item status
            let toUpdateItem = state.todoList.find(e => e._id === item._id)
            toUpdateItem.isDone = item.isDone
        },

        removeItem(state, item) {
            // else remove from todoList
            state.todoList = state.todoList.filter(e => !(item._id === e._id))
        },

        updateFilterMode(state, mode) {
            // update filter mode
            state.filterMode = mode
        }
        
    }
})