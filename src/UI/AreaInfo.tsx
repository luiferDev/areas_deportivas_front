import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { getAreas } from '@/fetch/fetchAreas';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { NavigationMenuComponent } from './NavigationMenu';
import Footer from './Footer';
import type { AreaDeportiva, CrearReservacion } from '@/types/types';
import { createReservationRequest } from '@/fetch/reservationRequests';

export default function AreaInfo() {
	const { id } = useParams();
	const { register, handleSubmit } = useForm<CrearReservacion>();
	const [areas, setAreas] = useState<AreaDeportiva[]>([]);

	useEffect(() => {
		getAreas()
			.then((data) => {
				setAreas(data);
			})
			.catch((err) => {
				console.error('Error al obtener las áreas:', err);
			});
	}, []);

	const onReservation = async (data: CrearReservacion) => {
		try {
			const res = await createReservationRequest(
				Number(id),
				data.fecha,
				data.horaInicio,
				data.horaFin
			);
			console.log(res.data);
			alert('Reservación exitosa');
		} catch (error) {
			console.error('Error al hacer la reservación:', error);
			alert('Error al hacer la reservación: ' + error);
		}
	};

	const selectedAreas: AreaDeportiva | undefined = areas.find(
		(f) => f.id.toString() === id
	);

	return (
		<>
			<NavigationMenuComponent />
			<div className="my-30">
				<h2 className="text-5xl">Información Detallada del area</h2>
				<div className="flex flex-row justify-between">
					{selectedAreas && (
						<div className="mt-18 mb-4 m-auto border-2 p-6 rounded-2xl">
							<img
								className="aspect-square w-96 h-96"
								src={selectedAreas.imageUrl}
								alt={selectedAreas.description}
							/>
							<div className="flex flex-row items-center justify-between">
								<div className="text-start">
									<h3 className="text-2xl mt-8 mb-2">
										{selectedAreas.nombre}
									</h3>
									<p>{selectedAreas.description}</p>
								</div>
								<p className="flex flex-col text-right mt-6">
									Precio por hora:{' '}
									<span className="font-bold text-lg">
										${selectedAreas.precio}
									</span>
								</p>
							</div>
						</div>
					)}

					<form
						className="mt-30 m-auto"
						onSubmit={handleSubmit(onReservation)}
					>
						<Label htmlFor="fecha">Hora Inicio</Label>
						<Input
							id="fecha"
							type="date"
							{...register('fecha', { required: true })}
						/>
						<Label htmlFor="horaInicio">Hora Inicio</Label>
						<Input
							id="horaInicio"
							type="time"
							{...register('horaInicio', { required: true })}
						/>
						<Label htmlFor="hora-final">Hora Final</Label>
						<Input
							id="horaFin"
							type="time"
							{...register('horaFin', { required: true })}
						/>
						<Button className="mt-4" type="submit">
							Reservar
						</Button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
