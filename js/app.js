;(function(){

  var page_header = document.querySelector('.page-header--no-js');
  var main_nav = document.querySelector('.main-nav--no-js');
  var main_nav_button = document.querySelector('.main-nav__toggle-btn');

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

  document.addEventListener('DOMContentLoaded', function(){
    main_nav_button.addEventListener('click', function() {
      main_nav.classList.toggle('main-nav--open');
    });

    ymaps.ready(init);
  });
}());
