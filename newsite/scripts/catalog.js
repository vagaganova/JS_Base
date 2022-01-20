'use strict'

const products = {
    '1':{
        name: 'Product 1',
        price: 132.00
    },
    '2':{
        name: 'Product 2',
        price: 12.00
    },
    '3':{
        name: 'Product 3',
        price: 157.00
    },
    '4':{
        name: 'Product 4',
        price: 100.00
    },
    '5':{
        name: 'Product 5',
        price: 11.00
    },
    '6':{
        name: 'Product 6',
        price: 32.00
    },
    '7':{
        name: 'Product 7',
        price: 39.00
    },
    '8':{
        name: 'Product 8',
        price: 124.00
    },
    '9':{
        name: 'Product 9',
        price: 19.00
    }
}

let cart = {};
let cartExplainElement = null;
let cartbadge = null;
let cartIcon = null

document.addEventListener('DOMContentLoaded',()=>{
    initCatalogPrices()
})

function initCatalogPrices() {
    let _catalogArticleCollection = document.querySelectorAll('.container.features_flex .features_item')
    cartExplainElement = document.getElementById('cart_explain')
    cartIcon = document.getElementById('cart_icon')
    cartIcon.addEventListener('click',displayExplainCart)
    document.addEventListener('click',()=>{
        cartExplainElement.style.display = 'none'
    })
    for(let _article of _catalogArticleCollection){
        let _pricespan = _article.querySelector('div.bord p:last-child span')
        let _articleId = _article.dataset['id']
        _pricespan.innerHTML = `$${products[_articleId].price.toFixed(2)}`
        _article.firstElementChild.addEventListener('click', addToCart)
    }
}

function addToCart(event) {
    let _articleTarget = event.target.parentElement;
    let bbox = cartIcon.getBoundingClientRect()
    let _articleId = _articleTarget.dataset['id'];
    if(cart.hasOwnProperty(_articleId)){
        cart[_articleId]++
    }
    else
        cart[_articleId] = 1
    let summary = Object.keys(cart).length
    if(summary){
        if (!cartbadge) {
            cartbadge = document.createElement('div')
            cartbadge.setAttribute('id','cart_badge')
            cartbadge.style.display = 'block'
            cartbadge.style.top = `${bbox.bottom}px`;
            cartbadge.style.left = `${bbox.right}px`;
            cartIcon.insertAdjacentElement('afterend',cartbadge)
        }
        cartbadge.innerText = summary

    }
}

function displayExplainCart(event) {
    event.stopPropagation()
    let bbox = cartIcon.getBoundingClientRect()
    cartExplainElement.style.display = 'block'
    cartExplainElement.style.top = `${bbox.bottom + 10}px`
    cartExplainElement.innerHTML = generateTable()
    document.addEventListener('click',hideExplainCart)

}

function hideExplainCart(event) {
    cartExplainElement.style.display = 'none'
    document.removeEventListener('click',hideExplainCart)
}

function generateTable(){
    let tablerows = []
    let sum = 0
    for (let key in cart){
        sum += products[key].price * cart[key]
        tablerows.push(`
            <tr>
                <td>${products[key].name}</td>
                <td>${cart[key]}</td>
                <td>$${products[key].price.toFixed(2)}</td>
                <td>$${(products[key].price * cart[key]).toFixed(2)}</td>
            </tr>
        `)
    }
    return `
        <table>
            <thead>
                <tr>
                    <th>Название<br>товара</th>
                    <th>Количество</th>
                    <th>Цена за шт.</th>
                    <th>Итого</th>
                </tr>
            </thead>
            <tbody>
                ${tablerows.join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">
                        Товаров в корзине на сумму:$${sum.toFixed(2)}
                    </td>
                </tr>
            </tfoot>
        </table>
    `
}
