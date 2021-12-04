import React from "react";
import { Row, Col } from "reactstrap";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Settings from "../components/Settings";

function Profile() {
  const { user, isLoading } = useUser();
  const userid = user.id;
  

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row
            className="align-items-center profile-header mb-5 text-center text-md-left"
            data-testid="profile"
          />
          <Settings />
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
