import message from '@/component/common/message/Message';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://101.35.251.18:3000',
	timeout: 10000
});

api.interceptors.request.use((config) => {
	return config;
});

api.interceptors.response.use((response) => {
	if (response.data.code !== 200) {
		message.error('请求失败');
		return;
	}
	return response.data;
});

export { api };
