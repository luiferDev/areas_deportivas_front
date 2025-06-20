import { z } from 'zod';

// Obtener la fecha actual en formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

export const editReservationSchema = z
	.object({
		fecha: z
			.string()
			.refine((fecha) => fecha >= today, {
				message: 'La fecha no puede ser anterior a hoy',
			}),
		horaInicio: z.string(),
		horaFin: z.string(),
	})
	.refine((data) => data.horaFin > data.horaInicio, {
		message: 'La hora de fin debe ser mayor que la hora de inicio',
		path: ['horaFin'],
	});

export type EditReservationForm = z.infer<typeof editReservationSchema>;
