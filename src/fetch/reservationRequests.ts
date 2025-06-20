import type { Reservacion } from "@/types/types";
import { auth } from "./auh";

export const createReservationRequest = async (
		id: number,
		fecha: Date,
		horaInicio: string,
		horaFin: string
	) => {
		const res = await auth.post(`/api/Usuario/reservar?Id=${id}`, {
			fecha: fecha,
			horaInicio: horaInicio,
			horaFin: horaFin,
		});
		return res.data;
	};

export const reservationRequest = async (userId: string) => {
	const response = await auth.get<Reservacion[]>(
		`/api/Usuario/reservaciones?userId=${userId}`
	);
	return response.data;
};

export const cancelReservationRequest = async (reservationId: string) => {
	const response = await auth.post(
		`/api/Usuario/cancelar?reservaId=${reservationId}`
	);
	return response.data;
};

export const deleteReservationRequest = async (reservationId: string) => {
	const response = await auth.delete(
		`/api/Usuario/eliminar-reservacion?reservaId=${reservationId}`
	);
	return response.data;
};

export const editReservationRequest = async (
		reservaId: string,
		fecha?: Date,
		horaInicio?: string,
		horaFin?: string
	) => {
		const response = await auth.patch(
			`/api/Usuario/editar-reservacion?reservaId=${reservaId}`,
			{
				fecha: fecha,
				horaInicio: horaInicio,
				horaFin: horaFin,
			}
		);
		return response.data;
	};