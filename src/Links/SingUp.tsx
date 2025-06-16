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
			<NavigationMenuComponent />
			<Card className="w-full max-w-sm mt-16">
				<CardHeader>
					<CardTitle className="flex justify-start">
						Login to your account
					</CardTitle>
					<CardDescription className="flex justify-start text-start">
						Enter your email below to login to your account
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
									<Label htmlFor="password">Password</Label>
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
			<Footer />
		</>
	);
}
