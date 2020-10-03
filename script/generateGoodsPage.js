import {getData} from './getData.js';
import userData from './userData.js';

const COUNTER = 6;
let blankListMessage = '';

const generateGoodsPage = () => {
    const mainHeader = document.querySelector('.main-header');
    
    const generateCards = (data) => {
        const goodsList = document.querySelector('.goods-list');
        
        let listHTML = '';

        // Each query result-list
        data.forEach( item => {
            const { name: itemName, count, id, img, description, price } = item;
            
            listHTML += `
                <li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src="${img[0]}"
									${img[1] ? `data-second-image="${img[1]}"` : ''} alt="${itemName}">
							</div>
                            ${count > COUNTER ?
                                '<p class="goods-item__new">Новинка</p>' :
                                ''}
                            ${!count ?
                                '<p class="goods-item__new">Нет в наличии</p>' :
                                ''}
							<h3 class="goods-item__header">${itemName}</h3>
							<p class="goods-item__description">${description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${price}</span>
								<span class="goods-item__currency"> ₽</span>
                            </p>
                            ${count ?
                                `<button class="btn btn-add-card" 
                                    aria-label="Добравить в корзину"
                                    data-idd="${id}"></button>` :
                                ''} 
						</article>
					</a>
				</li>
            `;
        });

        // IF result-list is empty
        if (listHTML === '') {
            listHTML = '<li>' + blankListMessage + '</li>';
        }

        // add view
        goodsList.textContent = '';
        goodsList.insertAdjacentHTML('afterbegin', listHTML);

        goodsList.addEventListener('click', (e) => {
            const btnAddCard = e.target.closest('.btn-add-card');
            if (btnAddCard) {
                e.preventDefault();
                userData.cartList = btnAddCard.dataset.idd;
            }
        });
        
    };

    // Query routes
    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        let value = search.split('=')[1];

        if (prop === 's') {
            if (value.includes("+")) value = value.split("+").join(" ");

            mainHeader.textContent = `Поиск: ${value}`;
            blankListMessage = 'По вашему запросу ничего не найдено!';
            getData.search(value, generateCards);
        } else if (prop === 'wishlist') {
            mainHeader.textContent = `Список желаний`;
            blankListMessage = 'Ваш список желаний пуст!';
            getData.wishList(userData.wishList, generateCards);
        } else if (prop === 'cat' || prop === 'subcat') {
            mainHeader.textContent = value;
            blankListMessage = 'В этой категории пусто!';
            getData.category(prop, value, generateCards);
        }
    }
};

export default generateGoodsPage