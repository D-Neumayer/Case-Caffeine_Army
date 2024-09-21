//       Configuração da Barra Lateral //
const openMenu = document.querySelector('#show-menu')
const hideMenuIcon = document.querySelector('#hide-menu')
const sideMenu = document.querySelector('#nav-menu')


openMenu.addEventListener('click', function () {
    if (!sideMenu.classList.contains('active')) {
        sideMenu.classList.add('active');
    }
});

hideMenuIcon.addEventListener('click', function () {
    if (sideMenu.classList.contains('active')) {
        sideMenu.classList.remove('active');
    }
});

//          Configuração do Carrinho         //


let label = document.getElementById('label');

let ShoppingCart = document.getElementById('shopping-cart');

let PriceTotal = document.getElementById('price-total');

let basket = JSON.parse(localStorage.getItem("data")) || [];



let generateCartItems = () => {
    if (basket.length !== 0) {
        console.log("Basket is not empty");
        return (ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;

            let search = shopItemsDataBrushes.find((y) => y.id === id);

            if (!search) {
                search = shopItemsDataToothpaste.find((y) => y.id === id);
            }

            if (!search) return '';

            let discountedPrice = search.old_price - (search.old_price * (search.discount / 100));

            return `
                <tr>
                    <td><a"><i class="far fa-times-circle" onclick="removeItem(${id})"></i></a></td>
                    <td><img src=${search.img} alt=""></td>
                    <td>${search.name}</td>
                    <td>R$ ${discountedPrice.toFixed(2)}</td>
                    <td>
                        <div class="quantity-div">
                            <button  onClick= "increment('${x.id}')" class="fa-solid fa-plus"></button>
                            <div id="${x.id}" class="quantity">${item}</div>
                            <button class="fa-solid fa-minus" onClick= "decrement('${x.id}')" ></button>
                        </div>
                    </td>
                    <td>R$ ${(item * discountedPrice).toFixed(2)}</td>
                </tr>
            `;
        }).join(""));

    }
    else {
        console.log("Basket is empty");
        ShoppingCart.innerHTML = `
        `
        label.innerHTML = `
        <h2>O Carrinho Está Vazio</h2>
        <a href ="index.html">
            <button class = "home-btn">Voltar para a Home</button>
        </a> 
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);

    if (!search) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        search.item += 1;  // Incrementa a quantidade
    }
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if (!search) return;
    if (search.item === 0) return;

    search.item -= 1;

    if (search.item === 0) {
        basket = basket.filter((x) => x.id !== id);
    }
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search) {
        console.log(search.item);
        document.getElementById(id).innerHTML = search.item;  // Atualiza a quantidade
    }
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
};

let TotalAmount = () => {
    if (basket.length === 0) {
        PriceTotal.innerHTML = `
            <tr>
                <td>Subtotal</td>
                <td>R$ 0</td>
            </tr>
            <tr>
                <td>Frete</td>
                <td>Gratis</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>R$ 0</strong></td>
            </tr>
        `;
        return; // Sai da função se o carrinho estiver vazio
    }
    let amount = basket.map((x) => {
        let { item, id } = x;
        let search = shopItemsDataBrushes.find((y) => y.id === id);


        if (!search) {
            search = shopItemsDataToothpaste.find((y) => y.id === id);
            let discountedPrice = search.old_price - (search.old_price * (search.discount / 100));
            return item * discountedPrice;
        }
        if (!search) return 0;

        let discountedPrice = search.old_price - (search.old_price * (search.discount / 100));
        return item * discountedPrice;
    }).reduce((x, y) => x + y, 0)
    console.log(amount);

    PriceTotal.innerHTML = `
        <tr>
                    <td>Subtotal</td>
                    <td>R$ ${amount.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Frete</td>
                    <td>Gratis</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>R$ ${amount.toFixed(2)}</strong></td>
                </tr>
        `;

};


TotalAmount();