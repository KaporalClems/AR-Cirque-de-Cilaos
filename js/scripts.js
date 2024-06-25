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
let zoomLevel = 1;

function zoomIn() {
    zoomLevel *= 1.5;
    updateCameraZoom();
}

function zoomOut() {
    zoomLevel /= 1.5;
    updateCameraZoom();
}

function updateCameraZoom() {
    const camera = document.querySelector('#ar-camera');
    camera.setAttribute('zoom', zoomLevel);
}

function takePhoto() {
    const scene = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
    const link = document.createElement('a');
    link.href = scene.toDataURL('image/png');
    link.download = 'screenshot.png';
    link.click();
}

// Initialize screenshot component for A-Frame
AFRAME.registerComponent('screenshot', {
    init: function () {
        const scene = this.el.sceneEl;
        scene.setAttribute('screenshot', '');
    }
});

// Get the user's position and display it
function updateUserPosition(position) {
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);
    document.getElementById('user-position').innerText = `Position: Latitude: ${lat}, Longitude: ${lon}`;
}

function handleLocationError(error) {
    console.error(error);
    document.getElementById('user-position').innerText = 'Position: Impossible d\'obtenir la position';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateUserPosition, handleLocationError);
} else {
    document.getElementById('user-position').innerText = 'Position: Geolocation non supportée';
}

// Close the info box
function closeInfoBox() {
    document.getElementById('info-dialogue-box').style.display = 'none';
}
