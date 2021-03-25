const form = document.getElementById("launchForm");

getPlanet();

function validateInput() {
   const letters = /^[a-z][a-z\s]*$/;
   if (
      !form["pilotName"].value || !form["copilotName"].value || 
      !form["fuelLevel"].value || !form["cargoMass"].value
      ) {
      alert('All fields required!');
      return false;
   } 
   else if (
      !form["pilotName"].value.trim().toLowerCase().match(letters) || 
      !form["copilotName"].value.trim().toLowerCase().match(letters)
      ) {
      alert("Pilot names must be...names");
      return false;
   } 
   else {
      return true;
   };
};

function statusUpdate() {
   document.getElementById("faultyItems").style.visibility = "visible";
   document.getElementById("pilotStatus").innerHTML = `Pilot ${form["pilotName"].value} is ready for launch`;
   document.getElementById("copilotStatus").innerHTML = `Pilot ${form["copilotName"].value} is ready for launch`;
   document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
   document.getElementById("launchStatus").style.color = "green";
};

function statusFail() {
   document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
   document.getElementById("launchStatus").style.color = "red";
};

function validateFuel() {
   if (form["fuelLevel"].value < 10000) {
      alert("Fuel level too low. Must be equal to or greater than 10,000.");
      document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
      statusFail();
      return true;
   } 
   else {
      document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
      return false;
   };
};

function validateMass() {
   if (form["cargoMass"].value > 10000) {
      alert("Cargo mass is too high. Must be equal to or less than 10,000.");
      document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
      statusFail();
      return true;
   } 
   else {
      document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
      return false;
   };
};

function getPlanet() {
   fetch('https://handlers.education.launchcode.org/static/planets.json')
   .then(response => response.json())
   .then(data => {
      let randomPlanet = data[Math.floor(Math.random() * data.length)];
      document.getElementById("missionTarget").innerHTML = `
      <h2>Mission Destination</h2>
      <ol style="list-style-type: none" id="planetInfo">
         <li><span id="infoType">Name:</span> ${randomPlanet.name}</li>
         <li><span id="infoType">Diameter</span>: ${randomPlanet.diameter}</li>
         <li><span id="infoType">Star:</span> ${randomPlanet.star}</li>
         <li><span id="infoType">Distance from Earth:</span> ${randomPlanet.distance}</li>
         <li><span id="infoType">Number of Moons:</span> ${randomPlanet.moons}</li>
      </ol>
      <img src="${randomPlanet.image}">
      `
   });
};


form.addEventListener("submit", event => {
   event.preventDefault()
   if (validateInput()) {
      statusUpdate();
      validateFuel();
      validateMass();
   };

   if (document.getElementById("launchStatus").style.color === "green") {
      document.getElementById("launchButton").style.visibility = "visible";//in a perfect world, this wouldn't be visible or hidden, it would be added or taken away so that it doesn't leave a big empty space when it's not there. I guess that means making a <div> and changing the innerHTML, but I'll go back to it later.
   };

   if (document.getElementById("launchStatus").style.color === "red") {
      document.getElementById("launchButton").style.visibility = "hidden";
   };
});

launchButton.addEventListener("click", event => {
   event.preventDefault();
   window.location = './launch.html'
});