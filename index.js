// const moment = require("moment");

function validateExists(value) {
    return value && value.trim();
};

function validateNumber(value) {
    return !isNaN(value);
};
  
function validateRange(value, min, max) {
    return value >= min && value <= max;
};

function validateForm(formData) {
    const errors = {};
  
    // Check if name was entered
    if (!validateExists(formData.get("name"))) {
      errors.name = "Please enter a name";
    }
  
    // Check if rating was entered
    if (!validateExists(formData.get("rating"))) {
      errors.rating = "Please enter a rating";
        }else{
            // Check if the rating is a number
            if (!validateNumber(formData.get("rating"))) {
            errors.rating = "Rating must be a number";
            }else {
                // Because it is a number, convert it
                const rating = Number.parseFloat(formData.get("rating"));
                // Check that the rating is between 1 and 5, inclusive
                if (!validateRange(rating, 1, 5)) {
                    errors.rating = "Rating must be between 1 and 5 inclusive";
                }
            }
        }
  
    // Check if description was entered
    if (!validateExists(formData.get("description"))) {
      errors.description = "Please enter short description";
    }
  
    // Check if established date was entered
    if (!validateExists(formData.get("established"))) {
      errors.established = "Please enter date";
    }
  
    // Check if area was entered
    if (!validateExists(formData.get("area"))) {
      errors.area = "Please enter the area of the park";
    }
  
    // Check if location date was entered
    if (!validateExists(formData.get("location"))) {
      errors.location = "Please enter the location of the park";
    }
  
    return errors;
};

const submitHandler = (event) => {
    //keeping the page from reloading
    event.preventDefault();
    //a little message to the console to know the form was submitted and that the event took place.
    console.log("The form was submitted");

    //WAYS TO GET INPUT FROM FORMs
    //1 querySelector //Get the name input that was typed in "Name" field
        // const parkName = document.querySelector("#name-input").value;
        // console.log(parkName);

    //2=FORM DATA OBJECT 
        //The FormData OBJECT can be populated with a form's data as a set of key-value pairs. input name = key, input value = value. 
        //has sevaral methods for working with the form
    const formData = new FormData(event.target) //an object
    //pass this object into a helper function to validate each input value in the form data.. this helper function returns an object
    const errors = validateForm(formData); //> {}

    // Clear all previous errors that may have been added from previous search to get ready for any errors of the current search
    const errorElements = document.querySelectorAll(".error");
        for (let element of errorElements) {
            element.style.display = "none";
        }
    // Display any new errors for current search
        //making errors obj into arr of just the keys/ names of the inputs
    Object.keys(errors).forEach((key) => {
    // Find the specific ERROR element
    const errorElement = document.querySelector(`#${key}-form .error`);
    errorElement.innerText = errors[key];
    errorElement.style.display = "block";
    });

    // If there are no errors
    if (!Object.keys(errors).length) {
        // Create a new element
        const parkSection = document.createElement("section");
    
        // Add the park class
        parkSection.classList.add("park-display");
    
        // Construct the HTML for this element
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
    
        // Set the innerHTML
        parkSection.innerHTML = content;
    
        // Append to the main element
        document.querySelector("main").appendChild(parkSection);
    }
};




//the call back from the window listener waiting for the DOM to load
//now we want to start manipulation from this code... 
const main = () => {
    // Get the form element
    const form = document.querySelector("#park-form");
  
    // Attach the submit handler
    form.addEventListener("submit", submitHandler);
};



//a listerner for the window itself, triggers when the event of the DOM loading happens... DOM finished loading? -> run callback function "main";
window.addEventListener("DOMContentLoaded", main);