const express  = require('express');
const routes   = require('./routes');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
const socketio = require('socket.io');
const http     = require('http') ;

const app    = express();
const server = http.Server(app);
const io     = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@icfn-mpexq.mongodb.net/omnistack9?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;    
})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

// req.query  = Acessar Query Params (url?idade=20)       | indicado para filtros
// req.params = Acessar Route Params (parâmetros de rota) | indicado para edição, delete
// req.body   = Acessar corpo da requisição               | indicado para criação, edição

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);