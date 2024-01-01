var modalAjout = document.getElementById('modalAjout');
var ajoutPhoto = document.getElementById('ajoutPhoto');
var imageInput = document.getElementById('imageInput');
var inputTitle = document.getElementById('inputTitle');
var inputCategory = document.getElementById('inputCategory');
var galleryArray = [];

const flecheRetourEnArriere = document.getElementById('flecheRetourEnArriere');
flecheRetourEnArriere.addEventListener('click', function() {
  window.location.href= 'index.html';
});
var ajouterUneFigure = document.getElementById('ajouterUneFigure');
ajouterUneFigure.addEventListener('click', function() {
  // event.preventDefault();

  // var formData = new FormData(event.target);

  var imageInput = document.getElementById('imageInput').value;
  var inputTitle = document.getElementById('inputTitle').value;
  var inputCategory = document.getElementById('inputCategory').value;

  console.log(inputTitle, imageInput, inputCategory);

  galleryArray.push({
    imageUrl: URL.createObjectURL(imageInput),
    title: inputTitle,
    category: inputCategory
  });

  document.getElementById('ajouterUneFigure').reset();
});

function telechargerImage() {
  var inputElement = document.getElementById('imageInput');
  var imagePreview = document.getElementById('imagePreview');

  // Vérifier si un fichier a été sélectionné
  if (inputElement.files.length > 0) {
      var imageFile = inputElement.files[0];

      // Mise à jour de la source de l'image avec l'objet File
      imagePreview.src = URL.createObjectURL(imageFile);

      galleryArray.push({
      imageUrl: imagePreview.src
    });
  }

}

var imageInput = document.getElementById('imageInput');
var ajoutPhoto = document.getElementById('ajoutPhoto');

ajoutPhoto.addEventListener('click', function() {
  // Déclenchez le clic sur le sélecteur de fichier
  imageInput.click();
});

// Ajoutez un écouteur d'événements pour réagir lorsque l'utilisateur sélectionne une image
imageInput.addEventListener('change', function() {
  telechargerImage();
});


fetch('http://localhost:5678/api/works')

  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');
   // const galleryModal = document.querySelector('.galleryModal');
 
    console.log(data);

    // Ajout array
    const galleryArray = [];
    const categoriesList = new Set();

    // Création figure 
    data.forEach(element => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
      //const imgModal = document.createElement('imgModal');
      //imgModal.src = element.title;
      img.src = element.imageUrl;
      img.alt = element.title;
      figcaption.innerText = element.title;

      const category = element.category.name;
      console.log(categoriesList.add(category));

      galleryArray.push({
        figure: figure,
        category: category,
        title: element.title,  // Ajoutez le titre
        imageUrl: element.imageUrl 
      });

      figure.setAttribute("id", category);
      //console.log(category);

      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      // galleryModal.appendChild(imgModal);
      
    });

   
    const buttons = document.querySelector(".buttons");

    // BOUTON TOUS //
    const buttonTous = document.createElement("button");
    buttonTous.setAttribute("type", "button");
    buttonTous.setAttribute("id", "tous");
    buttonTous.innerText = "Tous";
    buttons.appendChild(buttonTous);
    buttonTous.addEventListener('click', function () {
      // Affiche tous les éléments
      galleryArray.forEach(item => {
        item.figure.style.display = "block";
      });
    });

    // LES AUTRES BOUTONS AVEC UNE BOUCLE//
    categoriesList.forEach(category => {
      const button = document.createElement("button");
      buttons.appendChild(button);
      button.setAttribute("type", "button");
      button.setAttribute("id", category);
      button.innerText = category;

      button.addEventListener('click', function () {
        galleryArray.forEach(item => {
          item.figure.style.display = item.category === category ? "block" : "none";
        });
      });
    });

    const logoutLien = document.querySelector("#logoutId");
    logoutLien.addEventListener("click", function () {
      localStorage.clear();
    });

    // concernant la connexion
    // Récupère info de connexion depuis le localStorage
    const isConnected = localStorage.getItem('connection');
    console.log(isConnected);
    //const gallery = document.querySelector('.gallery');
    if (isConnected == 'true') {
      document.querySelector("#loginId").style.display = "none";
      document.querySelector("#logoutId").style.display = "block";
        document.querySelector("#boutonModal").style.display = "block";
        document.querySelector("#modifierDiv").style.display = "block";
        console.log(gallery);
        

    } else {
      document.querySelector("#loginId").style.display = "block";
      document.querySelector("#logoutId").style.display = "none";
    };

    
    // MODAL AFFICHAGE LISTE PHOTO AVEC CORBEILLE ET SUPPRESSION DE LA PHOTO
      const boutonModal = document.getElementById("boutonModal");
      const modal = document.getElementById("modal1");
      const fermerModal = document.getElementById("fermerModal");
      
      boutonModal.addEventListener("click", function() {
        console.log("reussi");
        const galleryModal = document.querySelector(".galleryModal");

        data.forEach(element => {
         
          const figureModal = document.createElement('figure');
          const imgModal = document.createElement('img');
          const deleteImg = document.createElement('i');

          imgModal.src = element.imageUrl;

          imgModal.alt = element.title;
          
          
          figureModal.classList.add('gallery-item');
          deleteImg.classList.add('fas', 'fa-trash-alt');
          figureModal.style.position = 'relative';
          deleteImg.style.position = 'absolute';
          deleteImg.style.top = '6px';
          deleteImg.style.right = '6px';
          deleteImg.style.zIndex = '1';
          deleteImg.style.opacity = '1';
          deleteImg.style.border = '2px solid black';
          deleteImg.style.backgroundColor = "black";
          deleteImg.style.color = "white";

     

          figureModal.appendChild(deleteImg);
          figureModal.appendChild(imgModal);
          galleryModal.appendChild(figureModal);

          deleteImg.addEventListener('click', function() {
            figureModal.remove();
            console.log("supprimé");
          });             
        });

        modal.style.display = "block";

        const boutonAjoutPhoto = document.getElementById('boutonAjoutPhoto');
        boutonAjoutPhoto.addEventListener('click', function() {
          const modalAjout = document.getElementById('modalAjout');
         // const galleryModal = document.querySelector('.galleryModal');
          // modal.style.display  = "none";
         galleryModal.innerHTML = "";
          modalAjout.style.display = "block";
          console.log("ajouter");
          
        });
      });

      // fermeture modal avec la croix
      fermerModal.addEventListener("click", function() {
        const modalAjout = document.getElementById('modalAjout');
        console.log("fermer");
        modal.style.display = "none";
      });

      // fermeture modal Ajout avec la croix
      fermerModalAjout.addEventListener("click", function() {
        modalAjout.style.display = "none";
      });
      
      // var ajouterUneFigure = document.getElementById('ajouterUneFigure');
      // ajouterUneFigure.addEventListener('click', function() {
      //   console.log('ajoutunephoto');
      //   galleryArray.push()
      // });


      
  })

  .catch(error => console.error(error));
