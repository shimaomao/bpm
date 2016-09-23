define([
    // 'jquery',
    // 'angular',
    'ui.router',
    'angular-animate',
    'dndLists',
    'angucomplete-alt',
    'angular-aria',
    'angular-truncate',
    'bindonce',
    'ui.bootstrap',
    'angular-file-upload',
    // 'ui.select2',
    'ng.ueditor',
    //'angular-async-loader',
    //'me-pageloading',
    //'snap',
    'ab-base64',
    // 'ngSanitize',
    // 'ngCsv',
    'perfect_scrollbar',
    'angular-loading-bar',
    'progressButton',
    //'huijiaControllers',
    //'huijiaStates',
    //'huijiaDirectives',
    //'huijiaFilters',
    //'huijiaServices',
    // 'angular-async-loader',
    'controllers/_base',
    'states/_base',
    'directives/_base',
    'filters/_base',
    'services/_base',
    'app-tpl'
], function () {
    //console.log('app.js');

    return angular.module('huijiaApp', [
        'ui.router',
        'ngAnimate',
        'dndLists',
        'angucomplete-alt',
        'ngAria',
        'truncate',
        'pasvaz.bindonce',
        'ui.bootstrap',
        'angularFileUpload',
        // 'ui.select2',
        'ng.ueditor',
        //'asyncLoader',
        //'me-pageloading',
        'ab-base64',
        // 'ngSanitize',
        // 'ngCsv',
        'perfect_scrollbar',
        'angular-loading-bar',
        'progressButton',
        // 'asyncLoader',
        'huijiaControllers',
        'huijiaStates',
        'huijiaDirectives',
        'huijiaFilters',
        'huijiaServices',
        'app-tpl',
    ]);
});