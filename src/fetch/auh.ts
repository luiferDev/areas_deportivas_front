import axios from 'axios';
import { useAuthStore } from '@/store/Auth';

const baseUrl = import.meta.env.VITE_API_URL

export const auth = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});


auth.interceptors.request.use((config) => {
	const { token } = useAuthStore.getState();

	if (token) {
		config.headers = config.headers || {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
