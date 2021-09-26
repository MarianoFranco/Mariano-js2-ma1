import { getStorageItem } from './libs/localStorageHelpers.js';

let wishList = getStorageItem('wishList');

let wishMessage = document.querySelector('.wishlist__message');

if (wishList.length === 0) {
	wishMessage.style.display = 'block';
} else {
	wishMessage.style.display = 'none';
}

let wishListProducts = document.querySelector('.wishlist__products');

wishList.forEach((element) => {
	wishListProducts.innerHTML += `
    <div class="col-md-3 align-items-center card">
        <div class="card__img-container">
            <img src="${element.image}" class="card-img-top card__img" alt="${element.title}">
        </div>
        <div class="card-body text-center">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.price}</p>            
        </div>
    </div>
    `;
});
