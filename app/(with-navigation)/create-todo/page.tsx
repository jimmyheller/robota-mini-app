// app/(with-navigation)/create-todo/page.tsx
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CreateTodoClient = dynamic(
    () => import('../../components/CreateTodoClientComponent'),
    { ssr: false }
);

export const metadata: Metadata = {
    title: 'Create TODO Task',
    description: 'Create a new TODO task',
};

export default function CreateTodoPage() {
    return <CreateTodoClient />;
}