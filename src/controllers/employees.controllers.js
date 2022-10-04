import { pool } from '../db.js';

//para el manejo de errores utilizar express-promise-router
//es un poco mejor que utilizar try-catch por todos lados

export const getEmployees = async (req, res) => {
 try {
  const [rows] = await pool.query('SELECT *FROM employee');

  res.json(rows);
 } catch (error) {
  return res.status(500).json({
   message: 'Somthing goes wrong',
  });
 }
};

export const getEmployee = async (req, res) => {
 const employeeId = req.params.id;

 try {
  //el signo "?" se sustituye por lo que esta
  //en el array [] que viene despues de la ","
  const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [
   employeeId,
  ]);

  if (rows.length <= 0)
   return res.status(404).json({
    message: 'Employee not found',
   });

  res.json(rows);
 } catch (error) {
  return res.status(500).json({
   message: 'Somthing goes wrong',
  });
 }
};

export const createEmployees = async (req, res) => {
 const { name, salary } = req.body;

 try {
  //De esta manera podemos insertar peticiones en la base de datos con la libreria mysql2 :) *MAGIC*
  const [rows] = await pool.query(
   'INSERT INTO employee(name, salary) VALUES (?,?)',
   [name, salary]
  );

  //insertId lo envia en el response la base de datos
  res.send({ id: rows.insertId, name, salary });
 } catch (error) {
  return res.status(500).json({
   message: 'Somthing goes wrong',
  });
 }
};

export const deleteEmployee = async (req, res) => {
 try {
  const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [
   req.params.id,
  ]);

  if (result.affectedRows <= 0)
   res.status(404).json({
    message: 'Employee not found',
   });
  //sendStatus es para solo responder un status
  //ademas con el 204 para indicar que todo ok
  //pero no estamos devolviendo nada
  res.sendStatus(204);
 } catch (error) {
  return res.status(500).json({
   message: 'Somthing goes wrong',
  });
 }
};

export const updateEmployee = async (req, res) => {
 const { id } = req.params;
 const { name, salary } = req.body;

 try {
  const [result] = await pool.query(
   'UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
   [name, salary, id]
  );

  if (result.affectedRows === 0) {
   return res.status(404).json({
    message: 'Employee not found',
   });
  }
  //para ver los datos que acabo de actualizar
  const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

  res.json(rows[0]);
 } catch (error) {
  return res.status(500).json({
   message: 'Somthing goes wrong',
  });
 }
};

//api login
export const getLogin = async (req, res) => {
 const { username, password } = req.body;
 res.send({
  token: 'test123',
  username,
  password,
 });
};
