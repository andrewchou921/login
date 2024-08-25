<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/review">複習</RouterLink>
        <RouterLink to="/async">api</RouterLink>
        <RouterLink to="/todo">todo</RouterLink>
        <RouterLink to="/boostrap">美化</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
