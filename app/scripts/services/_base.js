define(['./services', '../cons/simpleCons', './widget', './comfunc'], function (mod, cons, widget) {
    mod
        .factory('bpmHttpInterceptor', ['$log', '$rootScope', function ($log, $rootScope) {
            // $log.debug('$log is here to show you that this is a regular factory with injection');
            var bpmHttpInterceptor = {
                'request': function (config) {
                    if (config.url.indexOf('.html') == -1) {
                        // console.log(config);
                        // console.log('config.url.indexOf(\'.html\') == -1 : ' + (config.url.indexOf('.html') == -1));
                        $rootScope.http_notification = '请求等待中...';
                    } else {
                        $rootScope.http_notification = '加载模板中...';
                    }
                    return config;
                },
                'requestError': function (config) {
                    $rootScope.http_notification = null;
                    console.log('requestError:  ' + config);
                },
                'response': function (response) {
                    $rootScope.http_notification = null;
                    if (response && response.data.code == 1000) {
                        delete $rootScope.hjm;
                        delete $rootScope.selected;
                        delete $rootScope.login_account;
                        localStorage.clear();
                        $rootScope.$state.go('login');
                        response.data.message = '账号认证失败,重新登陆';
                    }
                    return response;
                },
                'responseError': function (response) {
                    $rootScope.http_notification = null;
                    console.log('responseError:  ' + response);
                    return response;
                }
            };
            return bpmHttpInterceptor;
        }])
        .run(['$rootScope', '$state', '$stateParams', '$http', '$uibModal', '$location', 'widget', '$document', 'base64',
            function ($rootScope, $state, $stateParams, $http, $uibModal, $location, widget, $document, base64) {
                var arr = [];
                $document.bind("keydown", function (event) {

                });
                $document.bind("keyup", function (event) {
                    // console.log(document.activeElement.tagName);
                    var tagName = document.activeElement.tagName == 'BODY' || document.activeElement.tagName == 'A';
                    if (tagName && $rootScope.hjm && $rootScope.hjm.role == 'admin') {
                        // console.log(event.keyCode);
                        switch (event.keyCode) {
                            case 84:// t uan
                                $rootScope.$state.go(cons.state.main + '.groupbuy.list');
                                break;
                            case 80:// p roduct
                                $rootScope.$state.go(cons.state.main + '.product.list');
                                break;
                            case 65: // a ct
                                $rootScope.$state.go(cons.state.main + '.act.list');
                                break;
                            case 68://d elivery
                                $rootScope.$state.go(cons.state.main + '.delivery.list');
                                break;
                            case 77: // m oney
                                $rootScope.$state.go(cons.state.main + '.refund.list');
                                break;
                            case 79:// o p
                                $rootScope.$state.go(cons.state.main + '.banner.list');
                                break;
                            case 76://h and
                                $rootScope.$state.go(cons.state.main + '.lessons.list');
                                break;
                            // case 72://l esson 课程
                            //     $rootScope.$state.go(cons.state.main + '.coupon.list');
                            //     break;
                        }
                    } else if (tagName && $rootScope.hjm && $rootScope.hjm.role == 'op') {
                        // console.log(event.keyCode);
                        switch (event.keyCode) {
                            case 65: // a ct
                                $rootScope.$state.go(cons.state.main + '.act.list');
                                break;
                            case 76://h and
                                $rootScope.$state.go(cons.state.main + '.lessons.list');
                                break;
                        }
                    }
                });

                // 获取simpleCons.js 里的common 数据
                $rootScope.common = cons.common;
                $rootScope.env_name = cons.env_name;

                // $compileProvider.debugInfoEnabled(true);
                // 监听路由事件
                // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                // console.log(event, toState, toParams, fromState, fromParams);
                // 路由改变 初始化 search
                //初始化每次的 公共查询方法
                // $rootScope.searchkeyword = angular.noop();
                // $rootScope.current_state = $state.current.name;
                // console.log($rootScope.current_state);
                // console.log($state);
                // console.log($rootScope.hjm.menus);
                // console.log($state.current.name);
                // console.log($rootScope.mainmenu);
                // });
                //活动公共数据
                // 获取公共数据 初始化
                $rootScope.nowlogintimestamp = new Date().getTime();
                $rootScope.lastlogintimestamp = JSON.parse(localStorage.getItem('lastlogintimestamp')) || 0;
                if (parseInt(($rootScope.nowlogintimestamp - $rootScope.lastlogintimestamp) / (1000 * 60 * 60 * 24)) > 1) {
                    //超过一天就更新
                    $rootScope.lastlogintimestamp = JSON.parse($rootScope.nowlogintimestamp);
                    localStorage.removeItem('hjm');
                    // console.log($state);
                    // if($state.current.name!=='login'){
                    //     $state.go('login');
                    // }
                } else {
                    localStorage.setItem('lastlogintimestamp', $rootScope.lastlogintimestamp = new Date().getTime());
                    $rootScope.hjm = JSON.parse(localStorage.getItem('hjm'));
                    // $rootScope.selected = angular.copy($rootScope.hjm);
                    // $rootScope.selected.account_id = '';
                    $rootScope.current_city_name = $rootScope.hjm.current_city_name == '' ? '' : $rootScope.hjm.current_city_name;
                    $http.defaults.headers.common.Authorization = $rootScope.hjm.Authorization || '';
                }
                $rootScope.update_menus = function () {
                    if (localStorage.getItem('login_account')) {
                        var login_account = JSON.parse(base64.decode(localStorage.getItem('login_account')));
                        widget.ajaxRequest({
                            method: 'POST',
                            url: '/account/menus',
                            scope: {$rootScope},
                            data: {username: login_account.username, password: login_account.password},
                            success: function (json) {
                                if ($rootScope.hjm) {
                                    $rootScope.hjm.menus = json.data;
                                }
                            },
                            failure: function (err) {
                                // widget.msgToast(err.message);
                            }
                        });
                    }
                }
                $rootScope.getaccount_times = 0;
                // 获取account_list
                $rootScope.account_list = [];
                $rootScope.account_list_bd_op = [];
                $rootScope.get_account_list = function () {
                    $rootScope.account_list = [];
                    $rootScope.account_list_bd_op = [];
                    if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                        $rootScope.update_menus();
                        widget.ajaxRequest({
                            url: cons.api.account_mans,
                            method: 'GET',
                            data: {count: 1000, role: 'op,majia,bd'},
                            success: function (json) {
                                $rootScope.account_list_bd_op.push({
                                    text: '--请选择--',
                                    value: undefined
                                });
                                angular.forEach(json.data, function (val, key) {
                                    if (val.role == 'bd' || val.role == 'op') {
                                        $rootScope.account_list_bd_op.push({
                                            text: val.username,
                                            value: val.account_id
                                        });
                                    }
                                });
                                json.data.unshift({
                                    account_id: "",
                                    city_name: "",
                                    email: "",
                                    mobile: "",
                                    role: "op",
                                    username: "全部联系人"
                                })
                                $rootScope.account_list = json.data;
                                angular.forEach($rootScope.account_list, function (val, key) {
                                    $rootScope.account_list[key].account_id += '';
                                });

                            },
                            failure: function () {
                                widget.msgToast('没有获取到公共数据');
                            }
                        })
                    }
                }
                if ($rootScope.account_list.length == 0) {
                    $rootScope.get_account_list();
                }
                $rootScope.teacher_list = [];
                $rootScope.get_teacher_list = function () {
                    $rootScope.teacher_list = [];
                    if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                        widget.ajaxRequest({
                            url: '/teachers',
                            method: 'GET',
                            data: {count: 1000, page: 1},
                            success: function (json) {
                                $rootScope.teacher_list.push({
                                    text: '--请选择--',
                                    value: undefined
                                });
                                angular.forEach(json.data, function (val, key) {
                                    $rootScope.teacher_list.push({
                                        text: val.name,
                                        value: val.teacher_id + ''
                                    });
                                });
                            },
                            failure: function () {
                                widget.msgToast('没有获取到老师信息');
                            }
                        })
                    }
                }
                if ($rootScope.teacher_list.length == 0) {
                    $rootScope.get_teacher_list();
                }
                // 获取 survey_question_category_list  维度列表
                $rootScope.survey_question_category_list = [];
                $rootScope.survey_question_category_list_attachments = [];//适用于form—table 里的 select  附加信息
                $rootScope.survey_question_category_list_general = [];//适用于form—table 里的 select  普通信息
                $rootScope.get_survey_question_category_list = function () {
                    if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                        widget.ajaxRequest({
                            url: '/surveys/categories',
                            method: 'GET',
                            data: {count: 1000, status: 1},
                            success: function (json) {
                                $rootScope.survey_question_category_list_attachments = [];
                                $rootScope.survey_question_category_list_general = [];
                                angular.forEach(json.data, function (val, key) {
                                    if (val.type == 1) {
                                        $rootScope.survey_question_category_list_attachments.push({
                                            value: val.id + '',
                                            text: val.name
                                        });
                                    }
                                });
                                $rootScope.survey_question_category_list_general.push({
                                    value: undefined,
                                    text: '-- 请选择 --'
                                });
                                angular.forEach(json.data, function (val, key) {
                                    if (val.type == 2) {
                                        $rootScope.survey_question_category_list_general.push({
                                            value: val.id + '',
                                            text: val.name
                                        });
                                    }

                                });
                                json.data.unshift({
                                    id: "0",
                                    name: "无维度",
                                })
                                $rootScope.survey_question_category_list = [];
                                angular.forEach(json.data, function (val, key) {
                                    $rootScope.survey_question_category_list.push({id: val.id, name: val.name});
                                });

                            },
                            failure: function () {
                                widget.msgToast('没有获取到测评维度');
                            }
                        })
                    }
                }
                if ($rootScope.survey_question_category_list.length == 0) {
                    $rootScope.get_survey_question_category_list();
                }
                // 获取 survey_question_list_attachments
                $rootScope.survey_question_list_attachments = [];//适用于form—table 里的 select  附加信息的题目
                $rootScope.get_survey_question_list = function () {
                    if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                        widget.ajaxRequest({
                            url: '/surveys/questions',
                            method: 'GET',
                            data: {count: 1000, status: 1, category_type: 1},
                            success: function (json) {
                                $rootScope.survey_question_list_attachments = [];
                                $rootScope.survey_question_list_attachments.push({
                                    value: undefined,
                                    text: '-- 请选择 --'
                                });
                                angular.forEach(json.data, function (val, key) {
                                    $rootScope.survey_question_list_attachments.push({
                                        value: val.id + '',
                                        text: val.title
                                    });
                                });
                            },
                            failure: function () {
                                widget.msgToast('没有获取到附加问题数据');
                            }
                        })
                    }
                }
                if ($rootScope.survey_question_list_attachments.length == 0) {
                    $rootScope.get_survey_question_list();
                }
                $rootScope.login_init = function () {
                    $rootScope.get_account_list();
                    $rootScope.get_teacher_list();
                    $rootScope.get_survey_question_category_list();
                    $rootScope.get_survey_question_list();
                }
            }
        ])

});
