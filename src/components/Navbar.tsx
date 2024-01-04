import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export const Navbar = (): JSX.Element => {
  return (
    <nav className="container mb-10">
      <div className="content navbar">
        <a className="navbar__logo" href="/">
          <Logo />
        </a>
        <div className="navbar__items">
          <div className="navbar__items--left">
            <div className="navbar__item mr-4">
              <NavLink to="/">Psy</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
