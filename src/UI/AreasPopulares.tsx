import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const areas = [
	{
		id: 1,
		nombre: 'Los Laureles',
		descripcion: 'Cancha de football',
		imageUrl: '/cancha-futbol.jpg',
		precio: 100,
	},
	{
		id: 2,
		nombre: 'La ortencia',
		descripcion: 'cancha de tenis',
		imageUrl: '/tenis.jpg',
		precio: 200,
	},
	{
		id: 3,
		nombre: 'Gym',
		descripcion: 'Gymnasio',
		imageUrl: '/gym.jpg',
		precio: 300,
	},
];

export default function AreasPopulares() {
	return (
		<>
			<h4 className="text-5xl font-bold mb-12">
				Nuestras Áreas deportivas
			</h4>
			<div className="grid grid-cols-3 gap-8">
				{areas.map((area) => (
					<Card className="w-70 h-auto" key={area.id}>
						<CardHeader>
							<CardTitle className="flex justify-start">
								{area.nombre}
							</CardTitle>
							<CardDescription className="flex justify-start">
								{area.descripcion}
							</CardDescription>
							<CardAction>
								<Button
									className="hover:bg-violet-500"
									onClick={() => console.log('reservar')}
								>
									Reservar
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							<img
								className="aspect-square w-80 h-auto"
								src={area.imageUrl}
								alt={area.nombre}
							/>
						</CardContent>
						<CardFooter>
							<p> ${area.precio}/h </p>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}
