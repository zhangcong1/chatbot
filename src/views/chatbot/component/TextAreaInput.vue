
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
    ></div>
    
    <div class="toolbar">
      <button @click="insertTag">插入标签</button>
      <button @click="insertInput">插入输入框</button>
      <button @click="handleSend">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const editor = ref(null);
const emit = defineEmits(['send']);

const insertTag = () => {
  const tag = document.createElement('span');
  tag.className = 'content-tag';
  tag.contentEditable = false;
  tag.textContent = '标签';
  insertNodeAtCursor(tag);
};

const insertInput = () => {
  const input = document.createElement('input');
  input.className = 'content-input';
  input.type = 'text';
  input.placeholder = '输入内容...';
  insertNodeAtCursor(input);
};

const insertNodeAtCursor = (node) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(node);
    // 移动光标到新节点后
    const newRange = document.createRange();
    newRange.setStartAfter(node);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
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
  // 处理点击事件，确保可编辑区域保持焦点
};

const handleSend = () => {
  const content = extractContent();
  emit('send', content);
  clearContent();
};

const extractContent = () => {
  const elements = editor.value.querySelectorAll('.content-tag, .content-input');
  const result = [];
  
  elements.forEach(el => {
    if (el.classList.contains('content-tag')) {
      result.push({ type: 'tag', content: el.textContent });
    } else if (el.classList.contains('content-input')) {
      result.push({ type: 'input', content: el.value });
    }
  });
  
  return result;
};

const clearContent = () => {
  editor.value.innerHTML = '';
};

onMounted(() => {
  // 初始化编辑器
});
</script>

<style scoped>
.mixed-input-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}

.mixed-editor {
  min-height: 100px;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  outline: none;
}

.mixed-editor:empty:before {
  content: attr(placeholder);
  color: #aaa;
}

.content-tag {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
}

.content-input {
  border: 1px solid #ddd;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
}

.toolbar {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.toolbar button {
  padding: 4px 8px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
</style>
