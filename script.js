/* =========================================================
   CarbonTrack_TN – JavaScript (sprint "Lancement du site web")
   ========================================================= */

/* ---------------------------------------------------------
   CTT-3 / CTT-35 : menu burger sur mobile
   --------------------------------------------------------- */
const boutonMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Clic sur le burger : on ajoute ou on retire la classe "ouvert"
boutonMenu.addEventListener("click", function () {
  const estOuvert = menu.classList.toggle("ouvert");
  boutonMenu.setAttribute("aria-expanded", estOuvert);
  boutonMenu.textContent = estOuvert ? "✕" : "☰";
});

// Clic sur un lien du menu : on referme le menu (utile sur mobile)
menu.querySelectorAll("a").forEach(function (lien) {
  lien.addEventListener("click", function () {
    menu.classList.remove("ouvert");
    boutonMenu.setAttribute("aria-expanded", "false");
    boutonMenu.textContent = "☰";
  });
});

/* ---------------------------------------------------------
   CTT-4 / CTT-37 : formulaire de contact
   --------------------------------------------------------- */
const formulaire = document.getElementById("form-contact");
const confirmation = document.getElementById("confirmation");

// Affiche (ou efface) le message d'erreur sous un champ
function afficherErreur(champ, message) {
  document.getElementById("erreur-" + champ.id).textContent = message;
  champ.classList.toggle("invalide", message !== "");
}

// Format d'email : texte@texte.extension
function emailValide(valeur) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur);
}

// Vérifie les trois champs. Renvoie true si tout est correct.
function verifierFormulaire() {
  const nom = formulaire.elements["nom"];
  const email = formulaire.elements["email"];
  const message = formulaire.elements["message"];
  let toutEstValide = true;

  if (nom.value.trim().length < 2) {
    afficherErreur(nom, "Veuillez saisir votre nom (2 caractères minimum).");
    toutEstValide = false;
  } else {
    afficherErreur(nom, "");
  }

  if (email.value.trim() === "") {
    afficherErreur(email, "Veuillez saisir votre adresse email.");
    toutEstValide = false;
  } else if (!emailValide(email.value.trim())) {
    afficherErreur(email, "Adresse email invalide (exemple : nom@domaine.tn).");
    toutEstValide = false;
  } else {
    afficherErreur(email, "");
  }

  if (message.value.trim().length < 10) {
    afficherErreur(message, "Votre message doit contenir au moins 10 caractères.");
    toutEstValide = false;
  } else {
    afficherErreur(message, "");
  }

  return toutEstValide;
}

// Envoi du formulaire
formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault(); // empêche le rechargement de la page

  if (verifierFormulaire()) {
    // Message de confirmation (CTT-37 : afficher le message de confirmation)
    const prenomOuNom = formulaire.elements["nom"].value.trim();
    confirmation.textContent =
      "Merci " + prenomOuNom + " ! Votre message a bien été reçu. " +
      "Notre équipe vous répondra sous 48 heures.";
    confirmation.hidden = false;
    formulaire.reset();
  } else {
    confirmation.hidden = true;
  }
});
