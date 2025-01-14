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
    console.log(slideNumber);

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

function show_handelaar(handelaar){
    voets = document.getElementById('voets');
    blissAndBloom = document.getElementById('blissAndBloom');
    mijnStijl = document.getElementById('mijnStijl');

    voetsBtn = document.getElementById('voetsButton');
    blissAndBloomBtn = document.getElementById('blissAndBloomButton');
    mijnStijlBtn = document.getElementById('mijnStijlButton');

    if(handelaar == "voets"){
        voets.style.visibility = "visible";
        blissAndBloom.style.visibility = "hidden";
        mijnStijl.style.visibility = "hidden";
        
        voetsBtn.style.backgroundColor = '#DE8A68'; 
        blissAndBloomBtn.style.backgroundColor = 'transparent'; 
        mijnStijlBtn.style.backgroundColor = 'transparent'; 
    }
    else if(handelaar == "blissAndBloom"){
        voets.style.visibility = "hidden";
        blissAndBloom.style.visibility = "visible";
        mijnStijl.style.visibility = "hidden"; 

        voetsBtn.style.backgroundColor = 'transparent'; 
        blissAndBloomBtn.style.backgroundColor = '#DE8A68'; 
        mijnStijlBtn.style.backgroundColor = 'transparent'; 
    }
    else if(handelaar == "mijnStijl"){
        voets.style.visibility = "hidden";
        blissAndBloom.style.visibility = "hidden";
        mijnStijl.style.visibility = "visible"; 

        voetsBtn.style.backgroundColor = 'transparent'; 
        blissAndBloomBtn.style.backgroundColor = 'transparent'; 
        mijnStijlBtn.style.backgroundColor = '#DE8A68'; 
    }
    else{
        voets.style.visibility = "hidden";
        blissAndBloom.style.visibility = "hidden";
        mijnStijl.style.visibility = "hidden"; 

        voetsBtn.style.backgroundColor = 'transparent';
        blissAndBloomBtn.style.backgroundColor = 'transparent'; 
        mijnStijlBtn.style.backgroundColor = 'transparent'; 
    }
}

function dropdown(bool){
    if(bool){
        document.getElementById('dropdownMenu').style.display = 'block';
        document.getElementById('dropdownHide').style.display = "none";
    }
    else{
        document.getElementById('dropdownMenu').style.display = 'none';
        document.getElementById('dropdownHide').style.display = "block";
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

            div.classList.add('product');

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

            div.classList.add('product')

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

            console.log(element['naam'] + " - " + search_input)

            if(element['naam'].toLowerCase().includes(search_input) && search_input != ""){
                search_results.push(element);
            }
        });

        if(!searched){
            product_categories('spotlight');
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
        
                    div.classList.add('product')
        
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