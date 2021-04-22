<template>
    <div>
        <span v-if="error" style="color: red">{{ error.message }}</span><br/><br/>
        <input type="text" id="name" v-model="itemName" required placeholder="Enter Text"><br/><br/>
        <input type="file" ref="imageInput" accept="image/*" v-on:change="onFileSelected"><br/><br/>
        <button v-on:click="addNewItem">Add Item</button><br/><br/>
    </div>
</template>
    
<script>
import axios from "axios"
import { mapMutations } from 'vuex'

export default {
    name: 'AddItemForm',
    data: function () {
        return {
            itemName: null,
            itemImg: null,
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
                const formData = new FormData()
                formData.append("name", this.itemName)
                if(this.itemImg) {
                    formData.append("image", this.itemImg, this.itemName.name)
                }
                axios.post(process.env.VUE_APP_API_URL + '/item', formData).then((res) => {
                    if (this.filterMode !== "done") {
                        // add to vuex store
                        this.addItem(res.data)
                    }
                })
            } else {
                this.error = { message: "Please enter some text" }
            }
            this.itemName = null
            this.itemImg = null
            this.$refs.imageInput.value = null
        },
        onFileSelected: function (event) {
            this.itemImg = event?.target?.files[0]
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