let locationCoordinates = [
  {
    location: "Auckland",
    lat: -37.00802482448732,
    long: 174.78505725521052
  },
  {
    location: "Wellington",
    lat: -41.32740877300241,
    long: 174.80766277068494
  },
  {
    location: "Christchurch",
    lat: -45.019620751074946,
    long: 168.7454631284794
  },
  {
    location: "Queenstown",
    lat: -43.48753254298309,
    long: 172.53741023606742
  }
];

let sectionOne = document.querySelector(".section__one");

let locationSearchBtn = document.querySelector("#location-search-btn"); //Popup Location btn//
let locationConfirmBtn = document.querySelector("#location-confirm-btn"); ////Confirm Location btn//
let peopleCountInput = document.querySelector("#people-count");
let iteniarySubmitButton = document.querySelector("#homepage-submit-button");
let stepOneIteniary = document.querySelector("#homepage-container");
let popupLocation = document.querySelector("#popup-location");
let popupDisplayDis = document.querySelector("#popup-display-distance");

let homepagelogo = document.querySelector("#homepage__logo");
let homepageCoverImages = document.querySelector("#homepage__image");
let iteniaryContainer = document.querySelector("#iteniary-container");

let stepOneSection = document.querySelector("#section-stepOne");
let carPopupBg = document.querySelector(".popup__black");

let dateInput = document.querySelector("#start-date").value;

///Image Scroll
let sky = document.querySelector("#sky");
 let mountain = document.querySelector("#mountain");
 let seal = document.querySelector("#seal");
 let bush = document.querySelector("#bush");
 let bird = document.querySelector("#bird");
 let road = document.querySelector("#road");
 let car = document.querySelector("#car");
///


let vehicleArray = [];

let filteredVehicles = [];
let motorbike = [];
let smallCar = [];
let largeCar = [];
let motorHome = [];

let iteniary = {
  startLocationCoordinate: [],
  returnLocationCoordinate: [],
  startLocationName: "",
  returnLocationName: "",
  locationConfirm: false,
  startDate: "",
  endDate: "",
  numOfDays: 0,
  numOfPeople: 0,
  routeDistance: "",
  routeTime: "",
  fuelPrice: 2.7,
  totalRentalPrice: "",
  totalFuelPrice: "",

};

let vehicleList;

///Async Function to bring Vehicle List
async function fetchVehicleJson() {
  const response = await fetch("/vehicleList.json");
  const data = await response.json();
  vehicleList = data.vehicles; //pushing vehicles into list
}

//Homepage Scroll

window.addEventListener('scroll', function(){

  let value = window.scrollY;

  bird.style.top = value * 0.1 + "px";
  mountain.style.top = value * 0.2 + "px";
  car.style.width = (100 + value * 0.08) + "%";
  car.style.height = (100 + value * 0.08) + "%";
  car.style.left =  value * -0.04 + "%";
  car.style.top =  value * -0.05 + "%";
})
//Nav bar 3 bar button

let dropdownBtn = document.querySelector(".nav__dropdown--btn");
let displayToggle = document.querySelector(".display__toggle");

dropdownBtn.addEventListener("click",function(){
  displayToggle.classList.toggle("display__toggle");
});


//Get Start and End location//
const map = L.map("location-select-map").setView(
  [-36.847166770156186, 174.762972903701],
  4
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 8,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let routeControl = null;

function showRoute(startCoordinate, returnCoordinate) {
  setTimeout(function () {
    map.invalidateSize();
  }, 500);

  // if old route exists, remove old route
  if (routeControl) {
    map.removeControl(routeControl);
    routeControl = null;
  }
  routeControl = L.Routing.control({
    waypoints: [
      L.latLng(startCoordinate[0], startCoordinate[1]),
      L.latLng(returnCoordinate[0], returnCoordinate[1]),
    ],
    show: false,
    draggableWaypoints: false,
    lineOptions: {
      addWaypoints: false,
    },
  })
    .on("routesfound", function (e) {
      console.log(e.routes[0].summary.totalDistance);
      iteniary.routeDistance = Math.ceil(
        e.routes[0].summary.totalDistance / 1000
      );
      showDistance();
    })
    .addTo(map);
}

function showDistance() {
  popupDisplayDis.innerHTML = `<p>Est Distance: ${
    iteniary.routeDistance
  }km</p><p>Est Fuel Cost: $${Math.ceil(
    (iteniary.routeDistance / 100 * 7) * iteniary.fuelPrice
  )}</p>`;
}

function locationInput1() {
  let selectedLocationCoValue1 =
    document.querySelector("#start-location").value;

  let locationDetails = locationCoordinates.find(function (locationOption) {
    return locationOption.location === selectedLocationCoValue1;
  });

  iteniary.startLocationCoordinate = [
    locationDetails.lat,
    locationDetails.long,
  ];
  iteniary.startLocationName = selectedLocationCoValue1;
  console.log(iteniary.startLocationCoordinate);
  console.log(iteniary.startLocationName);
  showRoute(
    iteniary.startLocationCoordinate,
    iteniary.returnLocationCoordinate
  );
}

function locationInput2() {
  let selectedLocationCoValue2 =
    document.querySelector("#return-location").value;

  let locationDetails = locationCoordinates.find(function (locationOption) {
    return locationOption.location == selectedLocationCoValue2;
  });

  iteniary.returnLocationCoordinate = [
    locationDetails.lat,
    locationDetails.long,
  ];
  iteniary.returnLocationName = selectedLocationCoValue2;
  console.log(iteniary.returnLocationCoordinate);
  console.log(iteniary.returnLocationName);
  showRoute(
    iteniary.startLocationCoordinate,
    iteniary.returnLocationCoordinate
  );


}

//Confirm Location Button//
locationConfirmBtn.addEventListener("click", function () {
  if (iteniary.startLocationName === "" || iteniary.returnLocationName === "") {
    alert("Please select both locations");
  } else {
    locationSearchBtn.value =
      iteniary.startLocationName + " to " + iteniary.returnLocationName;
    popupLocation.style.display = "none";

    document.querySelector("body").style.overflow = "auto";
    popupLocation.style.display = "none";

   
  }
});

let submitForm = document.querySelector("#homepage-submit-button");

submitForm.addEventListener("click", formSubmission());

function formSubmission(details) {
  console.log(iteniary);
}

//FLAT PICKR: Get Date range

let range = {
  mode: "range",
  minDate: "today",
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",

  onChange: function (dates, string, pickr) {
    maxDays = 15;
    if (dates.length === 1) {
      pickr.set("maxDate", dates[0].fp_incr(maxDays - 1 || 1));

      pickr.set("minDate", dates[0]);
    } else {
      let timeDifference = dates[1].getTime() - dates[0].getTime();

      let numberOfDays = 1 + Math.floor(timeDifference / (1000 * 3600 * 24));

      console.log(numberOfDays, string, dates);

      iteniary.startDate = dates[0];
      iteniary.endDate = dates[1];
      iteniary.numOfDays = numberOfDays;
    }
  },
  onClose: function (dates, string, pickr) {
    pickr.set("maxDate", null);
    pickr.set("minDate", "today");
  },
};

const datepickerInstance = flatpickr("#start-date", range);

//Push number of people//
function selectNumOfPeople() {
  let numOfPeopleInput = parseInt(peopleCountInput.value);
  iteniary.numOfPeople = numOfPeopleInput;
}

//Open Location popup//

locationSearchBtn.addEventListener("click", function () {
  popupLocation.style.display = "flex";
  document.querySelector("body").style.overflow = "hidden";

  //Close Cross Button
  let crossLocationPopup = document.querySelector("#cross-location-popup");
  crossLocationPopup.addEventListener("click", function (event) {
    if (
      iteniary.startLocationName === "" ||
      iteniary.returnLocationName === ""
    ) {
      iteniary.startLocationName = "";
      iteniary.returnLocationName = "";
      startLocationCoordinate = [];
      returnLocationCoordinate = [];
      iteniary.routeDistance = 0;
    }
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("#popup-location").style.display = "none";

    console.log(iteniary);
  });


});

///Iteniary Search function
iteniarySubmitButton.addEventListener("click", function (event) {
  selectNumOfPeople();
  if (iteniary.startLocationName === "" || iteniary.returnLocationName === "") {
    console.log("Please select locations!");
    alert("Please select locations!");
  } else if (iteniary.numOfPeople === "") {
    console.log("Please select total number of people");
    alert("Please select total number of people");
  } else if (iteniary.numOfDays === 0) {
    console.log("Please select date range");
    alert("Please select date range");
  } else {
    console.log("Filter Success!");
    homepagelogo.style.display = "none";
    homepageCoverImages.style.display = "none";
    iteniaryContainer.classList.add("iteniary-container--stepOne");
    sectionOne.classList.add("section__one--toggle");
    stepOneSection.style.display = "flex";
    stepOneIteniary.style.position = "unset";

    stepOneSection.innerHTML = "<div><button>Back</button><div>";
    pushVehiclesArray(vehicleList);
  }
});

/// Getting vehicles that fit the criteria and pushing them into vehicleArray

function pushVehiclesArray(vehicleList) {
  vehicleArray = [];
  for (let vehicle of vehicleList) {
    if (
      vehicle.minPeople <= iteniary.numOfPeople &&
      iteniary.numOfPeople <= vehicle.mainFeatures[0].numOfSeats &&
      iteniary.numOfDays <= vehicle.maxDays &&
      vehicle.minDays <= iteniary.numOfDays
    ) {
      vehicleArray.push(vehicle);
    }
  }

  groupSorter(vehicleArray);
}

// sorting out vehicles into groups by using filled up vehicleArray from above^

function groupSorter(vehicleArray) {
  motorbike = [];
  smallCar = [];
  largeCar = [];
  motorHome = [];

  for (let vehicle of vehicleArray) {
    if (vehicle.type === "Motorbike") {
      motorbike.push(vehicle);
    } else if (vehicle.type === "Small Car") {
      smallCar.push(vehicle);
    } else if (vehicle.type === "Large Car") {
      largeCar.push(vehicle);
    } else {
      motorHome.push(vehicle);
    }
  }
  displayVehicle();
}

//Display cars in groups

function displayVehicle() {

  let html = ``;
  if (motorbike.length > 0) {
    html += `
    <div class="vehicle__group">

    <div class="vehicle__group--header">
    <h3>${motorbike[0].type}</h3>
    <h4>${motorbike[0].minDays} ~ ${motorbike[0].maxDays} days |  Max ${motorbike[0].mainFeatures[0].numOfSeats} passenger</h4>
    </div>
    <div id="motorbike-list" class="vehicle__list">
    </div>
    
    </div>

    `;
  }

  if (smallCar.length > 0) {
    html += `
    <div class="vehicle__group">

    <div class="vehicle__group--header">
    <h3>${smallCar[0].type}</h3>
    <h4>${smallCar[0].minDays} ~ ${smallCar[0].maxDays} days |  Max ${smallCar[0].mainFeatures[0].numOfSeats} passengers</h4>
    </div>
    <div id="smallCar-list" class="vehicle__list">
    </div>
    </div>

    `;
  }

  if (largeCar.length > 0) {
    html += `
    <div class="vehicle__group">

    <div class="vehicle__group--header">
    <h3>${largeCar[0].type}</h3>
    <h4>${largeCar[0].minDays} ~ ${largeCar[0].maxDays} days |  Max ${largeCar[0].mainFeatures[0].numOfSeats} passengers</h4>
    </div>
    <div id="largeCar-list" class="vehicle__list">
    </div>
    </div>


    `;
  }

  if (motorHome.length > 0) {
    html += `
    <div class="vehicle__group">

    <div class="vehicle__group--header">
    <h3>${motorHome[0].type}</h3>
    <h4>${motorHome[0].minDays} ~ ${motorHome[0].maxDays} days |  Max ${motorHome[0].mainFeatures[0].numOfSeats} passengers</h4>
    </div>
    <div id="motorHome-list" class="vehicle__list">
    </div>
    </div>
 

    `;
  }

  stepOneSection.innerHTML = html;
  displayVehicleCards();
}

function displayVehicleCards() {
  let displayMotorbikeCards = ``;
  let displaySmallCarCards = ``;
  let displayLargeCarCards = ``;
  let displayMotorHomeCards = ``;

  if (motorbike.length > 0) {
    for (let motorbikeDetail of motorbike) {
      displayMotorbikeCards += `
          
          <div class="vehicle__card" data-id="${motorbikeDetail.id}">           
          <div class="vehicle__card--image"><img src="${motorbikeDetail.image}"> </div>
          <div class="vehicle__card--details">
              <h5>${motorbikeDetail.name}</h5>
              <h6>${motorbikeDetail.type}</h6>
             
              <ul>
                  <li><img src="/Images/icons-transmission.png">${motorbikeDetail.mainFeatures[0].Transmission}</li>
                  <li><img src="/Images/icons-engine.png">${motorbikeDetail.mainFeatures[0].Engine}</li>
                  <li><img src="/Images/icons-fuel.png">${motorbikeDetail.mainFeatures[0].fuelType}</li>
                  <li><img src="/Images/icons-person.png">${motorbikeDetail.mainFeatures[0].numOfSeats}</li>
                  </ul>
              </div>
              </div>
          `;
    }
    document.querySelector("#motorbike-list").innerHTML = displayMotorbikeCards;
  }

  if (smallCar.length > 0) {
    for (let smallCarDetail of smallCar) {
      displaySmallCarCards += `
          
          <div class="vehicle__card" data-id="${smallCarDetail.id}">           
          <div class="vehicle__card--image"><img src="${smallCarDetail.image}"> </div>
          <div class="vehicle__card--details">
              <h5>${smallCarDetail.name}</h5>
              <h6>${smallCarDetail.type}</h6>
             
              <ul>
                  <li><img src="/Images/icons-transmission.png">${smallCarDetail.mainFeatures[0].Transmission}</li>
                  <li><img src="/Images/icons-engine.png">${smallCarDetail.mainFeatures[0].Engine}</li>
                  <li><img src="/Images/icons-fuel.png">${smallCarDetail.mainFeatures[0].fuelType}</li>
                  <li><img src="/Images/icons-person.png">${smallCarDetail.mainFeatures[0].numOfSeats}</li>
                  </ul>
              </div>
              </div>
          `;
    }
    document.querySelector("#smallCar-list").innerHTML = displaySmallCarCards;
  }

  if (largeCar.length > 0) {
    for (let largeCarDetail of largeCar) {
      displayLargeCarCards += `
          
          <div class="vehicle__card" data-id="${largeCarDetail.id}">           
          <div class="vehicle__card--image"><img src="${largeCarDetail.image}"> </div>
          <div class="vehicle__card--details">
              <h5>${largeCarDetail.name}</h5>
              <h6>${largeCarDetail.type}</h6>
             
              <ul>
                  <li><img src="/Images/icons-transmission.png">${largeCarDetail.mainFeatures[0].Transmission}</li>
                  <li><img src="/Images/icons-engine.png">${largeCarDetail.mainFeatures[0].Engine}</li>
                  <li><img src="/Images/icons-fuel.png">${largeCarDetail.mainFeatures[0].fuelType}</li>
                  <li><img src="/Images/icons-person.png">${largeCarDetail.mainFeatures[0].numOfSeats}</li>
                  </ul>
              </div>
              </div>
          `;
    }
    document.querySelector("#largeCar-list").innerHTML = displayLargeCarCards;
  }

  if (motorHome.length > 0) {
    for (let motorHomeDetail of motorHome) {
      displayMotorHomeCards += `
          
          <div class="vehicle__card" data-id="${motorHomeDetail.id}">           
          <div class="vehicle__card--image"><img src="${motorHomeDetail.image}"> </div>
          <div class="vehicle__card--details">
              <h5>${motorHomeDetail.name}</h5>
              <h6>${motorHomeDetail.type}</h6>
             
              <ul>
                  <li><img src="/Images/icons-transmission.png">${motorHomeDetail.mainFeatures[0].Transmission}</li>
                  <li><img src="/Images/icons-engine.png">${motorHomeDetail.mainFeatures[0].Engine}</li>
                  <li><img src="/Images/icons-fuel.png">${motorHomeDetail.mainFeatures[0].fuelType}</li>
                  <li><img src="/Images/icons-person.png">${motorHomeDetail.mainFeatures[0].numOfSeats}</li>
                  </ul>
              </div>
              </div>
          `;
    }
    document.querySelector("#motorHome-list").innerHTML = displayMotorHomeCards;
  }

  let displayedCard = document.querySelectorAll(".vehicle__card");

  for (card of displayedCard) {
    card.addEventListener("click", function (event) {
      const vehicleIdString = event.currentTarget.dataset.id;
      searchId(vehicleIdString);
    });
  }
}

///function to display vehicle detail popup

function searchId(vehicleIdString) {
  let html = ``;
 
  for (vehicle of vehicleArray) {
    if (vehicle.id.includes(vehicleIdString)) {
      //    if the id matches, get make a pop up and insert the vehicle information

      iteniary.totalRentalPrice = (vehicle.costPerDay * iteniary.numOfDays);
      iteniary.totalFuelPrice = (iteniary.routeDistance / 100 * vehicle.fuelByDistance * iteniary.fuelPrice);
     
      sideFeatureList = ``;
      for (sideFeature of vehicle.sideFeatures) {
        console.log(sideFeature);
        let featureName = sideFeature.name;
        let featureIconLink = sideFeature.link;


        sideFeatureList += `
        <li><img src="${featureIconLink}" class="popup__vehicle--icon">${featureName}</li>`;
      }


      html += `
       

<div class="popup__vehicle">
<div class="cross z-index">
<div id="cross-car-card" class="cross__area">
<div class="cross__right cross__black"></div>
<div class="cross__left cross__black"></div>
</div>
</div>

    <div class="popup__vehicle--image">
        <img src="${vehicle.image}">
    </div>
  <div class="popup__vehicle--info">

  <div class="popup__vehicle--section">
      <h3>${vehicle.name}</h3>
<p>${vehicle.description}</p>
</div>

<div class="popup__vehicle--section orangebg">
<h4 class="white-text">Specifications</h4>
<hr style="height:2px;border-width:0;background-color:white">
      <ul id="popup-features-list">
        <li><img src="/Images/orange-icons-transmission.png" class="popup__vehicle--icon">${vehicle.mainFeatures[0].Transmission}</li>
        <li><img src="/Images/orange-icons-engine.png" class="popup__vehicle--icon">${vehicle.mainFeatures[0].Engine}</li>
        <li><img src="/Images/orange-icons-fuel.png" class="popup__vehicle--icon">${vehicle.mainFeatures[0].fuelType}</li>
        <li><img src="/Images/orange-icons-ppl.png" class="popup__vehicle--icon">${vehicle.mainFeatures[0].numOfSeats} seats</li>
        ${sideFeatureList}
        </ul>
        </div>

        <div class="popup__vehicle--section">
    
        <h5>Total rental cost</h5>
        <div class="popup__vehicle--calc">
        <h6>$${vehicle.costPerDay} per day X ${iteniary.numOfDays} days
        </h6>
        <h4>$${iteniary.totalRentalPrice}</h4>
        </div>
        <hr style="height:2px;border-width:0;background-color:#AEAEAE;margin-bottom:1em">
        
        <h5>Estimated fuel cost for ${iteniary.routeDistance}km</h5>
        <div class="popup__vehicle--calc">
        <h6>${Math.ceil(iteniary.routeDistance / 100 * vehicle.fuelByDistance)}L X $${iteniary.fuelPrice}
        </h6>
        <h4>$${Math.ceil(iteniary.totalFuelPrice)}</h4>
        </div>
        <hr style="height:2px;border-width:0;background-color:#AEAEAE">
    
        <div class="popup__vehicle--calc">
        <h4>Total trip cost</h4>
        <h4>$${Math.ceil(iteniary.totalFuelPrice + iteniary.totalRentalPrice)}</h4>
        </div>
        
    

</div>


</div>
`;

      stepOneSection.style.overflow = "hidden";
      let body = document.querySelector("body");
      body.style.overflow = "hidden";
      carPopupBg.style.display = "flex";
      carPopupBg.innerHTML = html;

      let crossCarPopup = document.querySelector("#cross-car-card");
      crossCarPopup.addEventListener("click", function (event) {
        document.querySelector(".popup__vehicle").style.display = "none";
        carPopupBg.style.display = "none";
        body.style.overflow = "auto";
      });
    }
  }
}


fetchVehicleJson();
