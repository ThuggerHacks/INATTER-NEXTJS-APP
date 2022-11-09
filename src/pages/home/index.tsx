import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Tab } from "../../components/tab/tab";
import { adminMiddleware } from "./middleware";

const styles: any = {
  container: {},
};

const Home: NextPage = () => {
  const [datas, setDatas]: any = useState([]);

  const deleteService = async (id: any) => {
    const cnf = confirm("Deseja mesmo apagar este servico?");

    if (cnf) {
      const data: any = await axios.delete("/api/service/?id=" + id);

      if (data) {
        if (data.data) {
          await getData();
        }
      }
    }
  };

  const getData = async () => {
    const data: any = await axios.get("/api/service");

    if (data) {
      setDatas(data.data);
    }
  };
  useEffect(() => {
    (async () => {
      await getData();
    })();
    adminMiddleware(sessionStorage.email);
  }, []);

  return (
    <>
      <Navbar color="white" bg="bg-dark navbar-dark" />
      <div className="container" style={styles.container}>
        <Tab current="ms" />
        <div>
          <div className="card">
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome do servi&ccedil;o</th>
                    <th>Hora de inicio de atendimento</th>
                    <th>Hora de fim de atendimento</th>
                    <th>Agenda</th>
                    <th>
                      <span className="fa fa-trash"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length > 0
                    ? datas.map((res: any) => {
                        return (
                          <tr key={res.id}>
                            <td>{res.serviceName}</td>
                            <td>{res.start}</td>
                            <td>{res.end}</td>
                            <td>
                              <Link href={"/home/" + res.id}>
                                <button className="btn btn-light">
                                  <span className="fa fa-eye text-info"></span>
                                  &nbsp;
                                  <span>Ver</span>
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => deleteService(res.id)}
                              >
                                <span className="fa fa-trash "></span>
                                &nbsp;
                                <small className="">Apagar</small>
                              </button>
                            </td>
                          </tr>
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
