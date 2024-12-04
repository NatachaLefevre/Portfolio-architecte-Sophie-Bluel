// Gestion de la page quand on est connecté (mode édition)

let isAdminConnected = false;

// Vérifier si l'utilisateur est connecté
if (sessionStorage.getItem('token')) {
  // L'utilisateur est connecté, afficher les éléments d'édition
  document.querySelector('#edition').style.display = 'block';
  document.querySelector('.modifier').style.display = 'block';
  // Afficher l'élément "logout"
  document.querySelector('.logout-button').style.display = 'block';
  // Masquer l'élément "login"
  document.querySelector('.login-button').style.display = 'none';

} else {
  // L'utilisateur n'est pas connecté, masquer les éléments d'édition
  document.querySelector('#edition').style.display = 'none';
  document.querySelector('.modifier').style.display = 'none';
  // Masquer l'élément "logout"
  document.querySelector('.logout-button').style.display = 'none';
  // Afficher l'élément "login"
  document.querySelector('.login-button').style.display = 'block';
}

// Sélection des boutons "Login" et "Logout"
const loginButton = document.querySelector('.login-button');
const logoutButton = document.querySelector('.logout-button');

// Gestionnaire d'événements pour le clic sur le bouton "Logout"
logoutButton.addEventListener('click', handleLogout);

// Fonction pour gérer le clic sur le bouton "Logout"
function handleLogout() {
  // Déconnecter l'administrateur (supprimer le token de session)
  sessionStorage.removeItem('token');

  // Recharger la page pour revenir à l'apparence initiale de la page d'accueil
  location.reload();
}