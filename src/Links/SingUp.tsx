import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/fetch/api';
import Footer from '@/UI/Footer';
import { NavigationMenuComponent } from '@/UI/NavigationMenu';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface RegisterForm {
	nombre: string;
	email: string;
	password: string;
}

const registerRequest = async (nombre: string, email: string, password: string) => {
	const res = await api.post('/api/Auth/register', {
		nombre: nombre,
		email: email,
		password: password
	})
	return res.data;
};

export function SignUp() {
	const { register, handleSubmit } = useForm<RegisterForm>();
	const navigate = useNavigate();

	const onRegister = async (data: RegisterForm) => {
		try{
			await registerRequest(
				data.nombre,
				data.email,
				data.password
			);
			alert('Usuario registrado correctamente');
			navigate('/login');
		} catch (error) {
			let errorMessage = 'Error desconocido';
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			alert('Error al registrar usuario: ' + errorMessage);
		}
	}

	return (
		<>
			<main className="flex flex-row justify-between">
				<aside className="bg-violet-800 h-[400px] w-1/2 text-start justify-start align-start mt-16">
					<div className="ml-20 pt-20">
						<h3 className="text-5xl font-bold">Regístrate</h3>
						<p className="text-3xl w-80 mt-4">
							Comienza tu ruta para reservar tus clases favoritas
							y tus espacios de entrenamiento
						</p>
					</div>
				</aside>
				<NavigationMenuComponent />
				<div className="w-full max-w-sm mt-16">
					<h2>
						<h2 className="flex justify-start">
							Regístrate
						</h2>
						<p className="flex justify-start text-start">
							Ingresa tus datos para registrarte
						</p>
					</h2>
					<div>
						<form onSubmit={handleSubmit(onRegister)}>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="nombre">Nombre</Label>
									<Input
										id="nombre"
										type="text"
										placeholder="Jhon Doe"
										{...register('nombre',{required:true})}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										{...register('email',{required:true})}
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password
										</Label>
									</div>
									<Input
										id="password"
										type="password"
										placeholder="*************"
										{...register('password',{required:true})}
										required
									/>
								</div>
							</div>
					<footer className="flex-col gap-2 mt-8">
						<Button type="submit" className="w-full">
							Registrarse
						</Button>
					</footer>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
