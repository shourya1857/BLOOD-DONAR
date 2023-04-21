// Get a reference to the table and the load button
const dataTable = document.getElementById('data-table');
const loadButton = document.getElementById('load-button');
const errorMessage = document.getElementById('error-message');
loadButton.addEventListener('click', async () => {
    
try {
    const response = await fetch('http://localhost:3000/data')
    console.log("hi");
    const data = await response.json();
    console.log(data);
    console.log("hi2");

    // Clear the table
    dataTable.innerHTML = '<thead><tr><th>first_name</th><th>last_name</th><th>email</th><th>mobile_number</th><th>gender</th><th>address</th><th>city</th><th>pin_code</th><th>state</th><th>country</th><th>blood_type</th><th>age</th></tr></thead><tbody></tbody>';
   // Add each row of data to the table
   for (const row of data) {
    const tr = document.createElement('tr');
    const first_nameTd = document.createElement('td');
    const last_nameTd = document.createElement('td');
    const emailTd = document.createElement('td');
    const mobile_numberTd = document.createElement('td');
    const genderTd = document.createElement('td');
    const addressTd = document.createElement('td');
    const cityTd = document.createElement('td');
    const pin_codeTd = document.createElement('td');
    const stateTd = document.createElement('td');
    const countryTd = document.createElement('td');
    const blood_typeTd = document.createElement('td');
    const ageTd = document.createElement('td');
    first_nameTd.textContent = row[0];
    last_nameTd.textContent = row[1];
    emailTd.textContent = row[2];
    mobile_numberTd.textContent = row[3];
    genderTd.textContent = row[4];
    addressTd.textContent = row[5];
    cityTd.textContent = row[6];
    pin_codeTd.textContent = row[7];
    stateTd.textContent = row[8];
    countryTd.textContent = row[9];
    blood_typeTd.textContent = row[10];
    ageTd.textContent = row[11];
    tr.appendChild(first_nameTd);
    tr.appendChild(last_nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(mobile_numberTd);
    tr.appendChild(genderTd);
    tr.appendChild(addressTd);
    tr.appendChild(cityTd);
    tr.appendChild(pin_codeTd);
    tr.appendChild(stateTd);
    tr.appendChild(countryTd);
    tr.appendChild(blood_typeTd);
    tr.appendChild(ageTd);
    dataTable.appendChild(tr);
  }

  } catch (error) {
      const response = await fetch('http://localhost:3000/data')
      data = await response.json();
      console.log("Error");
      error_message = data.text;
      errorMessage.textContent = await error_message;
    // Handle the error as needed, such as displaying a message to the user
  }
});