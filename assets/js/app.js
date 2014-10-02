'use strict';

var app = angular.module('admin', ['ui.router']);


app.config(function($stateProvider) {
    //
    // For any unmatched url, redirect to /state1

    // Now set up the states
    $stateProvider
        .state('page', {
            url: "/page",
            templateUrl: "/templates/page/page.stateMaster.html",
        })
        .state('page.list', {
            url : "/list",
            templateUrl: "/templates/page/page.list.html",
            controller : function ($scope, $http) {
                $http.get('/page').success(function (pages) {
                    console.log('111');
                    $scope.pages = pages;
                });
            }
        })
        .state('page.edit', {
            url: "/:id",
            templateUrl: "/templates/page/page.edit.html",
            controller : function ($scope, $http, $stateParams, $state) {

                $http.get('/page/' + $stateParams.id).success(function (data) {
                    $scope.page = data;
                });

                $http.get('/page').success(function (allPages) {
                    $scope.otherPages = allPages.filter(function (page) {
                        return page.id !== parseInt($stateParams.id);
                    });
                });

                $scope.save = function () {
                    $http.put('/page/' + $stateParams.id, $scope.page)
                        .success(function () {
                            $state.go('page.list');
                        });
                };
            }
        });
});
