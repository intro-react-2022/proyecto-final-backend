export default class FakeDB {
  static usuarios = [
    {
      idUsuario: 1,
      nombres: "Anthony Edward",
      apellidos: "Stark",
      correo: "tony.stark@marvel.inc",
      ocupacion: "Ingeniero Informático en Stark Industries Inc.",
      numeroIdentificacion: "002576007",
      telefono: "999 555 007",
      fechaNacimiento: "29/05/1970",
      direccion: "10880 Malibu Point",
      acercaDeMi:
        "Genio, millonario, filantropo, playboy. Ingeniero Informático, mecanico y electrónico con intereses en programación y desarrollo web. Científico, inventor, amante de la tecnología. Filántropo apto a la ayuda comunitaria.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0ix6zEXmJVplEQmRJGj-JUyd43f_uKLUU5PkzYHy4nuVuFqLELkbxbIiZkr1pAZw_qk&usqp=CAU",

      contrasenia: "1234",
    },

    {
      idUsuario: 2,
      nombres: "Natalia Alianovna \"Natasha\"",
      apellidos: "Romanoff",
      correo: "natasha.romanoff@marvel.inc",
      ocupacion: "Aente especial de Shield",
      numeroIdentificacion: "3516852555",
      telefono: "99665812145",
      fechaNacimiento: "22/11/1984",
      direccion: "S.H.I.E.L.D. Earthquaques W.D.",
      acercaDeMi:
        "Tengo Maestría en artes marciales y el espionaje profesional",
      imagen:
        "https://kihi.news/__export/1625268920373/sites/kihi/img/2021/07/02/image002_x1x.jpg_1027732563.jpg",

      contrasenia: "1234",
    },
  ];
  static actividad = [
  ];
  static transaccion = [
  ];
  static idUsuarioActual = FakeDB.usuarios.length;
  static idActividadActual = FakeDB.actividad.length;
  static idTransaccionActual = FakeDB.transaccion.length;

  // USUARIOS
  static getUsuarioByID = (idUsuario) => {
    const usuarioEncontrado = FakeDB.usuarios.filter(
      (x) => x.idUsuario === idUsuario
    );
    if (usuarioEncontrado.length === 1) {
      return {
        ok: true,
        message: "El usuario fue encontrado",
        payload: usuarioEncontrado[0],
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
  static updateUsuario = (idUsuario, usuarioNuevo) => {
    const indice = 0;
    const usuarioEncontrado = FakeDB.usuarios.filter((x) => {
      if (x.idUsuario == idUsuario) {
        return x;
      }
      indice++;
    });
    if (usuarioEncontrado.length === 1) {
      //update
      const usuarioActualizado = { ...usuarioEncontrado, ...usuarioNuevo };
      FakeDB.usuarios[indice] = usuarioActualizado;
      return {
        ok: true,
        message: "El usuario fue actualizado correctamente",
        payload: usuarioActualizado,
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
    const indice = 0;
    const usuarioEncontrado = FakeDB.usuarios.filter((x) => {
      if (x.idUsuario === idUsuario) {
        return x;
      }
      indice++;
    });
    if (usuarioEncontrado.length === 1) {
      //delete
      FakeDB.usuarios = FakeDB.usuarios.filter(
        (x) => x.idUsuario !== idUsuario
      );
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
    const nuevoUsuarioConID = {
      ...nuevoUsuario,
      id: FakeDB.idUsuarioActual + 1,
    };
    FakeDB.idUsuarioActual++;
    FakeDB.usuarios = [...FakeDB.usuarios, nuevoUsuarioConID];
    return {
      ok: true,
      message: "El usuario se ha creado correctamente",
      payload: nuevoUsuarioConID,
    };
  };
  static listarUsuario = () => {
    return {
      ok: true,
      message: "Todos los usuarios",
      payload: FakeDB.usuarios,
    };
  };
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
    const usuarioEncontrado = FakeDB.usuarios.filter(
      (x) => x.correo === correo
    );
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
  //ACTIVIDAD
  static listarActividades = () => {
    return {
      ok: true,
      message: "Todos las transacciones",
      payload: FakeDB.actividad,
    };
  };
  static listarActividadXidUsuario = (idUsuario) => {
    if (idUsuario) {
      return {
        ok: true,
        message: "Todos las actividades cuyo id de usuario es " + idUsuario,
        payload: FakeDB.actividad.filter((x) => x.idUsuario == idUsuario),
      };
    } else {
      return {
        ok: false,
        message: "No se envio un id de usuario",
        payload: [],
      };
    }
  };
  static insertarActividad = (
    idUsuario,
    denominacion,
    monto,
    transacciones
  ) => {
    if (
      !idUsuario ||
      !denominacion ||
      !monto ||
      !transacciones ||
      transacciones.length === 0
    ) {
      return {
        ok: false,
        message: "Datos incorrectos",
        payload: {},
      };
    } else {
      const fechaActual = new Date();
      const nuevaActividad = {
        idActividad: FakeDB.idActividadActual + 1,
        idUsuario,
        denominacion,
        monto,
        fecha: fechaActual,
      };
      FakeDB.idActividadActual += 1;
      FakeDB.actividad = [...FakeDB.actividad, nuevaActividad];

      const nuevasTransaacciones = transacciones.map((tx) => {
        const nuevaTX = {
          ...tx,
          idActividad: FakeDB.idActividadActual,
          idTransaccion: FakeDB.idTransaccionActual + 1,
        };
        FakeDB.idTransaccionActual = +1;
        return nuevaTX;
      });
      FakeDB.transaccion = [...FakeDB.transaccion, ...nuevasTransaacciones];
      return {
        ok: true,
        message: "Se insertó correctamente la actividad",
        payload: {
          actividad: nuevaActividad,
          transacciones: nuevasTransaacciones,
        },
      };
    }
  };
  static updateActividad = (idActividad, denominacion) => {
    //buscar por id
    const actividadEncontrada = FakeDB.transaccion.filter(
      (tx) => tx.idActividad === idActividad
    );
    if (actividadEncontrada && actividadEncontrada.length === 1) {
      let actividadVar = actividadEncontrada[0];
      actividadVar.denominacion = denominacion;

      const listaActividadActualizada = FakeDB.transaccion.map((tx) => {
        if (tx.idActividad == idActividad) {
          return actividadVar;
        } else {
          return tx;
        }
      });

      FakeDB.actividad = [...listaActividadActualizada];
      return {
        ok: true,
        payload: actividadVar,
        message: "Actividad con id " + idActividad + " actualizada",
      };
    } else {
      return {
        ok: false,
        payload: {},
        message: "Error al editar actividad",
      };
    }

    //acutalizar a la fakeDB
    //retornar el objeto actividad
  };
  static deleteActividad = (idActividad) => {
    //buscar por id
    console.log(idActividad);
    // console.log(FakeDB.transaccion);
    //console.log(FakeDB.transaccion.filter((tx) => tx.idActividad != idActividad));
    FakeDB.transaccion = [
      ...FakeDB.transaccion.filter((tx) => tx.idActividad != idActividad),
    ];
    FakeDB.actividad = [
      ...FakeDB.actividad.filter((tx) => tx.idActividad != idActividad),
    ];
    return {
      ok: true,
      payload: idActividad,
      message: "actividad y transacciones eliminadas",
    };
    //acutalizar a la fakeDB
    //retornar el objeto actividad
  };
  //TRANSACCIONES
  static insertarTransaccion = (nuevaTransaccion) => {
    console.log("INSERT TX", nuevaTransaccion);
    if (nuevaTransaccion) {
      const nuevaTransaccionConID = {
        ...nuevaTransaccion,
        idTransaccion: FakeDB.idTransaccionActual + 1,
      };
      FakeDB.idTransaccionActual++;
      FakeDB.transaccion = [...FakeDB.transaccion, nuevaTransaccionConID];
      return {
        ok: true,
        message: "La Transaccion se ha creado correctamente",
        payload: nuevaTransaccionConID,
      };
    } else {
      return {
        ok: false,
        message: "No se envio data",
        payload: {},
      };
    }
  };
  static listarTransacciones = () => {
    return {
      ok: true,
      message: "Todos las transacciones",
      payload: FakeDB.transaccion,
    };
  };
  static listarTransaccionesXidActividad = (idActividad) => {
    if (idActividad) {
      return {
        ok: true,
        message:
          "Todos las transacciones cuyo id de actividad es " + idActividad,
        payload: FakeDB.transaccion.filter((x) => x.idActividad == idActividad),
      };
    } else {
      return {
        ok: false,
        message: "No se envió ningun id de actividad",
        payload: [],
      };
    }
  };
}
