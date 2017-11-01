'use strict';
//Create array to store product objects
var allProducts = [];
var usedImages = [];
var selections = 0;
var pics = [];
//Create a constructor for the products
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numClicked = 0;
  this.numShown = 0;
  this.id = this.name.replace(' ', '').toLowerCase();
  allProducts.push(this);
}

//Create products
new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bugglegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulu', 'img/cthulhu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

//Display 3 randomly slelected products to the page
function inArray(num, array) {
  for(var i = 0; i <= array.length; i++) {
    if(num === array[i]) {
      return true;
    }
  }
  return false;
}

function getRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

// Render 3 images to the user
function displayImages(array) {
  var currentlyShowing = [];
  currentlyShowing[0] = getRandom();

  while (usedImages.indexOf(currentlyShowing[0]) !== -1) {
    console.error('Duplicate, or in prior view! Re run!');
    currentlyShowing[0] = getRandom();
  }
  //make center image unique
  currentlyShowing[1] = getRandom();
  while(currentlyShowing[0] === currentlyShowing[1] || usedImages.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Duplicate at center, or in prior view! Re run!');
    currentlyShowing[1] = getRandom();
  }
  //make right image unique
  currentlyShowing[2] = getRandom();
  while(currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || usedImages.indexOf(currentlyShowing[2]) !== -1) {
    console.error('Duplicate at 3rd one! Re run it!');
    currentlyShowing[2] = getRandom();
  }

  var pageWrapper = document.getElementById('wrapper');
  for(var i = 0; i < 3; i++) {
    var productWrapper = document.createElement('div');
    var productNameContainer = document.createElement('div');
    var productImage = document.createElement('img');
    var productName = document.createElement('h4');

    productWrapper.className = 'card';
    productName.className = 'product-name';
    productName.textContent = allProducts[currentlyShowing[i]].name;
    productNameContainer.className = 'container';
    productImage.src = allProducts[currentlyShowing[i]].filepath;
    productImage.name = allProducts[currentlyShowing[i]].name;
    productImage.className = 'image';
    productImage.id = allProducts[currentlyShowing[i]].id;
    allProducts[currentlyShowing[i]].numShown++;

    productWrapper.appendChild(productImage);
    productNameContainer.appendChild(productName);
    productWrapper.appendChild(productNameContainer);
    pageWrapper.appendChild(productWrapper);
  }
}
displayImages(allProducts);
//Display results to the page as a list
function displayResults() {
  var pageWrapper = document.createElement('div');
  var ulEl = document.createElement('ul');
  var h2El = document.createElement('h2');

  h2El.textContent = 'You\'re done! Here are the results!';
  document.body.appendChild(pageWrapper);
  pageWrapper.id = 'wrapper';

  for(var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    var message = allProducts[i].numClicked + ' votes for the ' + allProducts[i].name + '.';
    liEl.textContent = message;
    ulEl.appendChild(liEl);
  }
  pageWrapper.appendChild(h2El);
  pageWrapper.appendChild(ulEl);
}

//create click handler for images
function handleImageClick(event) {
  if(event.target !== event.currentTarget) {
    var clickedProduct = event.target.id;
    console.log(clickedProduct);
  }
  event.stopPropagation();

  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id === clickedProduct) {
      allProducts[i].numClicked++;
    }
  }
  var element = document.getElementById('wrapper');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  displayImages(allProducts);
  selections++;
  if(selections === 25) {
    wrapper.removeEventListener('click', handleImageClick);
    wrapper.remove();
    displayResults();
  }
}

var wrapper = document.getElementById('wrapper');
wrapper.addEventListener('click', handleImageClick);