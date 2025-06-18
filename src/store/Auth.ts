import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Profile {
	id: string;
	nombre: string;
	email: string;
	role: string;
}

interface State {
	token: string;
	profile: Profile | null;
	isAuth: boolean;
}
interface Actions {
	setToken: (token: string) => void;
	setProfile: (profile: Profile) => void;
	logout: () => void;
}

export const useAuthStore = create<State & Actions>()(
	persist(
		(set) => ({
			token: '',
			profile: null,
			isAuth: false,
			setToken: (token: string) => set({ token, isAuth: true }),
			setProfile: (profile: Profile) => set({ profile }),
			logout: () => set({ token: '', profile: null, isAuth: false }),
		}),
		{
			name: 'auth',
		}
	)
)