
<template>
  <div class="mixed-input-container">
    <div 
      ref="editor" 
      class="mixed-editor" 
      contenteditable="true"
      @input="handleInput"
      @keydown="handleKeyDown"
      @click="handleClick"
      placeholder="输入内容，可插入标签和输入框..."
    >
      <!-- 动态插入标签和输入框 -->
      <template v-for="(item, index) in dynamicElements" :key="index">
        <component :is="item.type" v-bind="item.props" />
      </template>
    </div>
    
    <div class="toolbar">
      <a-button @click="insertTag" size="small">插入标签</a-button>
      <a-button @click="insertInput" size="small">插入输入框</a-button>
      <a-button @click="handleSend" type="primary" size="small">发送</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, markRaw } from 'vue';
import { Button as AButton, Input as AInput, Tag as ATag } from '@arco-design/web-vue';

const editor = ref(null);
const emit = defineEmits(['send']);
const dynamicElements = ref([]);

const insertTag = () => {
  dynamicElements.value.push({ 
    type: markRaw(ATag), 
    props: { 
      closable: true, 
      onClose: handleTagClose, 
      children: '新标签' 
    } 
  }); 
};
const insertInput = () => {
  dynamicElements.value.push({ 
    type: markRaw(AInput), 
    props: { 
      placeholder: '请输入', 
      size: 'small', 
      style: 'width: 120px; vertical-align: middle;' 
    } 
  }); 
  // 自动聚焦到新插入的输入框 
  setTimeout(() => { 
    const inputs = editor.value.querySelectorAll('.arco-input'); 
    if (inputs.length > 0) { 
      inputs[inputs.length - 1].focus(); 
    } 
  }, 0); 
};

const handleTagClose = (index) => {
  dynamicElements.value.splice(index, 1);
};

const handleInput = () => {
  // 处理输入变化
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};

const handleClick = (e) => {
  // 处理点击事件
};

const handleSend = () => {
  const content = extractContent();
  emit('send', content);
  clearContent();
};

const extractContent = () => {
  const result = [];
  dynamicElements.value.forEach(item => {
    if (item.type === ATag) {
      result.push({
        type: 'tag',
        content: item.props.children
      });
    } else if (item.type === AInput) {
      const input = editor.value.querySelector(`.arco-input[placeholder="${item.props.placeholder}"]`);
      result.push({
        type: 'input',
        content: input ? input.value : ''
      });
    }
  });
  return result.filter(item => item.content);
};

const clearContent = () => {
  dynamicElements.value = [];
};

onMounted(() => {
  // 初始化编辑器
});
</script>

<style scoped>
.mixed-input-container {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 12px;
  background: #ffffff;
  width: 100%;
  text-align: left;
}

.mixed-editor {
  min-height: 100px;
  padding: 8px;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  outline: none;
  background: #ffffff;
  color: black;
}

.mixed-editor:empty:before {
  content: attr(placeholder);
  color: #999999;
}

.arco-tag-wrapper {
  display: inline-block;
  margin: 0 4px;
}

.arco-input-wrapper {
  display: inline-block;
  margin: 0 4px;
}

.toolbar {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
</style>
