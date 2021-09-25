import React from 'react';
import { Route }from 'react-router-dom';

import AuthenticatedNav from "../components/nav/AuthenticatedNav";

interface Props {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
}
const LoggedInRoute = ({ component: Component, ...otherProps }: Props) => {

    // TODO: get auth status
    // const { isAuthenticated } = useSelector(
    //     (state: RootState) => state.userState
    // );

    // Redirect to the landing page if the user isn't logged in
    // if (isAuthenticated === false) {
    //     return (
    //         <>
    //             <Redirect to="/" />
    //         </>
    //     );
    // }

    return (
        <>
            <Route
                render={otherProps => (
                    <>
                        <AuthenticatedNav />
                        <Component {...otherProps} />
                    </>
                )}
            />
        </>
    );
};

export default LoggedInRoute;
