const pool = require('../config/db')

async function checkUser(username) {
  const res = await pool.query("SELECT * FROM users WHERE username = ($1)",[username])
  return res.rows[0]  
}

async function addUser(user) {
const res = await pool.query(
  "INSERT INTO users(username, hash_password, fullname, dob, phone, email, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)",
  [user.username, user.hash_password, user.fullname, user.dob, user.phone, user.email, user.gender]
);

}
module.exports = { addUser,checkUser };
