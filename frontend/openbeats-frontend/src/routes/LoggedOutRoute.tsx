import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import LandingNav from '../components/nav/LandingNav'

interface Props {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
}
const LoggedOutRoute = ({ component: Component, ...otherProps }: Props) => {

    // TODO: check auth status
    // const { isAuthenticated } = useSelector(
    //     (state: RootState) => state.userState
    // );
    const isAuthenticated = false; // placeholder

    // TODO: Redirect to the dashboard if the user logs in
    // if (isAuthenticated === true) {
    //     return (
    //         <>
    //             <Redirect to="/dashboard" />
    //         </>
    //     );
    // }

    return (
        <>
            <Route
                render={otherProps => (
                    <>
                        <LandingNav/>
                        <Component {...otherProps} />
                    </>
                )}
            />
        </>
    );
};

export default LoggedOutRoute;
