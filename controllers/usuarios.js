const { response, request } = require("express");
// const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs"); //importar librería para encriptar contraseña

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  //traer todos los usuarios
  // const usuarios = await Usuario.find().skip(desde).limit(limite);
  // const total = await Usuario.countDocuments();

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  //recibir el cuerpo de la petición
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  //const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
 // usuario.password = bcrypt.hashSync(password, salt);
  //guardar en la BD
  await usuario.save();

  res.json({
    usuario,
    message: "Usuario creado correctamente",
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;

  //obtener los datos a actualizar
  const { password, correo, ...resto } = req.body;

  //si actualizo el password debo cifrarlo o encriptarlo
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }

  //buscar el usuario y actualizarlo
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    mensaje: "Usuario actualizado",
    usuario,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuarioAutenticado = req.usuario;

  //pasra eliminar el registro
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

  //Para cambiar el estado a false
  const usuario = await Usuario.findById(id);

  if (!usuario.estado) {
    return res.json({
      msg: "El usuario ya está inactivo",
    });
  }

  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    mensaje: "Usuario inactivo",
    usuarioBorrado,
    usuarioAutenticado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
