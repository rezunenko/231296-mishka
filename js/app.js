;(function(){

  var page_header = document.querySelector('.page-header--no-js');
  var main_nav = document.querySelector('.main-nav--no-js');
  var main_nav_button = document.querySelector('.main-nav__toggle-btn');
  var overlay = document.querySelector('.overlay');
  var list_btn_buy = document.querySelectorAll('.product__show-popup');
  var map = document.getElementById('map');
  var list__field = document.querySelectorAll('.order-form__field');
  var list__textarea = document.querySelectorAll('.order-form__textarea');

  page_header.classList.remove('page-header--no-js');
  main_nav.classList.remove('main-nav--no-js');

  function validateInput(event, el) {
    event = event || window.event;
    if (el) {
      event.preventDefault();
      if(el.classList.contains('order-form__field')) {
        if (el.value)
          el.classList.add('order-form__field--content-exists');
        else
          el.classList.remove('order-form__field--content-exists');
      }
      else if (el.classList.contains('order-form__textarea')) {
        if (el.value)
          el.classList.add('order-form__textarea--content-exists');
        else
          el.classList.remove('order-form__textarea--content-exists');
      }
    }
  };

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

    list__field.forEach(function(item) {
      item.addEventListener('blur', function(event) {
        validateInput(event, item)
      });
    });

    list__textarea.forEach(function(item) {
      item.addEventListener('blur', function(event) {
        validateInput(event, item)
      });
    });

    if(map) {
      ymaps.ready(init);
    }
  });
}());
