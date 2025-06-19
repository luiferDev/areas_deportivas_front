import type { Reservacion } from "@/types/types";
import { auth } from "./auh";


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