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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/UI/Footer';
import { NavigationMenuComponent } from '@/UI/NavigationMenu';
import { Link } from 'react-router';

export function Login() {
	return (
		<>
			<main className="flex flex-row justify-between">
				<NavigationMenuComponent />
				<Card className="w-full max-w-sm mt-16">
					<CardHeader>
						<CardTitle className="flex justify-start">
							Ingresa a tu cuenta
						</CardTitle>
						<CardDescription className="flex justify-start text-start">
							Ingresa tu Email para entrar a tu cuenta
						</CardDescription>
						<CardAction>
							<Button variant="outline">
								<Link to={'/sign-up'}>Sign Up</Link>
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
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
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button type="submit" className="w-full">
							Entrar
						</Button>
						<Button variant="outline" className="w-full">
							Login with Google
						</Button>
					</CardFooter>
				</Card>
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
