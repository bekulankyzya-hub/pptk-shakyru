document.addEventListener('DOMContentLoaded', () => {
    const password = prompt('Басқару панеліне кіру үшін құпия сөзді енгізіңіз:');
    if (password !== 'admin123') {
        alert('Құпия сөз қате!');
        document.body.innerHTML = '<h2 style="color: white; text-align: center;">Рұқсат жоқ!</h2>';
        return;
    }

    loadData();
});

function loadData() {
    const tableBody = document.getElementById('table-body');
    const countAccept = document.getElementById('count-accept');
    const countReject = document.getElementById('count-reject');

    const data = JSON.parse(localStorage.getItem('rsvp_list')) || [];

    tableBody.innerHTML = '';
    let accepts = 0;
    let rejects = 0;

    data.forEach((item, index) => {
        if (item.status === 'Келемін') accepts++;
        if (item.status === 'Келе алмаймын') rejects++;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td style="color: ${item.status === 'Келемін' ? 'green' : 'red'}; font-weight: bold;">${item.status}</td>
            <td>${item.time}</td>
        `;
        tableBody.appendChild(row);
    });

    countAccept.innerText = accepts;
    countReject.innerText = rejects;
}

function clearData() {
    if (confirm('Шын мәнінде бүкіл тізімді өшіргіңіз келе ме?')) {
        localStorage.removeItem('rsvp_list');
        loadData();
    }
}