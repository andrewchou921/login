<template>
  <h1>Todo API</h1>

  <!-- 註冊表單 -->
  <div>
    <h2>註冊</h2>
    <input type="email" placeholder="Email" v-model="signupField.email" />
    <input type="text" placeholder="Password" v-model="signupField.password" />
    <input type="text" placeholder="nickname" v-model="signupField.nickname" />
    <br />
    <!-- {{ signupField }}<br /> -->
    <button type="button" @click="signup">註冊</button>
    uid: {{ signupRes }}
  </div>

  <!-- 登入表單 -->
  <div>
    <h2>登入</h2>
    <input type="email" placeholder="Email" v-model="signInField.email" />
    <input type="text" placeholder="Password" v-model="signInField.password" />
    <br />
    <!-- {{ signInField }}<br /> -->
    <button type="button" @click="signIn">登入</button>
    uid: {{ signInRes }}
  </div>

  <div>
    <h2>驗證登入</h2>
    <div v-if="user.uid">
      <p>UID:{{ user.uid }}</p>
      <p>NickName:{{ user.nickname }}</p>
    </div>
    <div v-else>你還沒有登入</div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const api = 'https://todolist-api.hexschool.io';

// 註冊
const signupField = ref({
  email: '',
  password: '',
  nickname: ''
});

const signupRes = ref(''); //印出uid

//另一種寫法
const signup = async () => {
  console.log(`${api}/users/sign_up`);

  try {
    const res = await axios.post(`${api}/users/sign_up`, signupField.value);
    console.log(res);
    signupRes.value = res.data.uid;
  } catch (error) {
    console.log(error);
  }
};

//登入
const signInField = ref({
  email: '',
  password: ''
});

const signInRes = ref(''); //印出uid

//另一種寫法
const signIn = async () => {
  console.log(`${api}/users/sign_in`);

  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value);

    console.log(res);
    signInRes.value = res.data.token;
    document.cookie = `customTodoToken=${res.data.token};`;
  } catch (error) {
    console.log(error);
  }
};

const user = ref({
  nickname: '',
  uid: ''
});

//驗證登入:1.要讓用戶手動 2.自動觸發
onMounted(async () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)customTodoToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  console.log(token);
  const res = await axios.get(`${api}/users/checkout`, {
    headers: {
      Authorization: token
    }
  });
  console.log(res);
  user.value = res.data;
});
</script>
