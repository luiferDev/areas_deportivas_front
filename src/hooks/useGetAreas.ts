import { getAreas } from "@/fetch/fetchAreas";
import type { AreaDeportiva } from "@/types/types";
import { useEffect, useState } from "react";

export const useGetAreas = () => {
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

	return { areas };
};