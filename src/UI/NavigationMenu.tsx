'use client';

import * as React from 'react';
import { Link } from 'react-router';
import { ClipboardSignatureIcon, LogInIcon } from 'lucide-react';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavigationMenuComponent() {
	return (
		<NavigationMenu className="fixed m-auto ml-92" viewport={false}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={navigationMenuTriggerStyle()}
					>
						<Link to="/">Home</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Catálogo</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
										href="/"
									>
										<div className="mt-4 mb-2 text-lg font-medium">
											shadcn/ui
										</div>
										<p className="text-muted-foreground text-sm leading-tight">
											Beautifully designed components
											built with Tailwind CSS.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem to="/docs" title="Introduction">
								Re-usable components built using Radix UI and
								Tailwind CSS.
							</ListItem>
							<ListItem
								to="/docs/installation"
								title="Installation"
							>
								How to install dependencies and structure your
								app.
							</ListItem>
							<ListItem
								to="/docs/primitives/typography"
								title="Typography"
							>
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={navigationMenuTriggerStyle()}
					>
						<Link to="/docs">Recursos</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			
						<NavigationMenuItem>
					<NavigationMenuTrigger>Contacto</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link to="#">Components</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link to="#">Documentation</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link to="#">Blocks</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Entrar</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link
										to="/login"
										className="flex-row items-center gap-2"
									>
										<LogInIcon />
										Log In
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link
										to="/sign-up"
										className="flex-row items-center gap-2"
									>
										<ClipboardSignatureIcon />
										Sing Up
									</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function ListItem({
	title,
	children,
	to,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { to: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link to={to}>
					<div className="text-sm leading-none font-medium">
						{title}
					</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
