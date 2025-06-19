import type { AreaDeportiva } from '@/types/types';
import { api } from './api';



export const getAreas = async (): Promise<AreaDeportiva[]> => {
	try {
		const response = await api.get<AreaDeportiva[]>('/api/AreaDeportiva');
		return response.data;
	} catch (e) {
		throw new Error(
			'Error al obtener las áreas: ' +
				(e instanceof Error ? e.message : String(e))
		);
	}
};
