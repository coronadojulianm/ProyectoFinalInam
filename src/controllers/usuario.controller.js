import {pool} from '../database/conexion.js';

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
  export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  const nuevoUsuario = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (tipo_usuario, nombre, correo, telefono, identificacion_dni, contraseña, estado_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        nuevoUsuario.tipo_usuario,
        nuevoUsuario.nombre,
        nuevoUsuario.correo,
        nuevoUsuario.telefono,
        nuevoUsuario.identificacion_dni,
        nuevoUsuario.contraseña,
        nuevoUsuario.estado_usuario || 'activo',
      ]
    );

    res.json({ id: result.insertId, ...nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

// Actualizar un usuario
 export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const datosUsuario = req.body;

  try {
    await pool.query(
      'UPDATE usuarios SET tipo_usuario = ?, nombre = ?, correo = ?, telefono = ?, identificacion_dni = ?, contraseña = ? WHERE id_usuario = ?',
      [
        datosUsuario.tipo_usuario,
        datosUsuario.nombre,
        datosUsuario.correo,
        datosUsuario.telefono,
        datosUsuario.identificacion_dni,
        datosUsuario.contraseña,
        id,
      ]
    );

    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

// Validar credenciales del usuario
 export const validarCredenciales = async (req, res) => {
  const { identificacion, contraseña } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE identificacion_dni = ? AND contraseña = ?', [identificacion, contraseña]);

    if (rows.length > 0) {
      // Credenciales válidas
      res.json({ mensaje: 'Sesión iniciada' });
    } else {
      // Credenciales inválidas
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al validar las credenciales' });
  }
};

 export const simularLogout = (req, res) => {

  res.json({ mensaje: 'Sesión cerrada exitosamente' });
};

 export const cambiarEstadoUsuario = async (req, res) => {
  const { identificacion } = req.params;
  const { nuevoEstado } = req.body;

  try {
    // Verificar si el usuario existe
    const [result] = await pool.query('SELECT * FROM usuarios WHERE identificacion_dni = ?', [identificacion]);

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar el estado del usuario
    await pool.query('UPDATE usuarios SET estado_usuario = ? WHERE identificacion_dni = ?', [nuevoEstado, identificacion]);

    res.json({ mensaje: 'Estado del usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cambiar el estado del usuario' });
  }
};