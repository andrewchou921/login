<template>
  <div class="container p-5 mt-5">
    <!-- 註冊表單 -->
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-12 mx-auto">
        <h2>註冊</h2>
        <form @submit.prevent="signup">
          <!-- 信箱 input -->
          <MDBInput type="email" label="Email" id="signupEmail" v-model="signupField.email" wrapperClass="mb-4" />
          <!-- 密碼 input -->
          <MDBInput type="password" label="Password" id="signupPassword" v-model="signupField.password" wrapperClass="mb-4" />
          <!-- 暱稱 input -->
          <MDBInput type="text" label="Nickname" id="signupNickname" v-model="signupField.nickname" wrapperClass="mb-4" />
          <!-- 註冊按鈕 -->
          <MDBBtn color="black" block @click="signup">註冊</MDBBtn>
          <!-- 顯示 UID -->
          <div v-if="signupRes" class="mt-3">
            <p>UID: {{ signupRes }}</p>
          </div>
        </form>
      </div>
    </div>

    <!-- 分隔線 -->
    <hr class="my-4" />

    <!-- 登入表單 -->
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-12 mx-auto">
        <h2>登入</h2>
        <form @submit.prevent="signIn">
          <!-- 信箱 input -->
          <MDBInput type="email" label="Email" id="signinEmail" v-model="signInField.email" wrapperClass="mb-4" />
          <!-- 密碼 input -->
          <MDBInput type="password" label="Password" id="signinPassword" v-model="signInField.password" wrapperClass="mb-4" />
          <!-- 登入按鈕 -->
          <MDBBtn color="black" block @click="signIn">登入</MDBBtn>
          <!-- 顯示 Token -->
          <div v-if="signInRes" class="mt-3">
            <p>Token: {{ signInRes }}</p>
          </div>
        </form>
      </div>
    </div>

    <!-- 驗證提示 -->
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-12 mx-auto mt-4">
        <div v-if="user.uid">
          <p>UID:{{ user.uid }}</p>
          <p>NickName:{{ user.nickname }}</p>
        </div>
        <div v-else class="fw-bold">你還沒有登入</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit';

const api = 'https://todolist-api.hexschool.io';

// 註冊
const signupField = ref({
  email: '',
  password: '',
  nickname: ''
});

const signupRes = ref(''); // 印出 UID

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

// 登入
const signInField = ref({
  email: '',
  password: ''
});

const signInRes = ref(''); // 印出 Token

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
  // 讀取 Cookie
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

<style>
.custom-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 自定義陰影效果 */
}

h2 {
  font-weight: 600;
}

body {
  background-color: white;
}
</style>
