// src/schemas/reservationSchema.ts
import { z } from 'zod';

const today = new Date().toISOString().split('T')[0];

export const reservationSchema = z
	.object({
		fecha: z
			.string()
			.min(1, 'La fecha es obligatoria')
			.refine((fecha) => fecha >= today, {
				message: 'La fecha no puede ser anterior a hoy',
			}),
		horaInicio: z.string().min(1, 'La hora de inicio es obligatoria'),
		horaFin: z.string().min(1, 'La hora de fin es obligatoria'),
	})
	.refine((data) => data.horaFin > data.horaInicio, {
		message: 'La hora de fin debe ser mayor que la hora de inicio',
		path: ['horaFin'],
	});

export type ReservationForm = z.infer<typeof reservationSchema>;
