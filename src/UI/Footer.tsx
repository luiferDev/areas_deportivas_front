

export default function Footer() {
	return <>
		<footer>
				<div className="flex justify-center items-center mt-16">
					<p className="text-gray-500 text-sm">
					&copy;
						{new Date().getFullYear()} SGR. Todos los derechos reservados.
					</p>
				</div>
		</footer>
	</>;
}
