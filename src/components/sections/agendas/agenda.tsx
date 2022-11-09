import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const AgendaModal = (props: any) => {
  const [datas, setDatas]: any = useState([]);

  const getData = async (id: any) => {
    const data: any = await axios.get("/api/client/?id=" + id);
    setDatas(data.data);
  };

  useEffect(() => {
    (async () => {
      await getData(sessionStorage.id);
    })();
  }, []);
  return (
    <div className="modal fade" id="agendas" tabIndex={-1}>
      <ToastContainer />
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="card-header">
            <button className="btn close" data-bs-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Codigo da agenda</th>
                  <th>Nome do servi&ccedil;o</th>
                  <th>Nome do cliente</th>
                  <th>Data marcada</th>
                </tr>
              </thead>
              <tbody>
                {datas.agenda
                  ? datas.agenda.map((agenda: any) => {
                      return (
                        <tr>
                          <td>{agenda.numero}</td>
                          <td>{agenda.service.serviceName}</td>
                          <td>{datas.nome}</td>
                          <td>{agenda.datetime}</td>
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
  );
};
