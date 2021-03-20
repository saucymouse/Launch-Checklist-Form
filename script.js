const form = document.getElementById("launchForm");
const pilotName = document.getElementById("pilotName");
const copilotName = document.getElementById("copilotName");
const fuelLevel = document.getElementById("fuelLevel");
const cargoMass = document.getElementById("cargoMass");

const pilotStatus = document.getElementById("pilotStatus");
const copilotStatus = document.getElementById("copilotStatus");
const fuelStatus = document.getElementById("fuelStatus");
const cargoStatus = document.getElementById("cargoStatus");
const faultyItems = document.getElementById("faultyItems");
const launchStatus = document.getElementById("launchStatus");
const missionTarget = document.getElementById("missionTarget");

getPlanet();

form.addEventListener("submit", event => {//does function order matter?
   event.preventDefault()
   
   if (validateInput()) {
      statusUpdate();
      validateMass();
      validateFuel();
      
   };

});

function validateInput() {

   const letters = /^[a-z][a-z\s]*$/;

   if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
      alert('All fields required!');
      return false;
   } 

   else if (!pilotName.value.trim().toLowerCase().match(letters) || !copilotName.value.trim().toLowerCase().match(letters)) {
      alert("Pilot names must be...names");
      return false;
   } 

   else {
      return true;
   }

};

function validateFuel() {

   if (fuelLevel.value < 10000) {
      alert("Fuel level too low. Must be equal to or greater than 10,000.");
      fuelStatus.innerHTML = "Fuel level too low for launch";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }
   else {
      fuelStatus.innerHTML = "Fuel level high enough for launch";//since this is the original value, what is a way to revert? 
   }

};

function validateMass() {

   if (cargoMass.value > 10000) {
      alert("Cargo mass is too high. Must be equal to or less than 10,000.");
      cargoStatus.innerHTML = "Cargo mass too high for launch";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }
   else {
      cargoStatus.innerHTML = "Cargo mass low enough for launch";//why does this not change back
   }

};

function statusUpdate() {

   faultyItems.style.visibility = "visible";

   pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
   copilotStatus.innerHTML = `Pilot ${copilotName.value} is ready for launch`;

   launchStatus.innerHTML = "Shuttle is ready for launch";
   launchStatus.style.color = "green";
   
};

function getPlanet() {

   fetch('https://handlers.education.launchcode.org/static/planets.json')
   .then(response => response.json())
   .then(data => {
      let randomPlanet = data[Math.floor(Math.random() * data.length)];

      missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
      <ol style="list-style-type: none">
         <li>Name: ${randomPlanet.name}</li>
         <li>Diameter: ${randomPlanet.diameter}</li>
         <li>Star: ${randomPlanet.star}</li>
         <li>Distance from Earth: ${randomPlanet.distance}</li>
         <li>Number of Moons: ${randomPlanet.moons}</li>
      </ol>
      <img src="${randomPlanet.image}">
      `
   });

};