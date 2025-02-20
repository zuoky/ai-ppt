<script setup lang="ts">
import PPTGenerator from './components/PPTGenerator.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <img alt="AI PPT Generator" class="logo" src="@/assets/logo.svg" width="48" height="48" />
      <h1 class="app-title">AI PPT 生成器</h1>
    </header>
    <main class="main-content">
      <PPTGenerator />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #f8fafc;
  padding: 1rem;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  width: 48px;
  height: 48px;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
