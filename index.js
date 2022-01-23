//IMPORTS
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const router_users = require('./routes/router_users');
const router_admin = require('./routes/router_admin');
const router_projeto = require('./routes/router_projeto');
const utilities = require('./utilities/utilities');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//AUTH
const auth = function(req, res, next) {
    let exceptions = ['/admin/login', '/admin/register', '/user/login', '/user/register'];
    if (exceptions.indexOf(req.url) >= 0) {
        next();
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if (result) {
                next();
            } else {
                res.status(401).send("Invalid Token");
            }
        })
    }
}

//CONFIGS
app.use(express.json());
app.use(auth);
app.use('/user', router_users)
app.use('/admin', router_admin)
app.use('/projeto', router_projeto)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//mongodb+srv://nuno:<password>@cluster0.sfn7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// MONGOOSE
mongoose.connect(`mongodb+srv://nuno:123@cluster0.sfn7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB")
});

//START SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})