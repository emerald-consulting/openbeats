import React, {  } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from '../api/auth';
import AuthenticatedNav from "../components/nav/AuthenticatedNav";
import { useQuery } from 'react-query'
interface Props {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
}
const LoggedInRoute = ({ component: Component }: Props) => {

    // https://stackoverflow.com/questions/67040687/react-query-doesnt-seem-to-be-caching
    // https://tkdodo.eu/blog/react-query-and-type-script
    const { data, isLoading } = useQuery<boolean, Error>('auth', isUserLoggedIn, {
        retry: false,
    })
    
    console.log(data);
    
    // Don't show anything while request is going out
    if (isLoading) {
        return null;
    }

    // Redirect to the landing page if the user isn't logged in
    if (data === false || data === undefined) {
        return (
            <>
                <Redirect to="/" />
            </>
        );
    }


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
