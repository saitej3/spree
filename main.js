
    $(document).ready(function() {
      var margin = $('body').height()-200;
     $('.margin-down').css('margin-top',margin);
     $('.margin-down-small').css('margin-top',margin+100);
      $('.image-class').hide()
      
      //$('.circle-container').click(function() {
        $('.circle-container')
        .css({ position:'absolute', left:0 })
        .rotate({ count:2, duration:1.2,easing:'ease-in', animate:{ left:800 } })
        .fadeTo(100, 0.1)
        .fadeTo(400, 1,function(){
          $('.image-class').fadeTo(400,1,function(){

            $('.deg0 > img')
              .css({ position:'relative'})
              .rotate({endDeg:-360,count:99999, duration:21,forceJS:true });

               $('.deg45 > img')
              .css({ position:'relative'})
              .rotate({endDeg:-360,count:99999, duration:21,forceJS:true });

               $('.deg135 > img')
              .css({ position:'relative'})
              .rotate({endDeg:-360,count:99999, duration:21,forceJS:true });

               $('.deg225 > img')
              .css({ position:'relative'})
              .rotate({endDeg:-360,count:99999, duration:21,forceJS:true });

               $('.deg315 > img')
              .css({ position:'relative'})
              .rotate({endDeg:-360,count:99999, duration:21,forceJS:true });

               

              
            $('.deg0 > img').mouseover(function(){
              $(this).attr("src","sassets/10.png");

            })
            $('.deg0 > img').mouseout(function(){
              $(this).attr("src","sassets/1.png");
            })
            $('.deg45 > img').mouseover(function(){
              $(this).attr("src","sassets/7.png");

            })
            $('.deg45 > img').mouseout(function(){
              $(this).attr("src","sassets/2.png");
            })
            $('.deg135 > img').mouseover(function(){
              $(this).attr("src","sassets/8.png");

            })
            $('.deg135 > img').mouseout(function(){
              $(this).attr("src","sassets/3.png");
            })
            $('.deg225 > img').mouseover(function(){
              $(this).attr("src","sassets/9.png");

            })
            $('.deg225 > img').mouseout(function(){
              $(this).attr("src","sassets/4.png");
            })
            $('.deg315 > img').mouseover(function(){
              $(this).attr("src","sassets/6.png");

            })
            $('.deg315 > img').mouseout(function(){
              $(this).attr("src","sassets/5.png");
            
            })
          });

        })
        .delay(100)
        .rotate({count:99999,duration:21})
        
      });

    
/*
jQuery-Rotate-Plugin v0.2 by anatol.at
http://jsfiddle.net/Anatol/T6kDR/
*/
$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);
  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }
  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }
  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }
  supports.transform=supports('Transform');
  supports.transition=supports('Transition');
  opts.endDeg*=opts.count;
  opts.duration*=opts.count;
  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
        .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
        .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
        .css(opts.animate);
      }, wait4css);
      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });
  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;
    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
          .css(prefixed('transform', 'rotate('+deg+'deg)'))
          .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }
  return $this;
};
