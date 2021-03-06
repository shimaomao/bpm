// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('supports.opencitiesController', opencitiesController);
    mod.controller('supports.versionController', versionController);
    mod.controller('supports.configsController', configsController);
    mod.controller('supports.upgradesUpdateController', upgradesUpdateController);
    mod.controller('supports.bannerUpdateController', bannerUpdateController);

    opencitiesController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    upgradesUpdateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    configsController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    versionController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    bannerUpdateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];


    function bannerUpdateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        $scope._param = {pics: []};
        $scope.param = {};
        $scope.toggle = '1';
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: simpleCons.live_domain + '/supports/banners/' + $stateParams.id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                    $scope.param.sort_num = Number($scope.param.sort_num);
                    if ($scope.param.pic_url) {
                        $scope._param = {
                            pics: [{
                                pic_url: $scope.param.pic_url,
                                pic_width: $scope.param.pic_width || 100,
                                pic_height: $scope.param.pic_height || 100,
                                updated_at: $scope.param.updated_at || '',
                            }]
                        };
                    }
                }
            })
        }

        $scope.submit = function (status) {
            $scope.param.category = '1';
            if (comfunc.isEmptyArray($scope._param.pics)) {
                widget.msgToast('运营位图片没有上传');
                return false;
            } else {
                if ($scope._param.pics && $scope._param.pics[0].pic_url) {
                    $scope.param.pic_url = $scope._param.pics[0].pic_url;
                } else {
                    widget.msgToast('运营位图片没有上传.');
                    return false;
                }
            }

            widget.ajaxRequest({
                url: simpleCons.live_domain + '/supports/banners' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(simpleCons.state.main + '.support.banner');
                }
            })
        }
    };
    function upgradesUpdateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: simpleCons.live_domain + '/supports/upgrades/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    $scope.apk = [{
                        pic_url: json.data.update_url,
                        updated_at: json.data.updated_at,
                    }];
                }
            })
        }
        $scope.submit = function () {
            if ($scope.apk && $scope.apk.length > 0 && $scope.apk[0].pic_url) {
                $scope.param.update_url = $scope.apk[0].pic_url;
            } else {
                widget.msgToast('没有上传Android安装包,不能提交更新');
                return false;
            }
            if (!$scope.param || !$scope.param.version) {
                widget.msgToast('未输入新版本的日期');
                return false;
            }
            widget.ajaxRequest({
                url: simpleCons.live_domain + '/supports/upgrades' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('上传成功');
                    $state.go('main.support.upgrade');
                }
            })
        }
    };
    function configsController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.param = {};
        $scope.flag = 'app_block_keywords';
        $scope.init = function () {
            widget.ajaxRequest({
                url: simpleCons.live_domain + '/supports/configs',
                method: 'get',
                scope: $scope,
                data: {key: $scope.flag},
                success: function (json) {
                    $scope.$eval('(param.' + $scope.flag + '= \'' + (json.data[$scope.flag] || '') + '\')');
                }
            });
        }
        $scope.$watch('flag', function () {
            $scope.init();
        });
        $scope.submit = function () {
            widget.ajaxRequest({
                url: simpleCons.live_domain + '/supports/configs',
                method: 'put',
                scope: $scope,
                data: {
                    key: $scope.flag,
                    value: $scope.$eval('param.' + $scope.flag)
                },
                success: function (json) {
                    widget.msgToast('更新成功');
                }
            })
        }
    };
    function versionController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.init = function () {
            widget.ajaxRequest({
                url: '/supports/version',
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.version = json.data.version;
                    $scope.param = {version: new Date()};
                }
            })
        }
        $scope.init();
        $scope.submit = function () {
            if (!$scope.param || !$scope.param.version) {
                widget.msgToast('未输入新版本的日期');
                return false;
            }
            widget.ajaxRequest({
                url: '/supports/version',
                method: 'put',
                scope: $scope,
                data: {version: $scope.param.version},
                success: function (json) {
                    widget.msgToast('更新成功');
                    $scope.init();
                }
            })
        }
    };
    function opencitiesController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.param = {city_name: null};
        $scope.conDomain = simpleCons.domain;
        $scope.remoteUrlRequestFn = function (str) {
            return {city_name: str};
        };
        $scope.selectedCommunity = function (selected) {
            if (selected) {
                $scope.param.city_name = selected.originalObject.city_name;
            }
            else {
                $scope.param.city_name = null;
            }
        }
        $scope.submit = function () {
            if (!$scope.param.city_name) {
                widget.msgToast('未输入城市');
                return false;
            }
            widget.ajaxRequest({
                url: '/supports/cities',
                method: 'post',
                scope: $scope,
                data: {city_name: $scope.param.city_name},
                success: function (json) {
                    widget.msgToast('提交成功');
                    $state.go(simpleCons.state.main + '.support.opencities');
                }
            })
        }
    };
});
