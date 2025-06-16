import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/UI/Footer';
import { NavigationMenuComponent } from '@/UI/NavigationMenu';

export function SignUp() {
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
				<Card className="w-full max-w-sm mt-16">
					<CardHeader>
						<CardTitle className="flex justify-start">
							Regístrate
						</CardTitle>
						<CardDescription className="flex justify-start text-start">
							Ingresa tus datos para registrarte
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="nombre">Nombre</Label>
									<Input
										id="nombre"
										type="text"
										placeholder="Jhon Doe"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
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
										required
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button type="submit" className="w-full">
							Registrarse
						</Button>
					</CardFooter>
				</Card>
			</main>
			<Footer />
		</>
	);
}
