import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../public/images/logo.svg";
import { jwtDecode } from "jwt-decode";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

const HeaderHome = () => {
  const featureSectionRef = useRef(null);
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserDetails(decodedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="navigation-main">
      <nav className="navigation-wrap">
        <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease"
          data-easing2="ease" role="banner" className="navigation w-nav">
          <div className="navigation-container">
            <Link to="/">
              <img src={logo} alt={"Advance Your Career"} className="brand logo-image"></img>
            </Link>
            <div className="navigation-left"></div>

            <nav role="navigation" className="nav-menu w-nav-menu">
              <Link to="/" className="navbar-link w-nav-link">Home</Link>
              <a href="#" onClick={() => scrollToSection(featureSectionRef)}
                className="navbar-link w-nav-link">Features</a>
              <Link to="/apps" className="navbar-link w-nav-link">Platform</Link>
              <Link to="/aboutus" className="navbar-link w-nav-link">Solutions</Link>
              <Link to="/aboutus" className="navbar-link w-nav-link">Careers</Link>
              <Link to="/contact" className="navbar-link w-nav-link">Events</Link>
              <Link to="/contact" className="navbar-link w-nav-link">Pricing</Link>
              <Link to="/contact" className="navbar-link w-nav-link">Resources</Link>
              <Link to="/aboutus" className="navbar-link w-nav-link">About us</Link>
              <Link to="/contact" className="navbar-link w-nav-link">Contact</Link>
            </nav>

            <div className="navigation-right">
              {!userDetails ? (
                <>
                <Button className="text-black" variant='light' radius="lg" size="lg" onClick={() => navigate('/login')}>Login</Button>
                <Button color='primary' variant='shadow' radius="full"  size="lg" onClick={() => navigate('/register')}>Join for free</Button>
                {/* <Link to="/register" className="button w-button">Register</Link> */}
                </>
              ) : (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name={userDetails.fullName}
                      size="sm"
                      src="https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{userDetails.email}</p>
                    </DropdownItem>
                    {userDetails.onBoardingStatus ? (
                      <DropdownItem key="profile" href="/profile">Profile</DropdownItem>
                    ) : (
                      <DropdownItem
                        key="onboarding"
                        color="warning"
                        onClick={() => {
                          if (userDetails.category === 'student') {
                            navigate('/onboarding');
                          } else if (userDetails.category === 'enterprise') {
                            navigate('/enterprise/onboarding');
                          }
                        }}
                      >
                        Complete Onboarding
                      </DropdownItem>
                    )}
                    <DropdownItem key="subscriptions">Subscriptions</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>

        <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease-out" data-easing2="ease-out" role="banner" className="navigation-mob w-nav" style={{ overflow: 'visible' }}>
          <div className="navigation-container-mob">
            <a href="#" className="brand w-nav-brand">
              <img src={logo} alt={"Advance Your Career"} className="brand logo-2" style={{ minWidth: "100px", marginLeft: 0, paddingLeft: 0 }}></img>
            </a>
            <div className="nav-mobile-button-wrap">
              <div className="menu-mob w-nav-button" onClick={toggleMenu}>
                <div className="w-icon-nav-menu"></div>
              </div>
            </div>
            {isOpen && (
              <nav role="navigation" className="nav-menu" style={{ overflow: 'visible', display: "block", justifyContent: "space-around", position: "absolute", float: "right", left: 0, width: "100%", top: "100%", cursor: "pointer" }}>
                <div className="nav-menu-inner" style={{ overflow: 'visible' }}>
                  <Link to="/" className="navbar-link w-nav-link">Home</Link>
                  <a href="#" onClick={() => scrollToSection(featureSectionRef)}
                    className="navbar-link w-nav-link">Features</a>
                  <Link to="/apps" className="navbar-link w-nav-link">Platform</Link>
                  <Link to="/aboutus" className="navbar-link w-nav-link">Solutions</Link>
                  <Link to="/aboutus" className="navbar-link w-nav-link">Careers</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Events</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Pricing</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Resources</Link>
                  <Link to="/aboutus" className="navbar-link w-nav-link">About us</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Contact</Link>
                </div>
              </nav>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderHome;
