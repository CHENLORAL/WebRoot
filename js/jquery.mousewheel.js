/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.4
 *
 * Requires: 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = [].slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // At a minimum, setup the deltaY to be delta
        deltaY = delta;

        // Firefox < 17 related to DOMMouseScroll event
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = delta * -1;
        }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn     = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta  / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

}));
/*
 * ! jScrollPane - v2.0.18 - 2013-10-23 http://jscrollpane.kelvinluck.com/
 * 
 * Copyright (c) 2013 Kelvin Luck Dual licensed under the MIT or GPL licenses.
 */
!function(a,b,c){a.fn.jScrollPane=function(d){function e(d,e){function f(b){var e,h,j,l,m,n,q=!1,r=!1;if(P=b,Q===c)m=d.scrollTop(),n=d.scrollLeft(),d.css({overflow:"hidden",padding:0}),R=d.innerWidth()+tb,S=d.innerHeight(),d.width(R),Q=a('<div class="jspPane" />').css("padding",sb).append(d.children()),T=a('<div class="jspContainer" />').css({width:R+"px",height:S+"px"}).append(Q).appendTo(d);else{if(d.css("width",""),q=P.stickToBottom&&C(),r=P.stickToRight&&D(),l=d.innerWidth()+tb!=R||d.outerHeight()!=S,l&&(R=d.innerWidth()+tb,S=d.innerHeight(),T.css({width:R+"px",height:S+"px"})),!l&&ub==U&&Q.outerHeight()==V)return d.width(R),void 0;ub=U,Q.css("width",""),d.width(R),T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Q.css("overflow","auto"),U=b.contentWidth?b.contentWidth:Q[0].scrollWidth,V=Q[0].scrollHeight,Q.css("overflow",""),W=U/R,X=V/S,Y=X>1,Z=W>1,Z||Y?(d.addClass("jspScrollable"),e=P.maintainPosition&&(ab||db),e&&(h=A(),j=B()),g(),i(),k(),e&&(y(r?U-R:h,!1),x(q?V-S:j,!1)),H(),E(),N(),P.enableKeyboardNavigation&&J(),P.clickOnTrack&&o(),L(),P.hijackInternalLinks&&M()):(d.removeClass("jspScrollable"),Q.css({top:0,left:0,width:T.width()-tb}),F(),I(),K(),p()),P.autoReinitialise&&!rb?rb=setInterval(function(){f(P)},P.autoReinitialiseDelay):!P.autoReinitialise&&rb&&clearInterval(rb),m&&d.scrollTop(0)&&x(m,!1),n&&d.scrollLeft(0)&&y(n,!1),d.trigger("jsp-initialised",[Z||Y])}function g(){Y&&(T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),eb=T.find(">.jspVerticalBar"),fb=eb.find(">.jspTrack"),$=fb.find(">.jspDrag"),P.showArrows&&(jb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",m(0,-1)).bind("click.jsp",G),kb=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",m(0,1)).bind("click.jsp",G),P.arrowScrollOnHover&&(jb.bind("mouseover.jsp",m(0,-1,jb)),kb.bind("mouseover.jsp",m(0,1,kb))),l(fb,P.verticalArrowPositions,jb,kb)),hb=S,T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){hb-=a(this).outerHeight()}),$.hover(function(){$.addClass("jspHover")},function(){$.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),$.addClass("jspActive");var c=b.pageY-$.position().top;return a("html").bind("mousemove.jsp",function(a){r(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),h())}function h(){fb.height(hb+"px"),ab=0,gb=P.verticalGutter+fb.outerWidth(),Q.width(R-gb-tb);try{0===eb.position().left&&Q.css("margin-left",gb+"px")}catch(a){}}function i(){Z&&(T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),lb=T.find(">.jspHorizontalBar"),mb=lb.find(">.jspTrack"),bb=mb.find(">.jspDrag"),P.showArrows&&(pb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",m(-1,0)).bind("click.jsp",G),qb=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",m(1,0)).bind("click.jsp",G),P.arrowScrollOnHover&&(pb.bind("mouseover.jsp",m(-1,0,pb)),qb.bind("mouseover.jsp",m(1,0,qb))),l(mb,P.horizontalArrowPositions,pb,qb)),bb.hover(function(){bb.addClass("jspHover")},function(){bb.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),bb.addClass("jspActive");var c=b.pageX-bb.position().left;return a("html").bind("mousemove.jsp",function(a){t(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),nb=T.innerWidth(),j())}function j(){T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){nb-=a(this).outerWidth()}),mb.width(nb+"px"),db=0}function k(){if(Z&&Y){var b=mb.outerHeight(),c=fb.outerWidth();hb-=b,a(lb).find(">.jspCap:visible,>.jspArrow").each(function(){nb+=a(this).outerWidth()}),nb-=c,S-=c,R-=b,mb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),h(),j()}Z&&Q.width(T.outerWidth()-tb+"px"),V=Q.outerHeight(),X=V/S,Z&&(ob=Math.ceil(1/W*nb),ob>P.horizontalDragMaxWidth?ob=P.horizontalDragMaxWidth:ob<P.horizontalDragMinWidth&&(ob=P.horizontalDragMinWidth),bb.width(ob+"px"),cb=nb-ob,u(db)),Y&&(ib=Math.ceil(1/X*hb),ib>P.verticalDragMaxHeight?ib=P.verticalDragMaxHeight:ib<P.verticalDragMinHeight&&(ib=P.verticalDragMinHeight),$.height(ib+"px"),_=hb-ib,s(ab))}function l(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function m(a,b,c){return function(){return n(a,b,this,c),this.blur(),!1}}function n(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&vb.scrollByX(b*P.arrowButtonSpeed),0!==c&&vb.scrollByY(c*P.arrowButtonSpeed),g=setTimeout(i,h?P.initialDelay:P.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function o(){p(),Y&&fb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageY-f.top-ab,h=!0,i=function(){var a=e.offset(),c=b.pageY-a.top-ib/2,f=S*P.scrollPagePercent,k=_*f/(V-S);if(0>g)ab-k>c?vb.scrollByY(-f):r(c);else{if(!(g>0))return j(),void 0;c>ab+k?vb.scrollByY(f):r(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}}),Z&&mb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageX-f.left-db,h=!0,i=function(){var a=e.offset(),c=b.pageX-a.left-ob/2,f=R*P.scrollPagePercent,k=cb*f/(U-R);if(0>g)db-k>c?vb.scrollByX(-f):t(c);else{if(!(g>0))return j(),void 0;c>db+k?vb.scrollByX(f):t(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}})}function p(){mb&&mb.unbind("mousedown.jsp"),fb&&fb.unbind("mousedown.jsp")}function q(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),$&&$.removeClass("jspActive"),bb&&bb.removeClass("jspActive")}function r(a,b){Y&&(0>a?a=0:a>_&&(a=_),b===c&&(b=P.animateScroll),b?vb.animate($,"top",a,s):($.css("top",a),s(a)))}function s(a){a===c&&(a=$.position().top),T.scrollTop(0),ab=a;var b=0===ab,e=ab==_,f=a/_,g=-f*(V-S);(wb!=b||yb!=e)&&(wb=b,yb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),v(b,e),Q.css("top",g),d.trigger("jsp-scroll-y",[-g,b,e]).trigger("scroll")}function t(a,b){Z&&(0>a?a=0:a>cb&&(a=cb),b===c&&(b=P.animateScroll),b?vb.animate(bb,"left",a,u):(bb.css("left",a),u(a)))}function u(a){a===c&&(a=bb.position().left),T.scrollTop(0),db=a;var b=0===db,e=db==cb,f=a/cb,g=-f*(U-R);(xb!=b||zb!=e)&&(xb=b,zb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),w(b,e),Q.css("left",g),d.trigger("jsp-scroll-x",[-g,b,e]).trigger("scroll")}function v(a,b){P.showArrows&&(jb[a?"addClass":"removeClass"]("jspDisabled"),kb[b?"addClass":"removeClass"]("jspDisabled"))}function w(a,b){P.showArrows&&(pb[a?"addClass":"removeClass"]("jspDisabled"),qb[b?"addClass":"removeClass"]("jspDisabled"))}function x(a,b){var c=a/(V-S);r(c*_,b)}function y(a,b){var c=a/(U-R);t(c*cb,b)}function z(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),T.scrollTop(0),T.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=B(),j=h+S,h>n||c?l=n-P.horizontalGutter:n+f>j&&(l=n-S+f+P.horizontalGutter),isNaN(l)||x(l,d),i=A(),k=i+R,i>o||c?m=o-P.horizontalGutter:o+g>k&&(m=o-R+g+P.horizontalGutter),isNaN(m)||y(m,d)}function A(){return-Q.position().left}function B(){return-Q.position().top}function C(){var a=V-S;return a>20&&a-B()<10}function D(){var a=U-R;return a>20&&a-A()<10}function E(){T.unbind(Bb).bind(Bb,function(a,b,c,d){var e=db,f=ab;return vb.scrollBy(c*P.mouseWheelSpeed,-d*P.mouseWheelSpeed,!1),e==db&&f==ab})}function F(){T.unbind(Bb)}function G(){return!1}function H(){Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){z(a.target,!1)})}function I(){Q.find(":input,a").unbind("focus.jsp")}function J(){function b(){var a=db,b=ab;switch(c){case 40:vb.scrollByY(P.keyboardSpeed,!1);break;case 38:vb.scrollByY(-P.keyboardSpeed,!1);break;case 34:case 32:vb.scrollByY(S*P.scrollPagePercent,!1);break;case 33:vb.scrollByY(-S*P.scrollPagePercent,!1);break;case 39:vb.scrollByX(P.keyboardSpeed,!1);break;case 37:vb.scrollByX(-P.keyboardSpeed,!1)}return e=a!=db||b!=ab}var c,e,f=[];Z&&f.push(lb[0]),Y&&f.push(eb[0]),Q.focus(function(){d.focus()}),d.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(d){if(d.target===this||f.length&&a(d.target).closest(f).length){var g=db,h=ab;switch(d.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:c=d.keyCode,b();break;case 35:x(V-S),c=null;break;case 36:x(0),c=null}return e=d.keyCode==c&&g!=db||h!=ab,!e}}).bind("keypress.jsp",function(a){return a.keyCode==c&&b(),!e}),P.hideFocus?(d.css("outline","none"),"hideFocus"in T[0]&&d.attr("hideFocus",!0)):(d.css("outline",""),"hideFocus"in T[0]&&d.attr("hideFocus",!1))}function K(){d.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function L(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&Q.find(d)&&(0===T.scrollTop()?c=setInterval(function(){T.scrollTop()>0&&(z(b,!0),a(document).scrollTop(T.position().top),clearInterval(c))},50):(z(b,!0),a(document).scrollTop(T.position().top)))}}function M(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(c){var d,e,f,g,h,i,j=this.href.substr(0,this.href.indexOf("#")),k=location.href;if(-1!==location.href.indexOf("#")&&(k=location.href.substr(0,location.href.indexOf("#"))),j===k){d=escape(this.href.substr(this.href.indexOf("#")+1));try{e=a("#"+d+', a[name="'+d+'"]')}catch(l){return}e.length&&(f=e.closest(".jspScrollable"),g=f.data("jsp"),g.scrollToElement(e,!0),f[0].scrollIntoView&&(h=a(b).scrollTop(),i=e.offset().top,(h>i||i>h+a(b).height())&&f[0].scrollIntoView()),c.preventDefault())}}))}function N(){var a,b,c,d,e,f=!1;T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=A(),b=B(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=db,j=ab;return vb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==db&&j==ab}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function O(){var a=B(),b=A();d.removeClass("jspScrollable").unbind(".jsp"),d.replaceWith(Ab.append(Q.children())),Ab.scrollTop(a),Ab.scrollLeft(b),rb&&clearInterval(rb)}var P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb=this,wb=!0,xb=!0,yb=!1,zb=!1,Ab=d.clone(!1,!1).empty(),Bb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===d.css("box-sizing")?(sb=0,tb=0):(sb=d.css("paddingTop")+" "+d.css("paddingRight")+" "+d.css("paddingBottom")+" "+d.css("paddingLeft"),tb=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0)),a.extend(vb,{reinitialise:function(b){b=a.extend({},P,b),f(b)},scrollToElement:function(a,b,c){z(a,b,c)},scrollTo:function(a,b,c){y(a,c),x(b,c)},scrollToX:function(a,b){y(a,b)},scrollToY:function(a,b){x(a,b)},scrollToPercentX:function(a,b){y(a*(U-R),b)},scrollToPercentY:function(a,b){x(a*(V-S),b)},scrollBy:function(a,b,c){vb.scrollByX(a,c),vb.scrollByY(b,c)},scrollByX:function(a,b){var c=A()+Math[0>a?"floor":"ceil"](a),d=c/(U-R);t(d*cb,b)},scrollByY:function(a,b){var c=B()+Math[0>a?"floor":"ceil"](a),d=c/(V-S);r(d*_,b)},positionDragX:function(a,b){t(a,b)},positionDragY:function(a,b){r(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:P.animateDuration,easing:P.animateEase,queue:!1,step:d})},getContentPositionX:function(){return A()},getContentPositionY:function(){return B()},getContentWidth:function(){return U},getContentHeight:function(){return V},getPercentScrolledX:function(){return A()/(U-R)},getPercentScrolledY:function(){return B()/(V-S)},getIsScrollableH:function(){return Z},getIsScrollableV:function(){return Y},getContentPane:function(){return Q},scrollToBottom:function(a){r(_,a)},hijackInternalLinks:a.noop,destroy:function(){O()}}),f(e)}return d=a.extend({},a.fn.jScrollPane.defaults,d),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){d[this]=d[this]||d.speed}),this.each(function(){var b=a(this),c=b.data("jsp");c?c.reinitialise(d):(a("script",b).filter('[type="text/javascript"],:not([type])').remove(),c=new e(b,d),b.data("jsp",c))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}}(jQuery,this);/*
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * Poshy
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * Tip
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * jQuery
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * plugin
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * v1.2
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * Copyright
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * 2010-2013,
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * Vasil
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * Dinkov,
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 * http://vadikom.com/
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														 */

(function($) {

	var tips = [],
		reBgImage = /^url\(["']?([^"'\)]*)["']?\);?$/i,
		rePNG = /\.png$/i,
		ie6 = !!window.createPopup && document.documentElement.currentStyle.minWidth == 'undefined';

	// make sure the tips' position is updated on resize
	function handleWindowResize() {
		$.each(tips, function() {
			this.refresh(true);
		});
	}
	$(window).resize(handleWindowResize);

	$.Poshytip = function(elm, options) {
		this.$elm = $(elm);
		this.opts = $.extend({}, $.fn.poshytip.defaults, options);
		this.$tip = $(['<div class="',this.opts.className,'">',
				'<div class="tip-inner tip-bg-image"></div>',
				'<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',
			'</div>'].join('')).appendTo(document.body);
		this.$arrow = this.$tip.find('div.tip-arrow');
		this.$inner = this.$tip.find('div.tip-inner');
		this.disabled = false;
		this.content = null;
		this.init();
	};

	$.Poshytip.prototype = {
		init: function() {
			tips.push(this);

			// save the original title and a reference to the Poshytip object
			var title = this.$elm.attr('title');
			this.$elm.data('title.poshytip', title !== undefined ? title : null)
				.data('poshytip', this);

			// hook element events
			if (this.opts.showOn != 'none') {
				this.$elm.bind({
					'mouseenter.poshytip': $.proxy(this.mouseenter, this),
					'mouseleave.poshytip': $.proxy(this.mouseleave, this)
				});
				switch (this.opts.showOn) {
					case 'hover':
						if (this.opts.alignTo == 'cursor')
							this.$elm.bind('mousemove.poshytip', $.proxy(this.mousemove, this));
						if (this.opts.allowTipHover)
							this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.mouseleave, this));
						break;
					case 'focus':
						this.$elm.bind({
							'focus.poshytip': $.proxy(this.showDelayed, this),
							'blur.poshytip': $.proxy(this.hideDelayed, this)
						});
						break;
				}
			}
		},
		mouseenter: function(e) {
			if (this.disabled)
				return true;

			this.$elm.attr('title', '');
			if (this.opts.showOn == 'focus')
				return true;

			this.showDelayed();
		},
		mouseleave: function(e) {
			if (this.disabled || this.asyncAnimating && (this.$tip[0] === e.relatedTarget || jQuery.contains(this.$tip[0], e.relatedTarget)))
				return true;

			if (!this.$tip.data('active')) {
				var title = this.$elm.data('title.poshytip');
				if (title !== null)
					this.$elm.attr('title', title);
			}
			if (this.opts.showOn == 'focus')
				return true;

			this.hideDelayed();
		},
		mousemove: function(e) {
			if (this.disabled)
				return true;

			this.eventX = e.pageX;
			this.eventY = e.pageY;
			if (this.opts.followCursor && this.$tip.data('active')) {
				this.calcPos();
				this.$tip.css({left: this.pos.l, top: this.pos.t});
				if (this.pos.arrow)
					this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
			}
		},
		show: function() {
			if (this.disabled || this.$tip.data('active'))
				return;

			this.reset();
			this.update();

			// don't proceed if we didn't get any content in update() (e.g. the
			// element has an empty title attribute)
			if (!this.content)
				return;

			this.display();
			if (this.opts.timeOnScreen)
				this.hideDelayed(this.opts.timeOnScreen);
		},
		showDelayed: function(timeout) {
			this.clearTimeouts();
			this.showTimeout = setTimeout($.proxy(this.show, this), typeof timeout == 'number' ? timeout : this.opts.showTimeout);
		},
		hide: function() {
			if (this.disabled || !this.$tip.data('active'))
				return;

			this.display(true);
		},
		hideDelayed: function(timeout) {
			this.clearTimeouts();
			this.hideTimeout = setTimeout($.proxy(this.hide, this), typeof timeout == 'number' ? timeout : this.opts.hideTimeout);
		},
		reset: function() {
			this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
			this.$inner.find('*').poshytip('hide');
			if (this.opts.fade)
				this.$tip.css('opacity', this.opacity);
			this.$arrow[0].className = 'tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left';
			this.asyncAnimating = false;
		},
		update: function(content, dontOverwriteOption) {
			if (this.disabled)
				return;

			var async = content !== undefined;
			if (async) {
				if (!dontOverwriteOption)
					this.opts.content = content;
				if (!this.$tip.data('active'))
					return;
			} else {
				content = this.opts.content;
			}

			// update content only if it has been changed since last time
			var self = this,
				newContent = typeof content == 'function' ?
					content.call(this.$elm[0], function(newContent) {
						self.update(newContent);
					}) :
					content == '[title]' ? this.$elm.data('title.poshytip') : content;
			if (this.content !== newContent) {
				this.$inner.empty().append(newContent);
				this.content = newContent;
			}

			this.refresh(async);
		},
		refresh: function(async) {
			if (this.disabled)
				return;

			if (async) {
				if (!this.$tip.data('active'))
					return;
				// save current position as we will need to animate
				var currPos = {left: this.$tip.css('left'), top: this.$tip.css('top')};
			}

			// reset position to avoid text wrapping, etc.
			this.$tip.css({left: 0, top: 0}).appendTo(document.body);

			// save default opacity
			if (this.opacity === undefined)
				this.opacity = this.$tip.css('opacity');

			// check for images - this code is here (i.e. executed each time we
			// show the tip and not on init) due to some browser inconsistencies
			var bgImage = this.$tip.css('background-image').match(reBgImage),
				arrow = this.$arrow.css('background-image').match(reBgImage);

			if (bgImage) {
				var bgImagePNG = rePNG.test(bgImage[1]);
				// fallback to background-color/padding/border in IE6 if a PNG
				// is used
				if (ie6 && bgImagePNG) {
					this.$tip.css('background-image', 'none');
					this.$inner.css({margin: 0, border: 0, padding: 0});
					bgImage = bgImagePNG = false;
				} else {
					this.$tip.prepend('<table class="tip-table" border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>')
						.css({border: 0, padding: 0, 'background-image': 'none', 'background-color': 'transparent'})
						.find('.tip-bg-image').css('background-image', 'url("' + bgImage[1] +'")').end()
						.find('td').eq(3).append(this.$inner);
				}
				// disable fade effect in IE due to Alpha filter + translucent
				// PNG issue
				if (bgImagePNG && !$.support.opacity)
					this.opts.fade = false;
			}
			// IE arrow fixes
			if (arrow && !$.support.opacity) {
				// disable arrow in IE6 if using a PNG
				if (ie6 && rePNG.test(arrow[1])) {
					arrow = false;
					this.$arrow.css('background-image', 'none');
				}
				// disable fade effect in IE due to Alpha filter + translucent
				// PNG issue
				this.opts.fade = false;
			}

			var $table = this.$tip.find('> table.tip-table');
			if (ie6) {
				// fix min/max-width in IE6
				this.$tip[0].style.width = '';
				$table.width('auto').find('td').eq(3).width('auto');
				var tipW = this.$tip.width(),
					minW = parseInt(this.$tip.css('min-width')),
					maxW = parseInt(this.$tip.css('max-width'));
				if (!isNaN(minW) && tipW < minW)
					tipW = minW;
				else if (!isNaN(maxW) && tipW > maxW)
					tipW = maxW;
				this.$tip.add($table).width(tipW).eq(0).find('td').eq(3).width('100%');
			} else if ($table[0]) {
				// fix the table width if we are using a background image
				// IE9, FF4 use float numbers for width/height so use
				// getComputedStyle for them to avoid text wrapping
				// for details look at:
				// http://vadikom.com/dailies/offsetwidth-offsetheight-useless-in-ie9-firefox4/
				$table.width('auto').find('td').eq(3).width('auto').end().end().width(document.defaultView && document.defaultView.getComputedStyle && parseFloat(document.defaultView.getComputedStyle(this.$tip[0], null).width) || this.$tip.width()).find('td').eq(3).width('100%');
			}
			this.tipOuterW = this.$tip.outerWidth();
			this.tipOuterH = this.$tip.outerHeight();

			this.calcPos();

			// position and show the arrow image
			if (arrow && this.pos.arrow) {
				this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
				this.$arrow.css('visibility', 'inherit');
			}

			if (async && this.opts.refreshAniDuration) {
				this.asyncAnimating = true;
				var self = this;
				this.$tip.css(currPos).animate({left: this.pos.l, top: this.pos.t}, this.opts.refreshAniDuration, function() { self.asyncAnimating = false; });
			} else {
				this.$tip.css({left: this.pos.l, top: this.pos.t});
			}
		},
		display: function(hide) {
			var active = this.$tip.data('active');
			if (active && !hide || !active && hide)
				return;

			this.$tip.stop();
			if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (hide && this.opts.hideAniDuration || !hide && this.opts.showAniDuration)) {
				var from = {}, to = {};
				// this.pos.arrow is only undefined when alignX == alignY ==
				// 'center' and we don't need to slide in that rare case
				if (this.opts.slide && this.pos.arrow) {
					var prop, arr;
					if (this.pos.arrow == 'bottom' || this.pos.arrow == 'top') {
						prop = 'top';
						arr = 'bottom';
					} else {
						prop = 'left';
						arr = 'right';
					}
					var val = parseInt(this.$tip.css(prop));
					from[prop] = val + (hide ? 0 : (this.pos.arrow == arr ? -this.opts.slideOffset : this.opts.slideOffset));
					to[prop] = val + (hide ? (this.pos.arrow == arr ? this.opts.slideOffset : -this.opts.slideOffset) : 0) + 'px';
				}
				if (this.opts.fade) {
					from.opacity = hide ? this.$tip.css('opacity') : 0;
					to.opacity = hide ? 0 : this.opacity;
				}
				this.$tip.css(from).animate(to, this.opts[hide ? 'hideAniDuration' : 'showAniDuration']);
			}
			hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
			if (active) {
				var title = this.$elm.data('title.poshytip');
				if (title !== null)
					this.$elm.attr('title', title);
			}
			this.$tip.data('active', !active);
		},
		disable: function() {
			this.reset();
			this.disabled = true;
		},
		enable: function() {
			this.disabled = false;
		},
		destroy: function() {
			this.reset();
			this.$tip.remove();
			delete this.$tip;
			this.content = null;
			this.$elm.unbind('.poshytip').removeData('title.poshytip').removeData('poshytip');
			tips.splice($.inArray(this, tips), 1);
		},
		clearTimeouts: function() {
			if (this.showTimeout) {
				clearTimeout(this.showTimeout);
				this.showTimeout = 0;
			}
			if (this.hideTimeout) {
				clearTimeout(this.hideTimeout);
				this.hideTimeout = 0;
			}
		},
		calcPos: function() {
			var pos = {l: 0, t: 0, arrow: ''},
				$win = $(window),
				win = {
					l: $win.scrollLeft(),
					t: $win.scrollTop(),
					w: $win.width(),
					h: $win.height()
				}, xL, xC, xR, yT, yC, yB;
			if (this.opts.alignTo == 'cursor') {
				xL = xC = xR = this.eventX;
				yT = yC = yB = this.eventY;
			} else { // this.opts.alignTo == 'target'
				var elmOffset = this.$elm.offset(),
					elm = {
						l: elmOffset.left,
						t: elmOffset.top,
						w: this.$elm.outerWidth(),
						h: this.$elm.outerHeight()
					};
				xL = elm.l + (this.opts.alignX != 'inner-right' ? 0 : elm.w);	// left
																				// edge
				xC = xL + Math.floor(elm.w / 2);				// h center
				xR = xL + (this.opts.alignX != 'inner-left' ? elm.w : 0);	// right
																			// edge
				yT = elm.t + (this.opts.alignY != 'inner-bottom' ? 0 : elm.h);	// top
																				// edge
				yC = yT + Math.floor(elm.h / 2);				// v center
				yB = yT + (this.opts.alignY != 'inner-top' ? elm.h : 0);	// bottom
																			// edge
			}

			// keep in viewport and calc arrow position
			switch (this.opts.alignX) {
				case 'right':
				case 'inner-left':
					pos.l = xR + this.opts.offsetX;
					if (this.opts.keepInViewport && pos.l + this.tipOuterW > win.l + win.w)
						pos.l = win.l + win.w - this.tipOuterW;
					if (this.opts.alignX == 'right' || this.opts.alignY == 'center')
						pos.arrow = 'left';
					break;
				case 'center':
					pos.l = xC - Math.floor(this.tipOuterW / 2);
					if (this.opts.keepInViewport) {
						if (pos.l + this.tipOuterW > win.l + win.w)
							pos.l = win.l + win.w - this.tipOuterW;
						else if (pos.l < win.l)
							pos.l = win.l;
					}
					break;
				default: // 'left' || 'inner-right'
					pos.l = xL - this.tipOuterW - this.opts.offsetX;
					if (this.opts.keepInViewport && pos.l < win.l)
						pos.l = win.l;
					if (this.opts.alignX == 'left' || this.opts.alignY == 'center')
						pos.arrow = 'right';
			}
			switch (this.opts.alignY) {
				case 'bottom':
				case 'inner-top':
					pos.t = yB + this.opts.offsetY;
					// 'left' and 'right' need priority for 'target'
					if (!pos.arrow || this.opts.alignTo == 'cursor')
						pos.arrow = 'top';
					if (this.opts.keepInViewport && pos.t + this.tipOuterH > win.t + win.h) {
						pos.t = yT - this.tipOuterH - this.opts.offsetY;
						if (pos.arrow == 'top')
							pos.arrow = 'bottom';
					}
					break;
				case 'center':
					pos.t = yC - Math.floor(this.tipOuterH / 2);
					if (this.opts.keepInViewport) {
						if (pos.t + this.tipOuterH > win.t + win.h)
							pos.t = win.t + win.h - this.tipOuterH;
						else if (pos.t < win.t)
							pos.t = win.t;
					}
					break;
				default: // 'top' || 'inner-bottom'
					pos.t = yT - this.tipOuterH - this.opts.offsetY;
					// 'left' and 'right' need priority for 'target'
					if (!pos.arrow || this.opts.alignTo == 'cursor')
						pos.arrow = 'bottom';
					if (this.opts.keepInViewport && pos.t < win.t) {
						pos.t = yB + this.opts.offsetY;
						if (pos.arrow == 'bottom')
							pos.arrow = 'top';
					}
			}
			this.pos = pos;
		}
	};

	$.fn.poshytip = function(options) {
		if (typeof options == 'string') {
			var args = arguments,
				method = options;
			Array.prototype.shift.call(args);
			// unhook live events if 'destroy' is called
			if (method == 'destroy') {
				this.die ?
					this.die('mouseenter.poshytip').die('focus.poshytip') :
					$(document).undelegate(this.selector, 'mouseenter.poshytip').undelegate(this.selector, 'focus.poshytip');
			}
			return this.each(function() {
				var poshytip = $(this).data('poshytip');
				if (poshytip && poshytip[method])
					poshytip[method].apply(poshytip, args);
			});
		}

		var opts = $.extend({}, $.fn.poshytip.defaults, options);

		// generate CSS for this tip class if not already generated
		if (!$('#poshytip-css-' + opts.className)[0])
			$(['<style id="poshytip-css-',opts.className,'" type="text/css">',
				'div.',opts.className,'{visibility:hidden;position:absolute;top:0;left:0;}',
				'div.',opts.className,' table.tip-table, div.',opts.className,' table.tip-table td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;vertical-align:middle;}',
				'div.',opts.className,' td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:',opts.bgImageFrameSize,'px;width:',opts.bgImageFrameSize,'px;overflow:hidden;}',
				'div.',opts.className,' td.tip-right{background-position:100% 0;}',
				'div.',opts.className,' td.tip-bottom{background-position:100% 100%;}',
				'div.',opts.className,' td.tip-left{background-position:0 100%;}',
				'div.',opts.className,' div.tip-inner{background-position:-',opts.bgImageFrameSize,'px -',opts.bgImageFrameSize,'px;}',
				'div.',opts.className,' div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}',
			'</style>'].join('')).appendTo('head');

		// check if we need to hook live events
		if (opts.liveEvents && opts.showOn != 'none') {
			var handler,
				deadOpts = $.extend({}, opts, { liveEvents: false });
			switch (opts.showOn) {
				case 'hover':
					handler = function() {
						var $this = $(this);
						if (!$this.data('poshytip'))
							$this.poshytip(deadOpts).poshytip('mouseenter');
					};
					// support 1.4.2+ & 1.9+
					this.live ?
						this.live('mouseenter.poshytip', handler) :
						$(document).delegate(this.selector, 'mouseenter.poshytip', handler);
					break;
				case 'focus':
					handler = function() {
						var $this = $(this);
						if (!$this.data('poshytip'))
							$this.poshytip(deadOpts).poshytip('showDelayed');
					};
					this.live ?
						this.live('focus.poshytip', handler) :
						$(document).delegate(this.selector, 'focus.poshytip', handler);
					break;
			}
			return this;
		}

		return this.each(function() {
			new $.Poshytip(this, opts);
		});
	}

	// default settings
	$.fn.poshytip.defaults = {
		content: 		'[title]',	// content to display ('[title]', 'string',
									// element, function(updateCallback){...},
									// jQuery)
		className:		'tip-yellow',	// class for the tips
		bgImageFrameSize:	10,		// size in pixels for the background-image
									// (if set in CSS) frame around the inner
									// content of the tip
		showTimeout:		500,		// timeout before showing the tip (in
										// milliseconds 1000 == 1 second)
		hideTimeout:		100,		// timeout before hiding the tip
		timeOnScreen:		0,		// timeout before automatically hiding the
									// tip after showing it (set to > 0 in order
									// to activate)
		showOn:			'hover',	// handler for showing the tip ('hover',
									// 'focus', 'none') - use 'none' to trigger
									// it manually
		liveEvents:		false,		// use live events
		alignTo:		'cursor',	// align/position the tip relative to
									// ('cursor', 'target')
		alignX:			'right',	// horizontal alignment for the tip relative
									// to the mouse cursor or the target element
							// ('right', 'center', 'left', 'inner-left',
							// 'inner-right') - 'inner-*' matter if
							// alignTo:'target'
		alignY:			'top',		// vertical alignment for the tip relative
									// to the mouse cursor or the target element
							// ('bottom', 'center', 'top', 'inner-bottom',
							// 'inner-top') - 'inner-*' matter if
							// alignTo:'target'
		offsetX:		-22,		// offset X pixels from the default position
									// - doesn't matter if alignX:'center'
		offsetY:		18,		// offset Y pixels from the default position -
								// doesn't matter if alignY:'center'
		keepInViewport:		true,		// reposition the tooltip if needed to
										// make sure it always appears inside
										// the viewport
		allowTipHover:		true,		// allow hovering the tip without hiding
										// it onmouseout of the target - matters
										// only if showOn:'hover'
		followCursor:		false,		// if the tip should follow the cursor -
										// matters only if showOn:'hover' and
										// alignTo:'cursor'
		fade: 			true,		// use fade animation
		slide: 			true,		// use slide animation
		slideOffset: 		8,		// slide animation offset
		showAniDuration: 	300,		// show animation duration - set to 0 if
										// you don't want show animation
		hideAniDuration: 	300,		// hide animation duration - set to 0 if
										// you don't want hide animation
		refreshAniDuration:	200		// refresh animation duration - set to 0 if
									// you don't want animation when updating
									// the tooltip asynchronously
	};

})(jQuery);
if (XM == null) {
	var XM = {};
};


XM.Relation = {
	getToken : function() {
		var self = this;
		var token = '';

		
		
		return token;
	},

	// 加关注
	addFollow : function(uid, callback, isStopDefault) {
		var self = this;

		$.ajax({
			url : '/member/attention',
			type : 'get',
			dataType : 'json',
			data : {
				
				format : 'json',
				uid : uid,
				type : 1
			},
			success : function(rsp) {
				// console.log('toFollow', rsp);
				if (rsp.status == 'ok') {
					if (!isStopDefault) {
						self.showSuccess('关注成功');
					}
					if (typeof(callback) == 'function') {
						callback(rsp);
					}
				} else if (rsp.status == 'failed') {
					// console.log(uid, self.getToken());
					self.showDialog('提示', '', url);
				}
			}
		});
	},

	// 批量关注
	addFollowAll : function(uids, callback, isStopDefault) {
		var self = this;
		if (typeof uids == 'object') {
			uids = uids.join(',');
		}

		$.ajax({
			url : '/member/batch-attention',
			type : 'get',
			dataType : 'json',
			data : {
				format : 'json',
				user_ids : uids
			},
			success : function(rsp) {
				// console.log('addFollowAll', rsp);
				if (!isStopDefault) {
					if (rsp.status) {
						self.showSuccess('关注成功');
					} else {
						alert(rsp.message);
					}
				}
				if (typeof(callback) == 'function') {
					callback(rsp);
				}
			}
		});
	},

	// 取消关注
	delFollow : function(uid, callback, isStopDefault) {
		var self = this;

		// if (confirm('确定要取消关注吗？')) {
			$.ajax({
				url : '/member/attention',
				type : 'get',
				dataType : 'json',
				data : {
					format : 'json',
					uid : uid,
					type : 2
				},
				success : function(rsp) {
					// console.log('delFollow', rsp);
					if (rsp.status == 'ok') {
						if (!isStopDefault) {
							self.showSuccess('已取消关注');
						}
						if (typeof(callback) == 'function') {
							callback(rsp);
						}
					} else if (rsp.status == 'failed') {
						self.showDialog('提示', '', url);
					}
				}
			});
		// }
	},


	// 不再显示用户
	hideUser : function(uid, callback, isStopDefault) {
		var self = this;

		$.ajax({
			url : '/relation/unlikefriend',
			type : 'get',
			dataType : 'json',
			data : {
				uid : uid
			},
			success : function(rsp) {
				// console.log('delFollow', rsp);
				if (rsp.status) {
					if (!isStopDefault) {
						self.showSuccess('已屏蔽该用户');
					}
					if (typeof(callback) == 'function') {
						callback(rsp);
					}
				}
			}
		});
	},

	// 收藏艺人
	addArtist : function(id, callback, isStopDefault) {
		var self = this;
		// var url = '/music/tag/type/6/id/'+ encodeURIComponent(id);
		// showDialog(url);
		$.ajax({
			url : '/ajax/addtag',
			type : 'get',
			dataType : 'json',
			data : {
				format : 'json',
				id : id,
				type : 6
			},
			success : function(rsp) {
				// console.log('addArtist', rsp);
				if (rsp.status == 'ok') {
					if (!isStopDefault) {
						self.showSuccess('关注成功');
					}
					if (typeof(callback) == 'function') {
						callback(rsp);
					}
				}
			}
		});
	},

	// 取消收藏艺人
	delArtist : function(id, callback, isStopDefault) {
		var self = this;
		// if (confirm('确定要取消关注吗？')) {
			$.ajax({
				url : '/ajax/space-lib-del',
				type : 'get',
				dataType : 'json',
				data : {
					artist_id : id
				},
				success : function(rsp) {
					// console.log('delArtist', rsp);
					if (rsp.code == 1) {
						if (!isStopDefault) {
							self.showSuccess('关注成功');
						}
						if (typeof(callback) == 'function') {
							callback(rsp);
						}
					}
				}
			});
		// }
	},

	// 不再显示艺人
	hideArtist : function(id, callback, isStopDefault) {
		var self = this;

		$.ajax({
			url : '/relation/unlikeartist',
			type : 'get',
			dataType : 'json',
			data : {
				artist_id : id
			},
			success : function(rsp) {
				// console.log('delFollow', rsp);
				if (rsp.status) {
					if (!isStopDefault) {
						self.showSuccess('已屏蔽该艺人');
					}
					if (typeof(callback) == 'function') {
						callback(rsp);
					}
				}
			}
		});
	},

	// 显示对话框
	showDialog : function(title, content, url, target) {
		if (typeof myjqmOnShow == 'function' && typeof myjqmOnLoad == 'function') {
			if (!target) target = "div.dialog_main";

			content = '<div class="dialog_main">\
					<h3>' + title + '</h3>\
					<div class="dialog_content">' + content + '</div>\
					<div class="dialog_acts"><input type="button" onclick="closedialog();" value="关 闭" class="bt_sub2"></div>\
					<a href="javascript:void(0);" title="" onclick="closedialog();" class="Closeit">关闭</a>\
				</div>';
			$('#dialog_clt .dialog_main').html(content);

			var ajaxUrl = (typeof url == 'string') ? url : null
			$('#dialog_clt').jqm({
				ajax: ajaxUrl,
				modal:true,
				toTop:true,
				target: target,
				ajaxText: '',
				onShow:myjqmOnShow,
				onLoad:myjqmOnLoad
			}).jqDrag('.jqDrag').jqmShow();
		} else {
			showDialog(url);
		}
	},

	// 显示成功提示
	showSuccess : function(title, message) {
		var self = this;
		message = message || '';
		var content = '<div class="notice_success" id="success_msg"><h5 class="tit">' + title + '</h5>\
		<p>' + message + '</p></div>';
		self.showDialog('提示', content);
		setTimeout('closedialog();', 2000);
	},

	// 显示失败提示
	showError : function(title, message) {
		var self = this;
		message = message || '';
		var content = '<div class="notice_fail" id="fail_msg"><h5 class="tit">' + title + '</h5>\
		<p>' + message + '</p></div>';
		self.showDialog('提示', content);
		setTimeout('closedialog();', 2000);
	}

};


XM.RelationButton = function() {};
XM.RelationButton.prototype = {
	init : function(opt) {
		var self = this;

		self.button = opt.button;
		self.addFollowCallback = opt.addFollowCallback;
		self.delFollowCallback = opt.delFollowCallback;
		self.isStopDefault = opt.isStopDefault;

		self.button.attr('locked', false);
		self.button.mouseover(function(evt) {
			var button = $(this);
			var relation = button.data('relation');
			if (button.attr('locked') == 'false') {
				if (relation === 2 || relation === 3) {
					button.attr('title', '取消关注');
					button.html('<i class="icon icon_del_follow"></i>取消关注');
				}
			}
		}).mouseout(function(evt) {
			var button = $(this);
			var relation = button.data('relation');
			if (button.attr('locked') == 'false') {
				if (relation === 2) {
					button.attr('title', '已关注');
					button.html('<i class="icon icon_following"></i>已关注');
				} else if (relation === 3) {
					button.attr('title', '互相关注');
					button.html('<i class="icon icon_be_followed"></i>互相关注');
				}
			}
		}).click(function(evt) {
			var button = $(this);
			var relation = button.data('relation');
			var uid = button.data('uid');

			// console.log('click', self.button.attr('locked'));
			if (button.attr('locked') == 'false') {
				button.attr('locked', true);

				if (relation === 0 || relation === 1) {
					button.html('<i class="icon icon_loading"></i>关注中');

					self.addFollow(uid, function(rsp) {
						rsp.uid = uid;
						// console.log('addFollow', rsp);
						if (rsp.status == 'ok') {
							button.attr('locked', false);
							if (!rsp.is_follow && !rsp.is_fans) {			// 未关注
								self.initButton(button, 0);
							} else if (!rsp.is_follow && rsp.is_fans) {		// 我未关注TA
																			// &&
																			// TA关注了我
								self.initButton(button, 1);
							} else if (rsp.is_follow && !rsp.is_fans) { 	// 我关注了TA
																			// &&
																			// TA未关注我
								self.initButton(button, 2);
							} else if (rsp.is_follow && rsp.is_fans) {		// 相互关注
								self.initButton(button, 3);
							}
						}

						if (typeof self.addFollowCallback == 'function') {
							self.addFollowCallback(rsp);
						}
					});
				} else if (relation === 2 || relation === 3) {
					if (confirm('确定要取消关注吗？')) {
						button.html('<i class="icon icon_loading"></i>取消中');

						self.delFollow(uid, function(rsp) {
							rsp.uid = uid;
							button.attr('locked', false);
							if (rsp.status == 'ok') {
								button.isLocked = false;
								if (!rsp.is_follow && !rsp.is_fans) {			// 未关注
									self.initButton(button, 0);
								} else if (!rsp.is_follow && rsp.is_fans) {		// 我未关注TA
																				// &&
																				// TA关注了我
									self.initButton(button, 1);
								} else if (rsp.is_follow && !rsp.is_fans) { 	// 我关注了TA
																				// &&
																				// TA未关注我
									self.initButton(button, 2);
								} else if (rsp.is_follow && rsp.is_fans) {		// 相互关注
									self.initButton(button, 3);
								}
							}

							if (typeof self.delFollowCallback == 'function') {
								self.delFollowCallback(rsp);
							}
						});
					} else {
						self.initButton(button, relation);
					}
				}
			}
		});
	},

	
	initButton : function(button, relation) {
		var self = this;

		button.data('relation', relation);
		button.attr('locked', false);
		switch (relation) {
			case 0: 	// 未关注
				button.html('<i class="icon icon_add_follow"></i>关注');
				break;

			case 1: 	// 我未TA && TA关注了我
				button.html('<i class="icon icon_add_follow"></i>关注');
				break;

			case 2: 	// 我关注了TA && TA未关注我
				button.html('<i class="icon icon_following"></i>已关注');
				break;

			case 3: 	// 相互关注
				button.html('<i class="icon icon_be_followed"></i>互相关注');
				break;
		}
	},


	addFollow : function(uid, callback) {
		var self = this;
		XM.Relation.addFollow(uid, callback, self.isStopDefault);
	},


	delFollow : function(uid, callback) {
		var self = this;
		XM.Relation.delFollow(uid, callback, self.isStopDefault);
	}
};
if (XM == null) {
	var XM = {};
};

XM.NameCard = function() {
	var self = this;

	self.$win = null;			// 窗体
	self.$triggerList = [];		// 触发名片的节点
	self.$card = null;			// 名片容器
	self.$cardContent = null	// 名片内容容器
	self.cardTemplate = ''		// 名片内容模板
	self.myCardTemplate = ''	// 自己的名片内容模板
	self.dataList = {};			// 本页名片数据缓存
	self.apiUrl = '/relation/card'; // '?user_id=123'
	self.showDelay = 300;			// 延时响应
	self.hideDelay = 500;		// 延时隐藏
	// 延时隐藏时间必须大于延时响应时间
	self.hideDelay = (self.hideDelay <= self.showDelay) ? self.showDelay + 100 : self.hideDelay;
	self.isLocked = false;		// 名片的显示锁定

	self.winSize = {			// 窗口大小
		width : 0, height : 0
	};
	self.winScroll = {			// 窗口滚动距离
		left : 0, top : 0
	};
	self.cardSize = {			// 名片的尺寸
		width : 0, height : 0
	};
	self.cardPosition = {		// 名片的位置（相对于Document左上角）
		left : 0, top : 0
	};
	self.cardOffset = {			// 名片的偏移位置（相对于触发对象）
		left : 30, right : 30, top : 10, bottom : 3
	};
	self.trigerSize = {			// 触发对象的尺寸
		width : 0, height : 0
	};
	self.trigerPosition = {		// 触发对象的位置（相对于Document左上角）
		left : 0, top : 0
	};
};

XM.NameCard.prototype = {
	init : function(opt) {
		var self = this;

		self.showDelay = opt.showDelay || self.showDelay;
		self.hideDelay = opt.hideDelay || self.hideDelay;
		self.$win = $(window);
		self.winSize = {
			width : self.$win.width(),
			height : self.$win.height()
		};
		self.winScroll = {
			left : self.$win.scrollLeft(),
			top : self.$win.scrollTop()
		};

		self.$win.resize(function(evt) {
			self.winSize = {
				width : self.$win.width(),
				height : self.$win.height()
			};
		});

		self.$win.scroll(function(evt) {
			self.winScroll = {
				left : $(this).scrollLeft(),
				top : $(this).scrollTop()
			};
			// console.log('window.scroll', self.winScroll);
		});

		self.$card = $('<div class="name_card" id="name_card" style="display:none;">');
		self.$cardContent = $('<div class="content"></div>');
		self.$card.append(self.$cardContent);
		self.$card.append($('<div class="arrow"></div>'));
		$('body').append(self.$card);
		self.cardSize = {
			width : self.$card.outerWidth(),
			height : self.$card.outerHeight()
		};
		// console.log('size', self.cardSize);
		self.$card.mouseover(function(evt) {
			self.isLocked = true;
		}).mouseout(function(evt) {
			self.isLocked = false;
			self.hideCard();
		});


		self.cardTemplate = '<div class="inner">\
			<div class="user_info">\
				<div class="user_img">\
				</div>\
				<div class="info">\
					<p>{{html icon_gender}} ${province} ${city}\
					</p>\
				</div>\
			</div>\
			<div class="play_count"><span>累计播放歌曲</span>{{html listens_str}}</div>\
			<ul class="relation_info">\
			</ul>\
			<div class="relative">\
				{{if (is_fans && is_follow)}}\
					<a class="btn btn_relation" href="javascript:;" rel="nofollow" data-relation="3" data-uid="${user_id}" title="互相关注"><i class="icon icon_be_followed"></i>互相关注</a>\
				{{else (is_follow)}}\
					<a class="btn btn_relation" href="javascript:;" rel="nofollow" data-relation="2" data-uid="${user_id}" title="已关注"><i class="icon icon_following"></i>已关注</a>\
				{{else}}\
					<a class="btn btn_relation" href="javascript:;" rel="nofollow" data-relation="1" data-uid="${user_id}" title="加关注"><i class="icon icon_add_follow"></i>关注</a>\
				{{/if}}\
			</div>\
		</div>';

		self.myCardTemplate = self.cardTemplate;
		self.myCardTemplate = self.myCardTemplate.replace('/space/following/u/${user_id}', '/relation/following');
		self.myCardTemplate = self.myCardTemplate.replace('/space/fans/u/${user_id}', '/relation/fans');

		self.$triggerList = $('[' + opt.triggerType + ']');	// 获取所有带
															// opt.triggerType
															// 属性的节点
		// self.$triggerList.mouseover(function(evt) {
		$('body').on('mouseover', '[' + opt.triggerType + ']', function(evt) {
			var $item = $(this);
			var uid = $item.attr(opt.triggerType);
			self.isLocked = true;
			var timer = setTimeout(function() {
				if (self.isLocked) {
					self.trigerSize = {
						width : $item.outerWidth(),
						height : $item.outerHeight()
					};
					// console.log('item', size);
					self.trigerPosition = $item.offset();
					self.readData(uid);
					self.showCard();
				}
			}, self.showDelay);
		// }).mouseout(function(evt) {
		}).on('mouseout', '[' + opt.triggerType + ']', function(evt) {
			self.isLocked = false;
			self.hideCard();
		});
	},

	// 从本页缓存中读取数据
	readData : function(uid) {
		var self = this;
		var data = self.dataList['uid_' + uid];

		if (data) {
			// console.log('readData:' + uid, data);
			self.initCardContent(data);
		} else {
			self.getData(uid);
		}
	},

	getData : function(uid) {
		var self = this;

		// console.log('getData:' + uid);
		$.ajax({
			url : self.apiUrl,
			type : 'get',
			dataType : 'json',
			success : function(rsp) {
				// console.log('getData', rsp);
				if (rsp.status == 1) {
					var data = rsp.data;
					if (data.gender == 'F') {
						data.icon_gender = '<i class="icon icon_female" title="女"></i>';
					} else if (data.gender == 'M') {
						data.icon_gender = '<i class="icon icon_male" title="男"></i>';
					} else {
						data.icon_gender = '';
					}
					// data.icon_mobile = '<i class="icon icon_mobile"
					// title="手机用户"></i>';
					data.listens_str = self.getListensString(data.listens);
					self.getDataCallback(data);
				}
			}
		});
	},

	getDataCallback : function(data) {
		var self = this;

		if (!self.dataList['uid_' + data.user_id]) {
			self.dataList['uid_' + data.user_id] = data;
			self.showCard(data);
			self.initCardContent(data);
		}
	},

	showCard : function() {
		var self = this;
		var className = '';

		if (self.winSize.width - self.trigerPosition.left > self.cardSize.width) {	// 在右边显示
			className += 'r';
			self.cardPosition.left = self.trigerPosition.left - self.cardOffset.left;
		} else {	// 在左边显示
			className += 'l';
			self.cardPosition.left = self.trigerPosition.left + self.trigerSize.width - self.cardSize.width + self.cardOffset.right;
		}

		if (self.trigerPosition.top - self.winScroll.top > self.cardSize.height) {	// 在上方显示
			className += 't';
			self.cardPosition.top = self.trigerPosition.top - self.cardSize.height - self.cardOffset.top;
		} else {	// 在上方显示
			className += 'b';
			self.cardPosition.top = self.trigerPosition.top + self.trigerSize.height + self.cardOffset.bottom;
		}

		self.$card.removeClass('name_card_rt');
		self.$card.removeClass('name_card_rb');
		self.$card.removeClass('name_card_lt');
		self.$card.removeClass('name_card_lb');
		self.$card.addClass('name_card_' + className);
		self.$card.css({
			left : self.cardPosition.left,
			top : self.cardPosition.top
		});
		self.$card.fadeIn(200);
		// self.$card.css('display', '');
	},

	hideCard : function() {
		var self = this;

		var timer = setTimeout(function() {
			if (!self.isLocked) {
				self.$card.fadeOut(100);
				// self.$card.css('display', 'none');
			}
		}, self.hideDelay);
	},

	initCardContent : function(data) {
		var self = this;

		self.$cardContent.html('');
		if (data.is_self) {
			// console.log(self.myCardTemplate);
			self.$cardContent.append($.tmpl(self.myCardTemplate, data));
		} else {
			self.$cardContent.append($.tmpl(self.cardTemplate, data));
		}

		var relationButton = new XM.RelationButton();
		relationButton.init({
			button : $('#name_card .btn_relation'),
			addFollowCallback : function(rsp) {
				if (self.dataList['uid_' + rsp.uid]) {
					self.dataList['uid_' + rsp.uid] = null;
				}
			},
			delFollowCallback : function(rsp) {
				if (self.dataList['uid_' + rsp.uid]) {
					self.dataList['uid_' + rsp.uid] = null;
				}
			},
			isStopDefault : true
		});
	},

	getListensString : function(n) {
		var str = n.toString();
		for (var i = str.length; i < 7; i ++) {
			str = '0' + str;
		}
		str = str.split('');	// string to array for IE6
		var arr = [];
		for (var i = 0; i < str.length; i ++) {
			if (i == 0) {
				arr.push('<em class="first">' + str[i] + '</em>');
			} else if (i == 6) {
				arr.push('<em class="last">' + str[i] + '</em>');
			} else {
				arr.push('<em>' + str[i] + '</em>');
			}
		}
		return arr.join('');
	},

	addFollow : function(user_id) {
		var self = this;

		self.dataList['uid_' + user_id] = null;
		XM.Relation.addFollow(user_id);
	},

	delFollow : function(user_id) {
		var self = this;

		self.dataList['uid_' + user_id] = null;
		XM.Relation.delFollow(user_id);
	}
};


var nameCard = new XM.NameCard();

$(function() {
	if (typeof(nameCardOption) == 'undefined') {
		nameCard.init({
			triggerType : 'name_card'
		});
	}
});
/* ! 2013年5月28日 16:44:34 noyobo@gmail.com */
var MUSICIANPLAY = MUSICIANPLAY || {};

MUSICIANPLAY.Util  = {
	uaBrowser: function( userAgent  ){
		var ua = userAgent.toLowerCase();
		// Useragent RegExp
		var rwebkit = /(webkit)[ \/]([\w.]+)/;
		var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
		var rmsie = /(msie) ([\w.]+)/;
		var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},
	sospa: function(str){
		var self = this;
		var totle = parseInt(str);
		var newString = str.substr(1);
		var chu = Math.floor(newString.length / totle);
		var yu = newString.length % totle;
		var stor = new Array();
		var i;
		for(i = 0;i<yu;i++){
			stor[i] = newString.substr((chu+1)*i,chu+1);
		}
		for(i=yu;i<totle;i++){
			stor[i] = newString.substr(chu*(i-yu)+(chu+1)*yu,chu);
		}
		
		var pinString = '';
		for(i=0;i<stor[0].length;i++){
			for(j=0;j<stor.length;j++){
				pinString += stor[j].substr(i,1);
			}
		}
		pinString = self.rtan(pinString);
		var returnString = '';
		for(i=0;i<pinString.length;i++){
			if(pinString.substr(i,1)=='^'){
				returnString += "0";
			} else {
				returnString += pinString.substr(i,1);
			}
		}
		return unescape(returnString);
	},
	rtan: function(str){ 
		var ret=""; 
		for(var i=0;i<str.length;i++){ 
			var chr = str.charAt(i); 
			if(chr == "+"){ 
				ret+=" "; 
			}else if(chr=="%"){ 
				var asc = str.substring(i+1,i+3); 
				if(parseInt("0x"+asc)>0x7f){ 
					ret+=String.fromCharCode(parseInt("0x"+asc+str.substring(i+4,i+6))); 
					i+=5; 
				}else{ 
					ret+=String.fromCharCode(parseInt("0x"+asc)); 
					i+=2;
				} 
			}else{ 
				ret+= chr; 
			} 
		} 
		return ret; 
	},
	uiTimeFormat : function(time) {
		if (isNaN(time))
			return "00:00";
		time /= 1000;
		return (parseInt(time / 60) + ':' + parseInt(time % 60)).replace(/\b(\d)\b/g, '0$1');
	}
}

MUSICIANPLAY.pro = {
	html	: '<object width="0" height="0" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="Player-{targetPlayer}">\
<param value="{swf}" name="movie"><param value="high" name="quality">\
<param value="always" name="allowScriptAccess">\
<param name="flashvars" value="targetPlay={targetPlayer}" />\
<embed width="0" height="0" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="{swf}" allowscriptaccess="always" flashvars="targetPlay={targetPlayer}" name="Player-{targetPlayer}">\
</object>',
	flashPlay	: false
}

MUSICIANPLAY.play = {
	songId	: 0,
	lstened: false,
	player	: null,
	create : function(targetPlayer, swf) {
		var browserMatch = MUSICIANPLAY.Util.uaBrowser(navigator.userAgent);
		var a = document.createElement('audio');
		var canPlayMp3 = !!(a.canPlayType && a.canPlayType('audio/mpeg; codes="mpe"').replace(/no/, ''));
		
		if(browserMatch.browser !== "msie" && canPlayMp3){
			var audio = new Audio();
			var canMp3 = !!(audio.canPlayType && audio.canPlayType('audio/mpeg; codecs="mp3"').replace(/no/, ''));
			this.player = audio;
			
			this.player.addEventListener("ended", 		MUSICIANPLAY.audioEvent.ended);
			this.player.addEventListener("timeupdate",	MUSICIANPLAY.audioEvent.timeupdate);
			
			MUSICIANPLAY.pro.flashPlay = true;
			
		}else{
			var id = document.createElement("DIV"); 
			id.style.width = 0;
			id.style.height = 0;
			id.style.overflow = 'hidden';
			document.body.appendChild(id);
			
			MUSICIANPLAY.pro.html		= MUSICIANPLAY.pro.html.replace(/\{swf\}/g, swf);
			MUSICIANPLAY.pro.html		= MUSICIANPLAY.pro.html.replace(/\{targetPlayer\}/g, targetPlayer);
			id.innerHTML	= MUSICIANPLAY.pro.html;
			this.player		= window.document['Player-' + targetPlayer] || document.getElementById('Player-' + targetPlayer);
		}
		this.eventInit();
	},
	eventInit: function(){
		this.play();
		this.pause();
		this.rePlay();
		this.stop();
		this.jumpPlay();
	},
	play : function() {
		if(MUSICIANPLAY.pro.flashPlay){
			return this.play = function(url, sid){
                MUSICIANPLAY.play.lstened = false;
				this.songId	= sid;
				this.player.src = MUSICIANPLAY.Util.sospa(url);
				this.player.play();
			}
		}else{
			return this.play = function(url, sid){
				this.player.jsPlay(url, sid);
			}
		}
	},
	stop : function() {
		if(MUSICIANPLAY.pro.flashPlay){
			return this.stop = function(){
				this.player.pause();
			}
		}else{
			return this.stop = function(){
				this.player.jsStop();
			}
		}
	},
	pause : function() {
		if(MUSICIANPLAY.pro.flashPlay){
			return this.pause = function(){
				this.player.pause();
			}
		}else{
			return this.pause = function(){
				this.player.jsPause();
			}
		}
	},
	rePlay : function() {
		if(MUSICIANPLAY.pro.flashPlay){
			return this.rePlay = function(){
				this.player.play();
			}
		}else{
			return this.rePlay = function(){
				this.player.jsRePlay();
			}
		}
		
	},
	jumpPlay : function() {
		if(MUSICIANPLAY.pro.flashPlay){
			return this.jumpPlay = function(pos){
				this.player.currentTime = pos / 1000;
				// this.player.play();
			}
		}else{
			return this.jumpPlay = function(pos){
				this.player.jsJumpPlay(pos);
			}
		}
	},
	setVolume : function(val) {
		this.player.jsSetVolume(val);
	}
};

MUSICIANPLAY.audioEvent = {
	timeupdate: function(){
		var o = {
			timeLength: this.duration * 1000,
			curTime:	this.currentTime * 1000
		};
		if( typeof MUSICIANPLAY.types.timeupdate === "function" ){
			MUSICIANPLAY.types.timeupdate(o);
		}
		if(!MUSICIANPLAY.play.lstened && o.curTime > 120000 && MUSICIANPLAY.play.songId != 0){
			MUSICIANPLAY.play.lstened = true;
			jQuery.get("/count/playrecord",{sid:MUSICIANPLAY.play.songId,object_name:"song"});
		}
	},
	ended: function(){
		if(MUSICIANPLAY.play.lstened == false){
			jQuery.get("/count/playrecord",{sid:MUSICIANPLAY.play.songId,object_name:"song"});
		}
		MUSICIANPLAY.play.songId = 0;
		MUSICIANPLAY.play.lstened = false;
		if( typeof MUSICIANPLAY.types.ended === "function" ){
			MUSICIANPLAY.types.ended();
		}
	}
};
MUSICIANPLAY.types = {};
MUSICIANPLAY.event = {
	// 播放器 事件
	trigger : function(type, obj) {
		if (typeof MUSICIANPLAY.types[type] === "function") MUSICIANPLAY.types[type](obj);
	},
	addEvent : function(type, fn) {
		if (typeof MUSICIANPLAY.types[type] === "undefined") {
			MUSICIANPLAY.types[type] = fn;
		}
	}
}