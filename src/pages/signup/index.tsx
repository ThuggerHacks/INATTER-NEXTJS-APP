import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { adminList } from "../../utils/admin";

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

const SignUp: NextPage = () => {
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [province, setProvince]: any = useState("");
  const [confirm, setConfirm]: any = useState("");
  const [nome, setName]: any = useState("");

  const register = async () => {
    if (
      email.trim().length == 0 ||
      password.trim().length == 0 ||
      province.trim().length == 0
    ) {
      toast.error("Por favor preencha todos os campos");
    } else {
      const data: any = await axios.post("/api/client", {
        email,
        password,
        province,
        nome,
      });

      if (data.data) {
        if (data.data.error) {
          toast.error(data.data.error);
        } else if (data.data.success) {
          toast.success(data.data.success);
          setTimeout(() => {
            Router.push("/");
          }, 1000);
        }
      } else {
        toast.error("Houve um erro");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar show={false} color="white" bg="transparent-bg" top={true} />
      <div className="main-bg" style={styles.container}>
        <div className="card " style={{ marginTop: 70 }}>
          <div className="card-content">
            <div className="card-header bg-dark text-center">
              <h1 className="text-light">CRIAR CONTA</h1>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <label htmlFor="email">Nome</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  className="form-control"
                  placeholder="email"
                  onChange={(evt) => setName(evt.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  className="form-control"
                  placeholder="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Provincia</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(evt) => setProvince(evt.target.value)}
                >
                  <option value="">Selecione a sua provincia</option>
                  <option value="Maputo">Maputo</option>
                  <option value="Inhambane">Inhambane</option>
                  <option value="Gaza">Gaza</option>
                  <option value="Sofala">Sofala</option>
                  <option value="Manica">Manica</option>
                  <option value="Tete">Tete</option>
                  <option value="Zambezia">Zambezia</option>
                  <option value="Nampula">Nampula</option>
                  <option value="Cabo delega">Cabo delegado</option>
                  <option value="Niassa">Niassa</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  className="form-control"
                  placeholder="senha"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>

              {/* <div className="form-group mb-3">
                <label htmlFor="password2">Confirmar senha</label>
                <input
                  type="password"
                  name=""
                  id="password2"
                  className="form-control"
                  placeholder="confirmar senha"
                  onChange={(evt) => setConfirm(evt.target.value)}
                />
              </div> */}

              <button
                className="btn btn-dark text-light mb-3"
                onClick={register}
              >
                Registar
              </button>
              <small>
                <Link href="/" legacyBehavior>
                  <a style={styles.btn} className="mb-3 my-3">
                    Tem conta ?
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

export default SignUp;
