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


// Fonction pour récupérer les données des images depuis l'API
function getImagesFromAPI() {
  // Effectuer une requête à l'API pour récupérer les données des images
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      // Appeler la fonction pour afficher les images dans la modale
      afficherImagesDansModale(data);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des images depuis l'API : ", error);
    });
}

// Exécutez la fonction pour récupérer les données des images depuis l'API et afficher les images dans la modale
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

    // Ajouter l'événement de clic à l'icône corbeille
    deleteIcon.addEventListener("click", () => {
      // exécuter requête delete avec image.id
      // récupérer travaux (refresh des données) pour actualiser les données: displayImagesInGallery() + getImagesFromAPI()
      imageContainer.remove(); // Supprimer l'élément du DOM uniquement, pas de l'API. L'image réapparaît au rechargement de la page.
    });


    galerieContainer.appendChild(imageContainer);
  });
}


// Afficher la modale Ajout Photo

document.addEventListener('DOMContentLoaded', function () {

  // Sélection du bouton "Ajouter une photo" dans la modale Galerie photo
  const addPhotoBtn = document.getElementById('addPhotoBtn');
  const modalContainer = document.getElementById('modalContainer');
  const modalContainerForm = document.getElementById('modalContainerForm');

  // Variable boolean pour vérifier si la modale "Ajout photo" est affichée
  let isAddPhotoModalVisible = false;

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

  // querySelector sélectionne des classes, getElementById des id (sans  le #).
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

 fetchCategories().then((categories)=>{
  categories.forEach((category)=>{
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
inputPhoto.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
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

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire

  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const image = document.getElementById('inputPhoto').files[0]; // Récupérer le fichier image

  const formData = new FormData();
  formData.append('name', name);
  formData.append('category', category);
  formData.append('image', image);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Projet ajouté avec succès !', data);
  })
  .catch(error => {
    console.error("Erreur lors de l'ajout du projet :", error);
  });
});

  // Récupérez les données du formulaire dont vous avez besoin pour ajouter un projet au serveur
  // Utilisez les données pour effectuer une requête vers votre serveur afin d'ajouter le projet

  // Ajoutez ici le code pour effectuer la requête vers le serveur et ajouter le projet



/// Sélectionnez l'élément de balise d'entrée de type "file" pour les photos
// const photoInput = document.querySelector('#inputPhoto');
// const blocPhoto = document.querySelector('#blocPhoto');

// // Gestionnaire d'événements pour le changement de la sélection de fichier
// photoInput.addEventListener('change', (event) => {
//   handlePhotoUpload(event);
// });

// // Fonction pour gérer l'envoi de la photo
// function handlePhotoUpload(event) {
//   const file = event.target.files[0]; // Récupérer le fichier sélectionné

//   // Vérifier que l'utilisateur a sélectionné un fichier
//   if (file) {
//     // Créer une instance de FileReader
//     const reader = new FileReader();

//     // Lorsque la lecture du fichier est terminée
//     reader.onload = (event) => {
//       // Récupérer URL de données de l'image
//       const imageUrl = event.target.result;

//       // Mettre à jour la source de l'image dans le bloc photo
//       blocPhoto.setAttribute('src', imageUrl);
//     };

//     // Lire le contenu du fichier en tant qu'URL de données
//     reader.readAsDataURL(file);
//   }
// }



    // const formData = new FormData(); // Créer un objet formData pour envoyer le fichier

    // formData.append('photo', file); // Ajouter le fichier à l'objet formData avec la clé 'photo'

    // // Envoyer l'objet formData avec le fichier vers le serveur
    // fetch('http://localhost:5678/api/works', {
    //   method: 'POST',

    //   headers: {
    //     Authorization: `Bearer ${authToken}` // Inclure l'authentification avec le jeton d'accès
    //     },
    //   body: formData
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       // Gérer la réussite de l'envoi de la photo
    //       console.log('Photo envoyée avec succès');
    //     } else {
    //       // Gérer les erreurs lors de l'envoi de la photo
    //       console.log('Échec de l\'envoi de la photo');
    //     }
    //   })
    //   .catch(error => {
    //     // Gérer les erreurs lors de la requête d'envoi de la photo
    //     console.log('Erreur lors de l\'envoi de la photo :', error);
    //   });
