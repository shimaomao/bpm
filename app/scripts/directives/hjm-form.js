define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('formInput', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                // require: '^?$parent',
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    type: '@',
                    placeholder: '@',
                    maxlength: '@',
                    minlength: '@',
                    min: '@',
                    max: '@',
                    ngDisabled: '=',
                    labelWidth: '@',
                    contentWidth: '@',
                    formShowRole: '@',
                    requiredSpanShow: '=', //  用于展示必填符号 不能实际校验是否必填
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs, $element, $ctrl);
                    // console.log($scope.ngModelText);
                    var labelWidth = $scope.labelWidth ? ('col-sm-' + $scope.labelWidth) : ('col-sm-2');
                    var contentWidth = $scope.contentWidth ? ('col-sm-' + $scope.contentWidth) :
                        ($scope.labelWidth ? ('col-sm-' + (10 - $scope.labelWidth)) : ('col-sm-8'));
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '' + '" ');
                    var required = $scope.required ? (' required') : '';
                    var required_span = ($scope.required || $scope.requiredSpanShow) ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var type = $scope.type ? (' type="' + $scope.type + '" ') : '';
                    var min = $scope.min ? (' min="' + $scope.min + '" ') : '';
                    var max = $scope.max ? (' max="' + $scope.max + '" ') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '" ') : '';
                    var maxlength = $scope.maxlength ? (' maxlength="' + $scope.maxlength + '" ') : '';
                    var minlength = $scope.minlength ? (' minlength="' + $scope.minlength + '" ') : '';
                    var formShowRole = $scope.formShowRole ? (' show-role="' + $scope.formShowRole + '" ') : '';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '" ') : '';
                        var content = '<label class="' + labelWidth + ' control-label" ' + formShowRole + '>' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + ' " ' + formShowRole + '>' +
                            '<input class="form-control" ng-model="ngModel"' + min + max +
                            type + name + placeholder + maxlength + minlength + required + disabledRole + ngDisabled + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // $scope.modelVal = $scope.ngModel;
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                    $scope.$watch('ngModel', function (val) {
                        if ($scope.type == 'number' && $scope.max) {
                            (val > $scope.max) ? (val = $scope.max) : (angular.noop());
                        }
                    });
                    // $scope.$watch('modelVal', function (val) {
                    //     $scope.ngModel = val;
                    // });
                    // $scope.$watch($scope.ngModelText, function (val) {
                    //     if ($scope.type == 'number') {
                    //         $scope.ngModel = (parseFloat(val) || 0);
                    //     } else {
                    //         $scope.ngModel = val;
                    //     }
                    // });
                    // $scope.$watch('ngModel', function (val) {
                    //     if (val || val == 0) {
                    //         if ($scope.type == 'number') {
                    //             $scope.$eval($scope.ngModelText + '=' + (parseFloat(val) || parseFloat($scope.min) || 0) + '');
                    //         } else {
                    //             $scope.$eval($scope.ngModelText + '="' + val + '"');
                    //         }
                    //     }
                    // });
                }
            }
        })
        .directive('formTextarea', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    type: '@',
                    placeholder: '@',
                    ngMaxlength: '@max',
                    ngMinlength: '@min',
                    ngDisabled: '=',
                    rows: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    // console.log($scope.ngModelText);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    var ngMaxlength = $scope.ngMaxlength ? (' ng-maxlength="' + $scope.ngMaxlength + '"') : '';
                    var ngMinlength = $scope.ngMinlength ? (' ng-minlength="' + $scope.ngMinlength + '"') : '';
                    var rows = $scope.rows ? (' rows="' + $scope.rows + '"') : 'rows="5"';
                    var ngDisabled = $scope.ngDisabled && (' ng-disabled="ngDisabled"');
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<textarea class="form-control" ' + rows + ' ng-model="ngModel"' +
                            name + placeholder + ngMaxlength + ngMinlength + required + ngDisabled + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formSelect', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    default: '@',
                    text: '@',
                    name: '@',
                    required: '@',
                    source: '=',
                    sourceApi: '@',
                    callback: '&',
                    ngDisabled: '=',
                    labelWidth: '@',
                    contentWidth: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    var labelWidth = $scope.labelWidth ? ('col-sm-' + $scope.labelWidth) : ('col-sm-2');
                    var contentWidth = $scope.contentWidth ? ('col-sm-' + $scope.contentWidth) :
                        ($scope.labelWidth ? ('col-sm-' + (10 - $scope.labelWidth)) : ('col-sm-8'));
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="' + labelWidth + ' control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + '">';
                        content += '<select class="form-control"' + name + ngDisabled + ' ng-model="ngModel" ' +
                            'ng-options="item.value as item.text for item in source">' +
                            // '<option value=undefined>--  请选择  --</option>' +
                            '</select>';
                        content += '<input class="hide" ng-model="ngModel" ' + name + disabledRole + required + '">'
                            + '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formRadio', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    default: '@',
                    text: '@',
                    name: '@',
                    required: '@',
                    source: '=',
                    sourceApi: '@',
                    callback: '&',
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    if (!$scope.ngModel) {
                        $scope.ngModel = $scope.default;
                    }
                    // console.log('formElement', $scope, $attrs);
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var date = new Date().getTime();
                    var name = $scope.name ? (' name="' + $scope.name + date + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">';
                        angular.forEach($scope.source, function (val, key) {
                            var value = '';
                            if (typeof val.value == 'number') {
                                value = ' value = "' + parseFloat(val.value) + '"';
                            } else {
                                value = ' value = "' + val.value + '"';
                            }
                            content += '<label class="radio-inline radio1"><input ' + type + ' ng-model="ngModel"' +
                                name + value + disabledRole + ngDisabled + '><span></span>' + val.text + '</label>';
                        });
                        content += '<input class="hide" ng-model="ngModel" ' + name + required + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formCheckbox', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    default: '=',
                    text: '@',
                    name: '@',
                    required: '@',
                    source: '=',
                    // sourceApi: '=',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var date = new Date().getTime();
                    var name = $scope.name ? (' name="' + $scope.name + date + '"') : (' name="' + $scope.ngModelText + date + '"');
                    var nickname = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="checkbox"';
                    $scope.tmp_source = [];
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">';
                        angular.forEach($scope.source, function (val, key) {
                            content += '<label class="checkbox-inline checkbox1"><input ' + type + disabledRole + name +
                                ' ng-checked="isChecked(\'' + val.value + '\')"' +
                                ' ng-click="updateSelection($event,\'' + val.value + '\',' + key + ')"  ' +
                                '><span></span>' + val.text + '</label>';
                        });
                        content += '<div><input class="hide" ng-model="tmp_field" ' + nickname + required + disabledRole + '" /></div>';
                        // content += '<div form-input text="' + $scope.text + '" ng-model="tmp_field" ' + nickname + required + disabledRole + '"/></div>';
                        // content += '<div class="hide1" ng-bind="ngModel|json"></div>';
                        content += '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                            // console.log($scope.$parent.FormBody);
                        }
                    }, 0);
                    $scope.$watch('ngModel', function (val) {
                        // console.log('ngModel  ===', $scope.ngModel);
                        if (val && val.length > 0) {
                            $scope.tmp_field = true;
                        } else if (val) {
                            $scope.tmp_field = undefined;
                        } else if (!val) {
                            $scope.ngModel = $scope.default || [];
                        }
                        // console.log($scope.$parent.FormBody);
                    }, true);
                    $scope.isChecked = function (value) {
                        if ($scope.ngModel && $scope.ngModel.length > 0) {
                            return $scope.ngModel && $scope.ngModel.indexOf(value) >= 0;
                        } else {
                            return false;
                        }
                    };

                    $scope.updateSelection = function ($event, value, key) {
                        $scope.ngModel = [];
                        var source_html = $('[' + name + ']');
                        angular.forEach(source_html, function (val, key) {
                            if (val.checked) {
                                $scope.ngModel.push($scope.source[key].value);
                            }
                        });
                    };


                }
            }
        })
        // .directive('formCheckbox', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
        //     return {
        //         restrict: 'EA',
        //         replace: true,
        //         template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
        //         scope: {
        //             ngModel: '=ngModel',
        //             ngModelText: '@ngModel',
        //             default: '=',
        //             text: '@',
        //             name: '@',
        //             required: '@',
        //             source: '=',
        //             // sourceApi: '=',
        //             callback: '&',
        //         },
        //         link: function ($scope, $element, $attrs, $ctrl) {
        //             // console.log($scope.ngModel);
        //             // console.log($scope.source);
        //             // console.log('formElement', $scope, $attrs);
        //             // if (!$scope.ngModelText) {
        //             //     return false;
        //             // }
        //             // var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
        //             var date = new Date().getTime();
        //             var name = $scope.name ? (' name="' + $scope.name + date + '"') : (' name="' + $scope.ngModelText + date + '"');
        //             var required = $scope.required ? (' required') : '';
        //             var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
        //             var type = ' type="checkbox"';
        //             $scope.tmp_source = [];
        //             $timeout(function () {
        //                 var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
        //                     (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
        //                 var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
        //                     '<div class="col-sm-8">';
        //                 angular.forEach($scope.source, function (val, key) {
        //                     $scope.source[key].checked = false;
        //                     content += '<label class="checkbox-inline checkbox1"><input ' + type + disabledRole +
        //                         ' ng-model="tmp_source[' + key + ']"' + name +
        //                         ' ng-true-value="\'' + val.value + '\'" ' +
        //                         ' ng-false-value="false" ' +
        //                         ' ng-checked = "source[' + key + '].checked" ' +
        //                         '><span></span>' + val.text + '</label>';
        //                 });
        //                 content += '<input class="hide" ng-model="ngModel"' + name + required + disabledRole + '>';
        //                 content += ' {{ngModel}}  </div>';
        //                 $element.find('.form_element').html(content);
        //                 $compile($element.contents())($scope);
        //                 if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
        //                     $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
        //                     // console.log($scope.$parent.FormBody);
        //                 }
        //                 console.log($scope.tmp_source, $scope.source, $scope.ngModelText, $scope.ngModel);
        //             }, 0);
        //             $scope.$watch($scope.ngModelText, function (val) {
        //                 // console.log('ngModelText', val);
        //                 console.log(1);
        //                 if (val && val.length == 0) {
        //                     $scope.ngModel = undefined;
        //                 } else {
        //                     $scope.ngModel = val || [];
        //                 }
        //             }, true);
        //
        //             $scope.$watch('tmp_source', function (val) {
        //                 // console.log('tmp_source',val);
        //                 console.log(2);
        //                 if (val) {
        //                     var mod_arr = [];
        //                     angular.forEach(val, function (v, k) {
        //                         if (v) mod_arr.push(v);
        //                     });
        //                     $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod_arr) + '');
        //                 } else {
        //                     $scope.$eval($scope.ngModelText + '=[]');
        //                 }
        //             }, true);
        //             $scope.$watch('ngModel', function (mod) {
        //                 // console.log('ngModel', mod);
        //                 console.log(3);
        //                 if (mod) {
        //                     angular.forEach($scope.source, function (source, key) {
        //                         $scope.source[key].checked = false;
        //                         $scope.tmp_source[key] = false;
        //                         angular.forEach(mod, function (mod_v, mod_k) {
        //                             if (source.value == mod_v) {
        //                                 // console.log(source.value,mod_v);
        //                                 $scope.source[key].checked = true;
        //                                 $scope.tmp_source[key] = source.value + '';
        //                             }
        //                         });
        //                     });
        //                     console.log(JSON.stringify(mod));
        //                     $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod) + '');
        //                 } else {
        //                     if (mod && mod.length == 0) {
        //                         $scope.ngModel = undefined;
        //                     }
        //                 }
        //             }, true);
        //         }
        //     }
        // })
        .directive('formImage', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                    token: '@',
                    hideBar: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            // $scope.token ?
                            '<show-upload-token images="ngModel" hide-bar="hideBar"   ' + name + max + required + disabledRole + token + '></show-upload-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                    // $scope.$watch('ngModel', function (val) {
                    //     var tmp_pics_err = 0;
                    //     angular.forEach(val, function (v, k) {
                    //         if (!v.pic_url) {
                    //             tmp_pics_err++;
                    //         }
                    //     })
                    //     if (tmp_pics_err > 0) {
                    //         console.log('图片还没有完成上传');
                    //     }
                    // }, true);
                }
            }
        })
        .directive('formSources', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                    token: '@',
                    type: '@',
                    // hideBar: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');
                    $scope.hideBar = $scope.type != 1 ? [0, 0, 1, 1] : $scope.hideBar;
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            // $scope.token ?
                            '<hjm-upload-source sources="ngModel" hide-bar="hideBar"   ' + type + name + max + required + disabledRole + token + '></hjm-upload-source>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                    // $scope.$watch('ngModel', function (val) {
                    //     var tmp_pics_err = 0;
                    //     angular.forEach(val, function (v, k) {
                    //         if (!v.pic_url) {
                    //             tmp_pics_err++;
                    //         }
                    //     })
                    //     if (tmp_pics_err > 0) {
                    //         console.log('图片还没有完成上传');
                    //     }
                    // }, true);
                }
            }
        })
        .directive('formAudio', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                    token: '@'
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="resource"');

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-upload-audio-token audio="ngModel" ' + name + max + required + disabledRole + token + '></show-upload-audio-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                }
            }
        })
        .directive('formApk', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                    token: '@'
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token=""');

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-upload-apk-token apk="ngModel" ' + name + max + required + disabledRole + token + '></show-upload-apk-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                }
            }
        })
        .directive('formImageContent', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            // '<content_or_img ng-model="ngModel"' + name + required + disabledRole + '></content_or_img>' +
                            '<rich-content-or-img ng-model="ngModel"' + name + required + disabledRole + '></rich-content-or-img>' +
                            // '<content_or_img ng-model="' + $scope.ngModelText + '"' + name + required + disabledRole + '></content_or_img>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                }
            }
        })
        .directive('formRichContent', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout, $sce) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=',
                    text: '@',
                    // name: '@',
                    required: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    $scope.editorConfig = {
                        // focus: true, //自动把光标放到UEditor中。测试config配置。 实际情况要删掉 容易误操作填入文本内容
                        allowDivTransToP: false, //DIV 自动替换 为其他标签
                    }
                    $timeout(function () {
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<ueditor config="editorConfig" ng-model="ngModel">' +
                            '</ueditor>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    });
                }
            }
        })
        .directive('formDateTime', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    callback: '&',
                    ngDisabled: '@',
                    showtip: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var showtip = $scope.showtip ? (' showtip="' + $scope.showtip + '"') : '';
                    $timeout(function () {
                        var disabledRole = $scope.ngDisabled ? (' disabled-role="aaaaaaaaa"') :
                            (($scope.$parent && $scope.$parent.disabledRole) ?
                                (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ');
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date_time ng-model="ngModel"' + required + disabledRole + showtip + '></hjm_date_time>' +
                            '<input class="hide" ng-model="ngModel"' + name + required + disabledRole + '>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formDate', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date ng-model="ngModel"' + required + disabledRole + ' ></hjm_date>' +
                            '<input class="hide" ng-model="ngModel"' + name + required + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                    // $scope.$watch($scope.ngModelText, function (modelNew) {
                    //     $scope.ngModel = modelNew;
                    // });
                    // $scope.$watch('ngModel', function (val) {
                    //     if (val) {
                    //         $scope.$eval($scope.ngModelText + '="' + val + '"');
                    //     } else {
                    //         $scope.$eval($scope.ngModelText + '=' + undefined + '');
                    //     }
                    // });
                }
            }
        })
        .directive('formTable', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    columns: '=',
                    config: '=?config',
                    text: '@',
                    name: '@',
                    required: '=',
                    max: '@',
                    callBack: '&',
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    $timeout(function () {
                        var columns = $scope.columns ? (' columns=' + JSON.stringify($scope.columns) + '') : ('');
                        if ($scope.ngDisabled) {
                            // || $scope.$parent && $scope.$parent.disabledRole
                            $scope.config = $scope.config || {};
                            angular.extend($scope.config, {readonly: true});
                        }
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var config = $scope.config ? (' config=' + JSON.stringify($scope.config) + '') : ('');
                        var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                        var required = $scope.required ? (' required') : '';
                        var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                        var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                        var content = '';
                        if (!$scope.text) {
                            content = '<div class="col-sm-12 ">';
                        } else {
                            content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                                '<div class="col-sm-8">';
                        }
                        if ($scope.columns) {
                            content += '<json-table ng-model="ngModel"' + columns + config + name +
                                required + max + disabledRole + '></json-table>';

                        }
                        // content += '<input class="hide" ng-model="ngModel"' + name + required + '>' ;
                        content += '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                    $scope.$watch('ngModel', function (val) {
                        // 简单区分数据是否填写 要是length 为0 就置为undefined 这样require就起作用了
                        if (val && val.length == 0) {
                            $scope.ngModel = undefined;
                        }
                    }, true);

                }
            }
        })
        .directive('formErrorBlock', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-err-block.html'),
                // scope: {
                //     ngModel: '=ngModel'
                // },
                link: function ($scope, $element, $attrs, $ctrl) {

                }
            }
        })
        .directive('formAddress', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-addresses addresses="ngModel"   ' + name + max + required + disabledRole + '></show-addresses>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                }
            }
        })

})
