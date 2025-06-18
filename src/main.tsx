import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App.tsx';
import { Login } from './Links/Login.tsx';
import { SignUp } from './Links/SingUp.tsx';
import AreaInfo from './UI/AreaInfo.tsx';
import Profile from './UI/Profile.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path='/area/:id' element={<AreaInfo />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
