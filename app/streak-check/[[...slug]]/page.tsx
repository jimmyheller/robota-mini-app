// app/streak-check/[[...slug]]/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import StreakCheckClient from './StreakCheckClient';

export const dynamic = 'force-dynamic';

export default function StreakCheckPage() {
    return <StreakCheckClient />;
}