import { resetWarningCache } from "prop-types";
import React, { useState, useEffect } from "react";
import "../../styles/register.css";
import { HOSTNAME } from "../component/config";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState(""); //nombre completo
  const [numero_hijos, setNumero_hijos] = useState("");
  const [provincia, setProvincia] = useState(1);
  const [deshabilitado, setDeshabilitado] = useState(true);

  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  useEffect(() => {
    if (
      nombre !== "" &&
      email !== "" &&
      password !== "" &&
      numero_hijos !== ""
    ) {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  });

  const onSave = async () => {
    const body = JSON.stringify({
      email,
      password,
      nombre,
      numero_hijos,
      provincia,
    });
    const resp = await fetch(HOSTNAME + "/nuevo/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await resp.json();
    if (data.message === "ok") {
      alert("Usuario Creado Con exito");
    }

    if (data.message === "Usuario ya existe.") {
      alert(data.message);
    }
  };

  return (
    <>
      <div className="container" id="containerRegister">
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label ">Nombre Completo</label>
            <input
              onChange={(e) => updateText(e, setNombre)}
              value={nombre}
              type="text"
              className="form-control"
            ></input>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                onChange={(e) => updateText(e, setEmail)}
                value={email}
                type="email"
                className="form-control "
              ></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input
                onChange={(e) => updateText(e, setPassword)}
                value={password}
                type="password"
                className="form-control"
              ></input>
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Numero Hijos</label>
            <input
              onChange={(e) => updateText(e, setNumero_hijos)}
              value={numero_hijos}
              type="text"
              className="form-control"
            ></input>
          </div>

          <div className="col-md-4">
            <label className="form-label">Provincia</label>
            <select
              onChange={(e) => updateText(e, setProvincia)}
              value={provincia}
              className="form-select"
            >
              <option selected>Álava</option>
              <option selected>Albacete</option>
              <option selected>Alicante</option>
              <option selected>Almería</option>
              <option selected>Asturias</option>
              <option selected>Ávila</option>
              <option selected>Badajoz</option>
              <option selected>Barcelona</option>
              <option selected>Burgos</option>
              <option selected>Cáceres</option>
              <option selected>Cádiz</option>
              <option selected>Cantabria</option>
              <option selected>Castellón</option>
              <option selected>Ciudad Real</option>
              <option selected>Córdoba</option>
              <option selected>A Coruña</option>
              <option selected>Cuenca</option>
              <option selected>Girona</option>
              <option selected>Granada</option>
              <option selected>Guadalajara</option>
              <option selected>Gipuzkoa</option>
              <option selected>Huelva</option>
              <option selected>Huesca</option>
              <option selected>Illes Balears</option>
              <option selected>Jaén</option>
              <option selected>León</option>
              <option selected>Lleida</option>
              <option selected>Lugo</option>
              <option selected>Madrid</option>
              <option selected>Málaga</option>
              <option selected>Murcia</option>
              <option selected>Navarra</option>
              <option selected>Ourense</option>
              <option selected>Palencia</option>
              <option selected>Las Palmas</option>
              <option selected>Pontevedra</option>
              <option selected>La Rioja</option>
              <option selected>Segovia</option>
              <option selected>Sevilla</option>
              <option selected>Soria</option>
              <option selected>Tarragona</option>
              <option selected>Santa Cruz de Tenerife</option>
              <option selected>Teruel</option>
              <option selected>Toledo</option>
              <option selected>Valencia</option>
              <option selected>Valladolid</option>
              <option selected>Bizkaia</option>
              <option selected>Zamora</option>
              <option selected>Zaragoza</option>
            </select>
          </div>

          <div className="col-12">
            <button
              disabled={deshabilitado}
              onClick={onSave}
              id="buttonRegister"
              type="submit"
              className="btn btn-info button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};