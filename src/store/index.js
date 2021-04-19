import Vue from 'vue'
import VueX from "vuex"

Vue.use(VueX)

export const store = new VueX.Store({
    state: {
        todoList: [],
        doneList: [],
    },
    mutations: {
        addItem(state, newItem) {
            state.todoList.push(newItem)
        },
        markAsDone(state, item) {
            // remove from todoList
            state.todoList = removeItem(state.todoList, item)
            // push to doneList
            state.doneList.push(item)
        },
        markAsNotDone(state, item) {
            // remove from doneList
            state.doneList = removeItem(state.doneList, item)
             // push to todoList
            state.todoList.push(item)
        },
        removeItem(state, item) {
            if(item.isDone) {
                // if isDone = true, remove from doneList
                state.doneList = removeItem(state.doneList, item)
            } else {
                // else remove from todoList
                state.todoList = removeItem(state.todoList, item)
            }
        },
        
    }
})

/**
 * Remove Item from list
 * @param {*} list to remove from
 * @param {*} item to remove
 * @returns removed list
 */
function removeItem(list, item) {
    return list.filter(e => !(item._id === e._id))
}