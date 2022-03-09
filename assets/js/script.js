function clickHandler(event) {
    console.log('Button Clicked');
}

const comedy = document.querySelector('.comedy');
comedy.addEventListener('click', clickHandler);

const action = document.querySelector('.action');
action.addEventListener('click', clickHandler);

const drama = document.querySelector('drama');
drama.addEventListener('click', clickHandler);

const horror = document.querySelector('horror');
horror.addEventListener('click', clickHandler);

