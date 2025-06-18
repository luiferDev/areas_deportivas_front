import { useAuthStore } from "@/store/Auth";
import { NavigationMenuComponent } from "./NavigationMenu";



export default function Profile() {
	const profile = useAuthStore((state) => state.profile);

	return (
		<>
			<main>
				<NavigationMenuComponent />
				<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
					<div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
						<h1 className="text-2xl font-bold mb-6 text-center">
							Bienvenido/a <span>{profile?.nombre}</span>
						</h1>
					</div>
				</div>
			</main>
		</>
	);
}
