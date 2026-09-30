const products = [

    {
        id: 1,
        name: "Superhero Action Figure",
        category: "Figurines",
        price: 4500,
        image: "IMAGES/action-figure.jpg"
    },

    {
        id: 2,
        name: "Anime Collector Figure",
        category: "Figurines",
        price: 5200,
        image: "IMAGES/anime-figure.jpg"
    },

    {
        id: 3,
        name: "Remote Control Car",
        category: "Toys",
        price: 6500,
        image: "IMAGES/rc-car.jpg"
    },

    {
        id: 4,
        name: "Teddy Bear",
        category: "Toys",
        price: 3000,
        image: "IMAGES/teddy-bear.jpg"
    },

    {
        id: 5,
        name: "Monopoly",
        category: "Board Games",
        price: 5000,
        image: "IMAGES/monopoly.jpg"
    },

    {
        id: 6,
        name: "Chess Set",
        category: "Board Games",
        price: 3500,
        image: "IMAGES/chess-set.jpg"
    },

    {
        id: 7,
        name: "Lamborghini Model Car",
        category: "Diecast Cars",
        price: 4800,
        image: "IMAGES/lamborghini.jpg"
    },

    {
        id: 8,
        name: "Classic Sports Model",
        category: "Diecast Cars",
        price: 4200,
        image: "IMAGES/sports-car.jpg"
    }

];


const KEYS = {

    cart:
        "toyHavenCart",

    wishlist:
        "toyHavenWishlist",

    orders:
        "toyHavenOrders",

    feedback:
        "toyHavenFeedback"

};



function getStorage(
    key
) {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    key
                )
            ) || []
        );

    }

    catch {

        return [];

    }

}



function saveStorage(
    key,
    value
) {

    localStorage.setItem(
        key,
        JSON.stringify(
            value
        )
    );

}



function formatPrice(
    value
) {

    return (
        "Rs. " +
        Number(
            value
        ).toLocaleString()
    );

}



function findProduct(
    id
) {

    return products.find(
        function (
            product
        ) {

            return (
                product.id ===
                Number(
                    id
                )
            );

        }
    );

}



/* =========================================
   TOAST MESSAGE
========================================= */

function showToast(
    message
) {

    let toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "toast";

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },

            2200
        );

}



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const navLinks =
    document.querySelector(
        ".nav-links"
    );


if (
    menuButton &&
    navLinks
) {

    menuButton.addEventListener(
        "click",
        function () {


            const open =
                navLinks.classList.toggle(
                    "active"
                );


            menuButton.classList.toggle(
                "active",
                open
            );


            menuButton.setAttribute(
                "aria-expanded",
                open
            );

        }
    );

}



/* =========================================
   CART
========================================= */

function addToCart(
    id
) {

    const product =
        findProduct(
            id
        );


    if (!product) {

        return;

    }


    const cart =
        getStorage(
            KEYS.cart
        );


    const existing =
        cart.find(
            function (
                item
            ) {

                return (
                    item.id ===
                    product.id
                );

            }
        );


    if (
        existing
    ) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity:
                1

        });

    }


    saveStorage(
        KEYS.cart,
        cart
    );


    showToast(
        product.name +
        " added to cart."
    );

}



/* =========================================
   WISHLIST
========================================= */

function addToWishlist(
    id
) {

    const product =
        findProduct(
            id
        );


    if (!product) {

        return;

    }


    const wishlist =
        getStorage(
            KEYS.wishlist
        );


    const exists =
        wishlist.some(
            function (
                item
            ) {

                return (
                    item.id ===
                    product.id
                );

            }
        );


    if (
        exists
    ) {

        showToast(
            product.name +
            " is already in favourites."
        );

        return;

    }


    wishlist.push({

        ...product,

        status:
            "Interested"

    });


    saveStorage(
        KEYS.wishlist,
        wishlist
    );


    showToast(
        product.name +
        " added to favourites."
    );

}



/* =========================================
   HERO BANNER
========================================= */

const heroTitle =
    document.getElementById(
        "heroTitle"
    );


const heroDescription =
    document.getElementById(
        "heroDescription"
    );


const heroDots =
    document.querySelectorAll(
        ".hero-dot"
    );


if (
    heroTitle &&
    heroDescription &&
    heroDots.length
) {

    const promotions = [

        {
            title:
                "Collect Your Favourite Figurines",

            description:
                "Discover exciting collectible figurines and characters at Toy Haven."
        },

        {
            title:
                "Fun Toys for Everyone",

            description:
                "Explore fun toys for children, families and gift shoppers."
        },

        {
            title:
                "Enjoy Amazing Board Games",

            description:
                "Bring family and friends together with exciting board games."
        },

        {
            title:
                "Discover Diecast Cars",

            description:
                "Explore detailed model cars for collectors and car lovers."
        }

    ];


    let index =
        0;


    setInterval(
        function () {


            heroTitle.classList.add(
                "hero-text-hide"
            );


            heroDescription.classList.add(
                "hero-text-hide"
            );


            setTimeout(
                function () {


                    index =
                        (
                            index + 1
                        ) %
                        promotions.length;


                    heroTitle.textContent =
                        promotions[
                            index
                        ].title;


                    heroDescription.textContent =
                        promotions[
                            index
                        ].description;


                    heroDots.forEach(
                        function (
                            dot,
                            dotIndex
                        ) {

                            dot.classList.toggle(
                                "active",
                                dotIndex ===
                                index
                            );

                        }
                    );


                    heroTitle.classList.remove(
                        "hero-text-hide"
                    );


                    heroDescription.classList.remove(
                        "hero-text-hide"
                    );


                },

                250
            );


        },

        4000
    );

}



/* =========================================
   PRODUCT OF DAY
========================================= */

const dailyProduct =
    document.getElementById(
        "dailyProductCard"
    );


if (
    dailyProduct
) {

    const today =
        new Date();


    const start =
        new Date(
            today.getFullYear(),
            0,
            0
        );


    const day =
        Math.floor(
            (
                today -
                start
            ) /
            86400000
        );


    const product =
        products[
            day %
            products.length
        ];


    dailyProduct.innerHTML = `

        <article class="daily-card">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="price">
                    ${formatPrice(product.price)}
                </p>

                <p>
                    Today's highlighted pick from
                    the Toy Haven collection.
                </p>

                <div class="daily-actions">

                    <button
                        class="add-cart-btn"
                        type="button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="add-wishlist-btn"
                        type="button"
                        onclick="addToWishlist(${product.id})"
                    >
                        Add to Favourites
                    </button>

                </div>

            </div>

        </article>

    `;

}



/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


if (
    newsletterForm
) {

    newsletterForm.addEventListener(
        "submit",
        function (
            event
        ) {


            event.preventDefault();


            const email =
                document.getElementById(
                    "newsletterEmail"
                );


            const message =
                document.getElementById(
                    "newsletterMessage"
                );


            const value =
                email.value.trim();


            const valid =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !valid.test(
                    value
                )
            ) {

                message.textContent =
                    "Please enter a valid email address.";


                message.style.color =
                    "#fca5a5";


                return;

            }


            localStorage.setItem(
                "newsletterEmail",
                value
            );


            message.textContent =
                "Thanks for subscribing!";


            message.style.color =
                "#86efac";


            newsletterForm.reset();

        }
    );

}



/* =========================================
   PRODUCTS PAGE
========================================= */

const productsGrid =
    document.getElementById(
        "productsGrid"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const sortSelect =
    document.getElementById(
        "sortSelect"
    );


const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


let selectedCategory =
    "all";



function displayProducts(
    list
) {

    if (
        !productsGrid
    ) {

        return;

    }


    productsGrid.innerHTML =
        "";


    if (
        list.length ===
        0
    ) {

        productsGrid.innerHTML = `

            <p
                style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:40px;
                "
            >
                No products found.
            </p>

        `;


        return;

    }


    list.forEach(
        function (
            product
        ) {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "card";


            card.innerHTML = `

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="card-body">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="price">
                        ${formatPrice(product.price)}
                    </p>

                    <div class="card-actions">

                        <button
                            class="add-cart-btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                        <button
                            class="add-wishlist-btn"
                            onclick="addToWishlist(${product.id})"
                        >
                            Favourite
                        </button>

                    </div>

                    <button
                        class="view-btn"
                        onclick="openProductModal(${product.id})"
                    >
                        View Details
                    </button>

                </div>

            `;


            productsGrid.appendChild(
                card
            );

        }
    );

}



function updateProducts() {

    if (
        !productsGrid
    ) {

        return;

    }


    const search =
        searchInput
            ?
        searchInput.value
            .toLowerCase()
            .trim()
            :
        "";


    let list =
        products.filter(
            function (
                product
            ) {


                const searchMatch =
                    product.name
                        .toLowerCase()
                        .includes(
                            search
                        );


                const categoryMatch =
                    selectedCategory ===
                        "all" ||

                    product.category ===
                        selectedCategory;


                return (
                    searchMatch &&
                    categoryMatch
                );

            }
        );


    if (
        sortSelect
    ) {


        if (
            sortSelect.value ===
            "nameAZ"
        ) {

            list.sort(
                function (
                    a,
                    b
                ) {

                    return a.name.localeCompare(
                        b.name
                    );

                }
            );

        }


        if (
            sortSelect.value ===
            "nameZA"
        ) {

            list.sort(
                function (
                    a,
                    b
                ) {

                    return b.name.localeCompare(
                        a.name
                    );

                }
            );

        }


        if (
            sortSelect.value ===
            "priceLow"
        ) {

            list.sort(
                function (
                    a,
                    b
                ) {

                    return (
                        a.price -
                        b.price
                    );

                }
            );

        }


        if (
            sortSelect.value ===
            "priceHigh"
        ) {

            list.sort(
                function (
                    a,
                    b
                ) {

                    return (
                        b.price -
                        a.price
                    );

                }
            );

        }

    }


    displayProducts(
        list
    );

}



if (
    productsGrid
) {

    displayProducts(
        products
    );

}



if (
    searchInput
) {

    searchInput.addEventListener(
        "input",
        updateProducts
    );

}



if (
    sortSelect
) {

    sortSelect.addEventListener(
        "change",
        updateProducts
    );

}



filterButtons.forEach(
    function (
        button
    ) {

        button.addEventListener(
            "click",
            function () {


                filterButtons.forEach(
                    function (
                        item
                    ) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                updateProducts();

            }
        );

    }
);



/* =========================================
   PRODUCT MODAL
========================================= */

const productModal =
    document.getElementById(
        "productModal"
    );


const modalContent =
    document.getElementById(
        "modalProductContent"
    );



function openProductModal(
    id
) {

    if (
        !productModal ||
        !modalContent
    ) {

        return;

    }


    const product =
        findProduct(
            id
        );


    modalContent.innerHTML = `

        <div class="modal-product">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <p class="product-category">
                    ${product.category}
                </p>

                <h2>
                    ${product.name}
                </h2>

                <p class="price">
                    ${formatPrice(product.price)}
                </p>

                <p>
                    This product is part
                    of the Toy Haven
                    ${product.category}
                    collection.
                </p>

                <div class="daily-actions">

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="add-wishlist-btn"
                        onclick="addToWishlist(${product.id})"
                    >
                        Add to Favourites
                    </button>

                </div>

            </div>

        </div>

    `;


    productModal.classList.add(
        "active"
    );

}



function closeProductModal() {

    if (
        productModal
    ) {

        productModal.classList.remove(
            "active"
        );

    }

}



const closeModalButton =
    document.getElementById(
        "closeModal"
    );


if (
    closeModalButton
) {

    closeModalButton.addEventListener(
        "click",
        closeProductModal
    );

}



/* =========================================
   CART PAGE
========================================= */

const cartBody =
    document.getElementById(
        "cartTableBody"
    );


const cartContent =
    document.getElementById(
        "cartContent"
    );


const cartEmpty =
    document.getElementById(
        "cartEmpty"
    );


const cartTotal =
    document.getElementById(
        "cartGrandTotal"
    );



function displayCart() {

    if (
        !cartBody
    ) {

        return;

    }


    const cart =
        getStorage(
            KEYS.cart
        );


    cartBody.innerHTML =
        "";


    if (
        cart.length ===
        0
    ) {

        cartContent.style.display =
            "none";


        cartEmpty.style.display =
            "block";


        return;

    }


    cartContent.style.display =
        "block";


    cartEmpty.style.display =
        "none";


    let total =
        0;


    cart.forEach(
        function (
            item,
            index
        ) {


            const subtotal =
                item.price *
                item.quantity;


            total +=
                subtotal;


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <div class="cart-product">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <p class="product-category">
                                ${item.category}
                            </p>

                            <button
                                class="remove-link"
                                onclick="removeCartItem(${index})"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="quantity-control">

                        <button
                            onclick="changeCartQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeCartQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                </td>


                <td>
                    ${formatPrice(item.price)}
                </td>


                <td>
                    ${formatPrice(subtotal)}
                </td>

            `;


            cartBody.appendChild(
                row
            );

        }
    );


    cartTotal.textContent =
        formatPrice(
            total
        );

}



function changeCartQuantity(
    index,
    change
) {

    const cart =
        getStorage(
            KEYS.cart
        );


    if (
        !cart[index]
    ) {

        return;

    }


    cart[index].quantity +=
        change;


    if (
        cart[index].quantity <=
        0
    ) {

        cart.splice(
            index,
            1
        );

    }


    saveStorage(
        KEYS.cart,
        cart
    );


    displayCart();

}



function removeCartItem(
    index
) {

    const cart =
        getStorage(
            KEYS.cart
        );


    cart.splice(
        index,
        1
    );


    saveStorage(
        KEYS.cart,
        cart
    );


    displayCart();

}



const clearCart =
    document.getElementById(
        "clearCartButton"
    );


if (
    clearCart
) {

    clearCart.addEventListener(
        "click",
        function () {


            localStorage.removeItem(
                KEYS.cart
            );


            displayCart();

        }
    );

}



displayCart();



/* =========================================
   CHECKOUT
========================================= */

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );


const checkoutCount =
    document.getElementById(
        "checkoutItemCount"
    );


const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


const checkoutContent =
    document.getElementById(
        "checkoutContent"
    );


const checkoutEmpty =
    document.getElementById(
        "checkoutEmpty"
    );


const checkoutSuccess =
    document.getElementById(
        "checkoutSuccess"
    );



function displayCheckout() {

    if (
        !checkoutItems
    ) {

        return;

    }


    const cart =
        getStorage(
            KEYS.cart
        );


    checkoutItems.innerHTML =
        "";


    if (
        cart.length ===
        0
    ) {

        checkoutContent.style.display =
            "none";


        checkoutEmpty.style.display =
            "block";


        return;

    }


    checkoutContent.style.display =
        "grid";


    checkoutEmpty.style.display =
        "none";


    let count =
        0;


    let total =
        0;


    cart.forEach(
        function (
            item
        ) {


            const subtotal =
                item.price *
                item.quantity;


            count +=
                item.quantity;


            total +=
                subtotal;


            const line =
                document.createElement(
                    "div"
                );


            line.className =
                "checkout-item";


            line.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p class="product-category">
                        Qty:
                        ${item.quantity}
                    </p>

                </div>

                <strong>
                    ${formatPrice(subtotal)}
                </strong>

            `;


            checkoutItems.appendChild(
                line
            );

        }
    );


    checkoutCount.textContent =
        count;


    checkoutTotal.textContent =
        formatPrice(
            total
        );

}



displayCheckout();



const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


if (
    checkoutForm
) {

    checkoutForm.addEventListener(
        "submit",
        function (
            event
        ) {


            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "fullName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "checkoutEmail"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "deliveryAddress"
                    )
                    .value
                    .trim();


            const payment =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            const nameError =
                document.getElementById(
                    "nameError"
                );


            const emailError =
                document.getElementById(
                    "emailError"
                );


            const addressError =
                document.getElementById(
                    "addressError"
                );


            const paymentError =
                document.getElementById(
                    "paymentError"
                );


            nameError.textContent =
                "";


            emailError.textContent =
                "";


            addressError.textContent =
                "";


            paymentError.textContent =
                "";


            let valid =
                true;


            if (
                name.length <
                2
            ) {

                nameError.textContent =
                    "Please enter your full name.";


                valid =
                    false;

            }


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    email
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email.";


                valid =
                    false;

            }


            if (
                address.length <
                5
            ) {

                addressError.textContent =
                    "Please enter your delivery address.";


                valid =
                    false;

            }


            if (
                !payment
            ) {

                paymentError.textContent =
                    "Please select a payment method.";


                valid =
                    false;

            }


            if (
                !valid
            ) {

                return;

            }


            const cart =
                getStorage(
                    KEYS.cart
                );


            const orders =
                getStorage(
                    KEYS.orders
                );


            const total =
                cart.reduce(
                    function (
                        sum,
                        item
                    ) {

                        return (
                            sum +
                            item.price *
                            item.quantity
                        );

                    },

                    0
                );


            orders.push({

                orderId:
                    Date.now(),

                fullName:
                    name,

                email:
                    email,

                deliveryAddress:
                    address,

                paymentMethod:
                    payment.value,

                products:
                    cart,

                total:
                    total,

                date:
                    new Date()
                        .toLocaleString()

            });


            saveStorage(
                KEYS.orders,
                orders
            );


            localStorage.removeItem(
                KEYS.cart
            );


            checkoutForm.reset();


            checkoutContent.style.display =
                "none";


            checkoutEmpty.style.display =
                "none";


            checkoutSuccess.classList.add(
                "show"
            );


        }
    );

}



/* =========================================
   WISHLIST PAGE
========================================= */

const wishlistGrid =
    document.getElementById(
        "wishlistGrid"
    );


const wishlistEmpty =
    document.getElementById(
        "wishlistEmpty"
    );


const wishlistNoResults =
    document.getElementById(
        "wishlistNoResults"
    );


const wishlistFilters =
    document.querySelectorAll(
        ".wishlist-filter"
    );


let wishlistStatus =
    "all";



function displayWishlist() {

    if (
        !wishlistGrid
    ) {

        return;

    }


    const wishlist =
        getStorage(
            KEYS.wishlist
        );


    if (
        wishlist.length ===
        0
    ) {

        wishlistGrid.style.display =
            "none";


        wishlistEmpty.style.display =
            "block";


        wishlistNoResults.style.display =
            "none";


        return;

    }


    wishlistEmpty.style.display =
        "none";


    let filtered =
        wishlist;


    if (
        wishlistStatus !==
        "all"
    ) {

        filtered =
            wishlist.filter(
                function (
                    item
                ) {

                    return (
                        item.status ===
                        wishlistStatus
                    );

                }
            );

    }


    if (
        filtered.length ===
        0
    ) {

        wishlistGrid.style.display =
            "none";


        wishlistNoResults.style.display =
            "block";


        return;

    }


    wishlistNoResults.style.display =
        "none";


    wishlistGrid.style.display =
        "grid";


    wishlistGrid.innerHTML =
        "";


    filtered.forEach(
        function (
            product
        ) {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "card";


            card.innerHTML = `

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="card-body">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="price">
                        ${formatPrice(product.price)}
                    </p>

                    <div class="status-area">

                        <label>
                            Collection Status
                        </label>

                        <select
                            class="status-select"
                            onchange="
                                changeWishlistStatus(
                                    ${product.id},
                                    this.value
                                )
                            "
                        >

                            <option
                                value="Interested"
                                ${
                                    product.status ===
                                    "Interested"
                                        ?
                                    "selected"
                                        :
                                    ""
                                }
                            >
                                Interested
                            </option>

                            <option
                                value="Owned"
                                ${
                                    product.status ===
                                    "Owned"
                                        ?
                                    "selected"
                                        :
                                    ""
                                }
                            >
                                Owned
                            </option>

                            <option
                                value="Not Interested"
                                ${
                                    product.status ===
                                    "Not Interested"
                                        ?
                                    "selected"
                                        :
                                    ""
                                }
                            >
                                Not Interested
                            </option>

                        </select>

                    </div>

                    <div class="card-actions">

                        <button
                            class="add-cart-btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                        <button
                            class="add-wishlist-btn"
                            onclick="removeWishlistItem(${product.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;


            wishlistGrid.appendChild(
                card
            );

        }
    );

}



function changeWishlistStatus(
    id,
    status
) {

    const wishlist =
        getStorage(
            KEYS.wishlist
        );


    const product =
        wishlist.find(
            function (
                item
            ) {

                return (
                    item.id ===
                    Number(
                        id
                    )
                );

            }
        );


    if (
        product
    ) {

        product.status =
            status;


        saveStorage(
            KEYS.wishlist,
            wishlist
        );


        displayWishlist();

    }

}



function removeWishlistItem(
    id
) {

    const wishlist =
        getStorage(
            KEYS.wishlist
        ).filter(
            function (
                item
            ) {

                return (
                    item.id !==
                    Number(
                        id
                    )
                );

            }
        );


    saveStorage(
        KEYS.wishlist,
        wishlist
    );


    displayWishlist();

}



wishlistFilters.forEach(
    function (
        button
    ) {

        button.addEventListener(
            "click",
            function () {


                wishlistFilters.forEach(
                    function (
                        item
                    ) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                wishlistStatus =
                    button.dataset.status;


                displayWishlist();

            }
        );

    }
);



displayWishlist();



/* =========================================
   FEEDBACK
========================================= */

const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );


if (
    feedbackForm
) {

    feedbackForm.addEventListener(
        "submit",
        function (
            event
        ) {


            event.preventDefault();


            const name =
                document.getElementById(
                    "feedbackName"
                );


            const email =
                document.getElementById(
                    "feedbackEmail"
                );


            const message =
                document.getElementById(
                    "feedbackMessage"
                );


            const nameError =
                document.getElementById(
                    "feedbackNameError"
                );


            const emailError =
                document.getElementById(
                    "feedbackEmailError"
                );


            const messageError =
                document.getElementById(
                    "feedbackMessageError"
                );


            const success =
                document.getElementById(
                    "feedbackSuccess"
                );


            nameError.textContent =
                "";


            emailError.textContent =
                "";


            messageError.textContent =
                "";


            let valid =
                true;


            if (
                name.value
                    .trim()
                    .length <
                2
            ) {

                nameError.textContent =
                    "Please enter your full name.";


                valid =
                    false;

            }


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    email.value.trim()
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email.";


                valid =
                    false;

            }


            if (
                message.value
                    .trim()
                    .length <
                10
            ) {

                messageError.textContent =
                    "Please enter at least 10 characters.";


                valid =
                    false;

            }


            if (
                !valid
            ) {

                return;

            }


            const feedback =
                getStorage(
                    KEYS.feedback
                );


            feedback.push({

                name:
                    name.value.trim(),

                email:
                    email.value.trim(),

                message:
                    message.value.trim(),

                date:
                    new Date()
                        .toLocaleString()

            });


            saveStorage(
                KEYS.feedback,
                feedback
            );


            feedbackForm.reset();


            success.style.display =
                "block";


            setTimeout(
                function () {

                    success.style.display =
                        "none";

                },

                4500
            );


        }
    );

}



/* =========================================
   FAQ
========================================= */

document
    .querySelectorAll(
        ".faq-question"
    )
    .forEach(
        function (
            question
        ) {

            question.addEventListener(
                "click",
                function () {


                    const item =
                        question.parentElement;


                    const open =
                        !item.classList.contains(
                            "active"
                        );


                    document
                        .querySelectorAll(
                            ".faq-item"
                        )
                        .forEach(
                            function (
                                faq
                            ) {

                                faq.classList.remove(
                                    "active"
                                );


                                const symbol =
                                    faq.querySelector(
                                        ".faq-symbol"
                                    );


                                if (
                                    symbol
                                ) {

                                    symbol.textContent =
                                        "+";

                                }

                            }
                        );


                    if (
                        open
                    ) {

                        item.classList.add(
                            "active"
                        );


                        const symbol =
                            item.querySelector(
                                ".faq-symbol"
                            );


                        if (
                            symbol
                        ) {

                            symbol.textContent =
                                "−";

                        }

                    }


                }
            );

        }
    );



/* =========================================
   SCROLL ANIMATION
========================================= */

if (
    "IntersectionObserver" in
    window
) {

    const observer =
        new IntersectionObserver(
            function (
                entries
            ) {

                entries.forEach(
                    function (
                        entry
                    ) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold:
                    0.12
            }
        );


    document
        .querySelectorAll(
            ".reveal"
        )
        .forEach(
            function (
                element
            ) {

                observer.observe(
                    element
                );

            }
        );

}