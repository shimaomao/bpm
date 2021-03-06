define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('showSms', function ($templateCache, $uibModal, $timeout, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_sms();">查看</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_sms = function () {
                        // console.log($scope);
                        var modalInstance = $uibModal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                widget.ajaxRequest({
                                    url: '/markets/sms/' + (supscope.data.id || 0),
                                    method: 'get',
                                    scope: $scope,
                                    data: {},
                                    success: function (json) {
                                        $scope.mobiles = json.data.mobiles;
                                    }
                                })
                                $scope.title = '查看发送手机号码';
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea text="手机号码" ng-model="mobiles"></div>' +
                                    '</form>';
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: ''
                        });
                    }
                }
            }
        })
});
