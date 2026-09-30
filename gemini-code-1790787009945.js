function submitRSVP(status) {
    const fullnameInput = document.getElementById('fullname');
    const fullname = fullnameInput.value.trim();
    const statusMessage = document.getElementById('status-message');

    if (!fullname) {
        alert('Өтініш, аты-жөніңізді енгізіңіз!');
        return;
    }

    const rsvpData = {
        name: fullname,
        status: status,
        time: new Date().toLocaleString('kk-KZ')
    };

    let existingData = JSON.parse(localStorage.getItem('rsvp_list')) || [];
    existingData.push(rsvpData);
    localStorage.setItem('rsvp_list', JSON.stringify(existingData));

    fullnameInput.value = '';
    statusMessage.classList.remove('hidden', 'success', 'danger');

    if (status === 'Келемін') {
        statusMessage.classList.add('success');
        statusMessage.innerText = 'Рақмет! Сіздің жауабыңыз қабылданды (Келесіз).';
    } else {
        statusMessage.classList.add('danger');
        statusMessage.innerText = 'Жауабыңызға рақмет (Келе алмайсыз).';
    }
}