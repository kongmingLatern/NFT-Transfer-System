import message from '@/component/common/message/Message';
import axios from 'axios';

const api = axios.create({
	baseURL:
		'https://www.fastmock.site/mock/897825cb4cc73f1ae23df5e97bdd3f66/api',
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