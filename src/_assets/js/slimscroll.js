// import $ from 'jquery';
HTMLDivElement.prototype.slimScroll = function(options) {
  var defaults = {
    width : 'auto',
    height : 'auto',
    size : '7px',
    color: '#000',
    position : 'right',
    distance : '1px',
    start : 'top',
    opacity : .4,
    alwaysVisible : false,
    disableFadeOut : false,
    railVisible : false,
    railColor : '#333',
    railOpacity : .2,
    railDraggable : true,
    railClass : 'slimScrollRail',
    barClass : 'slimScrollBar',
    wrapperClass : 'slimScrollDiv',
    allowPageScroll : false,
    wheelStep : 20,
    touchScrollStep : 200,
    borderRadius: '7px',
    railBorderRadius : '7px'
  };
  var o = {...defaults, ...options};
  var me = this;
  var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
  barHeight, percentScroll, lastScroll,
  minBarHeight = 30,
  releaseScroll = false;
  if (me.parentNode.classList.contains(o.wrapperClass))
  {
    var offset = me.scrollTop;
    var bar = me.siblings('.' + o.barClass);
    var rail = me.siblings('.' + o.railClass);
    getBarHeight();
    if (Object.prototype.toString.call(options) === '[object Object]')
    {
      if ( 'height' in options && options.height === 'auto' ) {
        me.parentNode.style.height = 'auto'
        me.style.height = 'auto'
        var height = me.parentNode.parentNode.height();
        me.parentNode.style.height = height
        me.style.height = height
      } else if ('height' in options) {
        var h = options.height;
        me.parentNode.style.height = h
        me.style.height = h
      }
      if ('scrollTo' in options)
      {
        offset = parseInt(o.scrollTo);
      }
      else if ('scrollBy' in options)
      {
        offset += parseInt(o.scrollBy);
      }
      else if ('destroy' in options)
      {
        bar.remove();
        rail.remove();
        me.unwrap();
        return;
      }
      scrollContent(offset, false, true);
    }
    return;
  } else if (Object.prototype.toString.call(options) === '[object Object]')
  {
    if ('destroy' in options)
    {
      return;
    }
  }
  o.height = (o.height === 'auto') ? me.parentNode.clientHeight : o.height;
  var wrapper = document.createElement('div')
  wrapper.style.position = 'relative'
  wrapper.style.overflow = 'hidden'
  wrapper.style.width = o.width
  wrapper.style.height = o.height
  wrapper.classList.add(o.wrapperClass)
  me.style.overflow = 'hidden'
  me.style.width = o.width
  me.style.height = o.height
  rail = document.createElement('div')
  rail.style.width = o.size
  rail.style.height = '100%'
  rail.style.position = 'absolute'
  rail.style.top = 0
  rail.style.display = (o.alwaysVisible && o.railVisible) ? 'block' : 'none'
  rail.style.borderRadius = o.railBorderRadius
  rail.style.background = o.railColor
  rail.style.opacity = o.railOpacity
  rail.style.zIndex = 90
  rail.classList.add(o.railClass)
  bar = document.createElement('div')
  bar.style.background = o.color
  bar.style.width = o.size
  bar.style.position = 'absolute'
  bar.style.top = 0
  bar.style.opacity = o.opacity
  bar.style.display = o.alwaysVisible ? 'block' : 'none'
  bar.style.borderRadius  = o.borderRadius
  bar.style.BorderRadius = o.borderRadius
  bar.style.MozBorderRadius = o.borderRadius
  bar.style.WebkitBorderRadius = o.borderRadius
  bar.style.zIndex = 99
  bar.classList.add(o.barClass)
  if (o.position === 'right') {
    rail.style.right = o.distance
    bar.style.right = o.distance
  }else {
    rail.style.left = o.distance
    bar.style.left = o.distance
  }
  // me.outerHTML = wrapper;
  me.parentNode.insertBefore(wrapper, me)
  wrapper.appendChild(me)
  me.parentNode.appendChild(bar);
  me.parentNode.appendChild(rail);
  if (o.railDraggable){
    bar.addEventListener("mousedown", function(e) {
      var $doc = document.querySelector(document);
      isDragg = true;
      var t = parseFloat(bar.style.top);
      var pageY = e.pageY;
      $doc.addEventListener("mousemove", function(e){
        var currTop = t + e.pageY - pageY;
        bar.style.top = currTop
        scrollContent(0, bar.position().top, false);
      });
      $doc.addEventListener("mouseup", function(e) {
        isDragg = false;hideBar();
        $doc.removeEventListener('mouseup');
      });
      return false;
    })
    bar.addEventListener("selectstart", function(e){
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
  }
  rail.addEventListener('mouseover', function(){
    showBar();
  });
  rail.addEventListener('mouseleave', function(){
    hideBar();
  });
  bar.addEventListener('mouseover', function(){
    isOverBar = true;
  });
  bar.addEventListener('mouseleave', function(){
    isOverBar = false;
  });
  me.addEventListener('mouseover', function(){
    isOverPanel = true;
    showBar();
    // hideBar();
  });
  me.addEventListener('mouseleave', function(){
    isOverPanel = false;
    hideBar();
  });

  me.addEventListener('touchstart', function(e,b){
    if (e.originalEvent.touches.length)
    {
      touchDif = e.originalEvent.touches[0].pageY;
    }
  });
  me.addEventListener('touchmove', function(e){
    if(!releaseScroll)
    {
      e.originalEvent.preventDefault();
    }
    if (e.originalEvent.touches.length)
    {
      var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
      scrollContent(diff, true);
      touchDif = e.originalEvent.touches[0].pageY;
    }
  });
  getBarHeight();
  if (o.start === 'bottom')
  {
    bar.style.top = me.clientHeight - bar.clientHeight
    scrollContent(0, true);
  }
  else if (o.start !== 'top')
  {
    scrollContent(document.querySelector(o.start).position().top, null, true);
    if (!o.alwaysVisible) { bar.hide(); }
  }
  attachWheel(this);
  function _onWheel(e)
  {
    if (!isOverPanel) { return; }
    // var e = e || window.event;
    var delta = 0;
    if (e.wheelDelta) { delta = -e.wheelDelta/120; }
    if (e.detail) { delta = e.detail / 3; }
    var target = e.target || e.srcTarget || e.srcElement;
    if (target.closest('.' + o.wrapperClass) === me.parentNode) {
      scrollContent(delta, true);
    }
    if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
    if (!releaseScroll) { e.returnValue = false; }
  }
  function scrollContent(y, isWheel, isJump)
  {
    releaseScroll = false;
    var delta = y;
    var maxTop = me.clientHeight - bar.clientHeight;
    if (isWheel)
    {
      delta = parseInt(bar.style.top) + y * parseInt(o.wheelStep) / 100 * bar.clientHeight;
      delta = Math.min(Math.max(delta, 0), maxTop);
      delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
      bar.style.top = delta + 'px'
    }
    percentScroll = parseInt(bar.style.top) / (me.clientHeight - bar.clientHeight);
    delta = percentScroll * (me.scrollHeight - me.clientHeight);
    if (isJump)
    {
      delta = y;
      var offsetTop = delta / me.scrollHeight * me.clientHeight;
      offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
      bar.style.top = offsetTop + 'px'
    }
    me.scrollTop = delta
    var event = document.createEvent("Event");
    event.initEvent("slimscrolling", false, true);
    me.dispatchEvent(event);
    // me.trigger('slimscrolling', ~~delta);
    showBar();
    hideBar();
  }
  function attachWheel(target)
  {
    if (window.addEventListener)
    {
      target.addEventListener('DOMMouseScroll', _onWheel, false );
      target.addEventListener('mousewheel', _onWheel, false );
    }
    else
    {
      document.attachEvent("onmousewheel", _onWheel)
    }
  }
  function getBarHeight()
  {
    barHeight = Math.max((me.clientHeight / me.scrollHeight) * me.clientHeight, minBarHeight);
    bar.style.height = barHeight + 'px'
    var display = barHeight === me.clientHeight ? 'none' : 'block';
    bar.style.display = display
  }
  function showBar()
  {
    getBarHeight();
    clearTimeout(queueHide);
    if (percentScroll === ~~percentScroll)
    {
      releaseScroll = o.allowPageScroll;
      if (lastScroll !== percentScroll)
      {
        var msg = (~~percentScroll === 0) ? 'top' : 'bottom';
        const event = new Event('slimscroll')
        me.addEventListener('slimscroll', function(){}, msg);
        me.dispatchEvent(event);
      }
    }
    else
    {
      releaseScroll = false;
    }
    lastScroll = percentScroll;
    if(barHeight >= me.clientHeight) {
      releaseScroll = true;
      return;
    }
    bar.style.display = ''
    // bar.stop(true,true).fadeIn('fast');
    if (o.railVisible) { rail.stop(true,true).fadeIn('fast'); }
  }
  function hideBar()
  {
    if (!o.alwaysVisible)
    {
      queueHide = setTimeout(function(){
        if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)
        {
          bar.style.display = 'none'
          rail.style.display = 'none'
        }
      }, 1000);
    }
  }
  return this;
}
