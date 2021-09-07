const LandingBody = () => {

    return (
        <main >
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center">
                <div className="px-4 sm:px-8">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block ">Some random</span>{' '}
                        <span className="block text-indigo-600 ">placeholder text</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 sm:flex sm:justify-center ">
                        <div className="rounded-md shadow">
                            <a
                                href="#"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                            >
                                Get started
                            </a>
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            <a
                                href="#"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                            >
                                Live demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
};

export default LandingBody;
