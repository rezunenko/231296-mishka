;(function(){

  var page_header = document.querySelector('.page-header--no-js');
  var main_nav = document.querySelector('.main-nav--no-js');
  var main_nav_button = document.querySelector('.main-nav__toggle-btn');
  var overlay = document.querySelector('.overlay');
  var list_btn_buy = document.querySelectorAll('.product__show-popup');
  var map = document.getElementById('map');
  var list_field = document.querySelectorAll('.order-form__field');
  var list_textarea = document.querySelectorAll('.order-form__textarea');

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
    myMap = new ymaps.Map('map', {
      center: [59.9367, 30.3215],
      zoom: 16,
      controls: []
    });

    myPlacemark = new ymaps.Placemark(
      [59.93652, 30.32172],
      {
        hintContent: 'Мишка',
        balloonContent: 'Интернет-магазин вязанных товаров'
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/icon-map-pin.svg',
        iconImageSize: [67, 100],
        iconImageOffset: [-40, -80]
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

    for(var i=0; i< list_btn_buy.length; i++) {
      list_btn_buy[i].addEventListener('click', function() {
        toogleAttribute(overlay, 'hidden');
        event.preventDefault();
      })
    }

    for (var i = 0; i < list_field.length; i++) {
      list_field[i].addEventListener('blur', function(event) {
        validateInput(event, list_field[i])
      });
    }

    for (var i = 0; i < list_textarea.length; i++) {
      list_textarea[i].addEventListener('blur', function(event) {
        validateInput(event, list_textarea[i])
      });
    }

    if(map) {
      ymaps.ready(init);
    }
  });
}());
