import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/UI/Footer';
import { NavigationMenuComponent } from '@/UI/NavigationMenu';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { api } from '@/fetch/api';
import { useAuthStore } from '@/store/Auth';
import { auth } from '@/fetch/auh';

interface LoginForm {
	email: string;
	password: string;
}

const loginRequest = async (email: string, password: string) => {
	const res = await api.post('/api/Auth/login', {
		email: email,
		password: password,
	});
	return res.data;
};

const profileRequest = async (email: string) => {
	return await auth.get(`/api/Usuario/user?email=${email}`);
};

export function Login() {
	const { register, handleSubmit } = useForm<LoginForm>();
	const setToken = useAuthStore((state) => state.setToken);
	const setProfile = useAuthStore((state) => state.setProfile);
	const navigate = useNavigate();

	const onLogin = async (data: LoginForm) => {
		try {
			const res = await loginRequest(data.email, data.password);
			const profile = await profileRequest(data.email);
			setToken(res.token);
			setProfile(profile.data);
			navigate('/');
		} catch (error) {
			console.error('Error al hacer login:', error);
		}
	};

	return (
		<>
			<main className="flex flex-row justify-between">
				<NavigationMenuComponent />
				<div className="w-full max-w-sm mt-16 border-2 p-6 rounded-2xl">
					<div className="flex flex-row justify-between items-center">
						<div className="pb-4">
							<h2 className="flex justify-start font-bold">
								Ingresa a tu cuenta
							</h2>
							<p className="flex justify-start text-start text-sm w-40">
								Ingresa tu Email para entrar a tu cuenta
							</p>
						</div>
						<div>
							<Button variant="outline">
								<Link to={'/sign-up'}>Sign Up</Link>
							</Button>
						</div>
					</div>
					<div>
						<form onSubmit={handleSubmit(onLogin)}>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="example@example.com"
										required
										{...register('email', {
											required: true,
										})}
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password
										</Label>
										<a
											href="#"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Olvidase tu password?
										</a>
									</div>
									<Input
										id="password"
										type="password"
										required
										{...register('password', {
											required: true,
										})}
									/>
								</div>
							</div>
							<footer className="flex-col gap-2 mt-8">
								<Button
									type="submit"
									className="w-full cursor-pointer"
								>
									Entrar
								</Button>
								<Button
									variant="outline"
									className="w-full mt-4 cursor-pointer"
								>
									Login with Google
								</Button>
							</footer>
						</form>
					</div>
				</div>
				<aside className="bg-violet-800 h-[400px] w-1/2 text-start justify-start align-start mt-16">
					<div className="ml-20 pt-20">
						<h3 className="text-5xl font-bold">Bienvenido/a</h3>
						<p className="text-3xl w-80 mt-4">
							Ingresa para reservar tus áreas deportivas
							facilmente
						</p>
					</div>
				</aside>
			</main>
			<Footer />
		</>
	);
}
