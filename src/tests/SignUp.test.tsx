import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { SignUp } from '@/Links/SingUp';
import { MemoryRouter, Route, Routes } from 'react-router';
import { api } from '@/fetch/api';

// Mock api
vi.mock('@/fetch/api', () => ({
	api: {
		post: vi.fn(),
	},
}));

// Mock useNavigate
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router');
	return {
		...actual,
		useNavigate: () => vi.fn(),
	};
});

describe('SignUp', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renderiza el formulario de registro', () => {
		render(
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route path="/login" element={<SignUp />} />
				</Routes>
			</MemoryRouter>
		);
		expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /registrarse/i })
		).toBeInTheDocument();
	});

	it('envía el formulario y muestra alerta de éxito', async () => {
		(api.post as any).mockResolvedValue({ data: {} });
		const alertMock = vi
			.spyOn(window, 'alert')
			.mockImplementation(() => {});
		render(
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route path="/login" element={<SignUp />} />
				</Routes>
			</MemoryRouter>
		);

		fireEvent.change(screen.getByLabelText(/nombre/i), {
			target: { value: 'Juan' },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: 'juan@mail.com' },
		});
		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: '123456' },
		});
		fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

		await waitFor(() => {
			expect(api.post).toHaveBeenCalledWith('/api/Auth/register', {
				nombre: 'Juan',
				email: 'juan@mail.com',
				password: '123456',
			});
			expect(alertMock).toHaveBeenCalledWith(
				'Usuario registrado correctamente'
			);
		});
	});

	it('muestra alerta de error si la petición falla', async () => {
		(api.post as any).mockRejectedValue(new Error('fail'));
		const alertMock = vi
			.spyOn(window, 'alert')
			.mockImplementation(() => {});
		render(
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route path="/login" element={<SignUp />} />
				</Routes>
			</MemoryRouter>
		);

		fireEvent.change(screen.getByLabelText(/nombre/i), {
			target: { value: 'Juan' },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: 'juan@mail.com' },
		});
		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: '123456' },
		});
		fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

		await waitFor(() => {
			expect(alertMock).toHaveBeenCalledWith(
				expect.stringContaining('Error al registrar usuario')
			);
		});
	});
});
