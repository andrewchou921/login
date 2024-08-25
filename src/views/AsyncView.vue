<template>
  <div>
    <h1>async function</h1>
  </div>
</template>

<script setup>
import axios from 'axios';
console.log(axios);

// methods:get,post,delete,put,path
// 第一種方法 1.Promise
axios
  .get('https://randomuser.me/api/')
  .then((response) => {
    console.log(response);
  })
  //抓錯
  .catch((err) => {
    console.log(err.message);
  });

// 第二種方法:async await
async function getData() {
  console.log('getData');
  //定義要取得甚麼資料，執行甚麼方法

  const response = await axios.get('https://randomuser.me/api/'); //promise,非同步事件

  console.log(response);

  //await 會變同步執行=>同步語言(可逐行執行)
  const response2 = await axios.get('https://randomuser.me/api/');
  console.log(response2);

  try {
    // 正確的執行流程
    const response2 = await axios.get('https://randomuser.me/api/');
    console.log(response2);
  } catch (error) {
    // 錯誤的流程
    console.log(error);
  }
}
getData();
</script>

<style></style>
