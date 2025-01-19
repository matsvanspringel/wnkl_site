var visibility = false;
var droppeddown = false;
var categories = ['pouchbag', 'chipsEnZoutjes', 'koek', 'chocolade', 'baru poeders', 'pasta', 'pastasauzen', 'pesto', 'tapenade', 'hummus', 'handzeep', 'roomspray', 'geurstokje', 'geur-hart', 'ansichtkaart', 'servet', 'bladwijzer', 'maaltijdplanner', 'weekplanner', 'to-do', 'notitieblok', 'memoblok', 'armband', 'sjaal'];
var slideNumber = 0;

function change_visibility(change){
    if(visibility){
        document.getElementById('productWrap').style.visibility = 'hidden'
        document.getElementById('dropdownArrow').style.rotate = "0deg";
        visibility = false

        show_handelaar('');
    }
    else{
        document.getElementById('productWrap').style.visibility = 'visible'
        document.getElementById('dropdownArrow').style.rotate = "180deg";
        visibility = true
    }

    if(change == "body"){
        document.getElementById('productWrap').style.visibility = 'hidden'
        document.getElementById('dropdownArrow').style.rotate = "0deg";
        visibility = false;

        show_handelaar('');
    }
}

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

            div.classList.add('product','col-md-3', 'm-md-3', 'pb-2');

            //append div to productscontainer
            container.append(div);
        }
    });

    if(category != "spotlight"){
        change_visibility('');
    }
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

            div.classList.add('product','col-md-3', 'm-md-3', 'pb-2')

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

            if(element['naam'].toLowerCase().includes(search_input) && search_input != ""){
                search_results.push(element);
            }
        });

        if(!searched){
            console.log("not")
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
        
                    div.classList.add('product','col-md-3', 'm-md-3');

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