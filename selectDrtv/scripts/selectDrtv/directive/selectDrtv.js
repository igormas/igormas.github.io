/**
 * attributes:
 *      viewExpr - option label value expression
 *      options - select options
 *      multiSelect - if expression equals to true then the select will behave as multi select.
 *      settings - settings object.
 *
 * settings object:
 *      selectTitle -
 *      showOpt -
 */
(function (angular) {
    var selectDrtv = [
        '$parse',
        function ($parse){
            var directiveObject = {
                require: ['selectDrtv','ngModel'],
                templateUrl: '/views/selectDrtv/selectView.html',
                scope: {
                    options: '=',
                    multiSelect: '&',
                    settings: '&'
                },
                controller: [
                    '$parse','$attrs','$scope',
                    function($parse,$attrs,$scope){
                        this.viewGetter = $parse($attrs.viewExpr);
                        this.multSelect = !!$scope.multiSelect();
                    }
                ],
                link: function (scope,element,attrs,ctrls){
                    var selectCtrl = ctrls[0];
                    var ngModelCtrl = ctrls[1];

                    if(!attrs.tabindex){
                        attrs.$set('tabindex','0');
                    }

                    scope.selectDrtv = {};

                    scope.settings = scope.settings() || {};

                    scope.selectDrtv.showOpt = function(){
                        if(!scope.options || !scope.options.length || attrs.disabled){
                            return;
                        }
                        scope.settings.showOpt = !scope.settings.showOpt;
                        if(scope.settings.showOpt){
                            element.focus();
                        }
                    };

                    scope.selectDrtv.updateOptSelection = function(optScope,isSelected){
                        var optionCopy = angular.copy(optScope.option);
                        delete optionCopy.$$hashKey;

                        if(selectCtrl.multSelect){
                            var viewValueCopy = angular.copy(ngModelCtrl.$viewValue) || [];
                            if(isSelected){
                                viewValueCopy.push(optionCopy);
                            }else{
                                for(var i in viewValueCopy){
                                    var item = viewValueCopy[i];
                                    if(angular.equals(item,optionCopy)){
                                        viewValueCopy.splice(i,1);
                                        break;
                                    }
                                }
                            }
                            ngModelCtrl.$setViewValue(viewValueCopy.length ? viewValueCopy : null);
                        }else{
                            var notSelector = '[opt-num="' + optScope.$index + '"]';
                            var $notSelectedOptions = element.find('li').not(notSelector);
                            $notSelectedOptions.removeClass('selected');
                            ngModelCtrl.$setViewValue(optionCopy);
                            scope.settings.selectTitle = selectCtrl.viewGetter(optionCopy);
                        }
                    };

                    /** ng model controller render function implementation **/
                    ngModelCtrl.$render = function(){
                        if(!selectCtrl.multSelect){
                            scope.settings.selectTitle = selectCtrl.viewGetter(ngModelCtrl.$viewValue);
                        }
                    };

                    function blurHnadler(){
                        scope.$apply(function(){
                            scope.settings.showOpt = false;
                        });
                    }

                    element.blur(blurHnadler);
                    scope.$on('destroy',function(){
                        $btn.off('blur',blurHnadler);
                    });
                }
            };
            return directiveObject;
        }
    ];
    angular.module('selectMdl').directive('selectDrtv',selectDrtv);
})(angular);
