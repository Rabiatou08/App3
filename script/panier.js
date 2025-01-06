// Récupérez l'élément du panier par son ID
var cartItemElement = document.getElementById('cartItem');

// Initialisation du panier (s'il n'existe pas déjà)
var panier = chargerPanier();

// Fonction pour mettre à jour le total
function mettreAJourTotal() {
    var total = 0;

    panier.forEach(function (produit) {
        total += produit.prix;
    });

    var totalElement = document.getElementById('total');
    totalElement.innerText = total + ' FCFA';
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nomProduit, prixProduit) {
    var produit = {
        nom: nomProduit,
        prix: prixProduit
    };

    // Ajoutez le produit au panier
    panier.push(produit);

    // Mise à jour du panier dans le stockage local
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettez à jour l'affichage du panier
    mettreAJourAffichagePanier(panier);

    // Affichez un message dans la console pour vérifier que la fonction est appelée
    console.log('Produit ajouté au panier:', produit);
}


// Fonction pour mettre à jour l'affichage du panier
function mettreAJourAffichagePanier(panier) {
    var totalElement = document.getElementById('total');
    var cartItemElement = document.getElementById('cartItem');

    if (panier.length === 0) {
        cartItemElement.innerHTML = 'Votre panier est vide';
        totalElement.innerText = '0 FCFA';
    } else {
        var html = '<ul>';
        var total = 0;

        panier.forEach(function (produit) {
            html += `
                <li>
                    ${produit.nom} - ${produit.prix} FCFA
                    <a href="#" class="removeLink" onclick="retirerDuPanier('${produit.nom}')" style="color:red;">Retirer</a>
                </li>
            `;
            total += produit.prix;
        });

        html += '</ul>';
        cartItemElement.innerHTML = html;
        totalElement.innerText = total + ' FCFA';
    }
}

// Fonction pour générer dynamiquement les éléments du panier dans la section de paiement
function genererElementsPanier() {
    var cartItemElement = document.getElementById('cartItem');
    var totalElement = document.getElementById('total');

    // Vérifiez s'il y a des éléments dans le panier
    if (panier.length === 0) {
        cartItemElement.innerHTML = 'Votre panier est vide';
        totalElement.innerText = '0 FCFA';
    } else {
        var html = '<ul>';
        var total = 0;

        panier.forEach(function (produit) {
            html += `
                <li>
                    ${produit.nom} - ${produit.prix} FCFA
                    <a href="#" class="removeLink" onclick="retirerDuPanier('${produit.nom}')" style="color:red;">Retirer</a>
                </li>
            `;
            total += produit.prix;
        });

        html += '</ul>';
        cartItemElement.innerHTML = html;
        totalElement.innerText = total + ' FCFA';
    }
}

// Mettez à jour l'affichage du panier dans la section de paiement lors du chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    panier = chargerPanier();
    mettreAJourAffichagePanier(panier);
    genererElementsPanier();
});

// Fonction pour vider le panier
function viderPanier() {
    panier = [];
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettez à jour l'affichage du panier
    mettreAJourAffichagePanier(panier);
}

// Mettez à jour l'affichage du panier lors du chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    panier = chargerPanier();
    mettreAJourAffichagePanier(panier);
});

// Fonction pour retirer un produit du panier
function retirerDuPanier(nomProduit) {
    // Recherchez l'index du produit dans le panier
    var index = -1;
    for (var i = 0; i < panier.length; i++) {
        if (panier[i].nom === nomProduit) {
            index = i;
            break;
        }
    }

    // Si le produit est trouvé, retirez-le du panier
    if (index !== -1) {
        panier.splice(index, 1);

        // Mise à jour du panier dans le stockage local
        localStorage.setItem('panier', JSON.stringify(panier));

        // Mettez à jour l'affichage du panier
        mettreAJourAffichagePanier(panier);
    }
}

// Fonction pour charger le panier depuis le stockage local
function chargerPanier() {
    var panier = localStorage.getItem('panier');
    if (!panier) {
        panier = [];
    } else {
        panier = JSON.parse(panier);
    }
    return panier;
}
