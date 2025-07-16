import { ReactNode } from 'react';

export default function PageTemplate({children}: { children: ReactNode }) {
	return (
		<>
			<nav>
				{/*	sidebar */}
			</nav>
			<div className="flex flex-col h-screen">
				<main className="flex-1 p-4">
					{children}
				</main>
			</div>
		</>
	)
}
