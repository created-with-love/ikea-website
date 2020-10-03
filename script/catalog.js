import generateSubCatalog from './generateSubCatalog.js';
import { getData } from './getData.js';

export const catalog = () => {
    const updateSubCatalog = generateSubCatalog();

    const btnBurger = document.querySelector('.btn-burger');
    const btnClose = document.querySelector('.btn-close');
    const catalog = document.querySelector('.catalog');
    const subCatalog = document.querySelector('.subcatalog');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);

    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        closeSubMenu();
        catalog.classList.remove('open');
        overlay.classList.remove('active');
    };

    const handlerCatalog = event => {
        event.preventDefault();

        const itemList = event.target.closest('.catalog-list__item>a');
        if (itemList) {
            getData.subCatalog(itemList.textContent, data => {
                updateSubCatalog(itemList.textContent, data);
                subCatalog.classList.add('subopen');
            });            
        }

        if (event.target.closest('.btn-close')) {
            closeMenu();
        }
    };

    const closeSubMenu = event => {
        subCatalog.classList.remove('subopen');
    };

    btnBurger.addEventListener('click', openMenu);
    catalog.addEventListener('click', handlerCatalog);
    subCatalog.addEventListener('click', event => {
        const btnReturn = event.target.closest('.btn-return');

        if (btnBurger) closeSubMenu();
     });

    btnClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
            closeMenu();
        }
    })

};


