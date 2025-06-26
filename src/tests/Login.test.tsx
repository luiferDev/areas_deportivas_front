// src/tests/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Login } from '@/Links/Login';
import { MemoryRouter, Route, Routes } from 'react-router';
import { api } from '@/fetch/api';
import { useAuthStore } from '@/store/Auth';

// 🧪 Mocks Globales
const mockedUseNavigate = vi.fn();

vi.mock('react-router', async () => {
	const mod = await vi.importActual<typeof import('react-router')>(
		'react-router'
	);
	return {
		...mod,
		useNavigate: () => mockedUseNavigate,
	};
});

vi.mock('@/fetch/api', () => ({ api: { post: vi.fn() } }));
vi.mock('@/fetch/auh', () => ({ auth: { get: vi.fn() } }));
vi.mock('@/store/Auth', () => ({ useAuthStore: vi.fn() }));

describe('Login Component', () => {
	const mockSetToken = vi.fn();
	const mockSetProfile = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(
			useAuthStore as unknown as { mockImplementation: (fn: any) => void }
		).mockImplementation((selector: { name: string }) =>
			selector.name === 'setToken'
				? mockSetToken
				: selector.name === 'setProfile'
				? mockSetProfile
				: () => {}
		);
	});

	const renderLogin = () => {
		render(
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
			</MemoryRouter>
		);
	};

	it('renders email/password fields and buttons', () => {
		renderLogin();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /entrar/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /login with google/i })
		).toBeInTheDocument();
	});

	// it('submits form, sets token/profile, and navigates', async () => {
	// 	vi.spyOn(api, 'post').mockResolvedValue({ data: { token: 'abc123' } });
	// 	vi.spyOn(auth, 'get').mockResolvedValue({
	// 		data: { id: '1', nombre: 'User', email: 'u@e', role: 'user' },
	// 	});

	// 	renderLogin();
	// 	fireEvent.change(screen.getByLabelText(/email/i), {
	// 		target: { value: 'u@e.com' },
	// 	});
	// 	fireEvent.change(screen.getByLabelText(/password/i), {
	// 		target: { value: 'pass' },
	// 	});
	// 	fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

	// 	await waitFor(() => {
	// 		expect(api.post).toHaveBeenCalledWith('/api/Auth/login', {
	// 			email: 'u@e.com',
	// 			password: 'pass',
	// 		});
	// 		expect(auth.get).toHaveBeenCalledWith(
	// 			'/api/Usuario/user?email=u@e.com'
	// 		);
	// 		expect(mockSetToken).toHaveBeenCalledWith('abc123');
	// 		expect(mockSetProfile).toHaveBeenCalledWith({
	// 			id: '1',
	// 			nombre: 'User',
	// 			email: 'u@e',
	// 			role: 'user',
	// 		});
	// 		expect(mockedUseNavigate).toHaveBeenCalledWith('/');
	// 	});
	// });
	
	it('logs error if login fails', async () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		vi.spyOn(api, 'post').mockRejectedValue(new Error('fail'));

		renderLogin();

		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: 'x@e.com' },
		});
		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: 'wrong' },
		});
		fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

		await waitFor(() => {
			expect(consoleError).toHaveBeenCalledWith(
				'Error al hacer login:',
				expect.any(Error)
			);
		});
	});
});
