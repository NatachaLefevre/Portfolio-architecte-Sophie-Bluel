// Vérifier l'état de connexion (ex: utilisateur connecté)
const estConnecte = true;

// Sélectionner le bouton "Modifier"
const boutonModifier = document.getElementById('openModalButton');

// Sélectionner la modale
const modale = document.getElementById('modalContainer');

// Sélectionner l'overlay et la croix dans la modale
const overlay = document.querySelector('.modal .modale-overlay');
const croix = document.querySelector('.modal .modale-close');

// Sélectionner la flèche Retour vers la Galerie Photo
const retourGalerie = document.querySelector('.modal .fa-solid')

// Variable boolean pour vérifier si la modale "Ajout photo" est affichée
let isAddPhotoModalVisible = false;


// Fonction pour afficher la modale Galerie Photo
function afficherModale() {
  modale.style.visibility = 'visible';
}

// Fonction pour masquer la modale Galerie Photo
function masquerModale() {
  modale.style.visibility = 'hidden';
}


// Ajouter un gestionnaire d'événements au clic sur le bouton "Modifier"
boutonModifier.addEventListener('click', () => {
  // Vérifier si l'utilisateur est connecté
  if (estConnecte) {
    afficherModale();
  }

  console.log("J'ai cliqué sur le bouton Modifier");

});


// Ajouter des gestionnaires d'événements pour masquer la modale lorsque l'utilisateur clique sur l'overlay ou la croix
overlay.addEventListener('click', masquerModale);
croix.addEventListener('click', masquerModale);


// Récupérer les données des images depuis l'API (toujours () après une fonction)
function getImagesFromAPI() {
  // Effectuer une requête à l'API pour récupérer les données des images
  fetch("https://portfolio-architecte-sophie-bluel-vft1.onrender.com/api/works")
    .then(response => response.json())
    .then(data => {
      // Appeler la fonction pour afficher les images dans la modale
      afficherImagesDansModale(data);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des images depuis l'API : ", error);
    });
}


// Récupérer les données des images depuis l'API et afficher les images dans la modale
getImagesFromAPI();

function afficherImagesDansModale(images) {
  const galerieContainer = document.querySelector(".modale-galerie");
  galerieContainer.innerHTML = "";

  images.forEach(image => {
    const imgElement = document.createElement("img");
    imgElement.src = image.imageUrl;
    imgElement.alt = image.title;

    // Création de l'icône corbeille
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can", "modale-corbeille");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.appendChild(imgElement);
    imageContainer.appendChild(deleteIcon);


    // Pour supprimer un projet

    const authToken = sessionStorage.getItem('token'); //Pour avoir l'autorisation de modifier les projets, et éviter une erreur 401

    // Ajouter l'événement de clic à l'icône corbeille
    deleteIcon.addEventListener("click", () => {
      fetch(`https://portfolio-architecte-sophie-bluel-vft1.onrender.com/api/works/${image.id}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${authToken}` // Utiliser le même authToken pour l'ajout de photos
          }
        })
        .then(response => {
          if (response.ok) {
            // Suppression réussie, on peut rafraîchir les données en appelant ces fonctions :
            displayImagesInGallery(); // Pour afficher les images de la galerie
            getImagesFromAPI(); // Pour récupérer les images depuis l'API
          } else {
            // Suppression échouée, gérer les erreurs si nécessaire
            console.log("La suppression de fichier a échoué");
          }
        })
    });

    galerieContainer.appendChild(imageContainer);
  });
}


// Afficher la modale Ajout Photo

document.addEventListener('DOMContentLoaded', function () {

  // Sélection du bouton "Ajouter une photo" dans la modale Galerie photo
  const addPhotoBtn = document.getElementById('addPhotoBtn');
  const modalContainerForm = document.getElementById('modalContainerForm');

  // Gestionnaire d'événements pour le clic sur le bouton "Ajouter une photo"
  addPhotoBtn.addEventListener('click', function () {
    // Vérifier si la modale "Ajout photo" est déjà affichée
    if (!isAddPhotoModalVisible) {

      // Masquer la modale "Galerie photo"
      masquerModale();
      // modalContainer.classList.add('hidden');

      // Afficher la modale "Ajout photo"
      modalContainerForm.classList.toggle('show');

      // Mettre à jour la variable isAddPhotoModalVisible
      isAddPhotoModalVisible = true;
    }

    console.log("Il se passe quelque chose quand je clique");

  });

  // Sélectionner l'overlay et la croix dans la modale Ajout Photo
  const overlayAjoutPhoto = document.querySelector('#modalContainerForm .modale-overlay');
  const croixAjoutPhoto = document.querySelector('#modalContainerForm .modale-close');
  // querySelector sélectionne des classes, getElementById des id (sans le #).
  // Ici, le lien est une classe dans une id, donc on met querySelector

  function masquerModaleForm() {
    // Supprimer la classe "show" de la modale "Ajout photo"
    modalContainerForm.classList.remove('show');

    // Mettre à jour la variable isAddPhotoModalVisible
    isAddPhotoModalVisible = false;
  }

  // Ajouter des gestionnaires d'événements pour masquer la modale lorsque l'utilisateur clique sur l'overlay ou la croix
  overlayAjoutPhoto.addEventListener('click', function () {
    masquerModaleForm();
    masquerModale();
  });

  croixAjoutPhoto.addEventListener('click', function () {
    masquerModaleForm();
    masquerModale();
  });

  // Retour vers la Galerie Photo en cliquant sur la flèche :
  retourGalerie.addEventListener('click', function () {
    afficherModale();
    masquerModaleForm();
  });

  // Autre méthode pour masquer les modales, en créant une nouvelle fonction :

  // function masquerModales() {
  //   masquerModaleForm();
  //   masquerModale();
  // }

  // overlayAjoutPhoto.addEventListener('click', masquerModales);
  // croixAjoutPhoto.addEventListener('click', masquerModales);


  // Autre méthode pour retour Galerie photo :

  // retourGalerie.addEventListener('click', afficherModale);
  // retourGalerie.addEventListener('click', masquerModaleForm);

});


// Catégories du formulaire via l'API

const formCategoriesSelect = document.querySelector('#category');
console.log(formCategoriesSelect);

fetchCategories().then((categories) => {
  categories.forEach((category) => {
    const optionElement = document.createElement("option")
    optionElement.value = category.id;
    optionElement.textContent = category.name;

    formCategoriesSelect.appendChild(optionElement);
  });
});


// Clic sur le bouton "+ ajouter photo" pour chercher la photo dans les fichiers utilisateur

// Référence à l'élément d'entrée de fichier
const inputPhoto = document.getElementById('inputPhoto');
const blocPhoto = document.getElementById('blocPhoto');
const blocBoutonTexte = document.querySelector('.blocBoutonTexte');

// Événement "change" sur l'élément d'entrée de fichier
inputPhoto.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const imageSrc = e.target.result;
    blocPhoto.style.backgroundImage = `url('${imageSrc}')`;
    blocPhoto.style.display = 'block'; // Afficher l'élément

    // Masquer les éléments de blocBoutonTexte
    blocBoutonTexte.style.display = 'none';
  };

  reader.readAsDataURL(file);
});


// Ajouter un projet dans le serveur via le formulaire

const form = document.querySelector('.modale-form');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire
  modalContainerForm.classList.toggle('show');
  isAddPhotoModalVisible = false;
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const image = document.getElementById('inputPhoto').files[0];
  const authToken = sessionStorage.getItem('token');

  // Créer un nouvel objet FormData et ajouter les champs du formulaire
  const formData = new FormData();
  formData.append('title', name);
  formData.append('category', category);
  formData.append('image', image);

  // Ajouter le token pour éviter une erreur 401
  const headers = {
    'Authorization': `Bearer ${authToken}`,
  };

  fetch('https://portfolio-architecte-sophie-bluel-vft1.onrender.com/api/works', {
    method: 'POST',
    headers: headers,
    body: formData
  })
    .then(response => {
      if (response.ok) {
        displayImagesInGallery(); // Appel de la fonction pour afficher la photo ajoutée
        getImagesFromAPI();
        return response.text();
      } else {
        throw new Error(`Erreur ${response.status} : ${response.statusText}`);
      }
    })
    .then(data => {
      // Vérifier si la réponse est un JSON valide
      try {
        document.getElementById('name').value = ''; // Pour revenir au formulaire initial
        document.getElementById('category').value = '';
        document.getElementById('inputPhoto').files = null;
        blocPhoto.style.display = 'none';
        blocBoutonTexte.style.display = 'flex';
        const jsonData = JSON.parse(data);
        console.log("Projet ajouté avec succès !", jsonData);
      } catch {
        console.error("Erreur : la réponse du serveur n\'est pas un JSON valide");
      }
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du projet :", error);
    });
});