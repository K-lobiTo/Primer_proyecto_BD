const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

function hash(chain) {
    let r = 0;
    let potp1 = 1;
    for (let i = 0; i < chain.length; i++) {
        r += (chain[i].charCodeAt(0) * potp1) % 9999991;
        r %= 9999991;
        potp1 *= 9973;
        potp1 %= 9999991;
    } return r;
}

//const whitelist = ['http://localhost:3000/'];

const app = express();
app.use(cors(/*{origin: whitelist}*/));
app.use(express.json());
const PORT = process.env.PORT || 9000;


const dbConfig = {
    user: 'JOSHUA',
    password: 'Besamestazona11!',
    connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.sa-bogota-1.oraclecloud.com))(connect_data=(service_name=g90b9bd4b8e4b88_p1_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/files');
    },
    filename: function (req, file, callback) {
        const filename = `file_${crypto.randomUUID()}`;
        callback(null, filename);
    }
})

const upload = multer({
    storage: storage
})

app.post('/', upload.single('image'), async (req, res) => { //.any() para aceptar mas imagenes

    const data = req.body;
    const image = req.file;
    const imagebuffer = fs.readFileSync(image.path);

    var sql = `INSERT INTO JOSHUA.TEST5 (TEXTO,FECHA,IMAGEN) VALUES (:1, TO_TIMESTAMP_TZ(:2,\'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"\'), :3)`;

    try {
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(
            sql,
            [data.text, data.date, Buffer.from(imagebuffer, 'binary')]);

        await connection.commit();
        fs.unlinkSync(image.path);
        await connection.close();
        res.send('Datos insertados correctamente a la base de datos.');
    } catch (error) {
        console.log('Error al recibir datos: ', error);
        res.status(500).send('Error al enviar datos a la base');
    }
})















app.post('/delete/observation', async (req, res) => { //VERIFICAR EL ORDEN EN EL QUE SE EJECUTAN LAS CONSULTAS
    const id = req.body.id_observation;
    const sql1 = `DELETE FROM JOSHUA.Observacion WHERE id_observation = :1`;
    const sql2 = `DELETE FROM JOSHUA.Identificacion WHERE id_observation = :1`; //hay que borrar todas las identificaciones
    try {
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(sql2, [id]);
        await connection.execute(sql1, [id]);
        await connection.commit();
        await connection.close();
        console.log('GG');
    } catch {
        res.send('Error\n');
    }
})


app.post('/delete/identification', async (req, res) => {
    const id = req.body.id_identification;
    const sql = `DELETE FROM JOSHUA.Identificacion WHERE id_identification = :1`;
    try { //se asume que la fila ya esta creada por lo que no se verifica si existe
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(sql, [id]);
        await connection.commit();
        await connection.close();
        console.log('GG');
    } catch {
        res.send('Error\n');
    }
})

app.post('/get/observations', async (req, res) => {
    const sql = `SELECT* FROM JOSHUA.Observacion WHERE id_user = :1`; //hay que cambiar lo que devuelve
    const id = req.body.id_user;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(sql, [id]);
        //aqui se puede verificar si la consulta no obtuvo nada
        res.json(consult.rows);
        await connection.close();
    } catch {
        res.send('Error\n');
    }
})

app.post('/get/identifications', async (req, res) => {
    const sql = `SELECT* FROM JOSHUA.Identification WHERE id_user = :1`; //hay que cambiar lo que devuelve
    const id = req.body.id_user;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(sql, [id]);
        //aqui se puede verificar si la consulta no obtuvo nada
        res.json(consult.rows);
        await connection.close();
    } catch {
        res.send('Error\n');
    }
})


app.post('/get/all/observations', async (req, res) => {
    const sql = `SELECT* FROM JOSHUA.Observacion WHERE id_taxon = :1`; //hay que cambiar lo que devuelve
    const id = req.body.id_user;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(sql, [id]);
        //aqui se puede verificar si la consulta no obtuvo nada
        res.json(consult.rows);
        await connection.close();
    } catch {
        res.send('Error\n');
    }
})

app.post('/get/all/identifications', async (req, res) => {
    const sql = `SELECT* FROM JOSHUA.Identificacion WHERE id_taxon = :1`; //hay que cambiar lo que devuelve
    const id = req.body.id_user;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(sql, [id]);
        //aqui se puede verificar si la consulta no obtuvo nada
        res.json(consult.rows);
        await connection.close();
    } catch {
        res.send('Error\n');
    }
})










//``

app.post('/register', async (req, res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    const country = data.country.toUpperCase(); //tener cuidado con el orden de los valores sql
    const sacar_pais = `SELECT id_country FROM JOSHUA.Pais WHERE Name = :1`;
    const verificar = `SELECT id_user FROM JOSHUA.Usuario WHERE Mail = :1`;
    const insertar_persona = `INSERT INTO JOSHUA.Persona(Name, Last_name, Direction, Mail, id_country) VALUES(:1,:2,:3,:4,:5)`;
    const sacar_persona = `SELECT id_persona FROM JOSHUA.Persona WHERE Mail = :1`;
    const insertar_usuario = `INSERT INTO JOSHUA.Usuario(id_persona, Password) VALUES (:1,:2)`;
    try {

        const connection = await oracledb.getConnection(dbConfig);

        const consult1 = await connection.execute(sacar_pais, [country]);
        const consult2 = await connection.execute(verificar, [data.mail]);

        if (consult1.rows.length == 0 || consult2.rows.length != 0) {
            res.send('Error1\n'); //hay que enviar un error u algo para verificar 
        } else {

            const id = consult1.rows[0][0];

            await connection.execute(insertar_persona, [data.name, data.last_name, data.direction, data.mail, id]);
            const consult3 = await connection.execute(sacar_persona, [data.mail]);
            const person = consult3.rows[0][0];
            await connection.execute(insertar_usuario, [person, hash_pass]);

            await connection.commit();

        } await connection.close();
        res.send('ok!\n');

        console.log('GG');

    } catch (err) {
        res.send('Error2\n');
        console.log(err);
        //await connection.close(); //creo que esto no deberia ir aqui
    }
})

app.post('/login', async (req, res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    const verificar = `SELECT id_user, Name, Last_name, Mail FROM JOSHUA.Usuario WHERE Mail = :1 AND Password = :2`;
    try {

        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(verificar, [data.mail, hash_pass]);

        if (consult.rows.length != 0) {
            res.json(consult.rows);
        } else {
            res.send('Error1\n'); //igualmente hay que enviar algo para verificar en la interfaz
        }
        await connection.close();
        //res.send('ok!\n')
    } catch (err) {
        //await connection.close();
        console.log(err);
        res.send('Error2\n');
    }
})


app.listen(PORT, () => {
    console.log('Escuchando el puerto: ' + PORT);
});


//curl -X POST http://localhost:9000/register
//curl -X POST -H "Content-Type: application/json" -d '{"nombre": "Juan", "edad": 30}' http://localhost:3000/mi-ruta
//``


