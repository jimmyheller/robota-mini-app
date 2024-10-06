// app/(with-navigation)/layout.tsx
import Navigation from '../components/Navigation';

export default function LayoutWithNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
}