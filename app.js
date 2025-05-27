const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const songs = require('./public/js/songs-data'); // Импорт песен
const PORT = process.env.PORT || 3000;

const app = express();

// Настройки
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница с песнями
app.get('/', (req, res) => {
    res.render('index', { 
        user: req.session.user,
        songs: songs // Передаем песни в шаблон
    });
});

// Маршруты
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.get('/library', (req, res) => {
  res.render('library', { 
    user: req.session.user,
    songs: songs // Передаем список песен в шаблон
  });
});;

app.get('/about', (req, res) => {
    res.render('about', { user: req.session.user });
});

app.get('/login', (req, res) => {
    res.render('login', { user: req.session.user });
});

app.post('/login', (req, res) => {
    const { email, pswd } = req.body;
    // Простая проверка (в реальном приложении нужно хеширование и проверка в БД)
    if (email && pswd) {
        req.session.user = { email, name: email.split('@')[0] };
        return res.redirect('/');
    }
    res.redirect('/login');
});

app.post('/register', (req, res) => {
    const { txt, email, pswd } = req.body;
    if (txt && email && pswd) {
        req.session.user = { email, name: txt };
        return res.redirect('/');
    }
    res.redirect('/login');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
