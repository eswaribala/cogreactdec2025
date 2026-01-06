const express = require('express');
const cors = require('cors');
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const gifts = require("./data/gifts.json");
// Load books.json once (in-memory)
const booksPath = path.join(__dirname, "data", "books.json");
const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
const sportsPath = path.join(__dirname, "data", "sports.json");
const sports = JSON.parse(fs.readFileSync(sportsPath, "utf-8"));
const clothingPath = path.join(__dirname, "data", "clothing.json");
const clothing = JSON.parse(fs.readFileSync(clothingPath, "utf-8"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
// ✅ put this in .env in real projects
const JWT_SECRET = "change_this_secret_in_env";
const JWT_EXPIRES_IN = "1h";

// In-memory users (demo)
const users = []; // { id, name, email, passwordHash }

const makeId = () => Math.random().toString(36).slice(2);

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});
app.post('/data', (req, res) => {
    const receivedData = req.body;
    res.json({ message: 'Data received successfully', data: receivedData });
});
app.get("/api/gifts", (req, res) => {
  res.status(200).json({
    count: gifts.length,
    data: gifts
  });
});
app.get("/api/sports", (req, res) => {
  res.status(200).json({
    count: sports.length,
    data: sports
  });
});
app.get("/api/clothing", (req, res) => {
  res.status(200).json({
    count: clothing.length,
    data: clothing
  });
});
/**
 * GET /api/books
 * Query:
 *  - page (default 1)
 *  - limit (default 10)
 *  - search (optional: matches title/author/category)
 *  - sortBy (id|title|author|price|rating|publishedYear) default id
 *  - order (asc|desc) default asc
 */
app.get("/api/books", (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 100);

  const search = (req.query.search || "").toString().trim().toLowerCase();
  //const sortBy = (req.query.sortBy || "id").toString();
  //const order = (req.query.order || "asc").toString().toLowerCase() === "desc" ? "desc" : "asc";

  // Filter
  let filtered = books;
  if (search) {
    filtered = books.filter((b) => {
      return (
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search) ||
        b.category.toLowerCase().includes(search) ||
        b.isbn.toLowerCase().includes(search)
      );
    });
  }
   // Sort
  //const allowedSort = new Set(["id", "title", "author", "price", "rating", "publishedYear", "category"]);
  //const key = allowedSort.has(sortBy) ? sortBy : "id";

  /* filtered = [...filtered].sort((a, b) => {
    const av = a[key];
    const bv = b[key];

    // string sort vs number sort
    const cmp =
      typeof av === "string" && typeof bv === "string"
        ? av.localeCompare(bv)
        : (av ?? 0) - (bv ?? 0);

    return order === "desc" ? -cmp : cmp;
  }); */

  // Pagination
  const totalItems = filtered.length;
  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
  const safePage = Math.min(page, totalPages);

  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;
  const items = filtered.slice(startIndex, endIndex);

  res.json({
    page: safePage,
    limit,
    totalItems,
    totalPages,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    items
  });
});
app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === id);  
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});
let products = [];
let idCounter = 1;
// just to verify in browser
app.get("/api/products", (req, res) => {
  res.json({ count: products.length, data: products });
});

// add product
app.post("/api/products", (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || typeof price !== "number") {
    return res.status(400).json({ message: "name, category, price(number) required" });
  }

  const newProduct = { id: idCounter++, name, category, price };
  products.unshift(newProduct);

  res.status(201).json(newProduct);
});

// -------------------- REGISTER --------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const name=req.body?.userName;
    
    const password=req.body?.password;

    if (!name?.trim() ||  !password) {
      return res.status(400).json({ message: "name,  password required" });
    }



    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: makeId(), name: name.trim(), passwordHash };
    users.push(user);

    return res.status(201).json({ message: "Registered successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

// -------------------- LOGIN --------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { userName, password } = req.body || {};

    if (!userName || !password) {
      return res.status(400).json({ message: "name and password required" });
    }

    // Example: in-memory users
    // const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    // Example: Mongo
    // const user = await User.findOne({ email: email.toLowerCase() });

    const user = users.find((u) => u.name.toLowerCase() === userName.toLowerCase());

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.passwordHash) {
      // helps catch wrong field name quickly
      return res.status(500).json({ message: "User password hash missing (field mismatch)" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token, user: { id: user.id, name: user.name } });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// ✅ Verify endpoint
app.get("/api/auth/verify", requireAuth, (req, res) => {
  return res.status(200).json({
    valid: true,
    user: req.user, // decoded payload
  });
});

// -------------------- AUTH MIDDLEWARE --------------------
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { sub, email, name, iat, exp }
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});