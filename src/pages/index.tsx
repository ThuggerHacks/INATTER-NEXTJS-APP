import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../components/footer/footer";
import { Navbar } from "../components/navbar/navbar";
import { adminList } from "../utils/admin";

const styles: any = {
  container: {
    backgroundSize: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    float: "right",
  },
};

const Home: NextPage = () => {
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");

  const login = async () => {
    const data: any = await axios.post("/api/client", {
      email,
      password,
    });

    if (!data.data) {
      toast.error("Dados incorrectos");
    } else {
      let isNotAdmin = true;
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("id", data.data.id);
      adminList.map(async (res: any) => {
        if (res == data.data.email) {
          isNotAdmin = false;
          return await Router.push("/home");
        }
      });

      if (isNotAdmin) {
        Router.push("/cliente");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar show={false} color="white" bg="transparent-bg" top={true} />
      <div className="main-bg" style={styles.container}>
        <div className="card">
          <div className="card-content">
            <div className="card-header bg-dark text-center">
              <h1 className="text-light">LOGIN</h1>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <label htmlFor="email">Seu email</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  className="form-control"
                  placeholder="Seu email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Sua senha</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  className="form-control"
                  placeholder="Sua senha"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <button className="btn btn-dark text-light mb-3" onClick={login}>
                Entrar
              </button>
              <small>
                <Link href="/signup" legacyBehavior>
                  <a style={styles.btn} className="mb-3 my-3">
                    N&atilde;o tem conta ?
                  </a>
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
