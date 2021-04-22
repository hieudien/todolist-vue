<template>
    <div>
        <span v-if="error" style="color: red">{{ error.message }}</span><br/><br/>
        <input type="text" id="name" v-model="itemName" required placeholder="Enter Text"><br/><br/>
        <input type="file" accept="image/*" v-on:change="onFileSelected"><br/><br/>
        <button v-on:click="addNewItem">Add Item</button><br/><br/>
    </div>
</template>
    
<script>
import axios from "axios"
import { mapMutations } from 'vuex'

let itemImg = { name: null, content: null }

export default {
    name: 'AddItemForm',
    data: function () {
        return {
            itemName: null,
            error: null
        }
    },
    methods: {
        // map mutation method of vuex store
        ...mapMutations(["addItem"]),
        // add new Item to list and vuex store
        addNewItem: function () {
            if(this.itemName) {
                this.error = null
                axios.post(process.env.VUE_APP_API_URL + '/item', { name: this.itemName, image: itemImg }).then((res) => {
                    if (this.filterMode !== "done") {
                        // add to vuex store
                        this.addItem(res.data)
                    }
                })
            } else {
                this.error = { message: "Please enter some text" }
            }
        },
        onFileSelected: function (event) {
            const file = event?.target?.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = function() {
                     itemImg = {
                         name: file.name,
                         content: reader.result
                     }
                }
                reader.onerror = function() {
                    console.log('there are some problems')
                }
                reader.readAsDataURL(file)
            }
        }
    },
    computed: {
        // map vuex store state to component props
        filterMode () {
            return this.$store.state.filterMode
        },
    },
}
</script>