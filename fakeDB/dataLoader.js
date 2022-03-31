export const createUser = (
  idUsuario,
  nombres,
  apellidos,
  correo,
  ocupacion,
  numeroIdentificacion,
  telefono,
  fechaNacimiento,
  direccion,
  acercaDeMi,
  imagen,
  contrasenia
) => {
  return {
    idUsuario,
    nombres,
    apellidos,
    correo,
    ocupacion,
    numeroIdentificacion,
    telefono,
    fechaNacimiento,
    direccion,
    acercaDeMi,
    imagen,
    contrasenia,
  };
};
export const createExperiencia = (
  idExperiencia,
  idUsuario,
  ocupacion,
  lugar,
  fechaInicio,
  fechaFin
) => {
  return {
    idExperiencia,
    idUsuario,
    ocupacion,
    lugar,
    fechaInicio,
    fechaFin,
  };
};
export const createHabilidad = (
  idHabilidad,
  idUsuario,
  habilidad,
  descripcion
) => {
  return {
    idHabilidad,
    idUsuario,
    habilidad,
    descripcion,
  };
};
