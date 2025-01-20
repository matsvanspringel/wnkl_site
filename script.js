var visibility = false;
var droppeddown = false;
var categories = ['water', 'chocolade chips', 'koeken', 'baru', 'italiaans', 'geuren', 'papierwaren', 'accessoires'];
var slideNumber = 0;

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

        for(var i in productsCategory){
            var product = productsCategory[i];

            //declare product details
            var productName = product['naam'];
            var productVerkoopprijs = product['verkoopprijs'];
            var productDescription = product['description'];
            var productImage = product['image'];
            let counter = 0;

            //create elements
            var div = document.createElement('div');
            var img = document.createElement('img');
            var h3 = document.createElement('h3');
            var p = document.createElement('p');
            var addWrap = document.createElement('div');
            var minus = document.createElement('i');
            var counterP = document.createElement('p');
            var plus = document.createElement('i');

            //fill in elements
            img.src = productImage;
            img.alt = productName;
            h3.innerHTML = productName + " - €" + productVerkoopprijs;
            p.innerHTML = productDescription;
            counterP.innerHTML = counter;
            minus.classList.add('fa-solid', 'fa-circle-minus', 'fa-xl', 'col-4');
            plus.classList.add('fa-solid', 'fa-circle-plus', 'fa-xl', 'col-4');
            counterP.classList.add('col-4')
            addWrap.classList.add('row', 'align-items-center', 'pb-2');

            plus.onclick = () => {
                counter++;
                counterP.innerHTML = counter;
            };
        
            minus.onclick = () => {
                if (counter > 0) {
                    counter--;
                    counterP.innerHTML = counter;
                }
            };

            addWrap.append(minus, counterP, plus);

            //add everything to div
            div.append(img);
            div.append(h3);
            div.append(p);
            div.append(addWrap);

            div.classList.add('product','col-md-3', 'm-3', 'pb-2');

            //append div to productscontainer
            container.append(div);
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
        
                    //fill in elements
                    img.src = productImage;
                    img.alt = productName;
                    h3.innerHTML = productName + " - €" + productVerkoopprijs;
                    p.innerHTML = productDescription;
                    counterP.innerHTML = counter;
                    minus.classList.add('fa-solid', 'fa-circle-minus', 'fa-xl', 'col-4');
                    plus.classList.add('fa-solid', 'fa-circle-plus', 'fa-xl', 'col-4');
                    counterP.classList.add('col-4')
                    addWrap.classList.add('row', 'align-items-center', 'pb-2')
                    addWrap.append(minus, counterP, plus);
        
                    //add everything to div
                    div.append(img);
                    div.append(h3);
                    div.append(p);
                    div.append(addWrap);
        
                    div.classList.add('product','col-md-3', 'm-3');

                    plus.onclick = counter++;
                    minus.onclick = counter--;
        
                    //append div to productscontainer
                    container.append(div);
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