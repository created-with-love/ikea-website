import { getLocalStorage, setLocalStorage } from './storage.js';

const userData = {
    whishListData: getLocalStorage('wishList'),
    get wishList() {
        return this.whishListData;
    },
    set wishList(id) {
        if (this.whishListData.includes(id)) {
            const index = this.whishListData.indexOf(id);
            this.whishListData.splice(index, 1);
        } else {
            this.whishListData.push(id);
        } 

        setLocalStorage('wishList', this.whishListData);
    },

    cartListData: getLocalStorage('cartList'),
    get cartList() {
        return this.cartListData;
    },
    set cartList(id) {
        let obj = this.cartListData.find(item => item.id === id);

        if (obj) {
            obj.count++;
        } else {
            obj = {
                id,
                count: 1,
            };
            this.cartListData.push(obj);
        }
        
        setLocalStorage('cartList', this.cartList);
    },
    set changeCountCartList(itemCart) {
        let obj = this.cartListData.find(item => item.id === itemCart.id);
        obj.count = itemCart.count;
        
        setLocalStorage('cartList', this.cartList);
    },
    set deleteItemCart(idd) {
        let index = -1;
        this.cartList.forEach((item, i) => {
            if (item.id === idd) {
                index = i;
            }
        });
        this.cartList.splice(index, 1);
        
        setLocalStorage('cartList', this.cartList);
    },
};

export default userData;