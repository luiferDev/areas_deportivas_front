import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export default function Header() {
	const isAuth = 'hola';
	return (
		<>
			<header className="h-dvh content-center m-auto">
				<h1 className="text-7xl">Bienvido/a</h1>
				<h2 className="text-3xl mt-4">
					Sistema de Gestión de Reservaciones <span>(SGR)</span>
				</h2>
				<h2 className="mt-10 text-2xl text-gray-500 max-w-80 m-auto content-center">
					Reserva tus areas deportivas cuando quieras
				</h2>
				<div className='m-auto mt-12'>
					<Button className="bg-violet-800 mr-8 cursor-pointer">
						<Link to="/ver-mas">Ver Más</Link>
					</Button>
					<Button className='cursor-pointer'>
						<Link to={isAuth ? '/reservar' : '/login'}>
							Reservar
						</Link>
					</Button>
				</div>
			</header>
		</>
	);
}
