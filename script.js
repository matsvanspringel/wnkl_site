var visibility = false;
var droppeddown = false;
var categories = ['water', 'chocolade chips', 'koeken', 'baru', 'italiaans', 'geuren', 'papierwaren', 'accessoires'];
var slideNumber = 0;
var cart = {};

function image_slide(number){
    slideNumber += number;
    if(slideNumber < 1){
        slideNumber = 3
    }
    else if(slideNumber > 3){
        slideNumber = 1
    }

    document.getElementById('image1').style.display = 'none';
    document.getElementById('image2').style.display = 'none';
    document.getElementById('image3').style.display = 'none';
    document.getElementById('image' + slideNumber).style.display = 'flex';
}

function dropdown(bool){
    if(bool){
        document.getElementById('nav-list').style.display = 'flex';
        document.getElementById('body').style.overflow = "hidden";
    }
    else{
        document.getElementById('nav-list').style.display = 'none';
        document.getElementById('body').style.overflow = "inherit";
    }
}

function product_categories(category){
    var container = document.getElementById('productContainer');
    container.innerHTML = "";

    fetch('data.json').then(data => data.json()).then(response => {
        var allProducts = response;
        var productsCategory = allProducts[category];

        for (var i in productsCategory) {
            (function(index) {
                var product = productsCategory[index];
        
                // Declare product details
                var productName = product['naam'];
                var productVerkoopprijs = product['verkoopprijs'];
                var productDescription = product['description'];
                var productImage = product['image'];
        
                // Create elements
                var div = document.createElement('div');
                var img = document.createElement('img');
                var h3 = document.createElement('h3');
                var p = document.createElement('p');
                var addWrap = document.createElement('div');
                var minus = document.createElement('i');
                var counterP = document.createElement('p');
                var plus = document.createElement('i');
                var addButton = document.createElement('a');
        
                // Initialize product-specific counter
                let counter = 0;
        
                // Fill in elements
                img.src = productImage;
                img.alt = productName;
                h3.innerHTML = productName + " - €" + productVerkoopprijs;
                p.innerHTML = productDescription;
                counterP.innerHTML = counter;
                addButton.innerHTML = "Add";

                p.classList.add('col-12');
                h3.classList.add('col-12');
                img.classList.add('col-6', 'offset-3');
                minus.classList.add('fa-solid', 'fa-circle-minus', 'fa-xl', 'col-1');
                plus.classList.add('fa-solid', 'fa-circle-plus', 'fa-xl', 'col-1');
                counterP.classList.add('col-2');
                addButton.classList.add('col-4', 'primary-button', 'offset-3', 'transition')
                addWrap.classList.add('col-12', 'd-flex', 'align-items-center', 'pb-2');

                addWrap.style.position = "absolute";
                addWrap.style.bottom = 0;
        
                // Assign unique IDs (optional but good for debugging)
                counterP.id = "product" + index + "counter";
                minus.id = "product" + index + "minus";
                plus.id = "product" + index + "plus";
        
                // Add event listeners
                minus.onclick = () => {
                    if (counter > 0) {
                        counter--;
                        counterP.innerHTML = counter;
                    }
                };
        
                plus.onclick = () => {
                    counter++;
                    counterP.innerHTML = counter;
                };

                addButton.onclick = () => {
                    productCart = {}
                    productCart['productName'] = productName;
                    productCart['verkoopprijs'] = productVerkoopprijs;
                    productCart['description'] = productDescription;
                    productCart['image'] = productImage;
                    productCart['hoeveelheid'] = counter;

                    cart[productName] = productCart;
                    localStorage.setItem('cart', cart);

                    counter = 0;
                    counterP.innerHTML = counter;
                    console.log(cart)
                };
        
                addWrap.append(minus, counterP, plus, addButton);
                div.append(img, h3, p, addWrap);
                div.classList.add('product', 'col-md-3', 'd-flex', 'flex-wrap','m-3', 'pb-5');
                container.append(div);
            })(i);
        }
        
    });
}

function get_spotlights(category){
    container = document.getElementById('spotlightContainer');
    container.innerHTML = "";

    fetch('data.json').then(data => data.json()).then(response => {
        var allProducts = response;
        var productsCategory = allProducts[category];

        for(var i in productsCategory){
            var product = productsCategory[i];

            //declare product details
            var productName = product['naam'];
            var productVerkoopprijs = product['verkoopprijs'];
            var productDescription = product['description'];
            var productImage = product['image'];

            //create elements
            var div = document.createElement('div');
            var img = document.createElement('img');
            var h3 = document.createElement('h3');
            var p = document.createElement('p');

            //fill in elements
            img.src = productImage;
            img.alt = productName;
            h3.innerHTML = productName + " - €" + productVerkoopprijs;
            p.innerHTML = productDescription;

            //add everything to div
            div.append(img);
            div.append(h3);
            div.append(p);

            div.classList.add('product','col-md-3', 'm-3', 'pb-2')

            //append div to productscontainer
            container.append(div);
        }
    });
}

function search_products(){
    event.preventDefault();

    var container = document.getElementById('productContainer');
    container.innerHTML = "";

    var productsArray = [];
    var search_results = [];
    searched = true;

    fetch('data.json').then(data => data.json()).then(response => {
        var allProducts = response;

        categories.forEach(element => {
            var productsCategory = allProducts[element];

            for(var product in productsCategory){
                productsArray.push(productsCategory[product]);
            }
        });

        productsArray.forEach(element => {
            var search_input = document.getElementById('searchbar').value.trim().toLowerCase();

            if(search_input == ""){
                searched = false;
            }
            else if(element['naam'].toLowerCase().includes(search_input) && search_input != ""){
                search_results.push(element);
            }
        });

        if(!searched){
            get_categories();
        }
        else{
            if(search_results.length != 0){
                for(var i in search_results){
                    (function(index) {
                        var product = search_results[i];
            
                        //declare product details
                        var productName = product['naam'];
                        var productVerkoopprijs = product['verkoopprijs'];
                        var productDescription = product['description'];
                        var productImage = product['image'];
                        var counter = 0
            
                        //create elements
                        var div = document.createElement('div');
                        var img = document.createElement('img');
                        var h3 = document.createElement('h3');
                        var p = document.createElement('p');
                        var addWrap = document.createElement('div');
                        var minus = document.createElement('i');
                        var counterP = document.createElement('p');
                        var plus = document.createElement('i');
                        var addButton = document.createElement('a');
            
                        //fill in elements
                        img.src = productImage;
                        img.alt = productName;
                        h3.innerHTML = productName + " - €" + productVerkoopprijs;
                        p.innerHTML = productDescription;
                        counterP.innerHTML = counter;
                        minus.classList.add('fa-solid', 'fa-circle-minus', 'fa-xl', 'col-1');
                        plus.classList.add('fa-solid', 'fa-circle-plus', 'fa-xl', 'col-1');
                        counterP.classList.add('col-2');
                        addButton.classList.add('col-4', 'primary-button', 'offset-3', 'transition')
                        addWrap.classList.add('col-12', 'd-flex', 'align-items-center', 'pb-2');
                        addWrap.append(minus, counterP, plus, addButton);
            
                        //add everything to div
                        div.append(img);
                        div.append(h3);
                        div.append(p);
                        div.append(addWrap);
            
                        div.classList.add('product','col-md-3', 'm-3');

                        minus.onclick = () => {
                            if (counter > 0) {
                                counter--;
                                counterP.innerHTML = counter;
                            }
                        };
                
                        plus.onclick = () => {
                            counter++;
                            counterP.innerHTML = counter;
                        };
            
                        //append div to productscontainer
                        container.append(div);
                    })(i);
                }
            }
            else{
                var p = document.createElement('h3');
    
                p.innerHTML = "Geen producten gevonden";
                p.style.marginTop = "20px";
                container.append(p);
            }
        }
    });
}

function get_categories(){
    productcontainer = document.getElementById('productContainer');
    productContainer.innerHTML = "";

    categories.forEach(category => {
        div = document.createElement('div');
        img = document.createElement('img');

        div.classList.add('col-md-6', 'col-xl-4', 'my-2', 'category', 'transition');
        img.src = 'images/categories/' + category +".jpg";
        img.alt = category;
        img.onclick = () => {
            product_categories(category)
        }

        div.append(img);
        productContainer.append(div);
    });
}

function get_cart(){
    cart_wrap = document.getElementById('cartWrap');
    cart = localStorage.getItem('cart');

    for(var i in cart){
        (function (index){
            var wrapper = document.createElement('div');
            var title = document.createElement('h2');
            var description = document.createElement('p');
            var verkoopprijs = document.createElement('p');
            var hoeveelheid = document.createElement('p');
            var img = document.createElement('img');

            title.innerHTML = i['productName'];
            description.innerHTML = i['description'];
            verkoopprijs.innerHTML = i['verkoopprijs'];
            hoeveelheid.innerHTML = i['hoeveelheid'];
            img.src = i['image'];
            img.alt = "product image";

            wrapper.append(title, description, verkoopprijs, hoeveelheid, img);
            cart_wrap.append(wrapper);
        })
    }
}