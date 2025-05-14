import { ref, reactive, isRef } from 'vue';
import type { Ref, UnwrapRef } from 'vue';

// 辅助函数用于处理函数类型的更新值
function handleFunctionUpdate<T>(newValue: (prev: T) => T, prev: T): T {
  return newValue(prev);
}

export function useState<T>(initialValue: T) {
  const isObj = typeof initialValue === 'object' && initialValue!== null;
  const state = isObj? reactive(initialValue) : ref(initialValue) as Ref<UnwrapRef<T>>;

  const setState = (newValue: T | ((prev: T) => T)) => {
    const prev = isRef(state)? state.value : state;
    const finalValue = typeof newValue === 'function'? handleFunctionUpdate(newValue as (prev: T) => T, prev) : newValue;

    if (isRef(state)) {
      state.value = finalValue as UnwrapRef<T>;
    } else if (typeof finalValue === 'object' && finalValue!== null && isObj) {
      Object.assign(state, finalValue);
    } else {
      if (typeof state === 'object' && state!== null) {
        Object.assign(state, finalValue);
      } else {
        console.error('无法直接更新非对象类型的常量 state，请检查代码逻辑。');
      }
    }
  };

  return [state, setState] as const;
}
