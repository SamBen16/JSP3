import { seConnecter } from "./login.js";

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
  const gallery = document.querySelector('.gallery');
  seConnecter()
  //ajout array
  const galleryArray = [];

  const categoriesList = []
  // const categoriesList = new Set();

  // création figure avec une boucle forEach
  data.forEach(element => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figcaption = document.createElement('figcaption');
  // const categoryElement = document.createElement('category')
  img.src = element.imageUrl;
  img.alt = element.title;

  

  // figure.setAttribute("id", )
  // categoryElement.innerText = element.category.name
  //categoryElement.style.display = "none"
  // categoriesList.add(element.category.name);
  // console.log(figure)
  galleryArray.push({
    figure: figure,
    category: element.category.name
  }); 
  figure.setAttribute("id", element.category.name);

		gallery.appendChild(figure);
		figure.appendChild(img);
		figure.appendChild(figcaption);
    // figure.appendChild(categoryElement);
  });
  // console.log(categoriesList)

    const buttons = document.querySelector(".buttons")


    const buttonTous = document.createElement("button")

    //BOUTON TOUS //
    buttonTous.setAttribute("type", "button");
    buttonTous.setAttribute("id", "tous")
    console.log(buttonTous);
    buttonTous.innerText = "Tous";
    buttons.appendChild(buttonTous);
    buttonTous.addEventListener('click', function() {
      //Affiche tous les éléments
      galleryArray.forEach(item => {
        item.figure.style.display = "block";
      });
    });
     
    // LES AUTRES BOUTONS AVEC UNE BOUCLE//
    for (let i = 0; i < 3; i++) {
      
      const button = document.createElement("button");
      buttons.appendChild(button);
      button.setAttribute("type", "button");
      button.setAttribute("id", galleryArray[i].figure.id)
      const buttonID = button.innerText = galleryArray[i].figure.getAttribute("id");
      // const categoryElement = element.category.name;
      button.addEventListener('click', function() {
       galleryArray.filter(function(categoryElement) {
         console.log(categoryElement.category === buttonID);
            if (categoryElement.category !== buttonID) {
              categoryElement.figure.style.display = "none";
             }
        })
        });
      console.log(button)


    }

        //BOUTON OBJET //

    // const buttonObjet  = document.createElement("button")
    // buttonObjet.setAttribute("type", "button");
    // buttonObjet.setAttribute("id", "objet")
    // buttonObjet.innerText = "Objets";
    // buttons.appendChild(buttonObjet);
    // console.log(buttonObjet)
    // buttonObjet.addEventListener('click', function() {
    //   galleryArray.filter(function(categoryElement) {
    //     console.log(categoryElement.category === "Objets");
    //        if (categoryElement.category !== "Objets") {
    //          categoryElement.figure.style.display = "none";
    //        }
    //    })
      
    // });


    // const buttonAppartement  = document.createElement("button")
    // buttonAppartement.setAttribute("type", "button");
    // buttonAppartement.setAttribute("id", "appartement")
    // buttonAppartement.innerText = "Appartements";
    // buttons.appendChild(buttonAppartement);
    // buttonAppartement.addEventListener('click', function() {
    //   const filteredAppartements = galleryArray.filter(item => item.category.toLowerCase() === "appartements");
    //   galleryArray.forEach(item => {
    //     item.figure.style.display = filteredAppartements.includes(item) ? "block" : "none";
    //   });
    // });

    
    // const buttonHotel = document.createElement("button")
    // buttonHotel.setAttribute("type", "button");
    // buttonHotel.setAttribute("id", "hotel")
    // buttonHotel.innerText = "Hôtels & restaurants";
    // buttons.appendChild(buttonHotel);
    //COMMENTAIRE

    //   for (let categoryElement of categoriesList) {
    //     console.log(categoryElement);
    // } });

    // buttonHotel.addEventListener('click', function() {
    //   galleryArray.filter(function(categoryElement) {
    //    console.log(categoryElement.category === "Hotels & restaurants");
    //       if (categoryElement.category !== "Hotels & restaurants") {
    //         categoryElement.figure.style.display = "none";
    //       }
    //       console.log(categoryElement.category === "Hotels & restaurants");
  
    //   }
    // )})

    })

  		.catch(error => console.error(error));

     
