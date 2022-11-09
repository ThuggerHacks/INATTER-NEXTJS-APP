import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Tab } from "../../components/tab/tab";
import { adminMiddleware } from "./middleware";

const styles: any = {
  container: {},
};

const Home: NextPage = () => {
  const router: any = useRouter();
  const [datas, setDatas]: any = useState([]);
  const [counter, setCounter]: any = useState(0);
  const [search, setSearch]: any = useState("");

  const getData: any = async (id: any) => {
    const data: any = await axios.get("/api/service/?id=" + id);

    if (data) {
      setDatas(data.data);
    }
  };

  const atender = async (id: any) => {
    const cnf = confirm("Confirmar ?");

    if (cnf && id) {
      try {
        const data: any = await axios.delete("/api/agenda/?id=" + id);

        if (data) {
          toast.success("Cliente atendido com sucesso");
          await getData(router.query.index);
        }
      } catch (error) {
        //toast.success("Cliente atendido com sucesso");
        return error;
      }
    }
  };

  useEffect(() => {
    setCounter(counter + 1);
    (async () => {
      await getData(router.query.index);
    })();
    adminMiddleware(sessionStorage.email);
  }, [router.isReady && counter > 3 && counter < 9]);
  return (
    <>
      <ToastContainer />
      <Navbar color="white" bg="bg-dark navbar-dark" />
      <div className="container" style={styles.container}>
        <Tab current="ms" />
        <div>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="form-control"
                    onChange={(evt) => setSearch(evt.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Codigo da agenda</th>
                    <th>Nome do servi&ccedil;o</th>
                    <th>Nome do cliente</th>
                    <th>Data marcada</th>
                    <th>
                      <span className="fa fa-check"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.Agenda
                    ? datas.Agenda.map((agenda: any) => {
                        return search == "" ||
                          agenda.numero.startsWith(search) ? (
                          <tr>
                            <td>{agenda.numero}</td>
                            <td>{datas.serviceName}</td>
                            <td>{agenda.client.nome}</td>
                            <td>{agenda.datetime}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => atender(agenda.id)}
                              >
                                <span className="fa fa-check"></span>
                                &nbsp;
                                <span>Atender</span>
                              </button>
                            </td>
                          </tr>
                        ) : (
                          ""
                        );
                      })
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
