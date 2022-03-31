import {
  createExperiencia,
  createHabilidad,
  createUser,
} from "./dataLoader.js";

export default class FakeDB {
  static usuarios = [
    createUser(
      1,
      "Anthony Edward",
      "Stark",
      "tony.stark@marvel.inc",
      "Ingeniero Informático en Stark Industries Inc.",
      "002576007",
      "999 555 007",
      new Date(1970, 4, 29),
      "10880 Malibu Point",
      "Genio, millonario, filantropo, playboy. Ingeniero Informático, mecanico y electrónico con intereses en programación y desarrollo web. Científico, inventor, amante de la tecnología. Filántropo apto a la ayuda comunitaria.",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0ix6zEXmJVplEQmRJGj-JUyd43f_uKLUU5PkzYHy4nuVuFqLELkbxbIiZkr1pAZw_qk&usqp=CAU",
      "1234"
    ),
    createUser(
      2,
      'Natalia Alianovna "Natasha"',
      "Romanoff",
      "natasha.romanoff@marvel.inc",
      "Agente especial de Shield",
      "3516852555",
      "99665812145",
      new Date(1984, 10, 22),
      "S.H.I.E.L.D. Earthquaques W.D.",
      "Tengo Maestría en artes marciales y en el espionaje profesional",
      "https://kihi.news/__export/1625268920373/sites/kihi/img/2021/07/02/image002_x1x.jpg_1027732563.jpg",
      "1234"
    ),
  ];
  static experiencia = [
    createExperiencia(
      1,
      1,
      "Jefe de TI",
      "Empresa laboral 1",
      new Date(2022, 0, 10),
      new Date(2022, 2, 10)
    ),
    createExperiencia(
      2,
      1,
      "Asitente de TI",
      "Empresa laboral 2",
      new Date(2022, 2, 20),
      new Date(2022, 8, 10)
    ),
    createExperiencia(
      3,
      2,
      "Analista jr",
      "Empresa laboral 3",
      new Date(2022, 3, 7),
      new Date(2022, 11, 10)
    ),
    createExperiencia(
      4,
      1,
      "FrontEnd developer sr",
      "Empresa laboral 4",
      new Date(2020, 4, 11),
      new Date(2020, 11, 10)
    ),
    createExperiencia(
      5,
      2,
      "Desarrollador web jr",
      "Empresa laboral 5",
      new Date(2018, 6, 7),
      new Date(2019, 5, 15)
    ),
  ];
  static habilidad = [
    createHabilidad(
      1,
      1,
      "Proactividad",
      "Desenvomiento activo, energético en actividades grupales."
    ),
    createHabilidad(
      2,
      1,
      "Responsabilidad",
      "Cumplimiento de los proyectos asignados."
    ),
    createHabilidad(
      3,
      2,
      "Puntualidad",
      "Presentaciones antes de la hora indicada."
    ),
    createHabilidad(
      4,
      2,
      "Coordinación",
      "Desempeño de coordinador en proyectos de desarrollo."
    ),
    createHabilidad(
      5,
      2,
      "Trabajo en equipo",
      "Desenvolvimiento asertivo en grupo."
    ),
  ];
  static idUsuarioActual = FakeDB.usuarios.length;
  static idExperienciaActual = FakeDB.experiencia.length;
  static idHabilidadActual = FakeDB.habilidad.length;

  static checkResultOfSearching = (arr = [], entity = "") => {
    if (arr.length === 1) {
      return {
        ok: true,
        message: `${entity} fue encontrado`,
        payload: arr[0],
      };
    } else {
      if (arr.length > 1) {
        return {
          ok: false,
          message: "Error inesperado",
          payload: {},
        };
      } else {
        return {
          ok: false,
          message: `${entity} no fue encontrado`,
          payload: {},
        };
      }
    }
  };
  // USUARIOS CRUD
  static getUsuarioByID = (idUsuario) => {
    const usuarioEncontrado = FakeDB.usuarios.findIndex(
      (x) => x.idUsuario === idUsuario
    );
    return checkResultOfSearching(usuarioEncontrado, "El usuario");
  };
  static updateUsuario = (idUsuario = 0, usuarioNuevo = {}) => {
    let indice = 0;
    const usuarioEncontrado = FakeDB.usuarios.filter((x) => {
      if (x.idUsuario == idUsuario) {
        return x;
      }
      indice++;
    });
    console.log("Encontrado usuario", usuarioEncontrado);
    console.log("Encontrado usuario en array", FakeDB.usuarios[indice], indice);
    if (usuarioEncontrado.length === 1) {
      //update
      const usuarioActualizado = { ...usuarioEncontrado[0], ...usuarioNuevo };
      console.log("Actualizado usuario", usuarioActualizado);
      FakeDB.usuarios[indice] = usuarioActualizado;
      return {
        ok: true,
        message: "El usuario fue actualizado correctamente",
        payload: FakeDB.usuarios[indice],
      };
    } else {
      if (usuarioEncontrado.length > 1) {
        return {
          ok: false,
          message: "Error inesperado",
          payload: {},
        };
      } else {
        return {
          ok: false,
          message: "No se encontro al usuario",
          payload: {},
        };
      }
    }
  };
  static deleteUsuario = (idUsuario) => {
    let indice = 0;
    const usuarioEncontrado = FakeDB.usuarios.filter((x) => {
      if (x.idUsuario == idUsuario) {
        return x;
      }
      indice++;
    });
    if (usuarioEncontrado.length === 1) {
      //delete
      FakeDB.usuarios = FakeDB.usuarios.filter((x) => x.idUsuario != idUsuario);
      return {
        ok: true,
        message: "El usuario fue eliminado correctamente",
        payload: idUsuario,
      };
    } else {
      if (usuarioEncontrado.length > 1) {
        return {
          ok: false,
          message: "Error inesperado",
          payload: {},
        };
      } else {
        return {
          ok: false,
          message: "No se encontro al usuario",
          payload: {},
        };
      }
    }
  };
  static insertUsuario = (nuevoUsuario) => {
    const newId = FakeDB.idUsuarioActual + 1;
    try {
      const nuevoUsuarioConID = {
        ...nuevoUsuario,
        idUsuario: newId,
      };

      FakeDB.usuarios = [...FakeDB.usuarios, nuevoUsuarioConID];
      FakeDB.idUsuarioActual++;
      return {
        ok: true,
        message: "El usuario se ha creado correctamente",
        payload: nuevoUsuarioConID,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Ocurrio un error al insrtar el usuario",
        payload: {},
      };
    }
  };
  static listarUsuario = () => {
    return {
      ok: true,
      message: "Todos los usuarios",
      payload: FakeDB.usuarios,
    };
  };
  //AUTH LOGIN
  static iniciarSesion = (correo, contrasenia) => {
    if (
      !correo ||
      !contrasenia ||
      correo.length === 0 ||
      contrasenia.length === 0
    ) {
      return {
        ok: false,
        message: "Credenciales incorrectas o vacías",
        payload: {},
      };
    }
    const usuarioEncontrado = FakeDB.usuarios.filter((x) => x.correo == correo);
    if (usuarioEncontrado && usuarioEncontrado.length === 1) {
      //preguntamos contraseña
      if (usuarioEncontrado[0].contrasenia === contrasenia) {
        return {
          ok: true,
          message: "Inicio de sesión correcto",
          payload: { ...usuarioEncontrado[0], contrasenia: undefined },
        };
      } else {
        return {
          ok: false,
          message: "Contraseña incorrecta",
          payload: {},
        };
      }
    } else {
      return {
        ok: false,
        message: "Correo incorrecto",
        payload: {},
      };
    }
  };
  //EXPERIENCIA
  static listarExperiencias = () => {
    return {
      ok: true,
      payload: FakeDB.experiencia,
      message: "todas las experiencias fueron listadas",
    };
  };
  static getExperieniaByID = (idExperiencia = 0) => {
    const experienciaEncontrada = FakeDB.experiencia.find(
      (x) => x.idExperiencia == idExperiencia
    );
    if (experienciaEncontrada) {
      return {
        ok: true,
        message: `experiencia encontrado`,
        payload: experienciaEncontrada,
      };
    } else {
      return {
        ok: false,
        message: `Experiencia con id=${idExperiencia} no fue encontrado`,
        payload: {},
      };
    }
  };
  static getExperienciasByIDUsuario = (idUsuario = 0) => {
    return {
      ok: true,
      message:
        "Se listaron las experiencias del usuario cuy id es: " + idUsuario,
      payload: FakeDB.experiencia.filter((x) => x.idUsuario == idUsuario),
    };
  };
  static insertarExperiencia = (nuevaExperiencia = {}) => {
    const newId = FakeDB.idExperienciaActual + 1;
    try {
      const nuevaExperienciaConID = {
        ...nuevaExperiencia,
        idExperiencia: newId,
      };
      FakeDB.experiencia = [...FakeDB.experiencia, nuevaExperienciaConID];
      FakeDB.idExperienciaActual++;
      return {
        ok: true,
        message: "La experiencia se ha creado correctamente",
        payload: nuevaExperienciaConID,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Ocurrio un error al insrtar el usuario",
        payload: {},
      };
    }
  };
  static editarExperiencia = (idExperiencia = 0, nuevaExperiencia = {}) => {
    const index = FakeDB.experiencia.findIndex(
      (x) => x.idExperiencia == idExperiencia
    );
    if (index === -1) {
      //no se encontro
      return {
        ok: false,
        message: `No se encontro la experiencia con id: ${idExperiencia}`,
        payload: {},
      };
    } else {
      FakeDB.experiencia[index] = {
        ...FakeDB.experiencia[index],
        ...nuevaExperiencia,
      };
      return {
        ok: true,
        message: `Se ha editado correctamente la experiencia con id: ${idExperiencia}`,
        payload: idExperiencia,
      };
    }
  };
  static eliminarExperiencia = (idExperiencia = 0) => {
    const index = FakeDB.experiencia.findIndex(
      (x) => x.idExperiencia == idExperiencia
    );
    if (index === -1) {
      //no se encontro
      return {
        ok: false,
        message: `No se encontro la experiencia con id: ${idExperiencia}`,
        payload: {},
      };
    } else {
      FakeDB.experiencia = [
        ...FakeDB.experiencia.filter((x) => x.idExperiencia != idExperiencia),
      ];
      return {
        ok: true,
        message: `La experiencia con id: ${idExperiencia} fue eliminada`,
        payload: idExperiencia,
      };
    }
  };
  //HABILIDAD
  static listarHabilidades = () => {
    return {
      ok: true,
      payload: FakeDB.habilidad,
      message: "todas las habilidades fueron listadas",
    };
  };
  static getHabilidadByID = (idHabilidad = 0) => {
    const experienciaEncontrada = FakeDB.experiencia.find(
      (x) => x.idExperiencia == idExperiencia
    );
    if (experienciaEncontrada) {
      return {
        ok: true,
        message: `experiencia encontrado`,
        payload: experienciaEncontrada,
      };
    } else {
      return {
        ok: false,
        message: `Experiencia con id=${idExperiencia} no fue encontrado`,
        payload: {},
      };
    }
  };
  static getHabilidadessByIDUsuario = (idUsuario = 0) => {
    return {
      ok: true,
      message:
        "Se listaron las experiencias del usuario cuy id es: " + idUsuario,
      payload: FakeDB.experiencia.filter((x) => x.idUsuario == idUsuario),
    };
  };
  static insertarHabilidad = (nuevaHabilidad = {}) => {
    const newId = FakeDB.idExperienciaActual + 1;
    try {
      const nuevaExperienciaConID = {
        ...nuevaExperiencia,
        idExperiencia: newId,
      };
      FakeDB.experiencia = [...FakeDB.experiencia, nuevaExperienciaConID];
      FakeDB.idExperienciaActual++;
      return {
        ok: true,
        message: "La experiencia se ha creado correctamente",
        payload: nuevaExperienciaConID,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Ocurrio un error al insrtar el usuario",
        payload: {},
      };
    }
  };
  static editarHabilidad = (idHabilidad = 0, nuevaHabilidad = {}) => {
    const index = FakeDB.experiencia.findIndex(
      (x) => x.idExperiencia == idExperiencia
    );
    if (index === -1) {
      //no se encontro
      return {
        ok: false,
        message: `No se encontro la experiencia con id: ${idExperiencia}`,
        payload: {},
      };
    } else {
      FakeDB.experiencia[index] = {
        ...FakeDB.experiencia[index],
        ...nuevaExperiencia,
      };
      return {
        ok: true,
        message: `Se ha editado correctamente la experiencia con id: ${idExperiencia}`,
        payload: idExperiencia,
      };
    }
  };
  static eliminarHabilidad = (idHabilidad = 0) => {
    const index = FakeDB.experiencia.findIndex(
      (x) => x.idExperiencia == idExperiencia
    );
    if (index === -1) {
      //no se encontro
      return {
        ok: false,
        message: `No se encontro la experiencia con id: ${idExperiencia}`,
        payload: {},
      };
    } else {
      FakeDB.experiencia = [
        ...FakeDB.experiencia.filter((x) => x.idExperiencia != idExperiencia),
      ];
      return {
        ok: true,
        message: `La experiencia con id: ${idExperiencia} fue eliminada`,
        payload: idExperiencia,
      };
    }
  };
}
