define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('supportImei', function ($templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right"  ng-click="show();" ng-bind="text"></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = '测试环境手机IMEI';
                    // $scope.ext = {product_id: $scope.data.product_id};
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="supportsImeiList" config="config" columns="columns"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.ext = supscope.ext;
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                }
            }
        })
        .directive('changeImeiStatus', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<span class="change-live-room-status"></span>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '删除';
                        status_text = 'ng-bind="\'删除\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    }
                    // else if ($scope.data.status == 2) {
                    //     status_title = '开启';
                    //     status_text = 'ng-bind="\'开启\'"';
                    //     class_text = 'ng-class={\"btn-success\":true} ';
                    //     click_text = 'ng-click="change(1,' + $scope.data.status + ');"';
                    //     $scope.show_text = true;
                    // }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status, live_status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: simpleCons.live_domain + '/supports/imeis/' + $scope.data.id,
                                method: 'put',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }

                    }
                }
            }
        })
        .directive('supportImeiAdd', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-success btn-sm pull-right" ng-click="show_imei_add()">添加IMEI</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_imei_add = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '添加IMEI';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-input text="IMEI" ng-model="param.imei"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if (!$scope.param.imei) {
                                            widget.msgToast('没有imei');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: simpleCons.live_domain + '/supports/imeis',
                                            method: 'post',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                supscope.$parent.searchAction();
                                                widget.msgToast('添加成功');
                                            },
                                            failure: function (json) {
                                                widget.msgToast(json.message);
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'sm'
                            }
                        );
                    }
                }
            }
        })
        .directive('changeSupportBannerStatus', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(3);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status != 1) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status) {
                        // if (confirm('确认修改为' + status_title + '状态?')) {
                        if (1 == 1) {
                            widget.ajaxRequest({
                                url: simpleCons.live_domain + '/supports/banners/' + $scope.data.id,
                                method: 'put',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }

                    }
                }
            }
        })
        .directive('delSupportBanner', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if (1 == 1) {
                        status_title = '删除';
                        status_text = 'ng-bind="\'删除\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: simpleCons.live_domain + '/supports/banners/' + $scope.data.id,
                                method: 'put',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }

                    }
                }
            }
        })
});
