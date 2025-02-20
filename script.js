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
                h3.innerHTML = productName + " - €&nbsp;" + productVerkoopprijs;
                p.innerHTML = productDescription;
                counterP.innerHTML = counter;
                addButton.innerHTML = "Add";

                p.classList.add('col-12');
                h3.classList.add('col-12');
                img.classList.add('col-6', 'offset-3');
                minus.classList.add('fa-solid', 'fa-circle-minus', 'fa-xl', 'col-1', 'product-button', 'transition');
                plus.classList.add('fa-solid', 'fa-circle-plus', 'fa-xl', 'col-1', 'product-button', 'transition');
                counterP.classList.add('col-2', 'pt-2');
                addButton.classList.add('col-4', 'primary-button', 'offset-3', 'transition')
                addWrap.classList.add('col-12', 'd-flex', 'align-items-center', 'pb-2');

                addWrap.style.position = "absolute";
                addWrap.style.bottom = 0;
        
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
                    if(counter > 0){
                        var productCart = {}
                        productCart['productName'] = productName;
                        productCart['verkoopprijs'] = productVerkoopprijs;
                        productCart['image'] = productImage;
                        productCart['hoeveelheid'] = counter;

                        var local_cart = JSON.parse(localStorage.getItem('cart'));

                        if(local_cart == null){
                            local_cart = {};
                        }

                        local_cart[productName] = productCart;
                        var cart_string = JSON.stringify(local_cart);
                        localStorage.setItem('cart', cart_string);

                        addButton.innerHTML = "<i class='fa-solid fa-circle-check white'></i>";
                        setTimeout(function(){
                            addButton.innerHTML = "Add";
                        }, 1000);

                        counter = 0;
                        counterP.innerHTML = counter;
                    }
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
            h3.innerHTML = productName + " - €&nbsp;" + productVerkoopprijs;
            p.innerHTML = productDescription;

            //add everything to div
            div.append(img);
            div.append(h3);
            div.append(p);

            div.classList.add('product', 'col-md-5', 'col-xl-3', 'mb-3', 'pb-2')

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
                        let counter = 0
            
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
                        h3.innerHTML = productName + " - €&nbsp;" + productVerkoopprijs;
                        p.innerHTML = productDescription;
                        counterP.innerHTML = counter;
                        addButton.innerHTML = "Add";

                        p.classList.add('col-12');
                        h3.classList.add('col-12');
                        img.classList.add('col-6', 'offset-3');
                        minus.classList.add('fa-solid', 'fa-circle-minus', 'fa-xl', 'col-1', 'product-button', 'transition');
                        plus.classList.add('fa-solid', 'fa-circle-plus', 'fa-xl', 'col-1', 'product-button', 'transition');
                        counterP.classList.add('col-2', 'pt-2');
                        addButton.classList.add('col-4', 'primary-button', 'offset-3', 'transition')
                        addWrap.classList.add('col-12', 'd-flex', 'pb-2', 'align-items-center');

                        addWrap.style.position = "absolute";
                        addWrap.style.bottom = 0;
                
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
                            if(counter > 0){
                                var productCart = {}
                                productCart['productName'] = productName;
                                productCart['verkoopprijs'] = productVerkoopprijs;
                                productCart['image'] = productImage;
                                productCart['hoeveelheid'] = counter;

                                var local_cart = JSON.parse(localStorage.getItem('cart'));

                                if(local_cart == null){
                                    local_cart = {};
                                }

                                local_cart[productName] = productCart;
                                var cart_string = JSON.stringify(local_cart);
                                localStorage.setItem('cart', cart_string);

                                addButton.innerHTML = "<i class='fa-solid fa-circle-check white'></i>";
                                setTimeout(function(){
                                    addButton.innerHTML = "Add";
                                }, 1000);

                                counter = 0;
                                counterP.innerHTML = counter;
                            }
                        };
                
                        addWrap.append(minus, counterP, plus, addButton);
                        div.append(img, h3, p, addWrap);
                        div.classList.add('product', 'col-md-3', 'd-flex', 'flex-wrap','m-3', 'pb-5');
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
    var cart_wrap = document.getElementById('cartWrap');
    var cart_listing = JSON.parse(localStorage.getItem('cart'));
    let totaalCount = 0.0

    if(localStorage.getItem('cart') == "{}" || localStorage.getItem('cart') == ""){
        document.getElementById('orderBtn').style.display = 'none';
        document.getElementById('naam').style.display = 'none';

        var title = document.createElement('h2');
        var productButton = document.createElement('a');

        title.id = "cartTitle";
        title.innerHTML = "Geen producten in uw winkelmandje!";
        productButton.innerHTML = "Zoek naar producten";
        productButton.href = "products.html"

        productButton.classList.add('primary-button', 'p-2', 'transition');

        cart_wrap.append(title, productButton);
    }
    else{
        for(let i in cart_listing){
            (function(index) {
                var title = document.createElement('input');
                var verkoopprijs = document.createElement('input');
                var hoeveelheid = document.createElement('input');
                var img = document.createElement('img');
                var deleteBtn = document.createElement('p');
    
                var row1 = document.createElement('tr');
                var row2 = document.createElement('tr');
                var data1 = document.createElement('td');
                var data2 = document.createElement('td');
                var data3 = document.createElement('td');
                var data4 = document.createElement('td');
                var data5 = document.createElement('td');
    
                title.classList.add('cart-input');
                verkoopprijs.classList.add('cart-input');
                hoeveelheid.classList.add('cart-input');
                deleteBtn.classList.add('product-button', 'transition');
    
                title.value = cart_listing[i]['productName'];
                title.readOnly = true;
                title.name = cart_listing[i]['productName'];
                verkoopprijs.value = "Prijs: " + cart_listing[i]['verkoopprijs'];
                verkoopprijs.readOnly = true;
                verkoopprijs.name = cart_listing[i]['productName'];
                hoeveelheid.value = "Aantal: " + cart_listing[i]['hoeveelheid'];
                hoeveelheid.readOnly = true;
                hoeveelheid.name = cart_listing[i]['productName'];
                img.src = cart_listing[i]['image'];
                img.alt = "product image";
                deleteBtn.innerHTML = "<i class='fa-solid fa-trash-can fa-xl'></i>";
                totaalCount += parseFloat(cart_listing[i]['verkoopprijs']) * parseInt(cart_listing[i]['hoeveelheid']);
    
                data1.rowSpan = 2;
                data1.append(img);
    
                data2.colSpan = 2;
                data2.append(title);
    
                data3.rowSpan = 2;
                data3.append(deleteBtn);
    
                data4.append(verkoopprijs);
                data5.append(hoeveelheid);
    
                row1.append(data1, data2, data3);
                row2.append(data4, data5);
    
                cart_wrap.append(row1, row2);
    
                deleteBtn.onclick = () => {
                    delete cart_listing[i];
                    var cart_string = JSON.stringify(cart_listing);
                    localStorage.setItem('cart', cart_string);
    
                    location.reload();
                };  
            })(i);
        }

        var inputTotal = document.createElement('input');
        var totalRow = document.createElement('tr');
        var totalData = document.createElement('td');

        totalData.colSpan = 4;

        inputTotal.classList.add('col-12', 'mt-3', 'cart-input');
        inputTotal.id = "total";
        inputTotal.name = "Totaal";
        inputTotal.readOnly = true;
        inputTotal.value = "Totaal: € " + totaalCount.toString();

        totalData.append(inputTotal);
        totalRow.append(totalData);
        cart_wrap.append(totalRow);
    }
}