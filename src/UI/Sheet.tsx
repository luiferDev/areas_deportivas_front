import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { EditIcon } from 'lucide-react';
import { editReservationRequest } from '@/fetch/reservationRequests';
import { useFetchReservations } from '@/hooks/useFetchReservation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	editReservationSchema,
	type EditReservationForm,
} from '@/schemas/editReservationSchema';

export function SheetDemo({ reservaId }: { reservaId: string }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EditReservationForm>({
		resolver: zodResolver(editReservationSchema),
	});
	const { fetchReservations } = useFetchReservations();

	const handleEditReservations = async (data: EditReservationForm) => {
		try {
			await editReservationRequest(
				reservaId,
				new Date(data.fecha),
				data.horaInicio,
				data.horaFin
			);
			fetchReservations();
			alert('Reservación exitosa');
		} catch (error) {
			console.error('Error al hacer la reservación:', error);
			alert('Error al hacer la reservación: ' + error);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="hover:bg-violet-500" variant="default">
					<EditIcon />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<form onSubmit={handleSubmit(handleEditReservations)}>
					<SheetHeader>
						<SheetTitle>Editar Reservación</SheetTitle>
						<SheetDescription>
							Complete los campos para editar la reservación.
						</SheetDescription>
					</SheetHeader>
					<div className="grid flex-1 auto-rows-min gap-6 px-4">
						<div className="grid gap-3">
							<Label htmlFor="fecha">Fecha</Label>
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
						</div>
						<div className="grid gap-3">
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
						</div>
						<div className="grid gap-3">
							<Label htmlFor="hora-final">Hora Final</Label>
							<Input
								id="horaFin"
								type="time"
								{...register('horaFin', { required: true })}
							/>
							{errors.horaFin && (
								<p className="text-red-500 text-sm">
									{errors.horaFin.message}
								</p>
							)}
						</div>
					</div>
					<SheetFooter className="mt-64">
						<Button disabled={isSubmitting} type="submit">
							{isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
						</Button>
						<SheetClose asChild>
							<Button variant="outline">Cerrar</Button>
						</SheetClose>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
export default SheetDemo;
