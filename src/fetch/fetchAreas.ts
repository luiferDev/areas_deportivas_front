import { api } from './api';

export interface Areas {
	id: number;
	nombre: string;
	description: string;
	imageUrl: string;
	precio: number;
}

export const getAreas = async (): Promise<Areas[]> => {
	try {
		const response = await api.get<Areas[]>('/api/AreaDeportiva');
		return response.data;
	} catch (e) {
		throw new Error(
			'Error al obtener las áreas: ' +
				(e instanceof Error ? e.message : String(e))
		);
	}
};
