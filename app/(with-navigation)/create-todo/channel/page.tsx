// app/(with-navigation)/create-todo/channel/page.tsx
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CreateChannelTaskClient = dynamic(
    () => import('../../../components/CreateChannelTaskClient'),
    { ssr: false }
);

export const metadata: Metadata = {
    title: 'Create Channel Task',
    description: 'Create a new channel joining task',
};

export default function CreateChannelTaskPage() {
    return <CreateChannelTaskClient />;
}