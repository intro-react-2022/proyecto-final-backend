import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import FakeDB from "./fakeDB/FakeDB.js";

const app = express();

// enable files upload
app.use(fileUpload({ createParentPath: true }));
//add other middleware
var corsOptions = {
  origin: "*",
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app
const port = process.env.PORT || 2800;
app.listen(port, () => console.log(`App is listening on port ${port}.`));

//test the app
//open broser and go to http://localhost:2800/
app.get("/", (req, res) => {
  res.send({
    ok: true,
    message: "Servidor funcionando!",
    payload: {},
  });
});
// USUARIO
app.get("/usuario", (req, res) => {
  res.send(FakeDB.listarUsuario());
});
app.put("/usuario/:idUsuario", (req, res) => {
  console.log(req.params.idUsuario, req.body);
  res.send(FakeDB.updateUsuario(req.params.idUsuario, req.body));
});
app.delete("/usuario/:idUsuario", (req, res) => {
  console.log(req.params.idUsuario, req.body);
  res.send(FakeDB.deleteUsuario(req.params.idUsuario));
});
//AUTH LOGIN
app.post("/usuario/auth", (req, res) => {
  const { correo, contrasenia } = req.body;
  console.log("Se recibio: ", correo, contrasenia);
  const result = FakeDB.iniciarSesion(correo, contrasenia);
  console.log("Se obtuvo: ", result);

  res.send(result);
});

//EXPERIENCIA
app.get("/experiencia", (req, res) => {
  res.send(FakeDB.listarExperiencias());
});
app.get("/experiencia/:idExperiencia", (req, res) => {
  const { idExperiencia } = req.params;
  res.send(FakeDB.getExperieniaByID(idExperiencia));
});
app.get("/experiencia/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  res.send(FakeDB.getExperienciasByIDUsuario(idUsuario));
});
app.post("/experiencia", (req, res) => {
  const nuevaExperiencia = req.body;
  res.send(FakeDB.insertarExperiencia(nuevaExperiencia));
});
app.put("/experiencia/:idExperiencia", (req, res) => {
  const { idExperiencia } = req.params;
  const nuevaExperiencia = req.body;
  res.send(FakeDB.insertarExperiencia(idExperiencia, nuevaExperiencia));
});
app.delete("/experiencia/:idExperiencia", (req, res) => {
  const { idExperiencia } = req.params;
  res.send(FakeDB.insertarExperiencia(idExperiencia));
});
app.post("/experiencia/cargaMasiva/:idUsuario", (req, res) => {
  const { experiencias } = req.body;
  const { idUsuario } = req.params;
  res.send(FakeDB.cargaMasivaExperiencias(idUsuario, experiencias));
});
//HABILIDAD
app.get("/habilidad", (req, res) => {
  res.send(FakeDB.listarHabilidades());
});
app.get("/habilidad/:idHabilidad", (req, res) => {
  const { idHabilidad } = req.params;
  res.send(FakeDB.getHabilidadByID(idHabilidad));
});
app.get("/habilidad/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  res.send(FakeDB.getHabilidadessByIDUsuario(idUsuario));
});
app.post("/habilidad", (req, res) => {
  const nuevaHabilidad = req.body;
  res.send(FakeDB.insertarHabilidad(nuevaHabilidad));
});
app.put("/habilidad/idHabilidad", (req, res) => {
  const { idHabilidad } = req.params;
  const nuevaHabilidad = req.body;
  res.send(FakeDB.editarHabilidad(idHabilidad, nuevaHabilidad));
});
app.delete("/habilidad/idHabilidad", (req, res) => {
  const { idHabilidad } = req.params;
  res.send(FakeDB.eliminarHabilidad(idHabilidad));
});
app.post("/habilidad/cargaMasiva/:idUsuario", (req, res) => {
  const { habilidades } = req.body;
  const { idUsuario } = req.params;
  res.send(FakeDB.cargaMasivaHabilidades(idUsuario, habilidades));
});
