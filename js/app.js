;(function(){

  var page_header = document.querySelector('.page-header--no-js');
  var main_nav = document.querySelector('.main-nav--no-js');
  var main_nav_button = document.querySelector('.main-nav__toggle-btn');

  page_header.classList.remove('page-header--no-js');
  main_nav.classList.remove('main-nav--no-js');

  document.addEventListener('DOMContentLoaded', function(){
    main_nav_button.addEventListener('click', function() {
      main_nav.classList.toggle('main-nav--open');
    });
  })

}());
