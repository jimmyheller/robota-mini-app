// app/components/Icons.tsx
interface IconProps {
    className?: string;
    isActive?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ className = "", isActive = false }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M4 14.0868C4 13.321 4 12.9381 4.0987 12.5854C4.18614 12.2731 4.32982 11.9793 4.5227 11.7185C4.74045 11.4241 5.04269 11.189 5.64719 10.7189L14.6903 3.68536C15.1587 3.32102 15.3929 3.13886 15.6515 3.06883C15.8797 3.00704 16.1203 3.00704 16.3485 3.06883C16.6071 3.13886 16.8413 3.32103 17.3097 3.68536L26.3528 10.7189C26.9573 11.189 27.2596 11.4241 27.4773 11.7185C27.6702 11.9793 27.8139 12.2731 27.9013 12.5854C28 12.9381 28 13.321 28 14.0868V23.7333C28 25.2268 28 25.9736 27.7094 26.544C27.4537 27.0457 27.0457 27.4537 26.544 27.7094C25.9735 28 25.2268 28 23.7333 28H8.26667C6.77319 28 6.02646 28 5.45603 27.7094C4.95426 27.4537 4.54631 27.0457 4.29065 26.544C4 25.9736 4 25.2268 4 23.7333V14.0868Z"
            stroke={isActive ? "#52FF00" : "#A3A3A5"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const LeaderboardIcon: React.FC<IconProps> = ({ className = "", isActive = false }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M12 9.33333H6.13333C5.3866 9.33333 5.01323 9.33333 4.72801 9.47866C4.47713 9.60649 4.27316 9.81046 4.14532 10.0613C4 10.3466 4 10.7199 4 11.4667V25.8667C4 26.6134 4 26.9868 4.14532 27.272C4.27316 27.5229 4.47713 27.7268 4.72801 27.8547C5.01323 28 5.3866 28 6.13333 28H12M12 28H20M12 28L12 6.13333C12 5.3866 12 5.01323 12.1453 4.72801C12.2732 4.47713 12.4771 4.27316 12.728 4.14532C13.0132 4 13.3866 4 14.1333 4L17.8667 4C18.6134 4 18.9868 4 19.272 4.14532C19.5229 4.27316 19.7268 4.47713 19.8547 4.72801C20 5.01323 20 5.3866 20 6.13333V28M20 14.6667H25.8667C26.6134 14.6667 26.9868 14.6667 27.272 14.812C27.5229 14.9398 27.7268 15.1438 27.8547 15.3947C28 15.6799 28 16.0533 28 16.8V25.8667C28 26.6134 28 26.9868 27.8547 27.272C27.7268 27.5229 27.5229 27.7268 27.272 27.8547C26.9868 28 26.6134 28 25.8667 28H20"
            stroke={isActive ? "#52FF00" : "#A3A3A5"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const FriendsIcon: React.FC<IconProps> = ({ className = "", isActive = false }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M21.3332 4.62368C23.3088 5.60548 24.6665 7.64419 24.6665 10C24.6665 12.3558 23.3088 14.3945 21.3332 15.3763M23.9998 22.3552C26.0151 23.2671 27.8299 24.7533 29.3332 26.6667M2.6665 26.6667C5.26183 23.3634 8.78541 21.3333 12.6665 21.3333C16.5476 21.3333 20.0712 23.3634 22.6665 26.6667M18.6665 10C18.6665 13.3137 15.9802 16 12.6665 16C9.3528 16 6.6665 13.3137 6.6665 10C6.6665 6.68629 9.3528 4 12.6665 4C15.9802 4 18.6665 6.68629 18.6665 10Z"
            stroke={isActive ? "#52FF00" : "#A3A3A5"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const PlusCircleIcon: React.FC<IconProps> = ({ className = "" }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);