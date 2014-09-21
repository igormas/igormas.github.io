(function (angular) {
    'use strict';

    var searchTweetsDrtv = [
        'dataSourceService',
        function (dataSourceService) {
            var drtvObj = {
                templateUrl: '/app/views/searchTweetsDrtvView.html',
                scope:{

                },
                link: function(scope,element,attrs){
                    scope.d = {};

                    scope.d.searchForTweets = function(){
                        dataSourceService.searchForTweets(scope.d.searchVal);
                    };

                    var $input = element.find('input');
                    function enterCB(e){
                        if(e.keyCode === 13){
                            scope.d.searchForTweets();
                        }
                    }
                    $input.on('keydown',enterCB);

                    scope.$on('$destroy',function(){
                        $input.off('keydown',enterCB);
                    });
                }
            };
            return drtvObj;
        }
    ];
    angular.module('twangular').directive('searchTweetsDrtv', searchTweetsDrtv);
})(angular);