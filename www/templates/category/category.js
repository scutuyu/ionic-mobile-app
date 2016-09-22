/**
 * Created by tuyu on 16/3/15.
 */
angular.module('starter.controllers')
  .controller('CategoryCtrl', function ($scope,$state,GoodsInfo) {

    $scope.index = 'index1';

    $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('连衣裙');

    $scope.selectMenu = function (idx) {
      switch (idx) {
        case 1:
          //$scope.index = 'index1';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('连衣裙');
          break;
        case 2:
          //$scope.index = 'index2';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('韩版夹克');
          break;
        case 3:
          //$scope.index = 'index3';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('BB霜');
          break;
        case 4:
          //$scope.index = 'index4';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('电吹风');
          break;
        case 5:
          //$scope.index = 'index5';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('小米note');
          break;
        case 6:
          //$scope.index = 'index6';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('戴尔');
          break;
        case 7:
          //$scope.index = 'index7';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('母婴套装');
          break;
        case 8:
          //$scope.index = 'index8';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('Java编程技术');
          break;
        case 9:
          //$scope.index = 'index9';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('席梦思');
          break;
        case 10:
          $scope.index = 'index10';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('沐浴露');
          break;
        case 11:
          //$scope.index = 'index11';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('哈尔滨啤酒');
          break;
        case 12:
          //$scope.index = 'index12';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('雪地靴');
          break;
        case 13:
          //$scope.index = 'index13';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('银座拉杆箱');
        break;
        case 14:
          //$scope.index = 'index14';
          $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName('天梭表');
          break;
      }
    }

    $scope.showSearchWindow = function () {
      $state.go('tab.category-categorySearch',{});

    }

    $scope.showDetail = function (goodsInfo) {
      $state.go('tab.category-goodsDetail',{goodsInfo:goodsInfo});
    }
  })
  .controller('CategoryCategorySearchCtrl', function ($scope,$state,$ionicPopup,GoodsInfo) {
    $scope.searchKeyValue = {
      key:null
    };

    $scope.searchedGoodsInfo = null;

    $scope.returnCategory = function () {
     $state.go('tab.category',{});
    }

    $scope.search = function () {
      //console.log("key" + $scope.searchKeyValue.key);
      if($scope.searchKeyValue.key != null){
        $scope.searchedGoodsInfo = GoodsInfo.getGoodsInfoByGoodsName($scope.searchKeyValue.key);
        console.log($scope.searchedGoodsInfo);
      }else{
        //$ionicPopup.alert({
        //  title:'请输入搜索条件',
        //  content:'搜索条件不能为空'
        //}).then(function (res) {
        //
        //})
      }

    }

    $scope.showDetail = function (goodsInfo) {
      $state.go('tab.category-goodsDetail',{goodsInfo:goodsInfo});
    }
  })
  .controller('CategoryGoodsDetailCtrl', function ($scope,$state,$stateParams,ShoppingCart,CollectionGoods,$ionicPopup,GoodsEvaluation) {
    $scope.goodsInfo = $stateParams.goodsInfo;

    $scope.goodsEvaluations = GoodsEvaluation.getEvaluationByGoods($scope.goodsInfo);

    //console.log($scope.goodsInfo);

    $scope.addToShoppingCart = function (goodsInfo) {
      ShoppingCart.addGoods(goodsInfo);
      var alertPopup = $ionicPopup.alert({
        title: 'success',
        template: '加入购物车成功'
      });
      alertPopup.then(function (res) {
        //console.log('Thank you for not eating my delicious ice cream cone');

      });
    }

    $scope.addToCollectionGoods = function (goodsInfo) {
      CollectionGoods.addGoods(goodsInfo);
      var alertPopup = $ionicPopup.alert({
        title: 'success',
        template: '收藏成功'
      });
      alertPopup.then(function (res) {
        //console.log('Thank you for not eating my delicious ice cream cone');

      });
    }

    $scope.goToShoppingCart = function () {

      $state.go('tab.shoppingCart',{});
    }

    $scope.slideHasClicked = function () {

      $state.go("tab.home", {});
    }
  });
