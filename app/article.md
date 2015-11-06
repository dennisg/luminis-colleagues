 Spot the technology
 ===
 
 

Deze keer wil ik Polymer onder de aandacht brengen. In 2013 is Google gestart met de ontwikkeling van deze nieuwe web library (geen framework). Eerder dit jaar werd tijdens de Google I/O in San Francisco Polymer 1.0 (production ready) aangekondigd. Polymer bouwt voort op nieuwe ontwikkelingen in HMTL5 browser-land: Shadow Dom, Templates, HTML Imports en Custom Elements. Wat polymer doet is een laagje over deze technologiën leggen om ervoor te zorgen dat het simpeler wordt deze nieuwe constructen te kunnen gebruiken en, waar nodig, een polyfill te introduceren daar waar de technologie nog niet native in de browser beschikbaar is...

Even de ontwikkelingen op een rijtje:

Shadow dom
---

Iedereen heeft er al wel eens mee te maken gehad: 

`<input type=”radio”>`

Dit lijkt een normaal HTML element maar ineens verschijnt in je browser een echte radio button! Een `<video/>` element doet uiteraard nog meer coole zaken op de achtergrond. Native (door de browser) wordt dit opgelost door een ‘shadow dom’ in de dom te genereren met daarin de HTML code voor de makeup voor dit element. Deze functionaliteit voor het aanmaken van een volledig ge-encapsuleerd document is nu dus door middel van shadow dom aan developers ontsloten.

Templates
---

`<template>`

Een nieuw element, toegevoegd aan de standaard set van elementen. Dit element maakt het mogelijk/ eenvoudig cloneable (en eerst nog onzichtbare en inactieve!) markup te laden, voor hergebruik later. Veel veiliger dan HTML uit een string halen…


HTML Imports
---


`<link rel=”import” href=”my-element.html”>`

Deze nieuwe functionaliteit zorgt ervoor dat je informatie of templates, gedefinieerd in andere HTML pagina’s, kunt laden (en vervolgens gebruiken) in je huidige pagina. Dit introduceert een soort van dependency-management. Erg handig als je een custom-element of template dat ergens anders gedefinieerd is wilt ‘inladen’ en gebruiken.  

Custom Elements
---


Dit geeft je de mogelijkheid de DOM te leren hoe een eigen gemaakt element eruit moet zien. Je kunt hiermee je eigen element registreren. Enige beperking is dat je nieuwe element een dash ( - ) moet bevatten. Dit, om later eventuele clashes met nieuwe ‘echte’ HTML elementen voor te zijn. 

In totaal kun je nu dus door middel van een template volledige HTML definieren, die te hergebruiken tijdens de registratie van een nieuw element en dat als geheel encapsuleren in een shadow dom. Enig probleem is natuurlijk de hoeveelheid javascript code die dat gaat opleveren om dit allemaal te verwezenlijken. Hier komt Polymer om de hoek: Polymer levert een standaard manier om nieuwe custom-elements te definieren en daarnaast ook allerlei hooks voor lifecycle management, events en data binding. Omdat de laag die Polymer om de ‘bare’ DOM en javascript legt erg dun is (zo dun mogelijk) is Polymer goed te combineren met andere populaire web frameworks. Het is dus niet een kwestie van ‘all or nothing’ en door de encapsulatie (ook de CSS!) wat mij betreft ‘OSGi for the Web’! Via bower zijn eerder gedefinieerde elementen eenvoudig je project in te trekken voor hergebruik. Door vervolgens alleen de daadwerkelijk gebruikte html files te ‘vulcanizen’, ofwel te concateneren naar een bestand voor productie is de laadtijd ook geoptimaliseerd, alhoewel dat met de opkomst van spdy en http/2 dat een steeds minder belangrijke factor wordt.

Voor Polymer zijn al vele verschillende custom elements gemaakt, onderverdeeld op basis van het periodieke systeem ([[1](https://elements.polymer-project.org/)]) onder verschillende typen elementen, waaronder de iron (Fe) elements en elementen die Google’s Material Design (Md) implementeren. Daarnaast staat het iedereen vrij om eigen componenten te implementeren en te publiceren, dus mocht je op zoek zijn naar een component dat je nodig hebt dan loont het om te zoeken. Let wel op: er zijn erg grote verschillen tussen de 0.5 versie en de bij Google I/O gereleasde 1.0 versie. 

De basis structuur voor het definieren van een eigen custom-element ziet er als volgt uit:

    <dom-module id=”my-element”>
    <template>
       <style>interne styling wordt hier gedefinieerd</style>
 	   <!-- stop hier je eigen DOM -->
    </template>
    <script>
	<!-- dit zorgt voor automatische registratie van het custom-element -->
	Polymer({
	   is=”my-element”,
	   properties {
   		//hier definieer je properties
	   },
     	//hier kun je in inhaken op o.a. lifecycle events
     	//en je eigen functies definieren

	})
	</script>
	</dom-module>

De kracht zit hem uiteraard in het goed designen van de verschillende custom elements, hun interactie met elkaar en hun verantwoordelijkheden. In september van dit jaar is het gehele Polymer team naar Amsterdam gekomen voor een uniek event: De eerste Polymer Summit en dat in onze hoofdstad! Alle sessies zijn opgenomen en zijn echt het bekijken waard ([[2](https://goo.gl/fXwkQl)]).

Mocht je geinteresseerd geraakt zijn dan is het natuurlijk altijd goed documentatie eens door te bladeren ([[3](https://www.polymer-project.org/1.0/)]). Daarnaast is er een Polymer Starter Kit ([4](https://goo.gl/m9Bo81)]), uiteraard gebaseerd op yo, bower en gulp. Support voor service workers (misschien een ander onderwerp voor de toekomst) is hierin ook geintegreerd. 

Je kunt als je wilt helemaal losgaan met Polymer en er je gehele website op baseren, maar je kunt er natuurlijk ook voor kiezen slechts voor een klein gedeelte van je site Polymer toe te passen. Zo hebben we bij Luminis Arnhem een overzicht van alle collega’s ([[5](https://arnhem.luminis.eu/mensen/)]] (ahum, een beetje verouderd..)). Veel herhaling, zou dat niet eenvoudig op te zetten zijn in Polymer ? Scheelt in bytes, laadtijd en kan natuurlijk door de andere kernen eenvoudig ook gebruikt worden! Waarom het wiel opnieuw uitvinden, toch ?

Daarvoor zullen we eerst de verschillende componenten moeten identificeren en hun verantwoordelijkheden. 

We verwachten een data object (in JSON) per medewerker met de volgende velden:

- name
- email (levert ook het plaatje op via gravatar)
- function (wat doet de medewerker zoal)

Niet veel voor nodig dus...

`<luminis-colleagues url=”arnhem.json”></luminis-colleagues>`

Zou dus voldoende kunnen zijn. 

Daarbinnen kunnen we nog een paar nieuwe componenten bedenken, 

eentje die de data laadt (ja, ook voor niet visuele taken is een element te bedenken)
een die elk item (een collega is nu gereduceerd tot een item) toont
een die het email adres van een ‘item’ automatisch omzet in een url naar een image
een die de beschrijving over de medewerker toont. Markdown lijkt me een goed formaat.

Het eindresultaat is te vinden op [[6](http://bright-crossbar-630.appspot.com/)], de source code op [[7](https://www.github.com/dennisg/luminis-colleagues/)]. Mocht je nodejs/ npm, yo, bower en gulp al op je systeem hebben staan dan voldoet:

`npm install && bower install && gulp serve`

Voor het installeren van een kopie op je eigen Google AppEngine volstaat:

`npm run deploy`



 



