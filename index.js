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
  origin: "http://localhost:3000",
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

app.get("/usuario", (req, res) => {
  //res.send(FakeDB.usuarios);
  res.send(FakeDB.listarUsuario());
});

app.post("/usuario/auth", (req, res) => {
  const { correo, contrasenia } = req.body;
  console.log("Se recibio: ", correo, contrasenia);
  const result = FakeDB.iniciarSesion(correo, contrasenia);
  console.log("Se obtuvo: ", result);

  res.send(result);
});
app.get("/actividad", (req, res) => {
  res.send(FakeDB.listarActividades());
});
/**
 * Carga masiva
 */
app.post("/actividad", (req, res) => {
  const { idUsuario, denominacion, monto, transacciones } = req.body;
  console.log(idUsuario, denominacion, monto, transacciones);
  res.send(
    FakeDB.insertarActividad(idUsuario, denominacion, monto, transacciones)
  );
});
app.put("/actividad", (req, res) => {
  const { denominacion, idActividad } = req.body;
  res.send(FakeDB.updateActividad(idActividad, denominacion));
});
app.delete("/actividad", (req, res) => {
  const { idActividad } = req.body;
  console.log(req.body);
  res.send(FakeDB.deleteActividad(idActividad));
});
//OK
app.get("/actividad/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  res.send(FakeDB.listarActividadXidUsuario(idUsuario));
});

app.get("/transaccion", (req, res) => {
  res.send(FakeDB.listarTransacciones());
});

app.post("/transaccion", (req, res) => {
  const { idActividad, transaccion } = req.body;
  console.log("BODY", req.body);
  res.send(FakeDB.insertarTransaccion(idActividad, transaccion));
});
/**
{ 
  transacciones: {

  }
}
 */
app.post("/transaccion/importar", (req, res) => {
  const { transacciones } = req.body;
  console.log("BODY", req.body);
  res.send(FakeDB.insertarTransaccion(idActividad, transaccion));
});
app.get("/transaccion/:idActividad", (req, res) => {
  const { idActividad } = req.params;
  res.send(FakeDB.listarTransaccionesXidActividad(idActividad));
});
