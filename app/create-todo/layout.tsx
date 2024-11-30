// (with-navigation)/layout.tsx
'use client';

import Navigation from '../components/Navigation';

export default function LayoutWithNavigation({
                                                 children,
                                             }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow pb-24">
                {children}
            </div>
            <Navigation/>
        </div>
    );
}