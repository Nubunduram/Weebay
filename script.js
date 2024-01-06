document.addEventListener("DOMContentLoaded", function () {

    let items = [
        // Manga Array
        [
            {
                name: "Chainsaw Man",
                author: "Tatsuki Fujimoto",
                volume: 1,
                price: 15,
                cents: 0,
                category: "Manga",
                available: true,
                src: "/assets/chainsawman.png",
                alt: "Photo Chainsaw Man Manga 1"
            },
            {
                name: "Chainsaw Man",
                author: "Tatsuki Fujimoto",
                volume: 2,
                price: 15,
                cents: 0,
                category: "Manga",
                available: false,
                src: "/assets/op1.png",
                alt: "Photo Chainsaw Man Manga 2"
            },
            {
                name: "Chainsaw Man",
                author: "Tatsuki Fujimoto",
                volume: 3,
                price: 15,
                cents: 0,
                category: "Manga",
                available: true,
                src: "/assets/op2.png",
                alt: "Photo Chainsaw Man Manga 3"
            }
        ],
        // Trading Cards Array
        [
            {
                name: "Dracaufeu EX",
                version: "French",
                rarity: "Ultra Rare",
                price: 2500,
                cents: 0,
                category: "Trading Cards",
                available: true,
                src: "/assets/psykokwak.png",
                alt: "Photo Carte Dracaufeu EX"
            }
        ],
        // Video Games Array
        [
            {
                name: "Super Mario",
                console: "Nintendo Switch",
                pegi: "7",
                price: 50,
                cents: 0,
                category: "Video Games",
                available: true,
                src: "/assets/logo-weebay.png",
                alt: "Photo Super Mario Switch"
            }
        ],
        // Collector Array
        [
            {
                name: "Parasite Coffret Integrale",
                description: "Edition Originale",
                price: 89,
                cents: 99,
                category: "Collector",
                available: true,
                src: "/assets/one-piece-logo.png",
                alt: "Photo Coffret Integrale Parasite"
            }
        ]
    ];

    const carousel = document.querySelector(".carousel");

    function createItemElement(item, stockStatusClass, stockPointClass) {
        let itemElement = document.createElement("div");
        itemElement.className = "item-carousel";

        let itemImg = createItemImage(item, stockStatusClass, stockPointClass);
        let itemDescription = createItemDescription(item);

        itemElement.appendChild(itemImg);
        itemElement.appendChild(itemDescription);

        return itemElement;
    }

    function createItemImage(item, stockStatusClass, stockPointClass) {
        let itemImg = document.createElement("div");
        itemImg.className = "item-img";
        itemImg.innerHTML = `
            <img src="${item.src}" alt="${item.alt}">
            <div>
                <p class="${stockStatusClass}">Stock</p>
                <div class="${stockPointClass}"></div>
            </div>
        `;
        return itemImg;
    }

    function createItemDescription(item) {
        let itemDescription = document.createElement("div");
        let centsString = item.cents < 10 ? "0" + item.cents : item.cents.toString();
        itemDescription.className = "item-description";
        itemDescription.innerHTML = `
            <h3>${item.name}</h3>
            ${getItemDescriptionDetails(item)}
            <p class="price">${item.price}<span class="cents">${centsString}</span>€</p>
            `;
        return itemDescription;
    }

    function getItemDescriptionDetails(item) {
        switch (item.category) {
            case "Manga":
                return `<p>Volume ${item.volume}</p><p>Author - ${item.author}</p>`;
            case "Trading Cards":
                return `<p>${item.version} Version</p><p>Rarity: ${item.rarity}</p>`;
            case "Video Games":
                return `<p>${item.console}</p><p>PEGI ${item.pegi}+</p>`;
            case "Collector":
                return `<p>${item.description}</p>`;
            default:
                return "";
        }
    }

    items.forEach(function (category) {
        category.forEach(function (item) {
            let stockStatusClass = item.available ? "available" : "unavailable";
            let stockPointClass = item.available ? "available-stock-point" : "unavailable-stock-point";

            let itemElement = createItemElement(item, stockStatusClass, stockPointClass);
            carousel.appendChild(itemElement);
        });
    });

    const categoryButtons = document.querySelectorAll('.filter-button');

    function filterCarouselItems(category) {
        carousel.innerHTML = ''; // Clear existing items in the carousel

        if (category === 'All') {
            // If 'All' is selected, display all items
            items.forEach(function (categoryItems) {
                categoryItems.forEach(function (item) {
                    let stockStatusClass = item.available ? "available" : "unavailable";
                    let stockPointClass = item.available ? "available-stock-point" : "unavailable-stock-point";

                    let itemElement = createItemElement(item, stockStatusClass, stockPointClass);
                    carousel.appendChild(itemElement);
                });
            });
        } else {
            // Display items based on the selected category
            items.forEach(function (categoryItems) {
                if (categoryItems[0].category === category) {
                    categoryItems.forEach(function (item) {
                        let stockStatusClass = item.available ? "available" : "unavailable";
                        let stockPointClass = item.available ? "available-stock-point" : "unavailable-stock-point";

                        let itemElement = createItemElement(item, stockStatusClass, stockPointClass);
                        carousel.appendChild(itemElement);
                    });
                }
            });
        }
    }

    categoryButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const selectedCategory = button.textContent.trim(); // Get the text content of the clicked button
            filterCarouselItems(selectedCategory);
        });
    });
});