import { getAreas, type Areas } from '@/fetch/fetchAreas';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export default function AreaInfo() {
	const { id } = useParams();
	console.log(id);

	const [areas, setAreas] = useState<Areas[]>([]);

	useEffect(() => {
		getAreas().then((data) => {
			setAreas(data);
		});
	}, []);

	const selectedProduct: Areas | undefined = areas.find(
		(f) => f.id.toString() === id
	);

	return (
		<>
			<h2 className="text-5xl">Información Detallada del area</h2>
			{selectedProduct && (
				<>
					<h3 className="text-3xl mt-8 mb-4">
						{selectedProduct.nombre}
					</h3>
					<p>{selectedProduct.description}</p>
					{selectedProduct.description === 'Gimnasio' ? (
						<p className="">
							{' '}
							mensualidad:{' '}
							<span className="font-bold">
								${selectedProduct.precio}
							</span>{' '}
							sin ninguna restricción
						</p>
					) : (
						<p className="">
							<span className="font-bold">
								${selectedProduct.precio}
							</span>{' '}
							el bloque de 2 horas
						</p>
					)}
					<img
						src={selectedProduct.imageUrl}
						alt={selectedProduct.description}
					/>
				</>
			)}
			<form>
				<Label htmlFor="hora-inicio">Hora Inicio</Label>
				<Input name="hora-inicio" type="time" />
				<Label htmlFor="hora-final">Hora Final</Label>
				<Input name="hora-final" type="time" />
			</form>
		</>
	);
}
