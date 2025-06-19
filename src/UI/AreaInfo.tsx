import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { NavigationMenuComponent } from './NavigationMenu';
import Footer from './Footer';
import type { AreaDeportiva } from '@/types/types';
import { createReservationRequest } from '@/fetch/reservationRequests';
import { useGetAreas } from '@/hooks/useGetAreas';
import { zodResolver } from '@hookform/resolvers/zod';
import { reservationSchema } from '@/schemas/reservationSchemas';
import type { ReservationForm } from '@/schemas/reservationSchemas';

export const onReservation = async (data: ReservationForm, id: string) => {
	try {
		const res = await createReservationRequest(
			Number(id),
			new Date(data.fecha),
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

export default function AreaInfo() {
	const { id } = useParams();
	const { areas } = useGetAreas();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ReservationForm>({
		resolver: zodResolver(reservationSchema),
	});
	

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
						onSubmit={handleSubmit((data) => {
							if (id) {
								onReservation(data, id);
							}
						})}
					>
						<Label htmlFor="fecha">Hora Inicio</Label>
						<Input
							id="fecha"
							type="date"
							{...register('fecha', { required: true })}
						/>
						{errors.fecha && (
							<p className="text-red-500 text-sm">
								{errors.fecha.message}
							</p>
						)}
						<Label htmlFor="horaInicio">Hora Inicio</Label>
						<Input
							id="horaInicio"
							type="time"
							{...register('horaInicio', { required: true })}
						/>
						{errors.horaInicio && (
							<p className="text-red-500 text-sm">
								{errors.horaInicio.message}
							</p>
						)}
						<Label htmlFor="hora-final">Hora Final</Label>
						<Input
							id="horaFin"
							type="time"
							{...register('horaFin', { required: true })}
						/>
						{errors.horaInicio && (
							<p className="text-red-500 text-sm">
								{errors.horaInicio.message}
							</p>
						)}
						<Button
							className="mt-4"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Reservando...' : 'Reservar'}
						</Button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
