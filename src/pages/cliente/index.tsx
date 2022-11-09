import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import { Message } from "../../components/message/message";
import { Navbar } from "../../components/navbar/navbar";
import { AgendaModal } from "../../components/sections/agendas/agenda";
import { Modal } from "../../components/sections/modal/modal";
import { Tab } from "../../components/tab/tab";

const styles: any = {
  container: {
    marginTop: 70,
  },
  btn: {
    width: 50,
    height: 50,
    padding: 5,
  },
  msg: {
    fontSize: 30,
  },
};

const Home: NextPage = () => {
  const [show, setShow]: any = useState(false);
  const [datas, setDatas]: any = useState([]);
  const [search, setSearch]: any = useState("");
  const [serviceId, setServiceId]: any = useState(0);
  const [messages, setMessages]: any = useState([]);
  const [message, setMessage]: any = useState("");
  const [answers, setAnswers]: any = useState([]);
  const [top, setTop]: any = useState(0);

  const getData = async () => {
    const data: any = await axios.get("/api/service");

    if (data) {
      setDatas(data.data);
    }
  };

  const getMessages = async () => {
    const data: any = await axios.get("/api/message");

    setMessages(data.data);
  };
  const showMessage = () => {
    setShow(true);
  };

  const send = async () => {
    setTop(top + 5);
    const data: any = await axios.get("/api/message/?option=" + message);

    let d: any = document.querySelector(".answers");
    d.innerHTML +=
      "<div class='card my-2 mb-2 bg-dark text-light '><div class='card-body'>" +
      message +
      "</div></div>";

    setTimeout(() => {
      if (data) {
        if (data.data) {
          d.innerHTML +=
            "<div class='card my-2 mb-2 '><div class='card-body'>" +
            data.data.answer +
            "<br><b>Digite 0 para mostrar o menu</b></div></div>";
        } else {
          if (message != 0) {
            d.innerHTML +=
              "<div class='card my-2 mb-2 '><div class='card-body'>Op&ccedil;&atilde;o invalida<br><b>Digite 0 para mostrar o menu</b></div></div>";
          }
        }
      }
    }, 1500);

    if (message == 0) {
      d.innerHTML = "";
    }

    d.scrollTop = 100;
    setMessage("");
  };
  useEffect(() => {
    (async () => {
      if (!sessionStorage.email) {
        return Router.push("/");
      }
      await getData();
      await getMessages();
    })();
  }, []);
  return (
    <>
      <div
        style={{
          display: show ? "flex" : "none",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
        }}
      >
        <div
          className="toast bg-light"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            display: show ? "block" : "none",
          }}
        >
          <div className="toast-header">
            <strong className="me-auto">Atendimento</strong>
            <small>{new Date().getFullYear()}</small>
            <Link href="/cliente">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setShow(false)}
              />
            </Link>
          </div>
          <div className="toast-body">
            <div
              style={{
                height: 400,
                overflowY: "auto",
                width: "100%",
                overflowX: "hidden",
              }}
              className="p-1 area"
            >
              <div className="card">
                <div className="card-body" id="menu">
                  {messages
                    ? messages.map((resp: any) => {
                        return (
                          <div key={resp.id}>
                            {resp.option} - {resp.question}
                            <br />
                          </div>
                        );
                      })
                    : ""}
                  <br />
                </div>
              </div>

              <div className="row p-3 answers">
                {answers
                  ? answers.map((resp: any, i: any) => {
                      return (
                        <div className="card my-2 mb-2 col-md-12 menu" key={i}>
                          <div className="card-body ">
                            <div className="my-2 mb-2">{resp.answer}</div>
                          </div>
                          <br />
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="d-flex">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Mensagem"
                value={message}
                onChange={(evt) => setMessage(evt.target.value)}
              />
              &nbsp;
              <button className="btn btn-primary" onClick={send}>
                <span className="fa fa-paper-plane"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AgendaModal />
      <Navbar color="white" bg="bg-dark navbar-dark" />
      <div className="container" style={styles.container}>
        <div>
          <div className="container mb-4">
            <button className="btn btn-info" onClick={showMessage}>
              <span className="fa fa-envelope text-light"></span>
            </button>
            &nbsp;
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#agendas"
            >
              <span className="fa fa-pen"></span>
              <span>Minhas agendas</span>
            </button>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6"></div>
                <div className="form-group col-md-6">
                  <div className="d-flex p-2">
                    <select
                      name=""
                      id=""
                      className="form-control"
                      onChange={(evt) => setSearch(evt.target.value)}
                    >
                      <option value="">Pesquisar servi&ccedil;o</option>
                      {datas
                        ? datas.map((resp: any) => {
                            return (
                              <option value={resp.serviceName}>
                                {resp.serviceName}
                              </option>
                            );
                          })
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome do servi&ccedil;o</th>
                    <th>Hora de inicio de atendimento</th>
                    <th>Hora de fim de atendimento</th>
                    <th>Agenda</th>
                  </tr>
                </thead>
                <tbody>
                  {datas
                    ? datas.map((resp: any) => {
                        return search == "" || search == resp.serviceName ? (
                          <tr key={resp.id}>
                            <td>{resp.serviceName}</td>
                            <td>{resp.start}</td>
                            <td>{resp.end}</td>
                            <td>
                              <button
                                className="btn btn-light"
                                data-bs-target="#agenda"
                                data-bs-toggle="modal"
                                onClick={() => setServiceId(resp.id)}
                              >
                                <span className="fa fa-check text-success"></span>
                                &nbsp;
                                <span>Agendar</span>
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
      <Modal service={serviceId} />
    </>
  );
};

export default Home;
