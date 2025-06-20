// src/hooks/useFetchReservations.ts
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/Auth';
import type { Reservacion } from '@/types/types';
import { reservationRequest } from '@/fetch/reservationRequests';

export function useFetchReservations() {
	const [reservations, setReservations] = useState<Reservacion[]>([]);
	const { profile: user } = useAuthStore.getState();

	const fetchReservations = () => {
		if (!user?.id) return;

		reservationRequest(user.id)
			.then((data) => {
				setReservations(data);
			})
			.catch((err) => {
				console.error('Error al obtener reservaciones:', err);
			});
	};

	useEffect(() => {
		fetchReservations();
	}, [user?.id]);

	return { reservations, fetchReservations };
}
