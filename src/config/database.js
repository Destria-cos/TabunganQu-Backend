const mysql = require('mysql2/promise');

// Railway provides DATABASE_URL as a full connection string.
// mysql2 createPool() needs it passed as `uri` explicitly, or parsed manually.
function createPoolFromEnv() {
  const url = process.env.DATABASE_URL;

  if (url) {
    // Parse the URL manually to avoid mysql2 URI parsing quirks
    try {
      const parsed = new URL(url);
      return mysql.createPool({
        host:               parsed.hostname,
        port:               parseInt(parsed.port) || 3306,
        user:               parsed.username,
        password:           parsed.password,
        database:           parsed.pathname.replace(/^\//, ''),
        waitForConnections: true,
        connectionLimit:    10,
        queueLimit:         0,
        ssl:                process.env.NODE_ENV === 'production'
                              ? { rejectUnauthorized: false }
                              : undefined,
      });
    } catch (e) {
      console.error('❌ Failed to parse DATABASE_URL:', e.message);
    }
  }

  // Fallback: individual env vars (local dev)
  return mysql.createPool({
    host:               process.env.DB_HOST     || 'localhost',
    port:               parseInt(process.env.DB_PORT) || 3306,
    user:               process.env.DB_USER     || 'root',
    password:           process.env.DB_PASSWORD || '',
    database:           process.env.DB_NAME     || 'tabunganqu_db',
    waitForConnections: true,
    connectionLimit:    10,
    queueLimit:         0,
  });
}

const pool = createPoolFromEnv();

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    // Don't call process.exit(1) — let Railway see the error and retry
    throw error;
  }
};

const testConnection = async () => {
  await connectDB();
};

const getDB = () => pool;

module.exports = { pool, connectDB, testConnection, getDB };
