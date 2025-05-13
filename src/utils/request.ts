import axios from 'axios';
import { Message } from '@arco-design/web-vue';

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中获取 API 基础路径
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，例如添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.log(error); // 用于调试
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        // 如果自定义代码不是 200，则判定为错误。
        if (res.code !== 200) {
// 根据错误提示，`Message` 不能直接调用，推测需要使用 `Message.info` 等方法
            Message.error({
                content: res.message || 'Error',
                duration: 5 * 1000
            });

            // 50008: 非法的 token; 50012: 其他客户端登录了;  50014: Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // 重新登录
                // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                //   confirmButtonText: '重新登录',
                //   cancelButtonText: '取消',
                //   type: 'warning'
                // }).then(() => {
                //   store.dispatch('user/resetToken').then(() => {
                //     location.reload();
                //   });
                // });
            }
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    (error) => {
        console.log('err' + error); // 用于调试
        Message.error({
            content: error || 'Error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;