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


app.post('/create/identification', async (req, res) => {
    const sql = `INSERT INTO JOSHUA.Identificacion(Period,id_observation,id_user,Commentary) VALUES(SYSDATE,:1,:2,:3)`;
    const data = req.body;
    /* Debo recibir:
        id_observation
        id_user
        Comment
    */
    try {
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(sql, [data.id_observation, data.id_user, data.Commentary]);
        await connection.commit();
        await connection.close();
        res.send('ok!\n');
        console.log('ok!');
    } catch (err) {
        console.log(err);
        res.send('Error\n');
    }
})


//debe ser put
app.post('/update/identification', async (req, res) => {
    const data = req.body;
    const sql = `UPDATE JOSHUA.Identificacion SET Period = SYSDATE, Commentary = :1 WHERE id_identification = :2`;
    try {
        /* Debo recibir:
            Commentary (comentario nuevo)
            id_identification
         */
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(sql, [data.Commentary, data.id_identification]);
        await connection.commit();
        await connection.close();
        res.send('ok!\n')
        console.log('ok!');
    } catch (err) {
        res.send('Error\n')
        console.log(err);
    }
})


app.post('/delete/identification', async (req, res) => {
    const id = req.body.id_identification;
    const sql = `DELETE FROM JOSHUA.Identificacion WHERE id_identification = :1`;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(sql, [id]);
        await connection.commit();
        await connection.close();
        console.log('GG');
    } catch {
        res.send('Error\n');
    }
})


app.post('/get/identifications', async (req, res) => {
    const sql = `SELECT* FROM JOSHUA.Identificacion WHERE id_user = :1`; //hay que cambiar lo que devuelve
    const id = req.body.id_user;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(sql, [id]);
        //aqui se puede verificar si la consulta no obtuvo nada
        res.json(consult.rows);
        await connection.close();
    } catch (err) {
        res.send('Error\n');
        console.log(err);
    }
})


app.post('/get/all/identifications', async (req, res) => {
    const sql = `SELECT* FROM JOSHUA.Identificacion WHERE id_taxon = :1`; //hay que cambiar lo que devuelve
    const id = req.body.id_user;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(sql, [id]);
        //AQUI SE PUEDE VERIFICAR SI NO SE OBTUVO NADA DE LA CONSULTA
        res.json(consult.rows);
        await connection.close();
    } catch {
        res.send('Error\n');
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


app.post('/get/image/taxon', async (req, res) => {
    const sql = `SELECT SYS_CONNECT_BY_PATH(Name,'/') "Path" FROM JOSHUA.Taxonomia WHERE Name = :1 START WITH id_mitata = 0 CONNECT BY PRIOR id_taxon = id_mitata`;
    const sql2 = `SELECT Name FROM JOSHUA.Taxonomia JOIN JOSHUA.Observacion ON JOSHUA.Taxonomia.id_taxon = JOSHUA.Observacion.id_taxon WHERE JOSHUA.Observacion.id_taxon = :1`;
    const sql3 = `SELECT Image,Period,License FROM JOSHUA.Imagen JOIN JOSHUA.Licencia ON JOSHUA.Imagen.id_license = JOSHUA.Licencia.id_license WHERE id_image = :1`;
    const data = req.body;

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const c1 = await connection.execute(sql2, [data.id_taxon]);
        const animal = c1.rows[0][0];
        const c2 = await connection.execute(sql, [animal]);
        const path = c2.rows[0][0];
        const c3 = await connection.execute(sql3, [data.id_image]);
        const enviar = {
            path: path,
            Image: c3.rows[0][0].toString('base64'),
            Period: c3.rows[0][1],
            License: c3.rows[0][2]
        }
        res.json(enviar);
        await connection.close();
        console.log('ok!');
    } catch (err) {
        console.log(err);
        res.send('Error\n');
    }
})

/* Debo recibir:
    id_user
    dato_animal
    Image (BLOB)
    Comment
    latitud
    longitud
    license_name
    Mail del fotografo
    direccion y etc del fotografo
*/

app.post('/create/observation', upload.single('image'), async (req, res) => {
    const sql1 = `SELECT id_taxon FROM JOSHUA.Taxonomia WHERE Name = :1`;
    const sql2 = `INSERT INTO JOSHUA.Observacion(id_user,id_taxon,id_image,Commentary,Latitud,Longitud) VALUES(:1,:2,:3,:4,:5,:6)`;
    const sql3 = `SELECT id_license FROM JOSHUA.Licencia WHERE Name = :1`;
    const sql4 = `SELECT id_persona FROM JOSHUA.Persona WHERE Mail = :1`;
    const sql5 = `INSERT INTO JOSHUA.Imagen(Image,Period,id_persona,id_license) VALUES(:1,TO_TIMESTAMP_TZ(:2,\'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"\'),:3,:4)`;
    const sql6 = `SELECT id_image FROM JOSHUA.Imagen WHERE DBMS_LOB.COMPARE(Image,:1) = 0`;
    const sql7 = `INSERT INTO JOSHUA.Persona(Name, Last_name, Direction, Mail, id_country) VALUES(:1,:2,:3,:4,:5)`;
    const sql8 = `SELECT id_country FROM JOSHUA.Pais WHERE Name = :1`;

    const data = req.body;
    const img = req.file;
    const imagebuffer = fs.readFileSync(img.path);

    try {
        const connection = await oracledb.getConnection(dbConfig);
        var consult1 = await connection.execute(sql4, [data.Mail]);

        if (consult1.rows.length == 0) {
            const c = await connection.execute(sql8, [data.pais]);
            const id_country = c.rows[0][0];
            connection.execute(sql7, [data.name, data.last_name, data.direction, data.Mail, id_country]);
            consult1 = await connection.execute(sql4, [data.Mail]);
        }

        const consult2 = await connection.execute(sql3, [data.license_name]);

        const id_persona = consult1.rows[0][0];
        const id_license = consult2.rows[0][0];

        //verificar si la imagen ya esta insertada
        var consult4 = await connection.execute(sql6, [Buffer.from(imagebuffer, 'binary')]);

        if (consult4.rows.length == 0) {
            await connection.execute(sql5, [data.Image, data.Period, id_persona, id_license]);
            consult4 = await connection.execute(sql6, [Buffer.from(imagebuffer, 'binary')]);
        }

        const consult3 = await connection.execute(sql1, [data.dato_animal]);
        const id_taxon = consult3.rows[0][0];
        const id_image = consult4.rows[0][0];

        await connection.execute(sql2, [data.id_user, id_taxon, id_image, data.Commentary, data.Latitud, data.Longitud]);
        await connection.commit();
        await connection.close();
        fs.unlinkSync(img.path);
        res.send('ok!');
        console.log('ok!');

    } catch (err) {
        console.log(err);
        res.send('Error');
    }

})

//``

app.post('/register', async (req, res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    const country = data.country.toUpperCase(); //tener cuidado con el orden de los valores sql
    const sacar_pais = `SELECT id_country FROM JOSHUA.Pais WHERE Name = :1`;
    const insertar_persona = `INSERT INTO JOSHUA.Persona(Name, Last_name, Direction, Mail, id_country) VALUES(:1,:2,:3,:4,:5)`;
    const sacar_persona = `SELECT id_persona FROM JOSHUA.Persona WHERE Mail = :1`;
    const insertar_usuario = `INSERT INTO JOSHUA.Usuario(id_persona, Password) VALUES (:1,:2)`;
    const verificar = `SELECT id_user FROM JOSHUA.Usuario WHERE id_persona = :1`;

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const consult1 = await connection.execute(sacar_pais, [country]);
        var consult2 = await connection.execute(sacar_persona, [data.mail]);

        if (consult1.rows.length == 0) {
            res.send('Error1\n');
        } else if (consult2.rows.length != 0) {
            const p = consult2.rows[0][0];
            const test = await connection.execute(verificar, [p]);
            if (test.rows.length != 0) {
                res.send('Error2\n');
            } else {
                await connection.execute(insertar_usuario, [p, hash_pass]);
            }
        } else {
            const id = consult1.rows[0][0];
            await connection.execute(insertar_persona, [data.name, data.last_name, data.direction, data.mail, id]);
            consult2 = await connection.execute(sacar_persona, [data.mail]);
            const p = consult2.rows[0][0];
            await connection.execute(insertar_usuario, [p, hash_pass]);
        } await connection.commit();
        await connection.close();
        //res.send('ok!\n');
        console.log('GG');
    } catch (err) {
        res.send('Error3\n');
        console.log(err);
    }
})

app.post('/login', async (req, res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    const verificar = `SELECT id_user, Name, Last_name, Mail FROM JOSHUA.Persona JOIN JOSHUA.Usuario ON Password = :1 WHERE Mail = :2`;
    try {

        const connection = await oracledb.getConnection(dbConfig);
        const consult = await connection.execute(verificar, [hash_pass, data.mail]);

        if (consult.rows.length != 0) {
            res.json(consult.rows);
        } else {
            res.send('Error1\n'); //igualmente hay que enviar algo para verificar en la interfaz
        }
        await connection.close();
        console.log('ok!');
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


//curl -X POST -H "Content-Type: application/json" -d '{"name": "Miguel", "last_name": "Ramirez", "direction": "Alajuela, R2", "mail": "Migueru.1085@gmail.com", "country": "Francia", "password": "1234567890987654321"}' http://localhost:9000/register


//curl -X POST -H "Content-Type: application/json" -d '{"id_taxon": 14, "id_image": 1}' http://localhost:9000/get/image/taxon


//curl -X POST -H "Content-Type: application/json" -d '{"mail": "joshua.jimenez@gmail.com", "password": "pedro_pica_piedra"}' http://localhost:9000/login


//curl -X POST -H "Content-Type: application/json" -d '{"id_identification": 1}' http://localhost:9000/delete/identification


//curl -X POST -H "Content-Type: application/json" -d '{"id_user": 3}' http://localhost:9000/get/identifications


//curl -X POST -H "Content-Type: application/json" -d '{"id_user": 2, "Commentary": "neg diff", "id_observation": 2}' http://localhost:9000/create/identification


//curl -X POST -H "Content-Type: application/json" -d '{"id_identification": 2, "Commentary": "God-Freddy"}' http://localhost:9000/update/identification


//curl -X POST -H "Content-Type: application/json" -d '{"id_observation": 1}' http://localhost:9000/delete/observation


//curl -X POST -H "Content-Type: application/json" -d '{"id_user": 1}' http://localhost:9000/get/observations


//curl -X POST -H "Content-Type": "multipart/form-data" -d '{ }' http://localhost:9000/create/observation



