
const { Router } = require("express");
//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validar_campos");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

/*
const {
  esRolValido,
  emailExiste,
  usuarioExiste,
} = require("../helpers/db-validators");

const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
*/
const router = Router();

router.get("/", /*[validarJWT, esAdminRole],*/ usuariosGet);

router.post(
  "/",
  /*
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener un mínimo de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "No es un correo válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido),
    // check("rol", "El rol no es válido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
    validarCampos,
  ],*/
  usuariosPost
);

router.put(
  "/:id",
  /*
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    check("rol").custom(esRolValido),
    validarCampos,
  ],*/
  usuariosPut
);

router.delete(
  "/:id",
  /*
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],*/
  usuariosDelete
);

module.exports = router;