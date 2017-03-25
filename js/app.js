;(function(){

  var page_header = document.querySelector('.page-header--no-js');
  var main_nav = document.querySelector('.main-nav--no-js');
  var main_nav_button = document.querySelector('.main-nav__toggle-btn');
  var overlay = document.querySelector('.overlay');
  var list_btn_buy = document.querySelectorAll('.product__show-popup');
  var map = document.getElementById('map');

  page_header.classList.remove('page-header--no-js');
  main_nav.classList.remove('main-nav--no-js');

  var myMap;
  function init() {
    myMap = new ymaps.Map("map", {
      center: [59.936365, 30.321668],
      zoom: 16,
      controls: []
    });

    myPlacemark = new ymaps.Placemark(
      [59.936365, 30.321668],
      {
        hintContent: 'Мишка',
        balloonContent: 'Интернет-магазин вязанных товаров'
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/icon-map-pin.svg',
        iconImageSize: [80, 80],
        iconImageOffset: [-40, -70]
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }

  function toogleAttribute(elem, attrName) {
    var _elem = elem;

    if (_elem.hasAttribute(attrName)) {
      _elem.removeAttribute(attrName);
    }
  else
    {
      _elem.setAttribute(attrName, 'true');
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    main_nav_button.addEventListener('click', function() {
      main_nav.classList.toggle('main-nav--open');
    });

    if(overlay) {
      overlay.addEventListener('click', function(event) {
        if (event.target == this) {
          overlay.setAttribute('hidden', 'true');
        }
      });
    }

    list_btn_buy.forEach(function(item){
      item.addEventListener('click', function() {
        toogleAttribute(overlay, 'hidden');
        event.preventDefault();
      });
    });

    if(map) {
      ymaps.ready(init);
    }
  });
}());
