<template>
  <h1>複習</h1>
  <div>
    <input type="text" v-model="newName" />{{ newName }} <input type="number" v-model="newNumber" />{{ newNumber }}
    <button type="button" @click="addProduct">新增資料集裡面</button>
  </div>
  {{ data }}
</template>

<script setup>
import { ref } from 'vue';

const newName = ref('');
const newNumber = ref('0');

const data = ref([]);

const addProduct = () => {
  console.log('addProduct', data.value);
  data.value.push({
    id: new Date().getTime(),
    name: newName.value,
    price: newNumber.value
  });
};
</script>

<style></style>
