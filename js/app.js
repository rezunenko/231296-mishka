;(function(){

  var page_header = document.querySelector('.page-header--no-js');
  var main_nav = document.querySelector('.main-nav--no-js');
  var main_nav_button = document.querySelector('.main-nav__toggle-btn');

  page_header.classList.remove('page-header--no-js');
  main_nav.classList.remove('main-nav--no-js');


  function toogleMenu(className) {
    if(main_nav.classList.contains(className)) {
      main_nav.classList.remove(className);
    }
    else {
      main_nav.classList.add(className);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    main_nav_button.addEventListener('click', function() {
      toogleMenu('main-nav--open');
    });
  })

}());
