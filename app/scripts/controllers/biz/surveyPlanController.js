// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('surveyPlan.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/surveys/plans/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    // 为了后台api 线上和测试环境不统一  做的补丁  start
                    // selected
                    angular.forEach(json.data.attachments, function (attachments_val, attachments_key) {
                        attachments_val.pivot.question_id += '';
                    });
                    angular.forEach(json.data.categories, function (categories_val, categories_key) {
                        categories_val.pivot.category_id += '';
                    });
                    // 为了后台api 线上和测试环境不统一  做的补丁  end
                    $scope.param = angular.copy(json.data);
                    $scope.banner = $scope.param.banner ? [{pic_url: $scope.param.banner}] : [];
                    $scope.search_product_id();
                    if ($scope.param.categories && $scope.param.categories.length > 0) {
                        $scope.question_source = 1;
                    } else {
                        $scope.question_source = 2;
                    }

                    if ($scope.param.type == 3) {
                        $scope.type3_suggestions = angular.copy($scope.param.suggestions);
                        // console.log(JSON.stringify($scope.type3_suggestions));
                    }
                }
            })
        }
        //切换类型后 删除 固定问题
        // $scope.$watch('param.type', function (val, defval) {
        //     if (val == defval && defval) {
        //         $scope.param.questions = [];
        //     }
        //     if (val == 3 && val != defval) {// 选项分类计分
        //         $scope.type3_suggestions = [];
        //     }
        // });

        // $scope.$watch('param.type', function (val, defval) {
        //     if (val != defval && defval) {
        //         console.log(val, defval, 1);
        //         // $scope.param.questions = [];
        //         $scope.add_type_3();
        //     }
        // });
        // $scope.toggle_question_option_count = function () {
        //     $scope.add_type_3();
        // }
        $scope.$watch('question_option_count', function (val, defval) {
            if (val != defval && defval) {
                // console.log(val, defval, 2);
                $scope.add_type_3();
            } else if (!defval) {
                $scope.add_type_3();
            }
        });
        //  选择计分类型为3的九宫格题目 要增加新的 options
        $scope.add_type_3 = function () {
            // console.log($scope.question_option_count, $scope.type3_suggestions, ($scope.type3_suggestions && $scope.type3_suggestions.length != 3));
            if ($scope.question_option_count == 2 && ($scope.param.type == 3)
                && (!$scope.type3_suggestions || $scope.type3_suggestions && $scope.type3_suggestions.length != 3)) {
                $scope.type3_suggestions = [
                    {result: '', score_min: 1, score_max: 1},
                    {result: '', score_min: 2, score_max: 2},
                    {result: '', score_min: 12, score_max: 12}
                ]
                // console.log($scope.type3_suggestions);
            } else if ($scope.question_option_count == 3 && ($scope.param.type == 3)
                && (!$scope.type3_suggestions || $scope.type3_suggestions && $scope.type3_suggestions.length != 6)) {
                console.log($scope.type3_suggestions, ($scope.type3_suggestions && $scope.type3_suggestions.length));
                $scope.type3_suggestions = [
                    {result: '', score_min: 1, score_max: 1},
                    {result: '', score_min: 2, score_max: 2},
                    {result: '', score_min: 3, score_max: 3},
                    {result: '', score_min: 12, score_max: 12},
                    {result: '', score_min: 23, score_max: 23},
                    {result: '', score_min: 13, score_max: 13},
                    {result: '', score_min: 123, score_max: 123},
                ]
                // console.log($scope.type3_suggestions);
            }
        }
        // 查询活动ID
        $scope.search_product_id = function () {
            if (!$scope.param.product_id) {
                widget.msgToast('没有活动ID');
                return false;
            }
            widget.ajaxRequest({
                url: '/products',
                method: 'GET',
                data: {product_id: $scope.param.product_id, sku: '2', page: 1, count: 1},
                success: function (json) {
                    if (json.data[0]) {
                        $scope.product_id = json.data[0].product_id;
                        $scope.product_title = json.data[0].title||'无题目描述';
                    } else {
                        widget.msgToast('未找到测评的活动ID');
                    }
                }
            })
        }
        // 查询问题ID
        $scope.search_question_id = function () {
            if (!$scope.question_id) {
                widget.msgToast('没有输入问题ID,点击取消');
                return false;
            }
            widget.ajaxRequest({
                url: '/surveys/questions',
                method: 'GET',
                data: {
                    question_id: $scope.question_id,
                    page: 1,
                    count: 1,
                    category_type: 2,
                    // option_type: $scope.param.type
                },
                success: function (json) {
                    if (json.data[0]) {
                        $scope.question_title = json.data[0].title||'无题目描述';
                    } else {
                        $scope.question_title = '';
                        widget.msgToast('未查询到问题ID,点击取消');
                    }
                }
            })
        }
        // 添加 问题
        $scope.add_question = function () {
            if (!$scope.question_id || !$scope.question_title) {
                widget.msgToast('问题ID未填写或者题目不存在,点击取消');
                return false;
            }
            var is_question_repeat = false;
            angular.forEach($scope.param.questions, function (v, k) {
                if (v.pivot && v.pivot.question_id == $scope.question_id) {
                    is_question_repeat = true;
                }
            })
            if (is_question_repeat) {
                widget.msgToast('题目已存在,点击取消');
                return false;
            } else {
                if (!$scope.param.questions) {
                    $scope.param.questions = [];
                }
                $scope.param.questions.push({
                    pivot: {
                        order_by: '0',
                        question_id: $scope.question_id
                    },
                    title: $scope.question_title
                });
                $scope.question_id = '';
                $scope.question_title = '';
            }

        }
        // 排序字段 赋值
        $scope.$watch('param.questions', function (val) {
            angular.forEach(val, function (v, k) {
                v.pivot.order_by = k + 1;
            })
        }, true);

        $scope.$watch('question_id', function (val) {
            $scope.question_title = '';
        });
        $scope.$watch('param.product_id', function (val) {
            $scope.product_title = '';
        });

        $scope.submit = function (status) {
            // console.log($scope.param.contents);
            if ($scope.banner && $scope.banner.length == 1) {
                $scope.param.banner = $scope.banner[0].pic_url;
            }
            if ($scope.param.type == 3) {
                $scope.param.suggestions = angular.copy($scope.type3_suggestions);
            }
            if ($scope.question_source == 1) {
                $scope.param.need_score = 2;
                $scope.param.questions = [];
                if (!$scope.param.categories || $scope.param.categories.length == 0) {
                    widget.msgToast('未添加维度,不能提交');
                    return false;
                }
                var tmp_categories_err = 0;
                var hash_categories = {};
                angular.forEach($scope.param.categories, function (val, key) {
                    if (hash_categories[val.pivot.category_id]) {
                        tmp_categories_err++;
                        return true;
                    }
                    hash_categories[val.pivot.category_id] = true;
                });
                if (tmp_categories_err > 0) {
                    console.log(hash_categories);
                    widget.msgToast('涉及维度有重复');
                    return false;
                }
            } else if ($scope.question_source == 2) {
                $scope.param.need_score = 1;
                $scope.param.categories = [];
                if ($scope.param.questions.length == 0) {
                    widget.msgToast('未添加一道题目,不能提交(查询出题目后,要点击添加到测评题目)');
                    return false;
                }
            }
            widget.ajaxRequest({
                url: '/surveys/plans' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.survey_plan.list');
                },
                failure: function (err) {
                    // console.log(err.code, Object.keys(err.validates), Object.keys(err.validates).length);
                    if ((err.code == 1202 || err.code == 1303) && err.validates && Object.keys(err.validates).length > 0) {
                        console.log(err.code, Object.keys(err.validates),
                            err.validates[Object.keys(err.validates)[0]],
                            Object.keys(err.validates).length);
                        widget.msgToast(err.validates[Object.keys(err.validates)[0]] + '\n点击取消', 5000);
                    } else {
                        widget.msgToast(err.message + '\n点击取消', 2000);
                    }
                }
            })
        }
    };
});
