const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

function hash(chain){
    let r = 0;
    let potp1 = 1;
    for(let i=0;i<chain.length;i++){
        r += (chain[i].charCodeAt(0) * potp1)%9999991;
        r %= 9999991;
        potp1 *= 9973;
        potp1 %= 9999991;
    } return r;
}

//falta cambiarle las comillas a los sql
const insertar_usuario = 'INSERT INTO JOSHUA.Usuario(Name, Last_name, Direction, Password, Mail) VALUES (:1,:2,:3,:4,:5,:6,:7)';
const sacar_pais = 'SELECT id_country FROM JOSHUA.Pais WHERE Name = :1';


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
    destination: function(req,file,callback){
        callback(null,__dirname + '/files');
    },
    filename: function(req,file,callback){
        const filename = `file_${crypto.randomUUID()}`;
        callback(null,filename);
    } 
})

const upload = multer({
    storage: storage
})

app.post('/', upload.single('image'), async(req,res) => { //.any() para aceptar mas imagenes
    
    const data = req.body;
    const image = req.file;
    const imagebuffer = fs.readFileSync(image.path);

    var sql = `INSERT INTO JOSHUA.TEST5 (TEXTO,FECHA,IMAGEN) VALUES (:1, TO_TIMESTAMP_TZ(:2,\'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"\'), :3)`;

    try{
        const connection = await oracledb.getConnection(dbConfig);
        await connection.execute(
            sql,
            [data.text,data.date,Buffer.from(imagebuffer,'binary')]);

        await connection.commit(); 
        fs.unlinkSync(image.path);
        await connection.close();
        res.send('Datos insertados correctamente a la base de datos.');
    } catch(error){
        console.log('Error al recibir datos: ',error);
        res.status(500).send('Error al enviar datos a la base');
    }

})

app.post('/register', async(req,res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    
    try{
        console.log(data.name);
        console.log(data.last_name);
        console.log(data.country);
        console.log(data.direction);
        console.log(data.user);
        console.log(data.mail);
        console.log(hash_pass);

        //mejor dejar la conexion al aire

        //const connection = await oracledb.getConnection(dbConfig);
        //await connection.execute();


        res.send('ok!');
    } catch{
        console.log('mamo');
    }
})

app.post('/login', async(req,res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    try{
        console.log(data.user);
        console.log(hash_pass);
        res.send('ok!')
    } catch{
        console.log('Error al recibir datos\n');
    }
})

app.get('/', (req, res) => {
    res.send('Server\n');
});

app.get('/register', (req,res) => {
    res.send('Sitio de registro\n');
})

app.get('/login', (req,res) => {
    res.send('Sitio Login\n');
})

app.listen(PORT, () => {
    console.log('Escuchando el puerto: ' + PORT);
});



//curl -X POST http://localhost:9000/register
//curl -X POST -H "Content-Type: application/json" -d '{"nombre": "Juan", "edad": 30}' http://localhost:3000/mi-ruta



  