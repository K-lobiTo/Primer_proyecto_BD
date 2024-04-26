app.post('/register', async (req, res) => {
    const data = req.body;
    const hash_pass = hash(data.password);
    const country = data.country.toUpperCase(); //tener cuidado con el orden de los valores sql
    const insertar_usuario = `INSERT INTO JOSHUA.Usuario(Name, Last_name, Direction, Password, Mail, id_country) VALUES (:1,:2,:3,:4,:5,:6)`;
    const sacar_pais = `SELECT id_country FROM JOSHUA.Pais WHERE Name = :1`;
    const verificar = `SELECT id_user FROM JOSHUA.Usuario WHERE Mail = :1`;
    try {

        const connection = await oracledb.getConnection(dbConfig);
        const consult1 = await connection.execute(sacar_pais, [country]);
        const consult2 = await connection.execute(verificar, [data.mail]);

        if (consult1.rows.length == 0 || consult2.rows.length != 0) {
            res.send('Error1\n'); //hay que enviar un error u algo para verificar 
        } else {

            const id = consult1.rows[0][0];
            await connection.execute(insertar_usuario, [data.name, data.last_name, data.direction, hash_pass, data.mail, id]);
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