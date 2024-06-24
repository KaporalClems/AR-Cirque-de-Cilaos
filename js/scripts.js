document.addEventListener('DOMContentLoaded', function () {
    const sommets = [
        { id: 'piton-des-neiges', info: 'Piton des Neiges : Le point culminant de La Réunion avec une altitude de 3 070 mètres.' },
        { id: 'grand-benare', info: 'Grand Bénare : Un des plus hauts sommets de La Réunion avec une altitude de 2 896 mètres.' },
        { id: 'col-taibit', info: 'Col du Taïbit : Un col de montagne situé dans le massif de La Réunion, culminant à 2 081 mètres.' },
        { id: 'petit-benare', info: 'Petit Bénare : Une montagne à La Réunion avec une altitude de 2 600 mètres.' },
        { id: 'trois-salazes', info: 'Les Trois Salazes : Trois pics rocheux emblématiques de La Réunion avec une altitude de 2 132 mètres.' },
        { id: 'gros-morne', info: 'Gros Morne : Un sommet situé dans le massif de La Réunion, culminant à 3 019 mètres.' },
        { id: 'kerveguen', info: 'Côteaux de Kerveguen : Un sommet de La Réunion avec une altitude de 2 206 mètres.' },
        { id: 'bonnet-pretre', info: 'Le Bonnet de Prêtre : Un sommet caractéristique de La Réunion avec une altitude de 1 710 mètres.' },
        { id: 'roche-merveilleuse', info: 'La Roche Merveilleuse : Un site panoramique populaire à La Réunion, culminant à 1 435 mètres.' },
        { id: 'tete-chien', info: 'La Tête de Chien : Un sommet particulier de La Réunion, culminant à 2 207 mètres.' },
        { id: 'fenetre-makes', info: 'La Fenêtre des Makes : Un site d’observation offrant une vue imprenable sur le cirque de Cilaos, avec une altitude de 1 587 mètres.' },
        { id: 'dent', info: 'La Dent : Un sommet avec une altitude de 3 200 mètres.' },
        { id: 'tour-grand-saisissement', info: 'Tour du Grand Saisissement : Un sommet avec une altitude de 3 013 mètres.' },
        { id: 'pic-oeuf', info: 'Pic de l\'Oeuf : Un sommet avec une altitude de 2 958 mètres.' },
        { id: 'refuge-caverne-dufour', info: 'Refuge de la Caverne Dufour : Un refuge de montagne situé à une altitude de 2 478 mètres.' },
        { id: 'coteaux-kerveguen', info: 'Côteaux de Kerveguen : Un sommet avec une altitude de 2 206 mètres.' },
        { id: 'piton-bethoune', info: 'Piton Béthoune : Un sommet avec une altitude de 1 613 mètres.' },
        { id: 'tete-chien', info: 'La Tête de Chien : Un sommet particulier de La Réunion, culminant à 2 207 mètres.' },
        { id: 'fenetre-makes', info: 'La Fenêtre des Makes : Un site d’observation offrant une vue imprenable sur le cirque de Cilaos, avec une altitude de 1 587 mètres.' },
        { id: 'ilet-a-cordes', info: 'Ilet à Cordes : Un écart de Cilaos avec une altitude de 1 204 mètres.' },
        { id: 'cilaos', info: 'Cilaos : Une commune située à une altitude de 1 200 mètres.' },
        { id: 'bras-sec', info: 'Bras Sec : Un écart de Cilaos avec une altitude de 1 200 mètres.' },
        { id: 'palmiste-rouge', info: 'Palmiste Rouge : Un écart de Cilaos avec une altitude de 1 240 mètres.' },
    
    AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    var needle = document.getElementById('compass-needle');
    var camera = this.el;
    var rotation = camera.getAttribute('rotation').y;
    needle.setAttribute('rotation', {x: 0, y: 0, z: -rotation});
  }
});
    ];

    sommets.forEach(sommet => {
        const element = document.querySelector(`#${sommet.id}`);
        element.addEventListener('click', function () {
            showInfoBox(sommet.info);
        });
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
