import React, { useState, useEffect } from "react";
import axios from "axios";
import { FRONTEND_URL, BASE_URL } from "../env";
import UserData from "./UserData";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useUser, UserProfile } from "@auth0/nextjs-auth0";

import PageLink from "./PageLink";
import AnchorLink from "./AnchorLink";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(FRONTEND_URL + "api/auth/me")
      .then((res) => res.data.sub.split("|")[1])
      .then((id) =>
        axios.get(BASE_URL + "users/" + id).then((res) => {
          const user = new UserData(id, res.data);
          console.log(user)
          setUserData(user);
        })
      );
  }, []);

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="white" light expand="md">
        <Container>
          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar data-testid="navbar-items">
              <NavItem>
                <PageLink href="/" className="nav-link" testId="navbar-home">
                  Home
                </PageLink>
              </NavItem>
              <NavItem>
                <PageLink
                  href="/team"
                  className="nav-link"
                  testId="navbar-home"
                >
                  Team
                </PageLink>
              </NavItem>
              <NavItem>
                <PageLink href="/faq" className="nav-link" testId="navbar-home">
                  FAQ
                </PageLink>
              </NavItem>

              {user && (
                <>
                  <NavItem>
                    <PageLink
                      href="/feed"
                      className="nav-link"
                      testId="navbar-csr"
                    >
                      Feed
                    </PageLink>
                  </NavItem>

                  <NavItem>
                    <PageLink
                      href="/messages"
                      className="nav-link"
                      testId="navbar-csr"
                    >
                      Messages
                    </PageLink>
                  </NavItem>

                  <NavItem>
                    <PageLink
                      href="/groups"
                      className="nav-link"
                      testId="navbar-csr"
                    >
                      Groups
                    </PageLink>
                  </NavItem>

                  <NavItem>
                    <PageLink
                      href="/projects"
                      className="nav-link"
                      testId="navbar-csr"
                    >
                      Projects
                    </PageLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isLoading && !user && (
                <NavItem id="qsLoginBtn">
                  <AnchorLink
                    href="/api/auth/login"
                    className="btn btn-primary btn-margin bg-emerald-900"
                    tabIndex={0}
                    testId="navbar-login-desktop"
                  >
                    Log in
                  </AnchorLink>
                </NavItem>
              )}
              {user && (
                <UncontrolledDropdown
                  nav
                  inNavbar
                  data-testid="navbar-menu-desktop"
                >
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={userData.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-desktop"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header data-testid="navbar-user-desktop">
                      {user.name}
                    </DropdownItem>
                    <DropdownItem className="dropdown-profile" tag="span">
                      <PageLink
                        href="/profile"
                        icon="user"
                        testId="navbar-profile-desktop"
                      >
                        Profile
                      </PageLink>
                    </DropdownItem>
                    <DropdownItem id="qsLogoutBtn">
                      <AnchorLink
                        href="/api/auth/logout"
                        icon="power-off"
                        testId="navbar-logout-desktop"
                      >
                        Log out
                      </AnchorLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isLoading && !user && (
              <Nav className="d-md-none" navbar>
                <AnchorLink
                  href="/api/auth/login"
                  className="btn btn-primary btn-block"
                  tabIndex={0}
                  testId="navbar-login-mobile"
                >
                  Log in
                </AnchorLink>
              </Nav>
            )}
            {user && (
              <Nav
                id="nav-mobile"
                className="d-md-none justify-content-between"
                navbar
                data-testid="navbar-menu-mobile"
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={userData.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-mobile"
                    />
                    <h6
                      className="d-inline-block"
                      data-testid="navbar-user-mobile"
                    >
                      {user.name}
                    </h6>
                  </span>
                </NavItem>
                <NavItem>
                  <PageLink
                    href="/profile"
                    icon="user"
                    testId="navbar-profile-mobile"
                  >
                    Profile
                  </PageLink>
                </NavItem>
                <NavItem id="qsLogoutBtn">
                  <AnchorLink
                    href="/api/auth/logout"
                    className="btn btn-link p-0"
                    icon="power-off"
                    testId="navbar-logout-mobile"
                  >
                    Log out
                  </AnchorLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
