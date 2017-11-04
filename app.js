'use strict';
//Create array to store product objects
var allProducts = [];
var usedImages = [getRandom(), getRandom(), getRandom()];
var selections = 0;
var pics = [];
var clickData = [];
var clickPercentage = [];
var productNames = [];
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
//get a random number
function getRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

// get a new set of images from the previous one
function getNewImages(usedImages) {
  var newImages = [];

  newImages[0] = getRandom();
  while(usedImages.includes(newImages[0])) {
    newImages[0] = getRandom();
  }

  newImages[1] = getRandom();
  while(newImages[0] === newImages[1] || usedImages.includes(newImages[1])) {
    newImages[1] = getRandom();
  }
   
  newImages[2] = getRandom();
  while(newImages[0] === newImages[2] || newImages[0] === newImages[1]
     || newImages[1] === newImages[2] || usedImages.includes(newImages[2], usedImages)) {
    newImages[2] = getRandom();
  }
  return newImages;
}
// Render 3 images to the user
function displayImages(array) {
  var currentlyShowing = getNewImages(usedImages);
  var pageWrapper = document.getElementById('wrapper');
  for(var i = 0; i < 3; i++) {
    var productWrapper = document.createElement('div');
    var productNameContainer = document.createElement('div');
    var productImage = document.createElement('img');
    var productName = document.createElement('h4');
    var productCardWrapper = document.createElement('div');

    productCardWrapper.className = 'card-wrapper';
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
    productCardWrapper.appendChild(productWrapper);
    pageWrapper.appendChild(productCardWrapper);
  }
  usedImages = currentlyShowing;
}
displayImages(allProducts);
//Display results to the page as a list
function getData() {
  for(var i = 0; i < allProducts.length; i++) {
    clickData.push(allProducts[i].numClicked);
    productNames.push(allProducts[i].name);
    clickPercentage.push(parseInt(Math.floor((allProducts[i].numClicked / allProducts[i].numShown) * 100).toFixed(2)));
  }
}
//draw chart to the window
function drawChart() {
  var ctx = document.getElementById('barChart').getContext('2d');
  var pie = document.getElementById('pieChart').getContext('2d');
  var pieColors = ['green', 'blue', 'red', 'purple', 'lightBlue', 'salmon', 'aqua', 'olive', 'lime', 'teal', 'navy', 'fuschia',
  'HotPink', 'Crimson', 'yellow', 'cadetBlue', 'SkyBlue', 'SandyBrown', 'DarkBlue', 'orange'];

  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Clicks',
        data: clickData,
        backgroundColor: pieColors
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  var pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: productNames,
      datasets: [{
        label: '% of Clicks',
        data: clickPercentage,
        backgroundColor: pieColors
      }]
    },
    options: {
      pieceLabel: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'value' + '%',
        fontColor: '#fff',
      }
    }
  });
}

function resultsMessage() {
  var instructions = document.getElementById('instructions');
  var resultsMessage = document.createElement('p');

  resultsMessage.id = 'resultsMessage';
  resultsMessage.textContent = 'Thanks for participating! Here are the results.';
  instructions.remove();
  document.getElementById('header').appendChild(resultsMessage);
}
//create click handler for images
function handleImageClick(event) {
  var element = document.getElementById('wrapper');
  
  if(event.target !== event.currentTarget) {
    var clickedProduct = event.target.id;
  }
  event.stopPropagation();

  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id === clickedProduct) {
      allProducts[i].numClicked++;
    }
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  displayImages(allProducts);
  selections++;

  if(selections === 25) {
    wrapper.removeEventListener('click', handleImageClick);
    wrapper.remove();
    getData();
    drawChart();
    resultsMessage();
    var dataResults = JSON.stringify(allProducts);
    localStorage.setItem('Data', dataResults);
  }
}
//add event linstener to the wrapper element
var wrapper = document.getElementById('wrapper');
wrapper.addEventListener('click', handleImageClick);