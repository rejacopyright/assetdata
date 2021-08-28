import $ from 'jquery';
import MetisMenu from 'metismenujs/dist/metismenujs';
// import './vendor/metismenujs';
import './vendor/jquery.slimscroll';
$(function(){
  const Components = function() {};
  // tooltip
  Components.prototype.initTooltipPlugin = function(){
    $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip()
  }
  // popover
  Components.prototype.initPopoverPlugin = function(){
    $.fn.popover && $('[data-toggle="popover"]').popover()
  }
  // Slimscroll
  Components.prototype.initSlimScrollPlugin = function(){
    //You can change the color of scroll bar here
    $.fn.slimScroll && $(".slimscroll").slimScroll({
      height: 'auto',
      position: 'right',
      size: "4px",
      touchScrollStep: 20,
      color: '#9ea5ab'
    });
  }
  // form validation
  Components.prototype.initFormValidation = function(){
    $(".needs-validation").on('submit', function (event) {
      $(this).addClass('was-validated');
      if ($(this)[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      return true;
    });
  }
  //initilizing
  Components.prototype.init = function() {
    this.initTooltipPlugin();
    this.initPopoverPlugin();
    this.initSlimScrollPlugin();
    this.initFormValidation();
  }
  // eslint-disable-next-line
  $.Components = new Components;
  // $.Components.Constructor = Components;
});
$(function(){
  const App = function () {
    this.$body = $('body');
    this.$window = $(window);
  };
  App.prototype._resetSidebarScroll = function () {
    // sidebar - scroll container
    $('.slimscroll-menu').slimscroll({
      height: 'auto',
      position: 'right',
      size: "4px",
      color: '#9ea5ab',
      wheelStep: 5,
      touchScrollStep: 20
    });
  }
  App.prototype.initMenu = function () {
    var $this = this;
    // Left menu collapse
    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      var layout = $this.$body.data('layout');
      if (layout === 'topnav') {
        $(this).toggleClass('open');
        $('#topnav-menu-content').slideToggle(400);
      } else {
        $this.$body.toggleClass('sidebar-enable');
        if ($this.$window.width() >= 768) {
          $this.$body.toggleClass('left-side-menu-condensed');
        } else {
          $this.$body.removeClass('left-side-menu-condensed');
        }
        // sidebar - scroll container
        $this._resetSidebarScroll();
      }
    });
    // sidebar - main menu
    // activate the menu in left side bar based on url
    var layout = $this.$body.data('layout');
    if ($('#menu-bar').length) {
      if (layout !== 'topnav') {
        // init menu
        new MetisMenu('#menu-bar');
        // sidebar - scroll container
        $this._resetSidebarScroll();
        $("#menu-bar a").each(function () {
          var pageUrl = window.location.href.split(/[?#]/)[0];
          if (this.href === pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("mm-active"); // add active to li of the current link
            $(this).parent().parent().addClass("mm-show");
            $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
            $(this).parent().parent().parent().addClass("mm-active");
            $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
            $(this).parent().parent().parent().parent().parent().addClass("mm-active");
          }
        });
        $("#menu-bar a").on('click', function () {
          var $this = $(this);
          $(document).ready(function() {
            var pageUrl = window.location.pathname;
            if ($this.attr('href') === pageUrl) {
              var link = $("#menu-bar a");
              link.removeClass("active");
              link.parent().removeClass("mm-active");
              link.parent().parent().prev().removeClass("active");
              link.parent().parent().parent().removeClass("mm-active");
              link.parent().parent().parent().parent().parent().removeClass("mm-active");
              link.parent().parent().removeClass("mm-show");
              link.parent().parent().parent().parent().removeClass("mm-show");

              $this.addClass("active");
              $this.parent().addClass("mm-active"); // add active to li of the current link
              $this.parent().parent().addClass("mm-show");
              $this.parent().parent().prev().addClass("active"); // add active class to an anchor
              $this.parent().parent().parent().addClass("mm-active");
              $this.parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
              $this.parent().parent().parent().parent().parent().addClass("mm-active");
            }
          });
        });
      } else {
        var menuRef = new MetisMenu('#menu-bar').on('shown.metisMenu', function (event) {
          window.addEventListener('click', function menuClick(e) {
            if (!event.target.contains(e.target)) {
              menuRef.hide(event.detail.shownElement);
              window.removeEventListener('click', menuClick);
            }
          });
        });
        $("#menu-bar a").each(function () {
          var pageUrl = window.location.href.split(/[?#]/)[0];
          if (this.href === pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("active"); // add active to li of the current link
            $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
            $(this).parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().addClass("active");
          }
        });
      }
    }
    // right side-bar toggle
    $(document).on('click', '.right-bar-toggle', function (e) {
      $('body').toggleClass('right-bar-enabled');
    });
    $(document).on('click', 'body', function (e) {
      if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
        return;
      }
      if ($(e.target).closest('.left-side-menu, .side-nav').length > 0 || $(e.target).hasClass('button-menu-mobile')
      || $(e.target).closest('.button-menu-mobile').length > 0) {
        return;
      }
      $('body').removeClass('right-bar-enabled');
      $('body').removeClass('sidebar-enable');
      return;
    });
    // Preloader
    $(window).on('load', function () {
      $('#status').fadeOut();
      $('#preloader').delay(350).fadeOut('slow');
    });
  }
  App.prototype.initLayout = function () {
    // in case of small size, add class enlarge to have minimal menu
    if (this.$window.width() >= 768 && this.$window.width() <= 1024) {
      this.$body.addClass('left-side-menu-condensed');
    } else {
      if (this.$body.data('left-keep-condensed') !== true) {
        this.$body.removeClass('left-side-menu-condensed');
      }
    }
    // if the layout is scrollable - let's remove the slimscroll class from menu
    if (this.$body.hasClass('scrollable-layout')) {
      $('#sidebar-menu').removeClass("slimscroll-menu");
    }
  }
  //initilizing
  App.prototype.init = function () {
    var $this = this;
    this.initLayout();
    this.initMenu();
    $.Components.init();
    // on window resize, make menu flipped automatically
    $this.$window.on('resize', function (e) {
      e.preventDefault();
      $this.initLayout();
      $this._resetSidebarScroll();
    });
  }
  // eslint-disable-next-line
  $.App = new App; $.App.Constructor = App;
});
//initializing main application module
$(function(){
  // console.log(this);
  $.App.init();
});
