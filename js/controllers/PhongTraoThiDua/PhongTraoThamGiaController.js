﻿angular.module('WebApiApp').controller('PhongTraoThamGiaController', function ($rootScope, $scope, $http, $timeout, $uibModal, $state) {
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
        "IdDonvi": $rootScope.CurDonVi.Id,
        "Nam": $rootScope.CurYear,
        "Trangthai": 0
    };
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $rootScope.Load();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $rootScope.Load();
        }

    }
    
    $rootScope.Load = function () {
        if ($scope.Paging.totalPage != 0) {
            if ($scope.Paging.currentPage > $scope.Paging.totalPage)
                $scope.Paging.currentPage = $scope.Paging.totalPage
            if ($scope.Paging.currentPage < 1)
                $scope.Paging.currentPage = 1
        }

        $http({
            method: 'GET',
            url: 'api/PhongTrao/GetByDVThamGia?pageNumber='
                + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize
                + '&searchKey=' + $scope.Paging.searchKey + '&IdDonvi=' + $scope.Paging.IdDonvi
                + '&Nam=' + $scope.Paging.Nam + '&Trangthai=' + $scope.Paging.Trangthai
        }).then(function successCallback(response) {

            $scope.PhongTrao = response.data.ListOut;

            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;



        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $rootScope.Load();
    $scope.LapToTrinh = function (item) {
        $rootScope.SelectedPhongTrao = item;
        $state.go('LTTKT');
    }
    
});
