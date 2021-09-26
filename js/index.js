import fetchData from './libs/fetchData.js';
import { filteringAnArray } from './libs/filteringArray.js';
import { saveToStorage, getStorageItem } from './libs/localStorageHelpers.js';

const data = await fetchData('https://fakestoreapi.com/products');

console.log('data', data);

let searchBar = document.querySelector('.search');
let container = document.querySelector('.card-container');
let noResultsMessage = document.querySelector('.no-results');

searchBar.onkeyup = function () {
	container.innerHTML = '';

	if (searchBar.value === '') {
		container.innerHTML = '';
		return;
	}
	let filtering = filteringAnArray(data, searchBar.value);

	if (filtering.length === 0) {
		noResultsMessage.style.display = 'block';
	} else {
		noResultsMessage.style.display = 'none';
	}
	for (let i = 0; i < filtering.length; i++) {
		container.innerHTML += `
        <div class="col-md-3 align-items-center card">
            <div class="card__img-container">
                <img src="${filtering[i].image}" class="card-img-top card__img" alt="">
            </div>           
            <div class="card-body text-center">
                <h5 class="card-title">${filtering[i].title}</h5>
                <p class="card-text">${filtering[i].price}</p>
                <a href="#" class="btn btn-primary" data-id="${filtering[i].id}" data-title="${filtering[i].title}" data-image="${filtering[i].image}" data-price="${filtering[i].price}">Add to favourites</a>
            </div>
        </div>`;
	}
	let button = document.querySelectorAll('.btn');

	button.forEach((element) => {
		element.onclick = function () {
			let localStorageObject = {
				id: element.dataset.id,
				title: element.dataset.title,
				image: element.dataset.image,
				price: element.dataset.price,
			};
			let wishList = getStorageItem('wishList');
			let isInStorage = wishList.find(
				(productObject) => productObject.id === localStorageObject.id
			);

			if (isInStorage === undefined) {
				// Insert it into local storage

				wishList.push(localStorageObject);
				saveToStorage('wishList', wishList);
			} else {
				// remove it from localstorage if its already there

				let removedElementArray = wishList.filter(
					(productObject) => productObject.id !== localStorageObject.id
				);

				saveToStorage('wishList', removedElementArray);
			}
		};
	});
};
