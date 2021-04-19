<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <AddItemForm/>
    <ItemList/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AddItemForm from './components/AddItemForm'
import ItemList from './components/ItemList'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    AddItemForm,
    ItemList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 50px;
  height: 50px;
}
</style>
