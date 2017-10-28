'use strict';

//Create array to store product objects
var allProducts = [];
var usedImages = [];

//Create a constructor for the products

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numClicked = 0;
  this.numShown = 0;

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
    return num === array[i];
  }
}


function getRandImage(array) {

  for(var i = 0; i < 3; i++) {
    var num = Math.floor(Math.random() * (array.length));

    while(inArray(num, usedNums)) {
      num = Math.floor(Math.random() * (array.length));
    }
    usedNums.push(num);

    var pageWrapper = document.getElementById('wrapper');
    var productWrapper = document.createElement('div');
    var productNameContainer = document.createElement('div');
    var productImage = document.createElement('img');
    var productName = document.createElement('h4');

    productWrapper.className = 'card';
    productName.className = 'product-name';
    productName.textContent = array[num].name;
    productNameContainer.className = 'container';
    productImage.src = array[num].filepath;
    productImage.name = array[num].name;

    productWrapper.appendChild(productImage);
    productNameContainer.appendChild(productName);
    productWrapper.appendChild(productNameContainer);
    pageWrapper.appendChild(productWrapper);
  }
}

getRandImage(allProducts);
