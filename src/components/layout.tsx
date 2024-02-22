import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrap = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 4fr;
  padding: 20px;
  width: 100%;
  height: 100%;
  max-width: 860px;
`;

const MenuWrap = styled.nav``;

const MenuUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuList = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 50px;
  width: 50px;

  a {
    cursor: pointer;
  }
  svg {
    width: 30px;
    stroke: #864622;
  }
  &.log-out {
    svg {
      cursor: pointer;
      stroke: #d93e22;
    }
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");

    if (ok) {
      auth.signOut();
      navigate("/login");
    }
  };

  return (
    <Wrap>
      <MenuWrap>
        <MenuUl>
          <MenuList>
            <Link to="/">
              <svg
                aria-label="Home"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
          </MenuList>
          <MenuList>
            <Link to="/profile">
              <svg
                aria-label="profile"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          </MenuList>
          <MenuList onClick={onLogOut} className="log-out">
            <svg
              aria-label="log out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </MenuList>
        </MenuUl>
      </MenuWrap>
      <Outlet />
    </Wrap>
  );
}
