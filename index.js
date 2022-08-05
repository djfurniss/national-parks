const submitHandler = (event) => {
    event.preventDefault();
  
    const form = document.querySelector("#park-form");
    const formData = new FormData(form);
    // Keep track of if any errors are found
    let hasErrors = false;
  
    formData.forEach((value, key) => {
      let errorId = `#${key}-error`;
      if (value.trim() === "") {
        document.querySelector(errorId).style.display = "block";
        hasErrors = true;
      } else {
        document.querySelector(errorId).style.display = "none";
      }
    });
  
    // if there are no errors
    if (!hasErrors) {
      //create a new element
      const parkSection = document.createElement("section");
  
      // add the park class
      parkSection.classList.add("park-display");
  
      // construct the HTML for this element
      const content = `
      <h2>${formData.get("name")}</h2>
      <div class="location-display">${formData.get("location")}</div>
      <div class="description-display">${formData.get("description")}</div>
      <button class="rate-button" title="Add to Favourites">&#9734;</button>
      <div class="stats">
        <div class="established-display stat">
          <h3>Established</h3>
          <div class="value">${formData.get("established")}</div>
        </div>
        <div class="area-display stat">
          <h3>Area</h3>
          <div class="value">${formData.get("area")}</div>
        </div>
        <div class="rating-display stat">
          <h3>Rating</h3>
          <div class="value">${formData.get("rating")}</div>
        </div>
      </div>
      `;
  
      // set the innerHTML
      parkSection.innerHTML = content;
  
      //append to the main element
      document.querySelector("main").appendChild(parkSection);
    }
};
  
  // function to handler favorite button clicks
const favoriteButtonClickHandler = (event) => {
    const park = event.target.parentNode;
    park.style.backgroundColor = "#c8e6c9";
  };
  
  // function for sorting by name
  const sortByName = (parkA, parkB) => {
    const parkAName = parkA.querySelector("h2").innerText;
    const parkBName = parkB.querySelector("h2").innerText;
    if (parkAName < parkBName) {
      return -1;
    } else if (parkAName > parkBName) {
      return 1;
    } else {
      return 0;
    }
};
  
  // function for sorting by rating
const sortByRating = (parkA, parkB) => {
    const parkARating = parseFloat(
      parkA.querySelector(".rating-display > .value").innerText
    );
    const parkBRating = parseFloat(
      parkB.querySelector(".rating-display > .value").innerText
    );
    return parkBRating - parkARating;
};
  
  // function for handling the nameSorter click
const nameSorterClickHandler = (event) => {
    event.preventDefault();
  
    // 1.  get the main element
    const main = document.querySelector("main");
  
    // 2. get the list of parks
    const parksList = main.querySelectorAll(".park-display");
  
    // 3. empty the main
    main.innerHTML = "";
  
    // 4. create an array
    const parksArray = Array.from(parksList);
  
    // 5. sort the array
    parksArray.sort(sortByName);
  
    // 6. Insert each park into the DOM
    parksArray.forEach((park) => {
      main.appendChild(park);
    });
};
  
  // function to handle the ratingSorter click
const ratingSorterClickHandler = (event) => {
    event.preventDefault();
  
    // 1.  get the main element
    const main = document.querySelector("main");
  
    // 2. get the list of parks
    const parksList = main.querySelectorAll(".park-display");
  
    // 3. empty the main
    main.innerHTML = "";
  
    // 4. create an array
    const parksArray = Array.from(parksList);
  
    // 5. sort the array
    parksArray.sort(sortByRating);
  
    // 6. Insert each park into the DOM
    parksArray.forEach((park) => {
      main.appendChild(park);
    });
};
  
// the point where all the code starts
const main = () => {
    // select the nameSorter link
    const nameSorter = document.querySelector("#name-sorter");
  
    // add an event listener
    nameSorter.addEventListener("click", nameSorterClickHandler);
  
    // select the ratingSorter link
    const ratingSorter = document.querySelector("#rating-sorter");
  
    // add an event listener
    ratingSorter.addEventListener("click", ratingSorterClickHandler);
  
    // select all the buttons for all the parks
    const allBtns = document.querySelectorAll(".rate-button");
  
    // iterate the list of buttons and add an event handler to each
    allBtns.forEach((btn) => {
      btn.addEventListener("click", favoriteButtonClickHandler);
    });
  
    // get the form element
    const form = document.querySelector("#park-form");
  
    // attach the submit handler
    form.addEventListener("submit", submitHandler);
};
  
  // Add event listener for DOMContentLoaded
  window.addEventListener("DOMContentLoaded", main);