import Link from "next/link";
import Router from "next/router";
import React from "react";
import { MetaTags } from "./metaTags";

export const Navbar = (props: any) => {
  const logout = () => {
    sessionStorage.clear();
    Router.push("/");
  };
  return (
    <>
      <MetaTags />
      <nav
        className={
          +props.top ? " navbar fixed-top " + props.bg : "navbar " + props.bg
        }
      >
        <div className="container">
          <div
            className="d-flex"
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <a
              className="navbar-brand mr-auto ml-auto text-center"
              style={{ fontSize: 32, width: "100%", color: props.color }}
              href="#"
            >
              <i className="fa-solid fa-car"></i>
              &nbsp;INNATER
            </a>
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    {props.show != false ? " Sair" : ""}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
