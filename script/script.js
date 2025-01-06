// Ajoutez cette fonction à votre script JavaScript existant
function chargerImagesProduit(nomProduit, cheminsMiniatures) {
    var imgDetails = document.querySelector('.img_details');
    var imgMain = document.getElementById('mainImage');

    // Effacez les images existantes
    imgDetails.innerHTML = "";

    // Chargez les nouvelles images
    cheminsMiniatures.forEach(function (cheminMiniature) {
        var lienImage = document.createElement('a');
        var imgElement = document.createElement('img');

        lienImage.href = cheminMiniature;
        imgElement.src = cheminMiniature;
        imgElement.alt = nomProduit;
        imgElement.className = 'det';

        // Ajoutez un gestionnaire d'événements pour changer l'image principale lors du clic sur la miniature
        lienImage.addEventListener('click', function (event) {
            event.preventDefault();
            imgMain.src = imgElement.src;  // Mettez à jour l'image principale avec le chemin de la miniature
        });

        lienImage.appendChild(imgElement);
        imgDetails.appendChild(lienImage);
    });

    // Assurez-vous que la première image est également définie comme image principale
    if (cheminsMiniatures.length > 0) {
        imgMain.src = cheminsMiniatures[0];
    }
}

// Ajoutez cette fonction pour afficher les détails du produit
function afficherDetailsProduit(nomProduit, cheminsMiniatures) {

    // Affichez les détails du produit
    document.getElementById('nomProduit').innerText = nomProduit;
    document.getElementById('prixProduit').innerText = detailsProduit[nomProduit].prix + " F";
    document.getElementById('descriptionProduit').innerText = detailsProduit[nomProduit].description;
    document.getElementById('categorieProduit').innerText = detailsProduit[nomProduit].categorie;
    document.getElementById('producteurProduit').innerText = detailsProduit[nomProduit].producteur;
    document.getElementById('dureeProduit').innerText = detailsProduit[nomProduit].duree;

    // Chargez les images du produit (saisie manuelle des chemins)
    chargerImagesProduit(nomProduit, cheminsMiniatures);
}

// Utilisez la fonction pour charger les images de chaque produit
document.addEventListener('DOMContentLoaded', function () {
    function getParams() {
        var params = {};
        var search = window.location.search.substring(1);
        var pairs = search.split("&");

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            params[pair[0]] = decodeURIComponent(pair[1]);
        }

        return params;
    }

    function afficherDetailsProduit() {
        var params = getParams();

        document.getElementById('nomProduit').innerText = params.nom || 'Nom du produit';
        document.getElementById('prixProduit').innerText = params.prix ? params.prix + ' F' : 'Prix';
        document.getElementById('descriptionProduit').innerText = params.description || 'Description du produit';
        document.getElementById('categorieProduit').innerText = params.categorie || 'Catégorie';
        document.getElementById('producteurProduit').innerText = params.producteur || 'Nom du producteur';
        document.getElementById('dureeProduit').innerText = params.duree || 'Durée';

        var mainImage = document.getElementById('mainImage');
        mainImage.src = params.image || 'img/default.jpg';  // Utilisez l'image par défaut si aucune image spécifiée
        mainImage.alt = params.nom || 'Nom du produit';
    }

    afficherDetailsProduit();
});


// Ajoutez cette fonction pour extraire les informations du produit à partir du code HTML
function extraireDetailsProduitDeHTML() {
    var nomProduit = document.getElementById('nomProduit').innerText;
    var cheminsMiniatures = [];

    // Saisissez manuellement les chemins des miniatures pour chaque produit
    for (var i = 1; i <= 3; i++) {
        cheminsMiniatures.push(`chemin${i}.jpg`);
    }

    // Appelez la fonction afficherDetailsProduit pour afficher les détails
    afficherDetailsProduit(nomProduit, cheminsMiniatures);
}

// Appelez la fonction extraireDetailsProduitDeHTML lors du chargement de la page
document.addEventListener('DOMContentLoaded', extraireDetailsProduitDeHTML);
