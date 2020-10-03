import { getData } from './getData.js';
import userData from './userData.js';

const generateCartPage = () => {
    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const cartData = userData.cartList;

    const renderCart = (data) => {
        let listHTML = '';
        let totalCartPrice = 0;

        // Each query result-list
        data.forEach(({ count, description, name: itemName, price, id, img }) => {
            let itemCartCount = cartData.find((item) => item.id === id).count;
            itemCartCount = itemCartCount >= count ? count : itemCartCount;
            totalCartPrice += price * itemCartCount;
            let quantityList = '';

            const priceRegular = itemCartCount > 1 ?
                `<div class="product__price-regular">${price}</div>` :
                '';
            
            for (let i = 1; i <= count; i++) { 
                const selected = itemCartCount === i ? 'selected' : '';
                quantityList += `
                    <option value="${i}" ${selected}>${i}</option>
                `;                
            }

            listHTML += `
                <li class="cart-item">
                    <div class="product">
                        <div class="product__image-container">
                            <img src="${img[0]}" alt="${itemName}" aria-describedby="aria_product_description_40366083" itemprop="image">
                        </div>
                        <div class="product__description">
                            <h3 class="product__name">
                                <a href="card.html#${id}">${itemName}</a></h3>
                            <p class="product_description-text">${description}</p>
                        </div>
                        <div class="product__prices">
                            <div class="product__price-type product__price-type-regular">
                                <div>
                                    <div class="product__total product__total-regular">${price * itemCartCount}</div>
                                    ${priceRegular}
                                </div>
                            </div>
                        </div>
                        <div class="product__controls">
                            <div class="product-controls__remove">
                                <button type="button" class="btn btn-remove" data-idd="${id}">
                                    <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                </button>
                            </div>
                            <div class="product-controls__quantity">
                                <select title="Выберите количество" aria-label="Выберите количество" data-idd="${id}">
                                    ${quantityList}
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        });

        // add view
        cartList.textContent = '';
        cartList.insertAdjacentHTML('afterbegin', listHTML);
        cartTotalPrice.textContent = totalCartPrice;

    }

    if (location.pathname.includes('cart')) {
        getData.cart(userData.cartList, renderCart);

        cartList.addEventListener('change', (e) => {
            userData.changeCountCartList = {
                id: e.target.dataset.idd,
                count: parseInt(e.target.value),
            };
            getData.cart(userData.cartList, renderCart);
        });

        cartList.addEventListener('click', (e) => {
            const target = e.target;
            const btnRemove = target.closest('.btn-remove');

            if (btnRemove) {
                userData.deleteItemCart = btnRemove.dataset.idd;
                getData.cart(userData.cartList, renderCart);
            }            
        });
    }

};

export default generateCartPage;