import Link from "next/link";
import useRequest from "../hooks/use-request";

const NavLink = ({ href, text, className }) => (
  <Link href={href}>
    <a className={className}>{text}</a>
  </Link>
);
export default ({ currentUser }) => {
  const { errors, doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });
  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink href="/" text="Home" className="navbar-item" />
          {currentUser && (
            <>
              {" "}
              <NavLink
                href="/tickets/new"
                text="Sell Tickets"
                className="navbar-item"
              />
              <NavLink
                href="/orders/show"
                text="My Orders"
                className="navbar-item"
              />
            </>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!currentUser ? (
                <>
                  <NavLink
                    href="/auth/signup"
                    text={<strong>Sign Up</strong>}
                    className="button is-primary"
                  />
                  <NavLink
                    href="/auth/signin"
                    text={<strong>Log in</strong>}
                    className="button is-light"
                  />
                </>
              ) : (
                <NavLink
                  className="button is-light is-danger"
                  href="/auth/signout"
                  text={<strong>Log out</strong>}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
