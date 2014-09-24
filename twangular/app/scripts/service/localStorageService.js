(function (angular) {
    'use strict';

    var localStorageService = [
        function () {
            var self = this;
            self.results = [];

            self.setTwitterId = function(id){
                self.storageId = 'twitter' + id;
            };

            self.addResult = function(result){
                self.results.push(result);
                if(self.results.length > 5){
                    self.results.pop();
                }
                self.updateLocalStorage();
            };

            self.getHistory = function(){
              var historyStr = localStorage.getItem(self.storageId);
              try{
                  return JSON.parse(historyStr);
              }
              catch(err){
                  return [];
              }
            };

            self.updateLocalStorage = function(){
                var val = JSON.stringify(self.results);
                localStorage.setItem(self.storageId,val);
            };
        }
    ];
    angular.module('twangular').service('localStorageService', localStorageService);
})(angular);