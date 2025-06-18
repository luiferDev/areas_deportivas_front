import { useAuthStore } from '@/store/Auth';
import { NavigationMenuComponent } from './NavigationMenu';
import { auth } from '@/fetch/auh';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarXIcon, EditIcon } from 'lucide-react';

interface Reservacion {
	reserva: Reserva;
	areaDeportiva: AreaDeportiva;
}

interface Reserva {
	id: string;
	fecha: string;
	horaInicio: string;
	horaFin: string;
	estado: string;
}

interface AreaDeportiva {
	id: number;
	nombre: string;
	description: string;
	tipoArea: string;
	disponibilidad: boolean;
	imageUrl: string;
	precio: number;
}

const reservationRequest = async (userId: string) => {
	const response = await auth.get<Reservacion[]>(
		`/api/Usuario/reservaciones?userId=${userId}`
	);
	return response.data;
};

export default function Profile() {
	const profile = useAuthStore((state) => state.profile);
	const { profile: user } = useAuthStore.getState();
	const [reservations, setReservations] = useState<Reservacion[]>([]);

	useEffect(() => {
		if (!user?.id) return;

		reservationRequest(user.id)
			.then((data) => {
				setReservations(data);
			})
			.catch((err) => {
				console.error('Error al obtener reservaciones:', err);
			});
	}, [user?.id]);

	return (
		<>
			<NavigationMenuComponent />
			<main>
				<div className="flex flex-col items-center min-h-screen bg-gray-100">
					<div className="bg-white shadow-md rounded-lg p-8 max-w-5xl w-full mt-30">
						<h1 className="text-2xl font-bold mb-6 text-center">
							Bienvenido/a <span>{profile?.nombre}</span>
						</h1>
						<div className="mb-4">
							<h2 className="text-lg font-semibold mb-4">
								Tus Reservaciones
							</h2>
							{reservations.length === 0 ? (
								<p className="text-gray-500">
									No hay reservaciones disponibles.
								</p>
							) : (
								reservations.map((reservation) => {
									if (
										!reservation.areaDeportiva ||
										!reservation.reserva
									)
										return null;

									return (
										<table
											border={3}
											cellPadding={20}
											cellSpacing={10}
											className="mb-6 m-auto border-collapse shadow-md rounded-lg w-full text-center"
											key={reservation.reserva.id}
										>
											<thead className="bg-violet-100">
												<tr>
													<th className="p-3 border-2 border-solid border-gray-300">
														Avatar
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Nombre
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Fecha
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Hora Inicio
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Hora Fin
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Estado
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Precio
													</th>
													<th className="p-3 border-2 border-solid border-gray-300">
														Acciones
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="p-3 border-2 border-solid border-gray-300">
														<Avatar className="m-auto">
															<AvatarImage
																src={
																	reservation
																		.areaDeportiva
																		.imageUrl
																}
															/>
															<AvatarFallback>
																CN
															</AvatarFallback>
														</Avatar>
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														{
															reservation
																.areaDeportiva
																.nombre
														}
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														{
															reservation.reserva
																.fecha
														}
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														{
															reservation.reserva
																.horaInicio
														}
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														{
															reservation.reserva
																.horaFin
														}
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														{
															reservation.reserva
																.estado
														}
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														{
															reservation
																.areaDeportiva
																.precio
														}
													</td>
													<td className="p-3 border-2 border-solid border-gray-300">
														<Button
															variant={
																'destructive'
															}
															className="hover:bg-violet-500"
															onClick={() =>
																console.log(
																	'Cancelar'
																)
															}
														>
															<CalendarXIcon />
														</Button>
														<Button
															variant={
																'default'
															}
															className="hover:bg-violet-500"
															onClick={() =>
																console.log(
																	'Editar'
																)
															}
														>
															<EditIcon />
														</Button>
													</td>
												</tr>
											</tbody>
										</table>
									);
								})
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
