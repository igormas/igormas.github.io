
(function(angular){
    'use strict';

    var selectDrtvOption = [
        function(){
            var drtvObject = {
                templateUrl: '/views/selectDrtv/selectOptionView.html',
                require: ['^selectDrtv','^ngModel'],
                link: function(scope,element,attrs,ctrls){
                    var selectCtrl = ctrls[0];
                    var ngModelCtrl = ctrls[1];

                    var viewVal = selectCtrl.viewGetter(scope.option);
                    var viewVal = selectCtrl.viewGetter(scope.option);
                    element.find('a').append(viewVal);
                    element.attr('opt-num',scope.$index);

                    var optionCopy = angular.copy(scope.option);
                    delete optionCopy.$$hashKey;
                    if(selectCtrl.multSelect){
                        for(var i in ngModelCtrl.$viewValue){
                            var item = ngModelCtrl.$viewValue[i];
                            if(angular.equals(optionCopy,item)){
                                element.addClass('selected');
                                break;
                            }
                        }
                    }else{
                        if(angular.equals(optionCopy,ngModelCtrl.$viewValue)){
                            element.addClass('selected');
                        }
                    }

                    scope.click = function(){
                        if(element.hasClass('selected')){
                            if(selectCtrl.multSelect){
                                element.removeClass('selected');
                                scope.selectDrtv.updateOptSelection(scope,false);
                            }
                            return;
                        }
                        element.addClass('selected');
                        scope.selectDrtv.updateOptSelection(scope,true);
                    };
                }
            };
            return drtvObject;
        }
    ];

    angular.module('selectMdl').directive('selectDrtvOption',selectDrtvOption);
})(angular);