const apiUrl = 'http://localhost:5000/carlos-graphql';


async function fetchClients() {
    const query = `
        {
            clients {
                id
                name
                email
                phone
            }
        }
    `;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });
    const result = await response.json();
    displayClients(result.data.clients);
}


function displayClients(clients) {
    const clientsList = document.getElementById('clients');
    clientsList.innerHTML = '';
    clients.forEach(client => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${client.name} - ${client.email} - ${client.phone}
            <div class="center">
            <button class="delete" onclick="deleteClient('${client.id}')">Eliminar</button>
            </div>
            <div class="center">
            <button class="edit" onclick="editClient('${client.id}', '${client.name}', '${client.email}', '${client.phone}')">Editar</button>
            </div>
            `;
        clientsList.appendChild(li);
    });
}


async function addOrUpdateClient() {
    const id = document.getElementById('client-id').value;
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;
    
    const mutation = id ? `
        mutation {
            updateClient(id: "${id}", name: "${name}", email: "${email}", phone: "${phone}") {
                id
                name
                email
                phone
            }
        }
    ` : `
        mutation {
            addClient(name: "${name}", email: "${email}", phone: "${phone}") {
                id
                name
                email
                phone
            }
        }
    `;
    
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    document.getElementById('client-id').value = '';
    document.getElementById('client-name').value = '';
    document.getElementById('client-email').value = '';
    document.getElementById('client-phone').value = '';
    fetchClients();
}


async function deleteClient(id) {
    const mutation = `
        mutation {
            deleteClient(id: "${id}") {
                id
            }
        }
    `;
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    fetchClients();
}


function editClient(id, name, email, phone) {
    document.getElementById('client-id').value = id;
    document.getElementById('client-name').value = name;
    document.getElementById('client-email').value = email;
    document.getElementById('client-phone').value = phone;
}

function setFooterText() {
    const footerText = document.getElementById('footer-text');
    const currentYear = new Date().getFullYear();
    footerText.innerText = ` © Carlos Calleja Saéz ${currentYear}`;
}


fetchClients();
setFooterText();
