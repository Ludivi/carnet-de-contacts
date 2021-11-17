/* Récupération des éléments du DOM */
let contactDiv = document.querySelector(".contactDiv");
let formulaireDiv = document.querySelector(".formulaireDiv");
let inputName = document.querySelector(".inputName");
let inputFirstName = document.querySelector(".inputFirstName");
let inputAge = document.querySelector(".inputAge");
let inputPhone = document.querySelector(".inputPhone");
let inputMail = document.querySelector(".inputMail");
let addButton = document.querySelector(".addButton");
let form = document.querySelector("#formContact");

// Création de la variable du localStorage
let contactArray = JSON.parse(localStorage.getItem("contacts"));

// Si le local storage est plein alors on appel la fonction showContact sinon on défini l'array à vide
if (contactArray) {
  showContact();
} else {
  contactArray = [];
}

/* Création de l'évenement au clique du bouton */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let data = new FormData(e.target);

  /* Création de la variable contact */
  var contact;

  if (data.get("type") == "Personnel") {
    /* Création d'un contact perso */
    contact = new ContactPerso(
      data.get("firstname"),
      data.get("lastname"),
      data.get("email"),
      data.get("phone"),
      data.get("type"),
      data.get("adress")
    );
  } else {
    /* Création d'un contact pro */
    contact = new ContactPro(
      data.get("firstname"),
      data.get("lastname"),
      data.get("email"),
      data.get("phone"),
      data.get("type"),
      data.get("company")
    );
  }

  contactArray.push(contact);
  console.log(contact);

  showContact();

  saveContact();
});

function showContact() {
  // Définir content en null
  let content = "";

  contactArray.forEach(function (contact) {
    if (contact.type == "Personnel") {
      console.log(contact);
      content += `
      <p>
          Prénom: ${contact.firstname}
          <br />
          Nom: ${contact.lastname}
          <br />
          Téléphone: ${contact.phone}
          <br />
          Email: ${contact.email}
          <br/>
          Adresse Perso: ${contact.adressPerso}
      </p>
      <button class="deleteButton"> Supprimer </button>
      `;
    } else {
      content += `
      <p>
          Prénom: ${contact.firstname}
          <br />
          Nom: ${contact.lastname}
          <br />
          Téléphone: ${contact.phone}
          <br />
          Email: ${contact.email}
          <br/>
          Adresse Entreprise: ${contact.adressPro}
      </p>
      <button class="deleteButton"> Supprimer </button>
      `;
    }

    contactDiv.innerHTML = content;
  });

  // Récupérer les button du DOM dans un tableaux
  let deleteButton = document.querySelectorAll(".deleteButton");

  // Création du forEach pour déclencher un évenement sur tout les boutons
  deleteButton.forEach(function (button, index) {
    // Création de l'addEventListener sur chaque bouton
    button.addEventListener("click", function () {
      // Suppression de l'élément du tableau
      contactArray.splice(index, 1);
      // Sauvegarde des nouvelles valeurs
      saveContact();
      // Re affichage des éléments
      showContact();
    });
  });
}

function saveContact() {
  const stringContacts = JSON.stringify(contactArray);
  localStorage.setItem("contacts", stringContacts);
}

/**
 * Fonction contructeur Contact
 */
function Contact(firstname, lastname, email, phone, type) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
  this.phone = phone;
  this.type = type;
}

/**
 * Function constructeur Contact Perso
 */

function ContactPerso(firstname, lastname, email, phone, type, adress) {
  Contact.call(this, firstname, lastname, email, phone, type);
  this.adress = adress;
}

/**
 * Fonction constructeur Contact Pro
 */
function ContactPro(firstname, lastname, email, phone, type, company) {
  Contact.call(this, firstname, lastname, email, phone, type);

  this.company = company;
}
