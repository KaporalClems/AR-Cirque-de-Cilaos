document.addEventListener('DOMContentLoaded', function () {
    const sommets = [
        { id: 'piton-des-neiges', info: 'Piton des Neiges : Le point culminant de La Réunion avec une altitude de 3 070 mètres.' },
        { id: 'grand-benare', info: 'Grand Bénare : Un des plus hauts sommets de La Réunion avec une altitude de 2 898 mètres.' },
        { id: 'petit-benare', info: 'Petit Bénare : Une montagne à La Réunion avec une altitude de 2 576 mètres.' }
        // Ajouter d'autres sommets ici
    ];

    sommets.forEach(sommet => {
        const element = document.querySelector(`#${sommet.id}`);
        element.addEventListener('click', function () {
            showInfoBox(sommet.info);
        });
    });

    window.addEventListener('deviceorientation', function (event) {
        const compassNeedle = document.querySelector('#compass-needle');
        if (event.webkitCompassHeading) {
            // iOS non-standard
            compassNeedle.object3D.rotation.z = THREE.Math.degToRad(event.webkitCompassHeading);
        } else if (event.alpha) {
            // Standard
            compassNeedle.object3D.rotation.z = THREE.Math.degToRad(360 - event.alpha);
        }
    });
});

function showInfoBox(info) {
    const infoBox = document.getElementById('info-box');
    const infoText = document.getElementById('info-text');
    infoText.textContent = info;
    infoBox.style.display = 'block';
}

function closeInfoBox() {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'none';
}

