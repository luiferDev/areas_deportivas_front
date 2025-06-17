import { Button } from '@/components/ui/button';
import { getAreas, type Areas } from '@/fetch/fetchAreas';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function AreasPopulares() {
	const [areas, setAreas] = useState<Areas[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAreas = async () => {
			try {
				const data = await getAreas();
				setAreas(data);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchAreas();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<h4 className="text-5xl font-bold mb-12">
				Nuestras Áreas deportivas
			</h4>
			<div className="grid grid-cols-3 gap-8">
				{Array.isArray(areas) ? (
					areas.map((area) => (
						<Card className="w-70 h-auto" key={area.id}>
							<CardHeader>
								<CardTitle className="flex justify-start">
									{area.nombre}
								</CardTitle>
								<CardDescription className="flex justify-start">
									{area.description}
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
					))
				) : (
					<p>No se encontraron áreas disponibles.</p>
				)}
			</div>
		</>
	);
}
