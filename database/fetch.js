const oracledb = require('oracledb');

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "db_manager",
      password: "1820",
      connectString: "localhost:1521"
    });
    // await connection.execute('create table form_data (name varchar2(20), email varchar(40))');
    // await connection.commit();
    // await connection.execute('INSERT INTO form_data (name, email) VALUES (\'Gagan\', \'gaganagarwal2001@gmail.com\')');
    // await connection.commit();
    const result = await connection.execute('SELECT * FROM blood_donors');
    await connection.commit();
    console.log("hello");
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed.');
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();