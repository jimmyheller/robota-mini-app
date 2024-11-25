// (with-navigation)/layout.tsx
'use client';

import Navigation from '../components/Navigation';
import TokenLogo from '../components/TokenLogo';

export default function LayoutWithNavigation({
                                                 children,
                                             }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center items-center p-8">
                <TokenLogo width={180} height={180}/>
            </div>
            <div className="flex-grow pb-24">
                {children}
            </div>
            <Navigation/>
        </div>
    );
}