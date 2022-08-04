// const heading = document.querySelector("h1");
// console.log(heading);

// console.log(document.querySelector(".value"))
// console.log(document.querySelector("button"))
// console.log(document.querySelector(".area"))
// console.log(document.querySelector("div.stat"))
// console.log(document.querySelector(".hello"))

// const buttons = document.querySelectorAll("button")
// console.log(buttons)

// const ratingsList = document.querySelectorAll("div.rating-display div.value")

// console.log("Ratings", ratingsList.values())

// for (let rating of ratingsList.values()){
//     console.log(rating)
// }

// const areasList = document.querySelectorAll("div.area-display div.value")

// console.log("Areas", areasList)

// for (let area of areasList.values()){
//     console.log(area)
// }

const descList = document.querySelectorAll("div.description-display")

for (let desc of descList.values()){
    let content = desc.innerHTML

    if(content.length >250){
        content = content.slice(0, 250)
        // content = content + "<a href=\"#\">...</a>";
        // content = content + "..."
    }
    // console.log(content)
    desc.innerHTML = content + "...";
}


//changing style depending on values using conditional statement .. setting the style attribute of that element with "style."...
// const ratingsList1 = document.querySelectorAll(".rating-display .value")

// for (let rating of ratingsList1.values()){
//     rating.style.fontWeight = "bold";
//     let ratingNum = parseFloat(rating.innerText)

//     if(ratingNum < 4.7){
//         rating.style.color = "red"
//     }
//     if(ratingNum === 4.7){
//         rating.style.color = "orange"
//     }else if(ratingNum > 4.7){
//         rating.style.color = "green"
//     }
// }


//------(I like doing it this way better)--------//VVVVVVV

// changing the style depending on values using conditionals .. classList
const ratingsList = document.querySelectorAll(".rating-display .value")

for (let rating of ratingsList.values()){
    //turns the string value into a number
    let ratingInt = parseFloat(rating.innerText)
    //removes the current style class
    rating.classList.remove("value")

        if(ratingInt < 4.7){
            rating.classList.add("low-rating")
        } else if(ratingInt === 4.7){
            rating.classList.add("mid-rating")
        } else if(ratingInt > 4.7){
            rating.classList.add("high-rating")
        }
}


//ADDING ELEMENTS TO THE DOM
const parks = document.querySelectorAll(".park-display");

let numOfParks = parks.length;

const newElem = document.createElement("div");
newElem.innerText = `${numOfParks} parks to visit`
newElem.classList.add("header-statement")

//APPENDING THE CHILD TO A PARENT
const header = document.querySelector("header");
header.appendChild(newElem)


// REMOVING A CHILD
const main = document.querySelector("main");
const biscayne = document.querySelector("#bnp");
// main.removeChild(biscayne);


//EVENT LISTENERS 20.5
    //this is for one button 
// const firstBtn = document.querySelector("button")
// firstBtn.addEventListener("click", (event)=>{
//     // firstBtn.classList.add("rate-button-clicked") css is also commented out line 108
//     console.log("Button has been clicked", event)
//     console.log(event.srcElement)
//     console.log(event.target)
// })

    //this is for all buttons
    //gets you a specific result though from each parent of each button
const allBtns = document.querySelectorAll("button");
    //when a button is clicked, the parent is accessed from the target, then you can modify the parent style and do a lot more cool stuff!!
allBtns.forEach(btn =>{
    btn.addEventListener("click", event=>{
        // console.log(event.target.parentNode, event)
        const park = event.target.parentNode
        park.style.backgroundColor = "#c8e6c9"
    })
})


// SORTER 20.5
const nameSorter = document.querySelector("#name-sorter");
// console.log(nameSorter)

nameSorter.addEventListener("click", (event) => {
    //prevents page from reloading
    event.preventDefault();
    //gather all elements, main and each park's section element
    const main = document.querySelector("main")
    const parkNames = document.querySelectorAll(".park-display")
    //create a tangable arr from the Node list ^
    const parksArr = Array.from(parkNames)
    //empy the content of the main elem to start fresh
    main.innerHTML = "";
    //sort through the array to sort the names
    const sorted = parksArr.sort((parkA,parkB)=>{
        //have to query each park's name from the document
        const parkAName = parkA.querySelector("h2").innerText;
        const parkBName = parkB.querySelector("h2").innerText;
        //sort them alphabetically
        return parkAName > parkBName ? 1 : -1;
    })
    //!so you can go from a regular array and append like this? hmmm
    sorted.forEach(park=>{
        //append each child one by one in the sorted arr to the main elem
        main.appendChild(park)
    })

  });

const ratingSorter = document.querySelector("#rating-sorter");

ratingSorter.addEventListener("click", event=>{
    //prevents the page from reloading by default
    event.preventDefault();
    //gets all the park's sections
    const parkNodeList = document.querySelectorAll(".park-display")
    //clear out main's content
    const main = document.querySelector("main")
    main.innerHTML = "";
    //creats an arr to work with from the Node list of parks
    const parksArr = Array.from(parkNodeList);

    parksArr.sort((parkA, parkB)=>{
            const parkARating = parseFloat(
              parkA.querySelector(".rating-display").innerText
            );
            const parkBRating = parseFloat(
              parkB.querySelector(".rating-display").innerText
            );
            return parkBRating - parkARating;
    });

    // console.log(sortedRatings)

    parksArr.forEach(rating=>{
        main.appendChild(rating)
    })

                      
})