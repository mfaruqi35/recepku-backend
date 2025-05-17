# 📘 API Documentation

Authorization: Bearer <your_token_here>

## 👤 Users

### Register:

endpoint: **`/users/register`** (Method: POST)
Register akun baru.

**Request Body:**
{
"email": "user@example.com",
"phoneNumber": "081234567890",
"userName": "johndoe",
"password": "yourPassword"
}

**Response:**

- **`201 Created`** jika sukses.
- **`400 Bad Request`** jika data tidak lengkap atau sudah terdaftar.

### Login:

endpoint: **`/users/login`** (Method: POST)
Login akun user dengan email atau username.

**Request Body:**
{
"login": "user@example.com",
"password": "yourPassword"
}

**Response:**

- **`201 OK`** dengan JWT token jika sukses
- **`400 Bad Request`** jika login gagal.

### Get Profile User:

endpoint: **`users/profile/:userId`** (Method: GET)
Ambil profile user.

**Header:**

- Auth token diperlukan.

**Response:**

- **`200 OK`** dengan data profil.
- **`404 Not Found`** jika user tidak ditemukan.

### Edit Profile User:

endpoint: **`users/edit-profile/:userId`** (Method: PUT)
Edit profile user

**Form-data fields (Optional):**

- `userName`, `firstName`, `lastName`, `email`, `phoneNumber`,`profilePic`(file)

**Header:**

- Auth token diperlukan

### Save Recipes

Save atau unsave resep ke daftar simpanan user.
endpoint: **`users/save-recipe/:userId`** (Method: POST)

**Header:**

- Auth token diperlukan.

**Response:**

- **`200 OK`** dan status Recipe Saved atau Recipe Unsaved
