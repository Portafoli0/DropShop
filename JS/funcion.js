var Menu_Button = document.querySelector("nav .Menu-Button");
var Menu_Options = document.querySelector("nav .Menu-Options");
var Close_Icon = document.querySelector("nav .Menu-Options .Menu-Options-Icons #Close_icon");

Menu_Button.addEventListener('click', function() {
    Menu_Options.style.left = '0';
});

Close_Icon.addEventListener('click', function() {
    Menu_Options.style.left = '-252px';
});

var Button_Icon_Search = document.querySelector("nav .Container-Icons-Search-Buy #Lupa-Icon-For-Mobile");
var Container_Search = document.querySelector("nav .Container-Icons-Search-Buy .Container-Search");
var Close_Icon_1 = document.querySelector("nav .Container-Icons-Search-Buy .Container-Search #Close_icon_1");

Button_Icon_Search.addEventListener('click', function() {
    Container_Search.style.top = '0';
});

Close_Icon_1.addEventListener('click', function() {
    Container_Search.style.top = '-70px';
});

var Button_Icon_CarroCompra = document.querySelector("nav .Container-Icons-Search-Buy .Button_shopping_cart");
var Aside = document.querySelector("main .Container-Carrito-De-Compra");
var Close_Icon_2 = document.querySelector("main .Container-Carrito-De-Compra .Contenedor .Contenedor-Icons #Close_icon_2");

Button_Icon_CarroCompra.addEventListener('click', function() {
    Aside.style.right = '0';
});

Close_Icon_2.addEventListener('click', function() {
    Aside.style.right = '-100%';
});