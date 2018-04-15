$(function () {

  //if click or tab outside menu closes main-menu
  $(window).bind("click touchstart", function(event){
    if(!$(event.target).closest('.main-menu').length) {
      $('.dropdown').removeClass('toggled');
    }
  });

  //togle menu when click on hamburguer buttons
  $('body').on('click', '.toggle-menu', function(event) {
    var targetElement = $(this).attr("href");
    event.stopPropagation();
    event.preventDefault();
    $(targetElement).toggleClass('toggled');
  });

  //tabs extra content for CTAs
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var tabIndex = $(e.target).closest('li').index();
    $('.tab-content-extra .tab-pane').removeClass('active');
    $('.tab-content-extra .tab-pane').eq(tabIndex).addClass('active');
  });

  //this code is just to load links url faster via ajax and without reloads
  //if don't want to use it just comment
  //NOTE: this approach don't work for local files, should served by a web server
  //by @juanprimal

  $('body').on('click', '.dropdown .dropdown__link', function(event) {
    event.preventDefault();
    var targetElement = $(this).attr("href");

    $.ajax({
      url: targetElement,
      dataType: "text",
      success: function(data) {

        var body = data.substring(data.indexOf("<body>")+6,data.indexOf("</body>"));
        $('body').hide().html(body).fadeIn('fast');
      }
    });

  });
  //end of reload

});
