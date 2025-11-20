export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-center justify-center px-16 py-8 w-full max-w-[1440px] mx-auto">
            {children}
        </div>
    );
};
