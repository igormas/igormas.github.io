/******/!function(t){function r(n){if(e[n])return e[n].exports;var i=e[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}// webpackBootstrap
/******/
var e={};return r.m=t,r.c=e,r.p="",r(0)}([function(t,r,e){var n,i=e(1),o=e(2),a=e(3);!function(t){"use strict";angular.module("ha",["ngAnimate","ngMaterial"]).controller("MainController",i.MainController).controller("FormController",a.FormController).service("RedditService",o.RedditService)}(n||(n={}))},function(t,r){var e=function(){function t(){}return t}();r.MainController=e},function(t,r){var e=function(){function t(t){this.search=function(r){var e="https://www.reddit.com/search.json?q=beatles&sort=new",n={q:r,sort:"new"},i={params:n};return t.get(e,i).then(function(t){return t.data})}}return t.$inject=["$http"],t}();r.RedditService=e},function(t,r){var e=function(){function t(t,r){var e=this;this.formData={};var n=function(t){e.moveFormLeft=!0,r(function(){e.searchListings=t.data.children},300)};this.getSearchResult=function(){angular.isUndefined(e.formData.searchText)||t.search(e.formData.searchText).then(function(t){n(t)})},this.getListingImage=function(t){var r=t.data,e=r.thumbnail;if(e&&e.startsWith("http"))return e;var n=r.preview;return n&&n.images&&n.images[0]&&n.images[0].source&&n.images[0].source.url?n.images[0].source.url:"assets/images/no_image.jpg"}}return t.$inject=["RedditService","$timeout"],t}();r.FormController=e}]);
//# sourceMappingURL=../maps/scripts/app-86b6475508.js.map