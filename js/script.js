
// product management system global variables
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.querySelector(".submit")
let clear = document.querySelector(".clear")
let total_products = document.querySelector(".total-products p")
let iTemp;
let mode = "create";

/*  
 * start product management system functionality 
 */ 
// get total
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value) - +discount.value
        total.innerHTML = result
    }
}

// create product
let products;
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product)
} else {
    products = [];
}


submit.addEventListener("click", function () {

    let newProduct = {
        id: new Date().getTime(),
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value !== "" && price.value !== "" && newProduct.count < 100) {
        
        if (mode === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    products.push(newProduct)
                }
            } else {
                products.push(newProduct)
                mode = 'create'
                submit.innerHTML = "create"
                count.style.display = "block"
            }
        } else {
            products[iTemp] = newProduct
        }
        clearInputs()
    }
    // save local storage
    localStorage.setItem("product", JSON.stringify(products))
    console.log(products);
    showData()
    
});
// clear inputs
function clearInputs() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    discount.value = ""
    count.value = ""
    category.value = ""
    total.innerHTML = "0"
}
// read

function showData() {
    let table = '';
    for (let i = 0; i < products.length; i++){
        table += `
        <tr class="table-row">
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onClick="updateData(${i})"  id="update">update <i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button onClick="deleteProduct(${i})"  id="delete">delete <i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
        `
        
    }
    document.getElementById("t_body").innerHTML = table;
    total_products.innerHTML = products.length
    if (products.length > 0) {
        clear.innerHTML = `
            <button class="clear_btn" onClick="clearAll()">clear</button>
        `
    } else {
        clear.innerHTML = ""
    }
    getTotal()
}
showData()

// delete
function deleteProduct(i) {
    
    products.splice(i,1)
    // update local storage
    localStorage.product = JSON.stringify(products)
    // update ui
    showData()
}

// delete all 
function clearAll() {
    products = []
    localStorage.clear()
    showData()
}



// update

function updateData(i) {
    title.value = products[i].title
    price.value = products[i].price
    taxes.value = products[i].taxes
    discount.value = products[i].discount
    count.style.display = "none"
    category.value = products[i].category
    getTotal()
    submit.innerHTML = "update"
    mode = "update"
    iTemp = i;
    scroll({
        top: 0 ,
        behavior:"smooth"
    })
}

// search
let searchMode = "title";
function getSearchMode(id) {
    let search = document.getElementById("search")
    if (id == "search_title") {
        searchMode = "title";
    } else {
        searchMode = "category";
    }
    search.placeholder = `search by ${searchMode}` ;
    search.focus()
    search.value = "";
    showData()
    console.log(searchMode);
}


function search(value) {
    let table = '';
    for (let i = 0; i < products.length; i++) { 
        if (searchMode === "title") {
            if (products[i].title.includes(value.toLowerCase())) {
                table += `
                <tr class="table-row">
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onClick="updateData(${i})"  id="update">update <i class="fa-solid fa-pen-to-square"></i></button></td>
                    <td><button onClick="deleteProduct(${products[i].id})"  id="delete">delete <i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
                `
            }
                } else {  
                if (products[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr class="table-row">
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onClick="updateData(${i})"  id="update">update <i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button onClick="deleteProduct(${products[i].id})"  id="delete">delete <i class="fa-solid fa-trash-can"></i></button></td>
                    </tr>
            `
                }
        }
                
    }

    document.getElementById("t_body").innerHTML = table;
}

/*  
 * end product management system functionality 
 */


const user = document.querySelector(".user h2 span")

const params = new URLSearchParams(window.location.search)
params.get("username")
user.append(params.get("username"))
// params.forEach((value, key) => {
//     user.append(`${key} = ${value}`)
//     console.log(value);
// })


let outputs = document.querySelector(".outputs")
let table = document.getElementById("table")

let pressed = false;
let startx;
let x;

outputs.addEventListener("mousedown", (e) => {
    pressed = true;
    startx = e.offsetX - table.offsetLeft;
    console.log(startx);
    outputs.style.cursor = "grabbing"
})

outputs.addEventListener("mouseenter", () => {
    outputs.style.cursor = "grab"
})
outputs.addEventListener("mouseup", () => {
    outputs.style.cursor = "grab"
})
window.addEventListener("mouseup", () => {
    pressed = false;
})
outputs.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    table.style.left = `${x - startx}px`
    checkboundry()
})

function checkboundry() {
    let outer = outputs.getBoundingClientRect();
    let inner = table.getBoundingClientRect();
    if (parseInt(table.style.left )> 0) {
        table.style.left = "0px"
    } else if (inner.right < outer.right) {
        table.style.left = `-${inner.width - outer.width}px`
    }
}
