window.onload = () => {
    // Initialiser la scène A-Frame avec AR.js
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', 'sourceType: webcam;');
    document.getElementById('ar-container').appendChild(scene);

    // Ajouter des entités pour les montagnes
    const mountains = [
        { name: "L'entre-Deux", position: '0 2 -5', altitude: '2352m' },
        { name: 'Rond des Chevrons', position: '1 2 -5', altitude: '2319m' },
        { name: 'Piton Béthune', position: '-1 2 -5', altitude: '1600m' },
        // Ajouter plus de montagnes si nécessaire
    ];

    mountains.forEach(mountain => {
        const label = document.createElement('a-entity');
        label.setAttribute('gps-entity-place', `latitude: -21.131399; longitude: 55.471446`);
        label.setAttribute('value', `${mountain.name}\n${mountain.altitude}`);
        label.setAttribute('position', mountain.position);
        label.setAttribute('text', {
            color: 'white',
            align: 'center',
            width: 5
        });
        scene.appendChild(label);
    });

    // Fonctionnalité de capture d'écran
    document.getElementById('screenshot').onclick = () => {
        scene.components.screenshot.capture('perspective');
    };

    // Fonctionnalité de zoom
    let zoomLevel = 1;
    document.getElementById('zoom-in').onclick = () => {
        zoomLevel = Math.min(zoomLevel + 0.5, 3);
        scene.camera.el.setAttribute('zoom', zoomLevel);
    };
    document.getElementById('zoom-out').onclick = () => {
        zoomLevel = Math.max(zoomLevel - 0.5, 0.5);
        scene.camera.el.setAttribute('zoom', zoomLevel);
    };
};
