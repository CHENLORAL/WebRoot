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
/*!
 * jScrollPane - v2.0.18 - 2013-10-23
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2013 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a,b,c){a.fn.jScrollPane=function(d){function e(d,e){function f(b){var e,h,j,l,m,n,q=!1,r=!1;if(P=b,Q===c)m=d.scrollTop(),n=d.scrollLeft(),d.css({overflow:"hidden",padding:0}),R=d.innerWidth()+tb,S=d.innerHeight(),d.width(R),Q=a('<div class="jspPane" />').css("padding",sb).append(d.children()),T=a('<div class="jspContainer" />').css({width:R+"px",height:S+"px"}).append(Q).appendTo(d);else{if(d.css("width",""),q=P.stickToBottom&&C(),r=P.stickToRight&&D(),l=d.innerWidth()+tb!=R||d.outerHeight()!=S,l&&(R=d.innerWidth()+tb,S=d.innerHeight(),T.css({width:R+"px",height:S+"px"})),!l&&ub==U&&Q.outerHeight()==V)return d.width(R),void 0;ub=U,Q.css("width",""),d.width(R),T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Q.css("overflow","auto"),U=b.contentWidth?b.contentWidth:Q[0].scrollWidth,V=Q[0].scrollHeight,Q.css("overflow",""),W=U/R,X=V/S,Y=X>1,Z=W>1,Z||Y?(d.addClass("jspScrollable"),e=P.maintainPosition&&(ab||db),e&&(h=A(),j=B()),g(),i(),k(),e&&(y(r?U-R:h,!1),x(q?V-S:j,!1)),H(),E(),N(),P.enableKeyboardNavigation&&J(),P.clickOnTrack&&o(),L(),P.hijackInternalLinks&&M()):(d.removeClass("jspScrollable"),Q.css({top:0,left:0,width:T.width()-tb}),F(),I(),K(),p()),P.autoReinitialise&&!rb?rb=setInterval(function(){f(P)},P.autoReinitialiseDelay):!P.autoReinitialise&&rb&&clearInterval(rb),m&&d.scrollTop(0)&&x(m,!1),n&&d.scrollLeft(0)&&y(n,!1),d.trigger("jsp-initialised",[Z||Y])}function g(){Y&&(T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),eb=T.find(">.jspVerticalBar"),fb=eb.find(">.jspTrack"),$=fb.find(">.jspDrag"),P.showArrows&&(jb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",m(0,-1)).bind("click.jsp",G),kb=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",m(0,1)).bind("click.jsp",G),P.arrowScrollOnHover&&(jb.bind("mouseover.jsp",m(0,-1,jb)),kb.bind("mouseover.jsp",m(0,1,kb))),l(fb,P.verticalArrowPositions,jb,kb)),hb=S,T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){hb-=a(this).outerHeight()}),$.hover(function(){$.addClass("jspHover")},function(){$.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),$.addClass("jspActive");var c=b.pageY-$.position().top;return a("html").bind("mousemove.jsp",function(a){r(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),h())}function h(){fb.height(hb+"px"),ab=0,gb=P.verticalGutter+fb.outerWidth(),Q.width(R-gb-tb);try{0===eb.position().left&&Q.css("margin-left",gb+"px")}catch(a){}}function i(){Z&&(T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),lb=T.find(">.jspHorizontalBar"),mb=lb.find(">.jspTrack"),bb=mb.find(">.jspDrag"),P.showArrows&&(pb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",m(-1,0)).bind("click.jsp",G),qb=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",m(1,0)).bind("click.jsp",G),P.arrowScrollOnHover&&(pb.bind("mouseover.jsp",m(-1,0,pb)),qb.bind("mouseover.jsp",m(1,0,qb))),l(mb,P.horizontalArrowPositions,pb,qb)),bb.hover(function(){bb.addClass("jspHover")},function(){bb.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),bb.addClass("jspActive");var c=b.pageX-bb.position().left;return a("html").bind("mousemove.jsp",function(a){t(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),nb=T.innerWidth(),j())}function j(){T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){nb-=a(this).outerWidth()}),mb.width(nb+"px"),db=0}function k(){if(Z&&Y){var b=mb.outerHeight(),c=fb.outerWidth();hb-=b,a(lb).find(">.jspCap:visible,>.jspArrow").each(function(){nb+=a(this).outerWidth()}),nb-=c,S-=c,R-=b,mb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),h(),j()}Z&&Q.width(T.outerWidth()-tb+"px"),V=Q.outerHeight(),X=V/S,Z&&(ob=Math.ceil(1/W*nb),ob>P.horizontalDragMaxWidth?ob=P.horizontalDragMaxWidth:ob<P.horizontalDragMinWidth&&(ob=P.horizontalDragMinWidth),bb.width(ob+"px"),cb=nb-ob,u(db)),Y&&(ib=Math.ceil(1/X*hb),ib>P.verticalDragMaxHeight?ib=P.verticalDragMaxHeight:ib<P.verticalDragMinHeight&&(ib=P.verticalDragMinHeight),$.height(ib+"px"),_=hb-ib,s(ab))}function l(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function m(a,b,c){return function(){return n(a,b,this,c),this.blur(),!1}}function n(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&vb.scrollByX(b*P.arrowButtonSpeed),0!==c&&vb.scrollByY(c*P.arrowButtonSpeed),g=setTimeout(i,h?P.initialDelay:P.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function o(){p(),Y&&fb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageY-f.top-ab,h=!0,i=function(){var a=e.offset(),c=b.pageY-a.top-ib/2,f=S*P.scrollPagePercent,k=_*f/(V-S);if(0>g)ab-k>c?vb.scrollByY(-f):r(c);else{if(!(g>0))return j(),void 0;c>ab+k?vb.scrollByY(f):r(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}}),Z&&mb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageX-f.left-db,h=!0,i=function(){var a=e.offset(),c=b.pageX-a.left-ob/2,f=R*P.scrollPagePercent,k=cb*f/(U-R);if(0>g)db-k>c?vb.scrollByX(-f):t(c);else{if(!(g>0))return j(),void 0;c>db+k?vb.scrollByX(f):t(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}})}function p(){mb&&mb.unbind("mousedown.jsp"),fb&&fb.unbind("mousedown.jsp")}function q(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),$&&$.removeClass("jspActive"),bb&&bb.removeClass("jspActive")}function r(a,b){Y&&(0>a?a=0:a>_&&(a=_),b===c&&(b=P.animateScroll),b?vb.animate($,"top",a,s):($.css("top",a),s(a)))}function s(a){a===c&&(a=$.position().top),T.scrollTop(0),ab=a;var b=0===ab,e=ab==_,f=a/_,g=-f*(V-S);(wb!=b||yb!=e)&&(wb=b,yb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),v(b,e),Q.css("top",g),d.trigger("jsp-scroll-y",[-g,b,e]).trigger("scroll")}function t(a,b){Z&&(0>a?a=0:a>cb&&(a=cb),b===c&&(b=P.animateScroll),b?vb.animate(bb,"left",a,u):(bb.css("left",a),u(a)))}function u(a){a===c&&(a=bb.position().left),T.scrollTop(0),db=a;var b=0===db,e=db==cb,f=a/cb,g=-f*(U-R);(xb!=b||zb!=e)&&(xb=b,zb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),w(b,e),Q.css("left",g),d.trigger("jsp-scroll-x",[-g,b,e]).trigger("scroll")}function v(a,b){P.showArrows&&(jb[a?"addClass":"removeClass"]("jspDisabled"),kb[b?"addClass":"removeClass"]("jspDisabled"))}function w(a,b){P.showArrows&&(pb[a?"addClass":"removeClass"]("jspDisabled"),qb[b?"addClass":"removeClass"]("jspDisabled"))}function x(a,b){var c=a/(V-S);r(c*_,b)}function y(a,b){var c=a/(U-R);t(c*cb,b)}function z(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),T.scrollTop(0),T.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=B(),j=h+S,h>n||c?l=n-P.horizontalGutter:n+f>j&&(l=n-S+f+P.horizontalGutter),isNaN(l)||x(l,d),i=A(),k=i+R,i>o||c?m=o-P.horizontalGutter:o+g>k&&(m=o-R+g+P.horizontalGutter),isNaN(m)||y(m,d)}function A(){return-Q.position().left}function B(){return-Q.position().top}function C(){var a=V-S;return a>20&&a-B()<10}function D(){var a=U-R;return a>20&&a-A()<10}function E(){T.unbind(Bb).bind(Bb,function(a,b,c,d){var e=db,f=ab;return vb.scrollBy(c*P.mouseWheelSpeed,-d*P.mouseWheelSpeed,!1),e==db&&f==ab})}function F(){T.unbind(Bb)}function G(){return!1}function H(){Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){z(a.target,!1)})}function I(){Q.find(":input,a").unbind("focus.jsp")}function J(){function b(){var a=db,b=ab;switch(c){case 40:vb.scrollByY(P.keyboardSpeed,!1);break;case 38:vb.scrollByY(-P.keyboardSpeed,!1);break;case 34:case 32:vb.scrollByY(S*P.scrollPagePercent,!1);break;case 33:vb.scrollByY(-S*P.scrollPagePercent,!1);break;case 39:vb.scrollByX(P.keyboardSpeed,!1);break;case 37:vb.scrollByX(-P.keyboardSpeed,!1)}return e=a!=db||b!=ab}var c,e,f=[];Z&&f.push(lb[0]),Y&&f.push(eb[0]),Q.focus(function(){d.focus()}),d.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(d){if(d.target===this||f.length&&a(d.target).closest(f).length){var g=db,h=ab;switch(d.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:c=d.keyCode,b();break;case 35:x(V-S),c=null;break;case 36:x(0),c=null}return e=d.keyCode==c&&g!=db||h!=ab,!e}}).bind("keypress.jsp",function(a){return a.keyCode==c&&b(),!e}),P.hideFocus?(d.css("outline","none"),"hideFocus"in T[0]&&d.attr("hideFocus",!0)):(d.css("outline",""),"hideFocus"in T[0]&&d.attr("hideFocus",!1))}function K(){d.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function L(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&Q.find(d)&&(0===T.scrollTop()?c=setInterval(function(){T.scrollTop()>0&&(z(b,!0),a(document).scrollTop(T.position().top),clearInterval(c))},50):(z(b,!0),a(document).scrollTop(T.position().top)))}}function M(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(c){var d,e,f,g,h,i,j=this.href.substr(0,this.href.indexOf("#")),k=location.href;if(-1!==location.href.indexOf("#")&&(k=location.href.substr(0,location.href.indexOf("#"))),j===k){d=escape(this.href.substr(this.href.indexOf("#")+1));try{e=a("#"+d+', a[name="'+d+'"]')}catch(l){return}e.length&&(f=e.closest(".jspScrollable"),g=f.data("jsp"),g.scrollToElement(e,!0),f[0].scrollIntoView&&(h=a(b).scrollTop(),i=e.offset().top,(h>i||i>h+a(b).height())&&f[0].scrollIntoView()),c.preventDefault())}}))}function N(){var a,b,c,d,e,f=!1;T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=A(),b=B(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=db,j=ab;return vb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==db&&j==ab}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function O(){var a=B(),b=A();d.removeClass("jspScrollable").unbind(".jsp"),d.replaceWith(Ab.append(Q.children())),Ab.scrollTop(a),Ab.scrollLeft(b),rb&&clearInterval(rb)}var P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb=this,wb=!0,xb=!0,yb=!1,zb=!1,Ab=d.clone(!1,!1).empty(),Bb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===d.css("box-sizing")?(sb=0,tb=0):(sb=d.css("paddingTop")+" "+d.css("paddingRight")+" "+d.css("paddingBottom")+" "+d.css("paddingLeft"),tb=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0)),a.extend(vb,{reinitialise:function(b){b=a.extend({},P,b),f(b)},scrollToElement:function(a,b,c){z(a,b,c)},scrollTo:function(a,b,c){y(a,c),x(b,c)},scrollToX:function(a,b){y(a,b)},scrollToY:function(a,b){x(a,b)},scrollToPercentX:function(a,b){y(a*(U-R),b)},scrollToPercentY:function(a,b){x(a*(V-S),b)},scrollBy:function(a,b,c){vb.scrollByX(a,c),vb.scrollByY(b,c)},scrollByX:function(a,b){var c=A()+Math[0>a?"floor":"ceil"](a),d=c/(U-R);t(d*cb,b)},scrollByY:function(a,b){var c=B()+Math[0>a?"floor":"ceil"](a),d=c/(V-S);r(d*_,b)},positionDragX:function(a,b){t(a,b)},positionDragY:function(a,b){r(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:P.animateDuration,easing:P.animateEase,queue:!1,step:d})},getContentPositionX:function(){return A()},getContentPositionY:function(){return B()},getContentWidth:function(){return U},getContentHeight:function(){return V},getPercentScrolledX:function(){return A()/(U-R)},getPercentScrolledY:function(){return B()/(V-S)},getIsScrollableH:function(){return Z},getIsScrollableV:function(){return Y},getContentPane:function(){return Q},scrollToBottom:function(a){r(_,a)},hijackInternalLinks:a.noop,destroy:function(){O()}}),f(e)}return d=a.extend({},a.fn.jScrollPane.defaults,d),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){d[this]=d[this]||d.speed}),this.each(function(){var b=a(this),c=b.data("jsp");c?c.reinitialise(d):(a("script",b).filter('[type="text/javascript"],:not([type])').remove(),c=new e(b,d),b.data("jsp",c))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}}(jQuery,this);/*
 * embed athena
 * default: false
 */
var athenaConnetOnly = true;
var athenaPageName = '';
/**/

$(function() {

	/*
	 * embed athena_pm_count
	 * JSONP
	 */
	/**/


	/* search form */
	$('#search').submit(function() {
		if ($('#search .keyword').val() == '音乐搜索，找人...' || $('#search_query').val() == '') return false;
	});
	/**/

	/* search auto complete */
	//var type_delay;
	var result_count = 0;
	var current_index = -1;
	$('#search .keyword').bind('input propertychange', function() {
		var self = $(this);
			//clearTimeout(type_delay);
			//type_delay = setTimeout(function() {
				if (self.val()) {
					//$('#search .submit').addClass('loading');
					$.ajax({
						url: '/ajax/search-index',
						data: {'key':self.val()},
						cache: false,
						success: function(data) {
							result_count = 0;
							current_index = -1;
							$('.auto_complete').html(data).show();
							//$('#search .submit').removeClass('loading');
						}
					});
				}
				else {
					$('.auto_complete').hide();
				}
			//}, 300);
	});

	$('#search .keyword').keydown(function(e) {
		// esc
		if (e.keyCode==27) {
			$('.auto_complete').hide();
		}

		// enter
		if (e.keyCode==13) {
			if (current_index>=0) {
				var li = $('.auto_complete li.result').get(current_index);
				var href = $(li).find('a').attr('href');
				window.location = href;
				return false;
			}
			else {
				return true;
			}
		}

		// down arrow
		if (e.keyCode==40) {
			if ($('.auto_complete').html().length<1) {
				return false;
			}
			result_count = $('.auto_complete li.result').size();
			if (current_index>=result_count-1) {
				current_index = -1;
			}
			$('.auto_complete li.result').removeClass('selected');
			$($('.auto_complete li.result')[++current_index]).addClass('selected');
		}

		// up arrow
		if (e.keyCode==38) {
			if ($('.auto_complete').html().length<1) {
				return false;
			}
			result_count = $('.auto_complete li.result').size();
			if (current_index<=0) {
				current_index = result_count;
			}
			$('.auto_complete li.result').removeClass('selected');
			$($('.auto_complete li.result')[--current_index]).addClass('selected');
		}
	});
	/**/

	/* notify popup */
	var notifyOnce = calcOnce = true;
	$('#header .account .first').click(function(e) {

		e.stopPropagation();

		$('.user_popup').hide();
		$('.software_popup').hide();
		$('.history_popup').hide();

		if ($('.notify_popup:hidden').length) {

			if (notifyOnce) {
				$.ajax({
					url: '/notice/head',
					cache: false,
					success: function(data) {
						$('.notify_popup .container').html(data);
						notifyOnce = false;

						var scrollBarHideDelay;
						$('.notify_popup .scroll-pane').jScrollPane({
							mouseWheelSpeed: 20,
							showArrows: true,
							hideFocus: true
						}).bind('jsp-scroll-y', function() {
							clearTimeout(scrollBarHideDelay);
							$('.jspDrag').show();
							if ($('.jspTrack').css('background-color')=='transparent') {
								scrollBarHideDelay = setTimeout(function() {
									$('.jspDrag').fadeOut();
								}, 1000);
							}
						}).mousewheel(function(e) {
							e.preventDefault();
						});

						$('.jspTrack').mouseenter(function() {
							clearTimeout(scrollBarHideDelay);
							$('.jspDrag').show();
						}).mouseleave(function() {
							scrollBarHideDelay = setTimeout(function() {
								$('.jspDrag').fadeOut();
							}, 1000);
						}).click(function(e) {
							e.stopPropagation();
						});
					}
				});
			}

			$('.notify_popup').show();
		}
		else {
			$('.notify_popup').hide();
			if (calcOnce) {
				if (parseInt($('#header .account sup').text())>parseInt($('#header .account .notify').text())) {
					$('#header .account sup').text(parseInt($('#header .account sup').text())-parseInt($('#header .account .notify').text()));
				}
				else if ($('#header .account sup').text()===$('#header .account .notify').text()) {
					$('#header .account sup').remove();
				}

				$('.notify_popup .first b').remove();
				$('.notify_popup .content_block li').addClass('read');

				calcOnce = false;
			}
		}

	});

	$('.notify_popup').click(function(e) {
		e.stopPropagation();
		//console.log(e.target);
		if (e.target.tagName=='P' || e.target.tagName=='A') {
			$(e.target).parentsUntil('ul', 'li').addClass('read');
		}
	});
	/**/

	/* user popup */
	var userHideDelay;
	$('#header .account .last').mouseenter(function(e) {

		$('.notify_popup').hide();
		if (!notifyOnce && calcOnce) {
			if (parseInt($('#header .account sup').text())>parseInt($('#header .account .notify').text())) {
				$('#header .account sup').text(parseInt($('#header .account sup').text())-parseInt($('#header .account .notify').text()));
			}
			else if ($('#header .account sup').text()===$('#header .account .notify').text()) {
				$('#header .account sup').remove();
			}

			$('.notify_popup .first b').remove();
			$('.notify_popup .content_block li').addClass('read');

			calcOnce = false;
		}

		$('.software_popup').hide();
		$('.history_popup').hide();

		clearTimeout(userHideDelay);
		$('.user_popup').show();

	}).mouseleave(function() {
		userHideDelay = setTimeout(function() {
			$('.user_popup').hide();
		}, 200);
	});

	$('.user_popup').mouseenter(function() {
		clearTimeout(userHideDelay);
	}).mouseleave(function() {
		var self = this;
		userHideDelay = setTimeout(function() {
			$(self).hide();
		}, 200);
	});
	/**/

	/* software popup */
	$('#secondary .software').click(function(e) {

		e.stopPropagation();

		$('.user_popup').hide();

		$('.notify_popup').hide();
		if (!notifyOnce && calcOnce) {
			if (parseInt($('#header .account sup').text())>parseInt($('#header .account .notify').text())) {
				$('#header .account sup').text(parseInt($('#header .account sup').text())-parseInt($('#header .account .notify').text()));
			}
			else if ($('#header .account sup').text()===$('#header .account .notify').text()) {
				$('#header .account sup').remove();
			}

			$('.notify_popup .first b').remove();
			$('.notify_popup .content_block li').addClass('read');

			calcOnce = false;
		}

		$('.history_popup').hide();

		$('.software_popup').toggle();

	});
	/**/

	/* history popup */

	//var historyOnce = true;
	$('#secondary .history').click(function(e) {

		e.stopPropagation();

		$('.user_popup').hide();

		$('.notify_popup').hide();
		if (!notifyOnce && calcOnce) {
			if (parseInt($('#header .account sup').text())>parseInt($('#header .account .notify').text())) {
				$('#header .account sup').text(parseInt($('#header .account sup').text())-parseInt($('#header .account .notify').text()));
			}
			else if ($('#header .account sup').text()===$('#header .account .notify').text()) {
				$('#header .account sup').remove();
			}

			$('.notify_popup .first b').remove();
			$('.notify_popup .content_block li').addClass('read');

			calcOnce = false;
		}

		$('.software_popup').hide();

		//if (historyOnce) {

			//historyOnce = false;

			$.ajax({
				url: '/listen/recent',
				cache: false,
				dataType: 'json',
				success: function(data) {
					if (data.data) {

						var playSong;
						else {
							var temp = $.tmpl('${song_id},', data.data).text();
							playSong = '/song/playlist/id/'+temp.substring(0, temp.length-1);
						}

						var historyTmpl = '<li><p><a href="/song/${song_id}" title="${name}" target="_blank">${name}</a> - <a href="/artist/${artist_id}" title="${artist_name}" target="_blank">${artist_name}</a></p><b class="icon toplay" onclick="addSongs(\''+playSong+'/id/${song_id}\');"></b></li>';

						$('.history_popup .container').html('<div class="scroll-pane"><ul></ul></div><a class="button play" href="" onclick="addSongs(\''+playSong+'\');return false;"><span>继续播放</span></a>');
						$.tmpl(historyTmpl, data.data).appendTo('.history_popup .scroll-pane ul');

						var scrollBarHideDelay;
						$('.history_popup .scroll-pane').jScrollPane({
							mouseWheelSpeed: 20,
							showArrows: true,
							hideFocus: true
						}).bind('jsp-scroll-y', function() {
							clearTimeout(scrollBarHideDelay);
							$('.jspDrag').show();
							if ($('.jspTrack').css('background-color')=='transparent') {
								scrollBarHideDelay = setTimeout(function() {
									$('.jspDrag').fadeOut();
								}, 1000);
							}
						}).mousewheel(function(e) {
							e.preventDefault();
						});

						$('.jspTrack').mouseenter(function() {
							clearTimeout(scrollBarHideDelay);
							$('.jspDrag').show();
						}).mouseleave(function() {
							scrollBarHideDelay = setTimeout(function() {
								$('.jspDrag').fadeOut();
							}, 1000);
						}).click(function(e) {
							e.stopPropagation();
						});

						$('.history_popup .container').on('mouseenter', 'li', function() {
							$(this).find('.toplay').show();
						}).on('mouseleave', 'li', function() {
							$(this).find('.toplay').hide();
						});

					}
					else {

						var playDaily;

						$('.history_popup .container').html('<p class="none">无最近播放列表</p><a class="button more" href="" onclick="'+playDaily+';return false;"><span>试试每日歌单</span></a>');
					}
				}
			});
		//}

		$('.history_popup').toggle();

	});

	$('.history_popup').click(function(e) {
		e.stopPropagation();
	});
	/**/

	/* body click */
	$('body').click(function() {
		$('.auto_complete').hide();

		$('.notify_popup').hide();
		if (!notifyOnce && calcOnce) {
			if (parseInt($('#header .account sup').text())>parseInt($('#header .account .notify').text())) {
				$('#header .account sup').text(parseInt($('#header .account sup').text())-parseInt($('#header .account .notify').text()));
			}
			else if ($('#header .account sup').text()===$('#header .account .notify').text()) {
				$('#header .account sup').remove();
			}

			$('.notify_popup .first b').remove();
			$('.notify_popup .content_block li').addClass('read');

			calcOnce = false;
		}

		$('.user_popup').hide();

		$('.software_popup').hide();

		$('.history_popup').hide();
	});
	/**/

});
var getBrowser = function() {
    var s = navigator.userAgent.toLowerCase();
    var a = new Array("msie", "firefox", "safari", "opera", "netscape");
    for (var i = 0; i < a.length; i++) {
        if (s.indexOf(a[i]) != -1) {
            return a[i];
        }
    }
    return "other";
};

//弹窗
//ie6下高度的问题
var dialogbg = function() {
    if (getBrowser() == 'msie') {
        $('.dialog_sharp').height($('.dialog_main').height());
    }
};

function showDialog(url, ajaxText) {
    if (!$('.dialog_popup').length) {
        $('body').prepend('<div id="dialog_clt" class="dialog_popup"><div class="dialog_main"></div><div class="jqDrag"></div></div>');
    }
    if (!ajaxText) ajaxText = '<div class="dialog_content"><p class="loading">虾小米正为您在处理数据, 请稍候...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div><a href="" class="jqmClose">关闭</a>';
    if (!url) {
        $('.dialog_main').html(ajaxText);
    } else {
    }
    $('.dialog_popup').jqm({
        ajax: url,
        modal: true,
        target: '.dialog_main',
        ajaxText: ajaxText,
        onLoad: function() {
            $('.dialog_popup').css({
                'margin-left': '-' + $('.dialog_main').width() / 2 + 'px',
                'margin-top': '-' + $('.dialog_main').height() / 2 + 'px'
            });
        },
        onShow: function() {
            $('.dialog_popup').show();
        },
        onHide: function() {
            $('.dialog_popup').css({
                'margin-left': '-130px',
                'margin-top': '-25px',
                'top': '50%',
                'left': '50%'
            }).hide();
            $('.jqmOverlay').hide();
        }
    }).jqDrag('.jqDrag').jqmShow();
}

function showAlert(url, ajaxText, jumpurl, doaction) {
    if (!$('.dialog_popup').length) {
        $('body').prepend('<div id="dialog_clt" class="dialog_popup"><div class="dialog_main"></div><div class="jqDrag"></div></div>');
    }
    if (!ajaxText) ajaxText = '<div class="dialog_content"><p class="loading">虾小米正为您在处理数据, 请稍候...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div><a href="" class="jqmClose">关闭</a>';
    if (!url) {
        $('.dialog_main').html('<h3>提示</h3><div class="dialog_content"><p class="alert"><span>' + ajaxText + '</span><a class="button major" href="' + jumpurl + '" onclick="' + doaction + '">确定</a></p></div><a href="" class="jqmClose">关闭</a>');
    } else {
    }
    $('.dialog_popup').jqm({
        ajax: url,
        json: true,
        tmpl: '<h3>提示</h3><div class="dialog_content"><p class="alert"><span>${message}</span><a class="button major" href="${jumpurl}">确定</a></p></div><a href="" class="jqmClose">关闭</a>',
        modal: true,
        target: '.dialog_main',
        ajaxText: ajaxText,
        onLoad: function() {
            $('.dialog_popup').css({
                'margin-left': '-' + $('.dialog_main').width() / 2 + 'px',
                'margin-top': '-' + $('.dialog_main').height() / 2 + 'px'
            });
        },
        onShow: function() {
            $('.dialog_popup').show();
            $('.dialog_popup').css({
                'margin-left': '-' + $('.dialog_main').width() / 2 + 'px',
                'margin-top': '-' + $('.dialog_main').height() / 2 + 'px'
            });
        },
        onHide: function() {
            $('.jqmOverlay').hide();
            $('.dialog_popup').css({
                'margin-left': '-130px',
                'margin-top': '-25px',
                'top': '50%',
                'left': '50%'
            }).hide();
        }
    }).jqDrag('.jqDrag').jqmShow();
}

function closedialog() {
    $('.dialog_popup').jqmHide();
}



// 收藏
// 3，歌曲
// 4，精选集
// 5，专辑
// 6，艺人

function tag(id, type) {
    var url = '/music/tag/type/' + encodeURIComponent(type) + '/id/' + encodeURIComponent(id);
    showDialog(url);
}

// 专辑添加到精选集

function album2collect(id) {
    var url = '/song/collects/c/2/ids/' + encodeURIComponent(id);
    showDialog(url);
}

// 推荐
// 32，歌曲
// 33，专辑
// 34，艺人
// 35，精选集
// 36，歌曲评论
// 37，专辑评论
// 38，艺人评论
// 39，精选集评论
// 310， 小组话题
// 311，用户
// 312，小组

function recommend(id, type, sid) {
    var url = '/recommend/post';
    var url = url + '?object_id=' + encodeURIComponent(id) + "&type=" + encodeURIComponent(type) + "&t=" + 1000 * Math.random();
    if (sid) var url = url + '&sid=' + encodeURIComponent(sid);
    showDialog(url);
}
var getFlashVersion = function() {
    var nav = navigator,
        version = 0,
        flash;
    if (nav.plugins && nav.mimeTypes.length) {
        flash = navigator.plugins["Shockwave Flash"];
        if (flash) {
            version = flash.description.replace(/.*\s(\d+\.\d+).*/, "$1");
        }
    } else {
        try {
            flash = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (flash) {
                version = flash.GetVariable("$version")
            }
        } catch (e) {}
    }
    if (version !== 0) {
        var fv = version.match(/\d+/g);
        if (fv.length > 0) {
            var v = fv.join('.')
            getFlashVersion = function() {
                return v
            };
            return v;
        }
    }
    return version;
};

function getInternetExplorerVersion() {
    var rv = -1,
        ua = navigator.userAgent;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function getOperaVersion() {
    var rv = -1,
        ua = navigator.userAgent;
    if (navigator.appName == 'Opera') {
        var re = new RegExp("Opera\/.*Version\/([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}
// 获取 flash core

function thisMovie(name) {
    var ie = getInternetExplorerVersion();
    if (ie != -1 && ie <= 9) {
        thisMovie = function(name) {
            return window[name];
        }
        return window[name];
    } else {
        thisMovie = function(name) {
            return document.getElementById(name);
        }
        return document.getElementById(name)
    }
};
/**
 * 统计打点
 */

function transclick(val, type) {
    var n = 'log_' + (new Date()).getTime();
    var data = [
        'f=seiya',
        't=' + type,
        'fv=' + getFlashVersion(),
        'bm_an=' + navigator.appName,
        'v=' + val,
        '_=' + (new Date()).getTime()
    ];
    var req = window[n] = new Image();
    req.onload = req.onerror = function() {
        window[n] = null;
    };
    req.src = url + '?' + data.join('&')
    req = null;
};
// 添加歌曲
function addSongs(str) {
    var playerTrigger = thisMovie('trans');
    if (typeof(playerTrigger.addSongs) === "function") {
        playerTrigger.addSongs(str);
        transclick(str, "add");
    } else {
        setTimeout(function() {
            if (typeof(playerTrigger.addSongs) === "function") {
                playerTrigger.addSongs(str);
                transclick(str, "add");
            } else {
                openOldMusicPlayer(str);
            }
        }, 500);
    }
}

// 下载歌曲

function xm_download(id) {
    window.open(url);
}
// 添加到

function collect(id) {
    var url = '/song/collect/id/' + encodeURIComponent(id);
    showDialog(url);
}
//type_name : collect , album

function play(song_id, type_name, type_id) {
    if (!type_name) type_name = 'default';
    if (!type_id) type_id = 0;
    addSongs(escape("/song/playlist/id/" + song_id + "/object_name/" + type_name + "/object_id/" + type_id));
}

// 播放专辑

function playalbum(album_id) {
    addSongs(escape('/song/playlist/id/' + album_id + '/type/1'));
}

// 播放精选集

function playcollect(list_id) {
    addSongs(escape("/song/playlist/id/" + list_id + "/type/3"));
}

// 播放每日歌单

function playdefault() {
    addSongs(escape('/song/playlist/id/1/type/9'));
}


// 播放未登录用户每日歌单

function playguestdaily() {
    addSongs(escape('/song/playlist/id/1/type/15'));
}

// 打开播放器
var playerDialog;

function openMusicPlayer(str) {
    //更改播放器高度 站外banner
    var reg = str.indexOf('out=1');
    if (reg != -1 && screen.height >= 640) {
        return;
    }
    transclick(str, 'open');
    var o = getOperaVersion(),
        i = getInternetExplorerVersion();
    if ((i == -1 || i > 6) && (o == -1 || o > 15)) {
    } else {
        //其他地方使用
    }
}

function openOldMusicPlayer(str) {
    transclick(str, 'openold');
}

function openPlayer(str) {
    var o = getOperaVersion(),
        i = getInternetExplorerVersion();
    if ((i == -1 || i > 6) && (o == -1 || o > 15)) {
    } else {
    }
};

// 选择所有

function selectAll(name) {
    var arr = $('input[name=' + name + ']');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].disabled == false) {
            arr[i].checked = true;
        }
    }
}

// 反选

function inverse(name) {
    var arr = $('input[name=' + name + ']');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].disabled == false) {
            arr[i].checked = !arr[i].checked;
        }
    }
}

// 获取选择项

function getSelectValues(name) {
    var sValue = '';
    var tmpels = $('input[name=' + name + ']');
    for (var i = 0, j = 0; i < tmpels.length; i++) {
        if (j == 100) break;
        if (tmpels[i].checked || (tmpels[i].type == 'hidden' && tmpels[i].defaultChecked)) {
            if (sValue == '') {
                sValue = tmpels[i].value;
            } else {
                sValue = sValue + "," + tmpels[i].value;
            }
            j++;
        }
    }
    return sValue;
}

//3rd patry login
var referer = '';

var openWind = function(url) {
    var top = (document.body.clientHeight - 420) / 2;
    var left = (document.body.clientWidth - 520) / 2;
    window.open(url, 'connect_window', 'height=420, width=560, toolbar =no, menubar=no, scrollbars=yes, resizable=no,top=' + top + ',left=' + left + ', location=no, status=no');
};

var taoLogin = function() {
};
var sinaLogin = function() {
};
var qqLogin = function() {
};
var renLogin = function() {
    openWind('/renren/goon?referer=' + referer);
};
var msnLogin = function() {
    openWind('/msnconnect');
};
var alipayLogin = function() {
    window.location.href = '/alipay';
};
/**/

//3rd patry reg
var taoReg = function() {
    location.href = '/member/login?taobao=1';
};
var sinaReg = function() {
};
var qqReg = function() {
    location.href = '/share/connect/type/qzone?done=/member/weibologin/join/qzone';
};

function recommendLog(note, op, terminal, len, name, objectid, id, uid) {
    if (note) {
        uid = uid ? uid : 0;
        url = url + 'rec_note=' + encodeURIComponent(note) + '&op=' + op + '&terminal=' + encodeURIComponent(terminal) + '&playlen=' + encodeURIComponent(len) + '&object_name=' + encodeURIComponent(name) + '&' + objectid + '=' + id + '&userid=' + uid;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp"
        });
    }
}

// 统计

function stat(query) {
}