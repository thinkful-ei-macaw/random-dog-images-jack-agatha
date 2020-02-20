'use strict';

function generateSubmitFormHTML() {
  return `
  <form class="dog-form">
  <div>
  <label for="todo">How many dog images would you like? (Enter num between 1 and 50) </label>
  <input id="num-dogs" type="number" name="dog-num">
  <div>
  <button type="submit">Submit</button>
  </form>
  `;
}

function generateDogImagesHTML(json) {
  let html = '';
  const { message } = json;
  message.forEach(img => html += `<img src="${img}">`);
  return html;
}

function generateFriendlyErrorHTML() {
  return `
  <p>Please enter a number between 1 and 50!</p>
  `;
}

function generateFriendlyError() {
  let html = generateFriendlyErrorHTML();
  render('.js-dog-images', html);
}

function clickSubmitDog() {
  $('.dog-form').submit(event => {
    event.preventDefault();
    let numDogs = $('#num-dogs').val();
    console.log(numDogs);
    if(numDogs >= 1 && numDogs <= 50){
      getDogsImages(numDogs);
    } else {
      generateFriendlyError();
    }
  });
}


function getDogsImages(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(json => generateDogImagesHTML(json))
    .then(dogImagesHTML => render('.js-dog-images', dogImagesHTML));
}

function render(target, component) {
  $(target).html(component);
}

function main() {
  render('.form-container', generateSubmitFormHTML());
  clickSubmitDog();
}

$(main);