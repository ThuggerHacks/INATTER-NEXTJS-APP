import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const Modal = (props: any) => {
  const [datetime, setDatetime]: any = useState("");

  const agendar = async () => {
    if (datetime.trim().length == 0) {
      return toast.error("Por favor informe a data e a hora");
    }

    let num: any = Math.floor(Math.random() * 9999999) + "";
    const data: any = await axios.post("/api/agenda", {
      datetime: datetime,
      clientId: parseInt(sessionStorage.id),
      serviceId: parseInt(props.service),
      numero: num,
    });

    if (data) {
      toast.success("Agendado com sucesso, o seu numero de agenda eh: " + num);
    }
  };
  return (
    <div className="modal fade" id="agenda" tabIndex={-1}>
      <ToastContainer />
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Horario</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="form-group">
              <div className="card">
                <input
                  type="datetime-local"
                  className="form-control"
                  name=""
                  id=""
                  placeholder="Data"
                  onChange={(evt) => setDatetime(evt.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={agendar}>
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
