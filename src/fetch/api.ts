import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL

export const api = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json'
	}
});

// api.interceptors.request.use((config) => {
// 	const token = localStorage.getItem('token');
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });