export interface Reservacion {
	reserva: Reserva;
	areaDeportiva: AreaDeportiva;
}

export interface Reserva {
	id: string;
	fecha: string;
	horaInicio: string;
	horaFin: string;
	estado: string;
}

export interface AreaDeportiva {
	id: number;
	nombre: string;
	description: string;
	tipoArea: string;
	disponibilidad: boolean;
	imageUrl: string;
	precio: number;
}
