const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'db', 'pizza.sqlite');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      price INTEGER NOT NULL,
      imageUrl TEXT,
      soldOut INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      customer TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      priority INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'preparing',
      orderPrice INTEGER NOT NULL,
      priorityPrice INTEGER NOT NULL DEFAULT 0,
      totalPrice INTEGER NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      pizzaId INTEGER,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice INTEGER NOT NULL,
      totalPrice INTEGER NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    );
  `);
}

function seedMenu() {
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM menu').get();
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO menu (name, description, ingredients, price, imageUrl, soldOut)
    VALUES (@name, @description, @ingredients, @price, @imageUrl, @soldOut)
  `);

  const items = [
    {
      name: 'پیتزا مخصوص',
      description: 'پیتزای مخصوص خانه با مخلوطی سخاوتمندانه از مواد تازه',
      ingredients: 'پنیر موزارلا، قارچ، فلفل دلمه‌ای، زیتون، ذرت',
      price: 185000,
      imageUrl: '/images/pizza-special.svg',
      soldOut: 0,
    },
    {
      name: 'پیتزا پپرونی',
      description: 'کلاسیک همیشگی با پپرونی تند و پنیر فراوان',
      ingredients: 'پنیر موزارلا، پپرونی، سس گوجه',
      price: 165000,
      imageUrl: '/images/pizza-pepperoni.svg',
      soldOut: 0,
    },
    {
      name: 'پیتزا مرغ و قارچ',
      description: 'ترکیب مرغ گریل‌شده و قارچ تازه',
      ingredients: 'مرغ، قارچ، پنیر موزارلا، سس مخصوص',
      price: 175000,
      imageUrl: '/images/pizza-chicken-mushroom.svg',
      soldOut: 0,
    },
    {
      name: 'پیتزا سبزیجات',
      description: 'مناسب گیاه‌خواران، پر از سبزیجات تازه',
      ingredients: 'فلفل دلمه‌ای، قارچ، ذرت، زیتون، گوجه',
      price: 150000,
      imageUrl: '/images/pizza-vegetable.svg',
      soldOut: 0,
    },
    {
      name: 'پیتزا گوشت',
      description: 'برای عاشقان گوشت، با دو نوع گوشت متفاوت',
      ingredients: 'گوشت چرخ‌کرده، ژامبون، پپرونی، پنیر موزارلا',
      price: 195000,
      imageUrl: '/images/pizza-meat.svg',
      soldOut: 0,
    },
    {
      name: 'پیتزا چهار فصل',
      description: 'چهار طعم متفاوت روی یک پیتزا',
      ingredients: 'قارچ، آرتیشو، زیتون، ژامبون، پنیر موزارلا',
      price: 190000,
      imageUrl: '/images/pizza-four-seasons.svg',
      soldOut: 1,
    },
    {
      name: 'سیب زمینی',
      description: 'سیب زمینی سرخ‌کرده ترد و طلایی',
      ingredients: 'سیب زمینی، نمک، ادویه مخصوص',
      price: 55000,
      imageUrl: '/images/fries.svg',
      soldOut: 0,
    },
    {
      name: 'سالاد',
      description: 'سالاد فصل با سبزیجات تازه',
      ingredients: 'کاهو، گوجه، خیار، ذرت، سس مخصوص',
      price: 45000,
      imageUrl: '/images/salad.svg',
      soldOut: 0,
    },
    {
      name: 'دوغ',
      description: 'دوغ سنتی خنک',
      ingredients: 'دوغ، نعنا',
      price: 20000,
      imageUrl: '/images/doogh.svg',
      soldOut: 0,
    },
    {
      name: 'نوشابه',
      description: 'نوشابه خانواده خنک',
      ingredients: 'نوشابه',
      price: 25000,
      imageUrl: '/images/soda.svg',
      soldOut: 0,
    },
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });

  insertMany(items);
}

createTables();
seedMenu();

module.exports = db;
