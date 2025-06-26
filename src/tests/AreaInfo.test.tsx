import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AreaInfo from '@/UI/AreaInfo';
import * as router from 'react-router';
import * as hooks from '@/hooks/useGetAreas';
import * as api from '@/fetch/reservationRequests';

// 1. Mock useParams
vi.mock('react-router');
vi.mock('@/hooks/useGetAreas');
vi.mock('@/fetch/reservationRequests');

describe('AreaInfo', () => {
	beforeEach(() => {
		// Setear params e inyectar un área simulada
		vi.mocked(router.useParams).mockReturnValue({ id: '1' });
		vi.mocked(hooks.useGetAreas).mockReturnValue({
			areas: [
				{
					id: 1,
					nombre: 'Cancha A',
					description: 'Descripción',
					precio: 100,
					imageUrl: 'url.jpg',
					tipoArea: '',
					disponibilidad: false
				},
			],
		});

		// Limpieza de mocks
		vi.mocked(api.createReservationRequest).mockReset();
		vi.spyOn(window, 'alert').mockImplementation(() => {});
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	it('renderiza la info del área y el formulario', () => {
		render(<AreaInfo />);
		expect(
			screen.getByText('Información Detallada del area')
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: 'Cancha A' })
		).toBeInTheDocument();
		expect(screen.getByLabelText('Fecha')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Reservar' })
		).toBeInTheDocument();
	});

	it('muestra errores de validación si los campos están vacíos al enviar', async () => {
		render(<AreaInfo />);
		fireEvent.click(screen.getByRole('button', { name: 'Reservar' }));
		await waitFor(() => {
			expect(screen.getByText('La fecha es obligatoria')).toBeInTheDocument();
			expect(screen.getByText('La hora de inicio es obligatoria')).toBeInTheDocument();
			expect(screen.getByText('La hora de fin es obligatoria')).toBeInTheDocument();
		});
	});

	it('envía correctamente y muestra alert exitosa', async () => {
		vi.mocked(api.createReservationRequest).mockResolvedValue({
			success: true,
		});
		render(<AreaInfo />);
		fireEvent.change(screen.getByLabelText('Fecha'), {
			target: { value: '2025-12-31' },
		});
		fireEvent.change(screen.getByLabelText('Hora Inicio'), {
			target: { value: '10:00' },
		});
		fireEvent.change(screen.getByLabelText('Hora Final'), {
			target: { value: '11:00' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Reservar' }));
		await waitFor(() => {
			expect(api.createReservationRequest).toHaveBeenCalledWith(
				1,
				new Date('2025-12-31'),
				'10:00',
				'11:00'
			);
			expect(window.alert).toHaveBeenCalledWith('Reservación exitosa');
		});
	});

	it('maneja error en el envío y muestra alerta de error', async () => {
		const errorObj = { response: { data: { msg: 'fail' } } };
		vi.mocked(api.createReservationRequest).mockRejectedValue(errorObj);
		render(<AreaInfo />);
		fireEvent.change(screen.getByLabelText('Fecha'), {
			target: { value: '2025-12-31' },
		});
		fireEvent.change(screen.getByLabelText('Hora Inicio'), {
			target: { value: '10:00' },
		});
		fireEvent.change(screen.getByLabelText('Hora Final'), {
			target: { value: '11:00' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Reservar' }));
		await waitFor(() => {
			expect(window.alert).toHaveBeenCalledWith(
				'Error al crear reservación: {"msg":"fail"}'
			);
			expect(console.error).toHaveBeenCalled();
		});
	});
});
