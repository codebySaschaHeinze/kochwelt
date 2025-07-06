const tdAmounts = document.getElementsByClassName("amount"); // tdAmounts wandelt die td´s "amount" in Konstante (um damit zu arbeiten)

function calculatePortion() {
  let inputValue = Number(document.getElementById("portionValue").value); // inputValue (hier erstellt) weiß nun, dass es den Wert der inpubox hat
  for (let i = 0; i < tdAmounts.length; i++) {
    // Wo fängt die "Sammlung" an zu zählen, Wie weit zählt sie, in welchen Schritten zählt sie
    let currentAmount = tdAmounts[i].dataset.default; // tdAmounts[i] ist die "Sammlung" aller td-Elemte in der Klasse "amount" und "dataset.default" rechnet immer mit dem Ursprungswert von "amount" (siehe td´s im html)
    let newValue = inputValue * currentAmount; // Die Variable "newValue" ergibt sich aus der Multiplikation des Wertes aus der Inputbox und dem Wert aus der entsprechenden forSchleifen-Sammlung
    tdAmounts[i].innerHTML = newValue; // newValue wird ins html übergeben
  }
  document.getElementById("portionValue").value = newValue; // Nach dem Klicken, zeigt die Inbox die aktuellen Portionen an
}

const ideas = [
  {
    title: "Meersalz vs. Jodsalz – was gehört in die Küche?",
    text: "Meersalz bringt oft eine feine, leicht mineralische Note mit und wird gern zum Nachwürzen genutzt – besonders bei einfachen, natürlichen Gerichten. Es wirkt etwas milder und macht sich gut auf Ofengemüse, Brot oder Salaten. Jodsalz schmeckt neutral, löst sich schnell auf und unterstützt die Schilddrüse – ein echtes Plus im Alltag. Wer regelmäßig kocht, greift meist automatisch zum Jodsalz. Geschmackliche Highlights setzt man aber oft mit Meersalz am Schluss.",
    image: "./img/salt.jpg",
  },
  {
    title: "Pfeffer: schwarz, weiß oder bunt?",
    text: "Schwarzer Pfeffer ist der Klassiker – scharf, aromatisch und vielseitig einsetzbar. Weißer Pfeffer wirkt etwas milder und passt gut zu hellen Soßen oder Fischgerichten. Grüner Pfeffer bringt eine frische Note, während roter eher selten und leicht fruchtig ist. Bunter Pfeffer ist meist eine Mischung und bringt optische Vielfalt. In der Küche lohnt sich je nach Gericht der gezielte Einsatz einzelner Sorten. Frisch gemahlen entfalten Pfefferkörner ihr volles Aroma am besten.",
    image: "./img/pepper.jpg",
  },
  {
    title: "Olivenöl oder Rapsöl – was wofür?",
    text: "Olivenöl ist fruchtig, intensiv und ideal für Salate, Antipasti oder mediterrane Gerichte. Es sollte nicht zu stark erhitzt werden, da sonst wertvolle Aromen verloren gehen. Rapsöl hingegen ist hitzebeständig, geschmacksneutraler und eignet sich hervorragend zum Braten. Auch aus gesundheitlicher Sicht punktet Rapsöl mit einem günstigen Fettsäureprofil. Wer auf Abwechslung setzt, hat beide Öle griffbereit – je nach Anwendung.",
    image: "./img/oil.jpg",
  },
];

let currentIdea = 0;

function showIdea(index) {
  const titleEl = document.getElementById("idea-title");
  const contentEl = document.getElementById("idea-content");
  if (!titleEl || !contentEl) return; // Abbrechen, wenn die Elemente fehlen

  titleEl.textContent = ideas[index].title;
  contentEl.innerHTML = `
    <p>${ideas[index].text}</p>
    <img src="${ideas[index].image}" alt="">
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  showIdea(currentIdea);
  setInterval(() => {
    currentIdea = (currentIdea + 1) % ideas.length;
    showIdea(currentIdea);
  }, 15000); // wechselt alle 15 Sekunden
});

function toggleMenu() {
  document.getElementById("menuButton").classList.toggle("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Verhindert das Standard-Absenden

      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          // Erfolgreich abgeschickt, jetzt weiterleiten
          window.location.href = "index.html?sent=1";
        })
        .catch((error) => {
          alert("Es gab ein Problem beim Absenden des Formulars.");
        });
    });
  }
});

if (new URLSearchParams(window.location.search).get("sent") === "1") {
  alert("Danke für deine Nachricht! 🙏 Wir melden uns bald bei dir.");
}
