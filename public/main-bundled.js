!function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";function r(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}a.r(t),new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.injectHTML(),this.headerSearchIcon=document.querySelector(".header-search-icon"),this.searchOverlay=document.querySelector(".search-overlay"),this.closeLiveSearch=document.querySelector(".close-live-search"),this.resultsArea=document.querySelector(".live-search-results"),this.inputField=document.querySelector(".live-search-field"),this.circleLoader=document.querySelector(".circle-loader"),this.events()}var t,a,n;return t=e,(a=[{key:"events",value:function(){var e=this;this.inputField.addEventListener("keyup",(function(){e.keyPressHandler()})),this.closeLiveSearch.addEventListener("click",(function(t){e.closeSearchOverlay()})),this.headerSearchIcon.addEventListener("click",(function(t){t.preventDefault(),e.openSearchOverlay()}))}},{key:"keyPressHandler",value:function(){this.circleLoader.classList.add("circle-loader--visible")}},{key:"openSearchOverlay",value:function(){var e=this;this.searchOverlay.classList.add("search-overlay--visible"),setTimeout((function(){return e.inputField.focus()}),50)}},{key:"closeSearchOverlay",value:function(){this.searchOverlay.classList.remove("search-overlay--visible")}},{key:"injectHTML",value:function(){document.body.insertAdjacentHTML("beforeend",'<div class="search-overlay">\n        <div class="search-overlay-top shadow-sm">\n          <div class="container container--narrow">\n            <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>\n            <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">\n            <span class="close-live-search"><i class="fas fa-times-circle"></i></span>\n          </div>\n        </div>\n    \n        <div class="search-overlay-bottom">\n          <div class="container container--narrow py-3">\n            <div class="circle-loader"></div>\n            <div class="live-search-results">\n              <div class="list-group shadow-sm">\n                <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>\n    \n                <a href="#" class="list-group-item list-group-item-action">\n                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #1</strong>\n                  <span class="text-muted small">by barksalot on 0/14/2019</span>\n                </a>\n                <a href="#" class="list-group-item list-group-item-action">\n                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #2</strong>\n                  <span class="text-muted small">by brad on 0/12/2019</span>\n                </a>\n                <a href="#" class="list-group-item list-group-item-action">\n                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #3</strong>\n                  <span class="text-muted small">by barksalot on 0/14/2019</span>\n                </a>\n                <a href="#" class="list-group-item list-group-item-action">\n                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #4</strong>\n                  <span class="text-muted small">by brad on 0/12/2019</span>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>')}}])&&r(t.prototype,a),n&&r(t,n),e}())}]);