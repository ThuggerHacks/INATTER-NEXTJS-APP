import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Tab } from "../../components/tab/tab";
import { adminMiddleware } from "./middleware";

const Message: NextPage = () => {
  const [option, setOption]: any = useState("");
  const [question, setQuestion]: any = useState("");
  const [answer, setAnswer]: any = useState("");
  const [datas, setDatas]: any = useState([]);

  const addMessages = async () => {
    if (
      option.trim().length == 0 ||
      question.trim().length == 0 ||
      answer.trim().length == 0
    ) {
      return toast.error("Por favor preencha todos os campos");
    }

    const data: any = await axios.post("/api/message", {
      option,
      question,
      answer,
    });

    if (data) {
      if (data.data.error) {
        toast.error(data.data.error);
      } else if (data.data.success) {
        toast.success(data.data.success);
        await getData();
      }
    } else {
      toast.error("Houve um erro");
    }
  };

  const getData = async () => {
    const data: any = await axios.get("/api/message");

    if (data) {
      setDatas(data.data);
    }
  };

  const deleteMessage = async (id: any) => {
    const cnf = confirm("Quer mesmo apagar este item ?");
    if (cnf) {
      const data: any = await axios.delete("/api/message/?id=" + id);
      if (data) {
        await getData();
      }
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
      <ToastContainer />
      <Navbar color="white" bg="bg-dark navbar-dark" />
      <div className="container">
        <Tab current="ma" />
        <div>
          <div className="card">
            <div className="card-content">
              <div className="card-header text-center">
                <h5>Adicionar Nova mensagem automatica</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Opcao"
                      onChange={(evt) => setOption(evt.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Pergunta"
                      onChange={(evt) => setQuestion(evt.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Resposta"
                      onChange={(evt) => setAnswer(evt.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-dark" onClick={addMessages}>
                  <span className="fa fa-pen"></span>
                  &nbsp;
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card my-5">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Op&ccedil;&atilde;o</th>
                  <th>Pergunta</th>
                  <th>Resposta</th>
                  <th>
                    <span className="fa fa-trash"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas
                  ? datas.map((resp: any) => {
                      return (
                        <tr key={resp.id}>
                          <td>{resp.option}</td>
                          <td>{resp.question}</td>
                          <td>{resp.answer}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteMessage(resp.id)}
                            >
                              <span className="fa fa-trash "></span>
                              &nbsp;
                              <span>Apagar</span>
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
      <Footer />
    </>
  );
};

export default Message;
