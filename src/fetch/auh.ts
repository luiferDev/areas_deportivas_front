import axios from 'axios';
import { useAuthStore } from '@/store/Auth';

const baseUrl = 'http://localhost:5223';

export const auth = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});


auth.interceptors.request.use((config) => {
	const { token } = useAuthStore.getState(); // 👈 accede a Zustand directamente

	if (token) {
		config.headers = config.headers || {}; // asegúrate de que exista
		config.headers.Authorization = `Bearer ${token}`;
	}

	console.log('Request config:', config); // vuelve a verificar después del cambio
	return config;
});
