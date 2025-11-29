import bcrypt from "bcryptjs";
import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "elissh_cosmetics",
  password: "postgres123",
  port: 5432,
});

async function updatePassword() {
  const newPassword = "admin123"; // your new password

  // hash password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // update password field
  const query = `
    UPDATE "Users"
    SET password = $1, "updatedAt" = NOW()
    WHERE email = 'admin@elisshbeauty.ae';
  `;

  await pool.query(query, [hashedPassword]);

  console.log("Admin password updated successfully!");
  pool.end();
}

updatePassword();
