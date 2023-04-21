const cors = require('cors');
const express = require('express');
const oracledb = require('oracledb');

// Create a new web server
const app = express();

// Parse JSON and URL-encoded query parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let loginState =true;

async function run() {
    let connection;

// Connect to the Oracle database
  connection = await oracledb.getConnection({
  user: 'db_manager',
  password: '1820',
  connectString: 'localhost:1521',
}, (err, connection) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to Oracle Database');


   // Create an endpoint to fetch form data
        app.get('/data', async (req, res) => {
            let connection;
            console.log("fetch_request");
            if (loginState) {
                try {
                    // Connect to the Oracle database
                    connection = await oracledb.getConnection({
                        user: 'db_manager',
                        password: '1820',
                        connectString: 'localhost:1521'
                    });

                    // console.log("hello");

                    // Fetch the form data from the database
                    const result = await connection.execute(
                        'SELECT first_name, last_name,email,mobile_number,gender,address,city,pin_code,state,country,blood_type,age FROM blood_donors'
                    );

                    // Send the form data as a JSON response
                    res.json(result.rows);
                    console.log("fetch satisfied");
                } catch (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                } finally {
                    if (connection) {
                        try {
                            await connection.close();
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            } else{
                console.log("Fetch denied as admin not logged_in");
                res.setHeader('Content-Type', 'text/plain');
                res.json({ text: 'Admin not logged in' });
            }
        });
  


  // Create a new endpoint to handle form submissions
  app.post('/submit', async (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    // const date_of_birth = req.body.date_of_birth;
    const email = req.body.email;
    const mobile_number = req.body.mobile_number;
    const gender = req.body.gender;
    const address = req.body.address;
    const city = req.body.city;
    const pin_code = req.body.pin_code;
    const state = req.body.state;
    const country = req.body.country;
    const blood_type = req.body.blood_type;
    const age = req.body.age;

    // Insert the form data into the table
    // console.log(first_name);
    await connection.execute(
      'INSERT INTO blood_donors (first_name, last_name, email, mobile_number, gender, address, city, pin_code, state, country, blood_type, age) VALUES(:first_name, :last_name,:email, :mobile_number, :gender, :address, :city, :pin_code, :state, :country, :blood_type, :age)',
      [first_name,last_name,email,mobile_number,gender,address,city,pin_code,state,country,blood_type,age],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal server error');
          return;
        }

        console.log('Form data inserted into Oracle Database');
        console.log(first_name);
        // console.log(connection.execute('select*from form_data'));
        // Redirect the user to a confirmation page
        // res.redirect('/confirmation.html');
      }
    );
    await connection.commit();
    res.redirect('http://127.0.0.1:3001/confirmation.html');
  });


 // Create a new endpoint to handle login
 app.post('/login', async (req, res) => {
  const authName = req.body.authName;
  const passkey = req.body.passkey;
  console.log("Admin login Requested");

  try {
      const login = await oracledb.getConnection({
          user: authName,
          password: passkey,
          connectString: 'localhost:1521'
      });
      if(!login){
          throw new err;
      }
      console.log("Admin logged in successfully");
      res.redirect('http://127.0.0.1:3001/admin.html');
      console.log('Connected to Oracle Database');
      loginState = true;
  } catch (err) {
      console.error(err);
      res.status(502).send('Bad Request, Incorrect Username or password');
  }
});

  // Start the web server
  app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
  });
});


}

run();