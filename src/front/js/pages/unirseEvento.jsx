import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DateTime } from "react-datetime-bootstrap";
import "../../styles/crearEvento.css";
import { HOSTNAME } from "../component/config";
import { unirseEvento } from "../api.js";
import { object } from "prop-types";
import { Navbar } from "../component/navbar.jsx";
import moment from "moment";

export const UnirseEvento = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/zonaPrivada");
    } else {
    }
  }, []);

  const { store } = useContext(Context);
  const { eventoId } = useParams();
  const eventoEscojido = store.eventos.find((evento) => eventoId == evento.id);

  // inputs a rellenar por usuario
  const [numParticipantesPorUsuario, setNumParticipantesPorUsuario] =
    useState("");

  //ciclo de vida de boton.
  const [deshabilitado, setDeshabilitado] = useState(true);

  //modal de unirse a evento
  const [modal, setModal] = useState(false);
  const [textoModal, setTextoModal] = useState("");

  //mostrando opciones de selecion basado en cupos disponibles
  const llenarOpcionesSelect = () => {
    let cuposDisponibles = eventoEscojido.cupos_disponibles;
    let cupos = [];
    while (cuposDisponibles > 0) {
      let currentCupo = cuposDisponibles--;
      cupos.push(currentCupo);
    }
    cupos = cupos.reverse();
    const opcionesSelect = cupos.map((cupo, index) => {
      return (
        <option key={index} value={cupo}>
          {cupo}
        </option>
      );
    });
    return opcionesSelect;
  };

  const updateSelect = (e) => {
    const value = e.target.value;
    setNumParticipantesPorUsuario(value);
  };

  useEffect(() => {
    if (numParticipantesPorUsuario !== "") {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  });

  const onUnirse = () => {
    unirseEvento(eventoId, numParticipantesPorUsuario)
      .then((data) => {
        setTextoModal(
          "Se ha a??adido la participaci??n del usuario al evento con exito."
        );
        setModal(true);
      })
      .catch((error) => {
        console.log("error " + error);
        const errorStr = JSON.stringify(error);
        console.log(errorStr);
        setTextoModal(error.message);
        setModal(true);
      });
  };
  let date = moment(eventoEscojido.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-3">
          <h1 >Detalles de este evento</h1>
          <hr></hr>
          <div>
            <div className="container">
              <div className="row row-cols-2 m-5">
                <div className="col mt-3">
                  <img
                    src={eventoEscojido.actividad.imagen}
                    className="img-fluid rounded-start unirseImg"
                  />
                </div>
                <div className="col mt-3">
                  <h5>{eventoEscojido.actividad.nombre}</h5>
                  <hr></hr>
                  <p>{date}</p>
                  <p>Direcci??n: {eventoEscojido.direccion}</p>
                  <p>Creador: {eventoEscojido.creador.nombre}</p>
                  {/* <p>Actividad: {eventoEscojido.actividad.nombre}</p> */}
                  <p>Descripci??n: {eventoEscojido.actividad.descripcion}</p>

                  {eventoEscojido.estado != "Lleno" ? (
                    <div className="input-group">
                      <select
                        className="form-select"
                        onChange={updateSelect}
                        value={numParticipantesPorUsuario}
                      >
                        <option value="A??adir participantes">
                          A??adir participantes
                        </option>
                        {llenarOpcionesSelect()}
                      </select>
                      <button
                      id="buttonA??adirse"
                        className="btn"
                        disabled={deshabilitado}
                        onClick={onUnirse}
                        type="submit"
                      >
                        Unirse
                      </button>
                    </div>
                  ) : (
                    <p>
                      <strong>
                        No hay cupos disponibles para unirse a este evento
                      </strong>
                    </p>
                  )}
                </div>
              </div>
              <hr></hr>
              <br></br>
              <div className="row row-cols-5 text-center">
                <p>Estado: {eventoEscojido.estado}</p>
                <p>
                  {" "}
                  Tipo de actividad:{" "}
                  {eventoEscojido.actividad.tipo_de_actividad}
                </p>
                <p>
                  Cantidad m??xima de participantes:{" "}
                  {eventoEscojido.maximo_participantes}
                </p>
                <p>Cupos disponibles: {eventoEscojido.cupos_disponibles}</p>
                <p>
                  Rango de edad: {eventoEscojido.edad_minima} -{" "}
                  {eventoEscojido.edad_maxima}
                </p>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>

        {/* ................................MODAL....................................................... */}
        <Modal show={modal} onHide={() => setModal(false)} aria-labelledby="contained-modal-title-vcenter"
      centered>
          <Modal.Header closeButton>
            <Modal.Title>Unirme a este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => navigate("/eventos")}>
              Ir a eventos
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
