const Shell = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
    return (
        <main>
            <div className="max-w-10xl mx-auto py-6 px-6 lg:px-8">
                {children}
            </div>
        </main>
    );
};

export default Shell;
