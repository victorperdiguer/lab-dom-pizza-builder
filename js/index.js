// Write your Pizza Builder JavaScript in this file.

// Constants
const basePrice = 10;
const ingredients = {
  pepperoni: { name: 'pepperoni', price: 1 },
  mushrooms: { name: 'Mushrooms', price: 1 },
  greenPeppers: { name: 'Green Peppers', price: 1 },
  whiteSauce: { name: 'White sauce', price: 3 },
  glutenFreeCrust: { name: 'Gluten-free crust', price: 5 }
};

// Initial value of the state (the state values can change over time)
const state = {
  pepperoni: true,
  mushrooms: true,
  greenPeppers: true,
  whiteSauce: false,
  glutenFreeCrust: false
};

//lazy developer in action - ideally the price would be added to the 'state' object but I don't want to modify the given object
const prices = {
  pepperoni: 1,
  mushrooms: 1,
  greenPeppers: 1,
  whiteSauce: 3,
  glutenFreeCrust: 5
}

// This function takes care of rendering the pizza based on the state
// This function is triggered once at the beginning and every time the state is changed
function renderEverything() {
  renderPepperoni();
  renderMushrooms();
  renderGreenPeppers();
  renderWhiteSauce();
  renderGlutenFreeCrust();

  renderButtons();
  renderPrice();
}

function renderPepperoni() {
  document.querySelectorAll('.pep').forEach((onePep) => {
    if (state.pepperoni) {
      onePep.style.visibility = 'visible';
    } else {
      onePep.style.visibility = 'hidden';
    }
  });
}

function renderMushrooms() {
  // Iteration 1: set the visibility of `<section class="mushroom">`
  let mushrooms = document.querySelectorAll('.mushroom');
  for (let i = 0; i < mushrooms.length; i++){
    if (state.mushrooms) {
      mushrooms[i].style.visibility = 'visible';
    }
    else {
      mushrooms[i].style.visibility = 'hidden';
    }
  }
}

function renderGreenPeppers() {
  // Iteration 1: set the visibility of `<section class="green-pepper">`
  let greenPeppers = document.querySelectorAll('.green-pepper');
  for (let i = 0; i < greenPeppers.length; i++){
    if (state.greenPeppers) {
      greenPeppers[i].style.visibility = 'visible';
    }
    else {
      greenPeppers[i].style.visibility = 'hidden';
    }
  }
}

function renderWhiteSauce() {
  // Iteration 2: add/remove the class "sauce-white" of `<section class="sauce">`
  let sauce = document.getElementsByClassName("sauce");
  if (state.whiteSauce){
    sauce[0].classList.remove("sauce-white");
  }
  else {
    sauce[0].classList.add("sauce-white");
  }
}

function renderGlutenFreeCrust() {
  // Iteration 2: add/remove the class "crust-gluten-free" of `<section class="crust">`
  let crust = document.getElementsByClassName("crust");
  if (state.glutenFreeCrust){
    crust[0].classList.remove("crust-gluten-free");
  }
  else {
    crust[0].classList.add("crust-gluten-free");
  }
}

function renderButtons() {
  // Iteration 3: add/remove the class "active" of each `<button class="btn">`
  let buttons = document.getElementsByClassName("btn");
  //we can do this with a for loop because the order of the buttons is the same order of the properties in the object 'state'
  //not ideal but also more scalable if we keep adding ingredients
  let i = 0;
  for (let ingredient in state) {
    if (state[ingredient]) {
      buttons[i].classList.add("active");
    }
    else {
      buttons[i].classList.remove("active");
    }
    i++;
  }
}

function renderPrice() {
  let list = document.querySelectorAll("aside ul li");
  let i = 0;
  let result = 10;    //base price is always 10
  for (let ingredient in state) {
    //stack overflow saves the day - I was using 'visibility' and it was only hiding the price. I needed to 'remove' it.
    if (state[ingredient]) {
      list[i].style.display = '';
      //we created a 'prices' object earlier with the same keys/properties as 'state'. Each property's value however is the price of the ingredient, not a boolean representing if the ingredient is added or not.
      //let's add each active ingredient's price to the final result
      result += prices[ingredient];
    }
    else {
      list[i].style.display = 'none';
    }
    i++;
  }
  let finalPrice = document.querySelectorAll("aside strong");
  finalPrice[0].textContent = `$${result}`;
}

renderEverything();

// Iteration 1: Example of a click event listener on `<button class="btn btn-pepperoni">`
document.querySelector('.btn.btn-pepperoni').addEventListener('click', function () {
  state.pepperoni = !state.pepperoni;
  renderEverything();
});

// Iteration 1: Add click event listener on `<button class="btn btn-mushrooms">`
document.querySelector('.btn-mushrooms').addEventListener('click', function () {
  state.mushrooms = !state.mushrooms;
  renderEverything();
});

// Iteration 1: Add click event listener on `<button class="btn btn-green-peppers">`
document.querySelector('.btn-green-peppers').addEventListener('click', function () {
  state.greenPeppers = !state.greenPeppers;
  renderEverything();
});

// Iteration 2: Add click event listener on `<button class="btn btn-sauce">`
document.querySelector('.btn-sauce').addEventListener('click', function () {
  state.whiteSauce = !state.whiteSauce;
  renderEverything();
});

// Iteration 2: Add click event listener on `<button class="btn btn-crust">`
document.querySelector('.btn-crust').addEventListener('click', function () {
  state.glutenFreeCrust = !state.glutenFreeCrust;
  renderEverything();
});
