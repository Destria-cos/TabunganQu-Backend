# TabunganQu Backend API

Backend API untuk aplikasi TabunganQu — Express.js + MySQL + JWT Auth.

---

## 🚀 Deploy ke Railway

### 1. Buat akun di [railway.app](https://railway.app)

### 2. Buat MySQL Database
- Klik **New Project** → **Provision MySQL**
- Copy `DATABASE_URL` dari tab **Variables**

### 3. Deploy Backend
- Klik **New** → **GitHub Repo** → pilih `TabunganQu-Backend`
- Railway otomatis detect Node.js dan deploy

### 4. Set Environment Variables
Di Railway dashboard, tab **Variables**, tambahkan:

```env
DATABASE_URL=<paste dari MySQL service>
JWT_SECRET=tabunganqu_rahasia_123
JWT_EXPIRE=7d
CLIENT_URL=https://tabungan-qu-frontend-two.vercel.app
NODE_ENV=production
GOOGLE_CLIENT_ID=190481351205-178fgrtpmk50377k2tdpkao9bcvm7sjb.apps.googleusercontent.com
RECAPTCHA_SECRET_KEY=6Lcyf6IsAAAAAO64wppI0h81nozAGaqw1Ux3op8r
```

### 5. Generate Domain
- Tab **Settings** → **Generate Domain**
- Copy URL (contoh: `tabunganqu-backend-production.up.railway.app`)

### 6. Update Frontend
Ganti `VITE_API_URL` di Vercel env vars dengan Railway URL:
```
https://tabunganqu-backend-production.up.railway.app/api
```

### 7. Setup Database Schema
Buka Railway MySQL → **Data** → **Query** → paste isi `database/schema.sql`

---

## 🧪 Test Deployment

```bash
curl https://your-railway-url.up.railway.app/api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-05-13T..."
}
```

---

## 📁 Struktur

```
TabunganQu-Backend/
├── database/
│   ├── schema.sql              # Database schema
│   └── migrate_google_auth.sql # Google auth migration
├── src/
│   ├── config/
│   │   └── database.js         # MySQL connection
│   ├── controllers/            # Business logic
│   ├── middleware/             # Auth, validation, upload
│   ├── models/                 # Database models
│   └── routes/                 # API routes
├── uploads/avatars/            # User avatars
├── server.js                   # Entry point
├── railway.toml                # Railway config
└── Procfile                    # Fallback start command
```

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Set .env
cp .env.example .env
# Edit .env dengan DATABASE_URL lokal

# Run
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | ❌ | Health check |
| POST | `/api/auth/register` | ❌ | Register user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/google` | ❌ | Google OAuth |
| GET | `/api/auth/profile` | ✅ | Get profile |
| PUT | `/api/auth/profile` | ✅ | Update profile |
| POST | `/api/auth/profile/avatar` | ✅ | Upload avatar |
| DELETE | `/api/auth/profile/avatar` | ✅ | Delete avatar |
| PUT | `/api/auth/password` | ✅ | Change password |
| DELETE | `/api/auth/account` | ✅ | Delete account |
| GET | `/api/transactions` | ✅ | Get transactions |
| POST | `/api/transactions` | ✅ | Create transaction |
| PUT | `/api/transactions/:id` | ✅ | Update transaction |
| DELETE | `/api/transactions/:id` | ✅ | Delete transaction |
| GET | `/api/transactions/summary` | ✅ | Get summary |
| GET | `/api/transactions/chart` | ✅ | Get chart data |
| GET | `/api/wishlists` | ✅ | Get wishlists |
| POST | `/api/wishlists` | ✅ | Create wishlist |
| PUT | `/api/wishlists/:id` | ✅ | Update wishlist |
| DELETE | `/api/wishlists/:id` | ✅ | Delete wishlist |

---

## 🛡️ Security

- JWT authentication
- bcrypt password hashing
- CORS protection
- SQL injection prevention (parameterized queries)
- Input validation (express-validator)
- reCAPTCHA verification

---

## 📝 License

MIT
