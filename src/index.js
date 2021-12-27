// console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const container = document.getElementById('dog-image-container');
const ulContainer = document.querySelector("#dog-breeds");
const dropdown = document.querySelector('#breed-dropdown');
let breedsArray;

ulContainer.addEventListener('click', handleClick);
dropdown.addEventListener('change', filterBreeds);


function getDogImages() {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(images => {
            const dogImgJson = images.message;
            // turn this array into elements
            let dogImgArray = createImgElement(dogImgJson);
            appendImage(dogImgArray)
    })
};


function createImgElement (dogImgArray) {
    return dogImgArray.map((img) => {
        let i = `<img src=${img}>`;
        return i;
    })
}


function appendImage (dogImgArray) {
    dogImgArray.forEach(element => {
        container.innerHTML += element;
    })
}

// getDogImages();


const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const breedList = document.getElementById('dog-breeds');


function getBreeds() {
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(breeds => {
            breedsArray = Object.keys(breeds.message);
            const breedsLis = createLiElement(breedsArray);
            appendBreeds(breedsLis);
    })
};

function createLiElement(breedsArray) {
    return breedsArray.map(breed => {
        let li = `<li>${breed}</li>`;
        return li;
    })
}

function appendBreeds (breedLis) {
    breedLis.forEach(element => {
        breedList.innerHTML += element;
    })
}

function handleClick(e) {
    if (e.target.nodeName === "LI") {
            if(e.target.style.color === "red") {
                e.target.style.color = 'black'
            } else {
                e.target.style.color = 'red'
            }
    }
};


function filterBreeds (e) {
    const letter = e.target.value;
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter));
    const filteredLis = createLiElement(filteredBreeds);
    ulContainer.innerHTML = '';
    appendBreeds(filteredLis);
}


getBreeds();
