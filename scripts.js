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
document.getElementById('footer-btn').addEventListener('click', function () {
  const email = document.getElementById('text-box').value;
  if (email) {
    alert(`E-mail enviado: ${email}`); // Aqui você pode adicionar a lógica para enviar o e-mail
  } else {
    alert('Por favor, digite seu e-mail.');
  }
});
let shop_toothpaste = document.getElementById('shop-toothpaste');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShopToothPaste = () => {
  return (shop_toothpaste.innerHTML = shopItemsDataToothpaste.map((x) => {
    let discountedPrice = x.old_price - (x.old_price * (x.discount / 100));
    let discountTag = x.discount > 0 ? `<span class="p-discount">${x.discount}% OFF</span>` : '';
    let oldPrice = x.discount > 0 ? `<span id="old-price">R$ ${x.old_price.toFixed(2)}</span>` : '';
    // let search = basket.find((x) => x.id === id) || []
    return `
        <div id="product-id-${x.id}" class="product-box" data-type="${x.type}">
        ${discountTag}
          <div class="p-img-container">
            <div class="p-img">
              <a>
                <img src="${x.img}" alt="${x.name}">
              </a>
            </div>
          </div>
          <div class="stars">
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <span class="stars-text">(24)</span>
          </div>
          <div class="p-box-text">
            <a class="product-title">${x.name}</a>
            <div class="price">
              ${oldPrice}
              <span class="p-price">R$ ${discountedPrice.toFixed(2)}</span>
            </div>
            <a onClick= "increment('${x.id}')" class="cart-btn" href ="carrinho.html">Adicionar ao Carrinho</a>
            <div id =${x.id} class="quantity"> 0 </div>
          </div>
        </div>
      `;
  }).join(""));
};

generateShopToothPaste();

let shop_brushes = document.getElementById('shop-brushes');

let generateShopBrushes = () => {
  return (shop_brushes.innerHTML = shopItemsDataBrushes.map((x) => {
    let discountedPrice = x.old_price - (x.old_price * (x.discount / 100));
    let discountTag = x.discount > 0 ? `<span class="p-discount">${x.discount}% OFF</span>` : '';
    let oldPrice = x.discount > 0 ? `<span id="old-price">R$ ${x.old_price.toFixed(2)}</span>` : '';
    // let search = basket.find((x) => x.id === id) || []
    return `
        <div id="product-id-${x.id}" class="product-box" data-type="${x.type}">
        ${discountTag}
          <div class="p-img-container">
            <div class="p-img">
              <a>
                <img src="${x.img}" alt="${x.name}">
              </a>
            </div>
          </div>
          <div class="stars">
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <span class="stars-text">(24)</span>
          </div>
          <div class="p-box-text">
            <a class="product-title">${x.name}</a>
            <div class="price">
              ${oldPrice}
              <span class="p-price">R$ ${discountedPrice.toFixed(2)}</span>
            </div>
            <a onClick= "increment('${x.id}')" class="cart-btn" href ="carrinho.html">Adicionar ao Carrinho</a>
            <div id =${x.id} class="quantity"> 0 </div>
          </div>
        </div>
      `;
  }).join(""));

};

generateShopBrushes();

let shop_others = document.getElementById('shop-others');

let generateShopOthers = () => {
  return (shop_others.innerHTML = shopItemsDataOthers.map((x) => {
    let discountedPrice = x.old_price - (x.old_price * (x.discount / 100));
    let discountTag = x.discount > 0 ? `<span class="p-discount">${x.discount}% OFF</span>` : '';
    let oldPrice = x.discount > 0 ? `<span id="old-price">R$ ${x.old_price.toFixed(2)}</span>` : '';
    // let search = basket.find((x) => x.id === id) || []
    return `
        <div id="product-id-${x.id}" class="product-box" data-type="${x.type}">
        ${discountTag}
          <div class="p-img-container">
            <div class="p-img">
              <a>
                <img src="${x.img}" alt="${x.name}">
              </a>
            </div>
          </div>
          <div class="stars">
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <i class="fas fa-star"> </i>
            <span class="stars-text">(24)</span>
          </div>
          <div class="p-box-text">
            <a class="product-title">${x.name}</a>
            <div class="price">
              ${oldPrice}
              <span class="p-price">R$ ${discountedPrice.toFixed(2)}</span>
            </div>
            <a onClick= "increment('${x.id}')" class="cart-btn" href ="carrinho.html">Adicionar ao Carrinho</a>
            <div id =${x.id} class="quantity"> 0 </div>
          </div>
        </div>
      `;
  }).join(""));

};

generateShopOthers();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  }
  else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem);
};



let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
};
const filters = document.querySelectorAll('#filters-list a');

filters.forEach(filter => {
  filter.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove a classe 'active' de todos os filtros
    filters.forEach(f => f.classList.remove('active'));

    // Adiciona a classe 'active' ao filtro clicado
    this.classList.add('active');

    // Filtra produtos com base no filtro selecionado
    const filterValue = this.getAttribute('data-filter');
    filterProducts(filterValue);
  });
});

function filterProducts(filter) {
  const allProducts = document.querySelectorAll('.product-box');

  allProducts.forEach(product => {
    const productType = product.getAttribute('data-type');

    if (filter === 'all' || productType === filter) {
      product.style.display = 'flex'; // Exibe o produto
    } else {
      product.style.display = 'none'; // Oculta o produto
    }
  });
}