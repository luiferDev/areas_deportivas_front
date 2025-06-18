import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { auth } from '@/fetch/auh';
import { getAreas, type Areas } from '@/fetch/fetchAreas';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { NavigationMenuComponent } from './NavigationMenu';
import Footer from './Footer';

interface Reserva {
	fecha: Date;
	horaInicio: string;
	horaFin: string;
}

export default function AreaInfo() {
	const { id } = useParams();
	const { register, handleSubmit } = useForm<Reserva>();
	const [areas, setAreas] = useState<Areas[]>([]);

	useEffect(() => {
		getAreas().then((data) => {
			setAreas(data);
		});
	}, []);

	const ReservationRequest = async (
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
	const onReservation = async (data: Reserva) => {
		try {
			const res = await ReservationRequest(
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

	const selectedAreas: Areas | undefined = areas.find(
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
								<div className='text-start'>
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
