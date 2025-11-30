// Carregar carrinho do localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Adicionar item ao carrinho
function addToCart(product) {
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    alert("Item adicionado ao carrinho!");
}

// Remover item do carrinho
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Renderizar carrinho na página carrinho.html
function renderCart() {
    const cartList = document.getElementById("cartList");
    const totalSpan = document.getElementById("totalPrice");

    // Se não estiver na página do carrinho, não renderiza
    if (!cartList || !totalSpan) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cartList.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border-bottom py-3">
                <div class="d-flex align-items-center gap-3">
                    <img src="${item.img}" width="70">
                    <div>
                        <h5>${item.name}</h5>
                        <p class="mb-0">R$ ${item.price.toFixed(2)}</p>
                        <small>Quantidade: ${item.qty}</small>
                    </div>
                </div>

                <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remover</button>
            </div>
        `;
    });

    totalSpan.innerText = "R$ " + total.toFixed(2);
}

// EVENTOS GERAIS
document.addEventListener("DOMContentLoaded", () => {

    // Botões de adicionar ao carrinho
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const product = {
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                img: btn.dataset.img
            };
            addToCart(product);
        });
    });

    // Renderiza o carrinho se estiver na página do carrinho
    renderCart();

    // Botão de finalizar compra
    const finalizarBtn = document.getElementById("finalizarCompraBtn");
    if (finalizarBtn) {
        finalizarBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }

            window.location.href = "finalizacao.html";
        });
    }
});
