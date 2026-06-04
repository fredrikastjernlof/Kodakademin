# Projektuppgift – Kodakademin 🎓

Detta repository innehåller en webbapplikation byggd med Angular som en del av kursen Programmering i TypeScript.

Applikationen föreställer ett fiktivt universitet, Kodakademin, där användaren kan utforska ett stort kursutbud, söka och filtrera bland kurser samt skapa ett eget ramschema för planering av framtida studier.

---

## Syfte 🏁

Syftet med projektet har varit att omsätta kunskaper från tidigare kursmoment i ett större sammanhängande projekt med Angular och TypeScript.

Fokus har legat på att:

* arbeta med Angular som ramverk
* hämta och presentera extern data från JSON
* använda komponenter och routing
* skapa och använda services
* lagra data i localStorage
* bygga ett responsivt användargränssnitt
* använda Angular Signals för reaktiv state-hantering

---

## Funktionalitet 🛠️

Applikationen innehåller följande funktioner:

### Startsida

* Presentation av Kodakademin
* Information om hur webbplatsen används
* Snabbnavigering till kurser och ramschema

### Kurssida

* Hämtning av kursdata från JSON-fil med HttpClient
* Sökning på kursnamn och kurskod
* Filtrering på ämne
* Sortering på:

  * kurskod
  * kursnamn
  * poäng
  * ämne
* Växling mellan stigande och fallande sortering
* Visning av antal träffar
* Möjlighet att välja antal kurser som visas
* Funktion för att visa fler eller färre kurser
* Direktlänk till respektive kursplan
* Utbyggd kurshantering med "Visa fler" och "Visa färre"
* Sammanfattning av valda kurser direkt på kurssidan

### Ramschema

* Lägga till kurser i eget ramschema
* Skydd mot dubbletter
* Ta bort kurser från ramschemat
* Summering av antal kurser
* Summering av totala högskolepoäng
* Lagring i localStorage
* Automatisk återladdning av sparat ramschema vid nytt besök

---

## Tekniker 🧩

Projektet är byggt med:

* Angular
* TypeScript
* HTML
* SCSS
* Angular Signals
* computed()
* HttpClient
* Angular Routing
* localStorage
* Git
* GitHub

---

## Projektstruktur och uppbyggnad 🧶

Projektet är uppdelat i komponenter, services och modeller för att skapa en tydlig struktur.

### Komponenter

#### Home

Startsidan för Kodakademin med information och navigering.

#### Courses

Visar kursutbudet och hanterar:

* sökning
* filtrering
* sortering
* visning av kursdata
* tillägg av kurser till ramschemat

#### Schedule

Visar användarens valda kurser och sammanställning av högskolepoäng.

#### Schedule Summary

En separat komponent som visar en sammanfattning av användarens valda kurser direkt på kurssidan.

#### Site Header

Ansvarar för navigering och mobilmeny.

#### Site Footer

Visar sidfot på samtliga sidor.

#### Not Found

Visas vid ogiltiga URL-adresser.

---

## Services 📦

### CourseService

Ansvarar för att läsa in kursdata från JSON-filen med hjälp av HttpClient.

### ScheduleService

Ansvarar för:

* lagring av valda kurser
* kontroll av dubbletter
* beräkning av högskolepoäng
* localStorage-hantering

---

## Lösning och implementation 📐

Applikationen är byggd med Angular Signals för state-hantering.

Signals används för att lagra:

* kursdata
* sökfras
* valt ämne
* sorteringsinställningar
* antal visade kurser
* användarens ramschema

Computed-signaler används för att skapa reaktiva beräkningar för:

* filtrerade kurser
* sorterade kurser
* synliga kurser
* totalpoäng
* sammanfattningar av ramschemat

När användaren ändrar sökord, filtrering eller sortering uppdateras gränssnittet automatiskt utan sidomladdning.

Valda kurser lagras i localStorage vilket gör att ramschemat finns kvar även om sidan uppdateras eller webbläsaren stängs.

Stor vikt har lagts vid responsiv design för att webbplatsen ska fungera på både mobil, surfplatta och dator.

---

## 🚀 Installation & körning

### 1. Klona repositoryt

```bash
git clone https://github.com/fredrikastjernlof/Kodakademin.git
```

### 2. Gå in i projektmappen

```bash
cd Kodakademin
```

### 3. Installera dependencies

```bash
npm install
```

### 4. Starta utvecklingsservern

```bash
ng serve
```

### 5. Bygg projektet

```bash
ng build
```

---

## Publicering 🌐


Webbplatsen är publicerad via Render:

[Öppna webbplats]()

---

## Det här tar jag med mig från projektet ✅

Detta projekt har gett mig en djupare förståelse för hur större Angular-applikationer struktureras och byggs upp.

Jag har bland annat arbetat med:

* Angular Signals
* computed()
* komponentbaserad arkitektur
* routing
* services
* HttpClient
* localStorage
* responsiv design
* tillgänglighet
* state-hantering

Projektet har också gett erfarenhet av att planera och utveckla en mer omfattande webbapplikation där flera delar behöver samverka för att skapa en bra användarupplevelse.
