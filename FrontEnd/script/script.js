// Page d'accueil, affichage dynamique des projets

const isLogged=Boolean(sessionStorage.getItem("token"))
console.log("isLogged",isLogged)


let selectedCategory = null;
// Par défaut, on affiche tous les projets, donc pas de catégorie (null)

const fetchPictures = async () => {
  const response = await fetch('http://localhost:5678/api/works');

  const data = await response.json();

  return data;
}
// Fetch va chercher les éléments sur l'API.
// Await demande d'attendre la réponse de l'API avant d'appliquer le reste du code

const fetchCategories = async () => {
  const response = await fetch('http://localhost:5678/api/categories');

  const data = await response.json();

  return data;
}

const filterPicturesByCategory = async (category = null) => {
  const pictures = await fetchPictures();

  if (!category) {
    return pictures;
  }
  // Il faut afficher les catégories en cliquant sur les boutons

  const filteredPictures = pictures.filter((picture) => picture.categoryId === category);

  return filteredPictures;
}

const displayImagesInGallery = async () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  const data = await filterPicturesByCategory(selectedCategory);

  data.forEach((picture) => {
    const container = document.createElement('figure');
    container.id = picture.id;

    const image = document.createElement('img');
    image.src = picture.imageUrl;
    image.alt = picture.title;

    const title = document.createElement('figcaption');
    title.textContent = picture.title;

    container.appendChild(image);
    container.appendChild(title);
    gallery.appendChild(container);
  })
}

// bouton : premier bouton applique le selectedCategory à null et le texte de celui-ci sera "Tous". 
// Les autres auront le nom de la catégorie et si sélectionné le selectedCategory sera l'id de la catégorie
// Dès qu'un bouton est cliqué on change la variable selectedCategory par l'id de la catégorie sélectionnée
//  et on appelle la fonction displayImagesInGallery
// Catégories : 1. Objets 2. Appartements 3. Hôtels & restaurants

const displayCategoryFilters = async () => {
  const categories = await fetchCategories();
  const filtersContainer = document.getElementById('filters');

  filtersContainer.innerHTML = '';

  // on crée un bouton qui sera le premier (title: Tous, => selectedCategory: null)
  const allCategoryButton = document.createElement('button');
  allCategoryButton.textContent = 'Tous';
  allCategoryButton.classList.add('bouton-filtre'); // Ajoutez la classe CSS spécifique du bouton ici
  allCategoryButton.classList.add('bouton-filtre-active'); // Ajoutez la classe spécifique du bouton ici
  allCategoryButton.addEventListener('click', () => {
    selectedCategory = null;
    displayImagesInGallery();
  })

  filtersContainer.appendChild(allCategoryButton);

  // on crée un bouton pour chaque catégorie / chaque bouton aura un addEventListener sur le click
  categories.forEach((category) => {
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category.name;
    categoryButton.classList.add('bouton-filtre'); // on associe la classe CSS liée aux boutons pour qu'ils s'affichent correctement
  
    
    categoryButton.addEventListener('click', () => {
      selectedCategory = category.id;
      displayImagesInGallery();
    })

    filtersContainer.appendChild(categoryButton);
  })

  // On récupère tous les boutons filtres créés précédemment (grâce à la classe CSS)
  const filterButtons = document.querySelectorAll('.bouton-filtre');

  // On boucle tous les boutons filtres et on ajoute un évènement click sur chacun d'eux
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // On stock le bouton sur lequel on vient de cliquer dans la variable buttonToActive
      const buttonToActive = button;

      // On boucle tous les boutons filtres et on désactive tous les boutons sauf celui sur lequel on vient de cliquer
      filterButtons.forEach((filterButton) => {
        if (filterButton !== buttonToActive) {
          filterButton.classList.remove('bouton-filtre-active');
        } else {
          filterButton.classList.add('bouton-filtre-active');
        }
      });
    });
  });
}



const init = () => {
  displayCategoryFilters();
  displayImagesInGallery();
}

init();