

export const ThemeToggleButton: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button 
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                // Exibe o ícone de 'light mode' quando o tema é 'dark' (para sugerir a mudança)
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3a9 9 0 0 0 9 9 9 9 0 0 0-9-9zM4.1 4.1A10.02 10.02 0 0 1 12 2a10 10 0 0 1 7.9 4.1L12 12V3h-.1zM18.9 18.9A9.98 9.98 0 0 1 12 22a10 10 0 0 1-7.9-4.1L12 12v9.8zM2.1 21.9A10.02 10.02 0 0 1 12 22a10 10 0 0 1-7.9-4.1L12 12V3h-.1z" />
                </svg>
            ) : (
                // Exibe o ícone de 'dark mode' quando o tema é 'light'
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.44-.04-.88-.12-1.3A9 9 0 0 1 12 3z" />
                </svg>
            )}
        </button>
    );
};