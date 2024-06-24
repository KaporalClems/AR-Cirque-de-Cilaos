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

    getUserLocation();
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

function takePhoto() {
    const sceneEl = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
    const link = document.createElement('a');
    link.href = sceneEl.toDataURL('image/png');
    link.download = 'photo.png';
    link.click();
}

function zoomIn() {
    const cameraEl = document.querySelector('a-camera');
    const currentZoom = cameraEl.getAttribute('zoom');
    cameraEl.setAttribute('zoom', currentZoom + 1);
}

function zoomOut() {
    const cameraEl = document.querySelector('a-camera');
    const currentZoom = cameraEl.getAttribute('zoom');
    cameraEl.setAttribute('zoom', currentZoom - 1);
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            document.getElementById('user-location').textContent = `Position: Lat ${latitude.toFixed(6)}, Lon ${longitude.toFixed(6)}`;
            getAltitude(latitude, longitude);
        }, error => {
            document.getElementById('user-location').textContent = 'Position: Impossible de récupérer la position.';
        });
    } else {
        document.getElementById('user-location').textContent = 'Position: La géolocalisation n\'est pas supportée par ce navigateur.';
    }
}

function getAltitude(latitude, longitude) {
    const apiUrl = `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const altitude = data.results[0].elevation;
            document.getElementById('user-altitude').textContent = `Altitude: ${altitude} m`;
        })
        .catch(error => {
            document.getElementById('user-altitude').textContent = 'Altitude: Impossible de récupérer l\'altitude.';
        });
}
