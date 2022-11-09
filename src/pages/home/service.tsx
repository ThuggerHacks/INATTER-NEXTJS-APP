import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Tab } from "../../components/tab/tab";
import { adminMiddleware } from "./middleware";

const AddService: NextPage = () => {
  const [serviceName, setServiceName]: any = useState("");
  const [start, setStart]: any = useState("");
  const [end, setEnd]: any = useState("");

  const add = async () => {
    if (
      serviceName.trim().length == 0 ||
      start.trim().length == 0 ||
      end.trim().length == 0
    ) {
      return toast.error("Por favor preencha todos os campos em branco");
    }

    const data = await axios.post("/api/service", {
      serviceName,
      start,
      end,
    });

    if (data.data) {
      if (data.data.error) {
        toast.error(data.data.error);
      } else if (data.data.success) {
        toast.success(data.data.success);
      }
    } else {
      toast.error("Houve um erro");
    }
  };

  useEffect(() => {
    adminMiddleware(sessionStorage.email);
  }, []);
  return (
    <>
      <ToastContainer />
      <Navbar color="white" bg="bg-dark navbar-dark" />
      <div className="container">
        <Tab current="ns" />
        <div>
          <div className="card">
            <div className="card-content">
              <div className="card-header text-center">
                <h2>Novo servi&ccedil;o</h2>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="form-group col-md-12 mb-3">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Nome do servico"
                      onChange={(evt) => setServiceName(evt.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-6 mb-3">
                    <label htmlFor="start">Inicio de atendimento</label>
                    <input
                      type="time"
                      name=""
                      id="start"
                      className="form-control"
                      placeholder="Nome do servico"
                      onChange={(evt) => setStart(evt.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-6 mb-3">
                    <label htmlFor="end">Fim de atendimento</label>
                    <input
                      type="time"
                      name=""
                      id="end"
                      className="form-control"
                      placeholder="Nome do servico"
                      onChange={(evt) => setEnd(evt.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-dark" onClick={add}>
                  <span className="fa fa-pen"></span>
                  &nbsp;
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddService;
