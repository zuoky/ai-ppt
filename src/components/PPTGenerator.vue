<template>
  <div class="ppt-generator">
    <div class="input-section">
      <textarea
        v-model="content"
        class="content-input"
        placeholder="请输入要生成PPT的内容"
        :disabled="isLoading"
      ></textarea>
      <span class="char-count">{{ content.length }} 字</span>
    </div>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div class="action-section">
      <button
        class="generate-btn"
        @click="handleGenerate"
        :disabled="isLoading"
      >
        {{ isLoading ? '生成中' : '生成PPT' }}
      </button>
    </div>
    
    <div v-if="isLoading" class="loading-text dot-animation">
      正在生成PPT，请稍候
    </div>
    
    <div v-if="pptUrl" class="result-section">
      <a :href="pptUrl" target="_blank" class="view-btn">查看生成的PPT</a>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { generatePPT } from '../api/pptService';
import { usePPTStore } from '../stores/ppt';

export default {
  name: 'PPTGenerator',
  setup() {
    const pptStore = usePPTStore();
    const content = ref('');
    const pptUrl = ref('');
    const isLoading = ref(false);
    const error = ref('');

    const handleGenerate = async () => {
      if (!content.value.trim()) {
        error.value = '请输入内容';
        return;
      }
      
      error.value = '';
      isLoading.value = true;
      
      try {
        const result = await generatePPT(content.value);
        pptUrl.value = result.url;
        // 保存到历史记录
        pptStore.addRecord(content.value, result.url);
      } catch (err: unknown) {
        if (err instanceof Error) {
          error.value = err.message;
        } else {
          error.value = '生成PPT时发生错误，请稍后重试';
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      content,
      pptUrl,
      isLoading,
      error,
      handleGenerate,
    };
  },
};
</script>

<style scoped>
.ppt-generator {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-section {
  position: relative;
  margin-bottom: 1.5rem;
}

.content-input {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.content-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.content-input:disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
}

.char-count {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 0.875rem;
  color: #64748b;
}

.action-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.generate-btn {
  padding: 0.75rem 2rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.generate-btn:hover:not(:disabled) {
  background-color: #4338ca;
}

.generate-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.loading-text {
  display: inline-block;
}

.dot-animation::after {
  content: '...';
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60% { content: '...'; }
  80%, 100% { content: ''; }
}

.error-message {
  color: #ef4444;
  text-align: center;
  margin-bottom: 1rem;
}

.result-section {
  text-align: center;
}

.view-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #10b981;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.view-btn:hover {
  background-color: #059669;
}
</style>