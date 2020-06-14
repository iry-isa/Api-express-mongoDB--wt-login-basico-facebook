const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const mongoose = require('mongoose');


const users = require('./model');

app.use('/', express.static(path.join(__dirname, 'template')));


app.use(bodyParser.json());
/*falta configurar

mongoose.connect('mongodb://localhost/demoFacebook'),
por esto
mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {


    if (err) throw err;

    console.log('Base de datos ONLINE');

});

*/
// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/demoFacebook';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;


//mongoose.connect('mongodb://localhost:27017/demoFacebook'), { useUnifiedTopology: true }


app.post('/login-with-facebook', async(req, res) => {
    const { accessToken, userID } = req.body

    const response = await fetch(`https: //graph.facebook.com/v3.1/me?access_token${accessToken}&method=get&pretty=0&sdk=joey&supress_http_code=1`)
    const json = await response.json()

    if (json.id === userID) {
        //valid user
        const resp = await users.findOne({ facebookID: userID })
        if (resp) {
            res.json({ status: 'ok', data: 'estas conectado' })
        } else {
            const userDB = new user({
                name: 'nombre',
                facebookID: userID,
                accessToken

            })
            await userDB.save()
            res.json({
                status: 'ok',
                data: 'Bienvenido otra vez'
            })
        }
        //verifica si el usuario si esta en la BD
    } else {
        res.jon({
                status: 'error',
                data: 'usuario o contraseña incorrectos'
            })
            //no autorizado,mandar el error
    }
});
// settings server
app.set('port', process.env.PORT || 3000);
// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server funcionando ${app.get('port')}`);
});