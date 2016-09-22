/**
 * Created by tuyu on 16/1/14.
 */
angular.module('starter.controllers')
  .controller('HomeCtrl', function ($scope, $state,$rootScope,GoodsInfo,$http,Api,GetLocalTime) {

    console.log($rootScope.userStatus);

    $http.post('http://localhost:1111/maven1/modifyUserInfo',{
      userId: 4,
      account: 'aaaa',
      password: 'aaaa',
      nickName: "tuyu",
      sex: "男", age: 22,
      address: "china",
      mobile: "18328589111",
      headPortrait: "img/tutu.jpg",
      localLogin: false
    }).success(function(data){
      console.log(data);
    })
    //$http.post('http://localhost:1111/maven1/register',{
    //  userId: 1,
    //  account: 'abcd',
    //  password: '1234',
    //  nickName: "tuyu",
    //  sex: "男", age: 22,
    //  address: "china",
    //  mobile: "18328589111",
    //  headPortrait: "img/tutu.jpg",
    //  localLogin: false
    //}).success(function(data){
    //  console.log(data.userId);
    //})

    //能成功返回user对象
    //$http.post('http://localhost:1111/maven1/login',{
    //  account:'abcd',
    //  password:'1234'
    //}).success(function (data) {
    //  console.log(data);
    //})

    $scope.goodsInfo = GoodsInfo.getGoodsInfo();

    $scope.showSearchWindow = function () {
        $state.go('tab.home-search',{});
    }

    $scope.showDetail = function (item) {
      $state.go('tab.home-goodsDetail',{goodsInfo:item});
    }
  })
  .controller("HomeGoodsDetailCtrl", function ($scope, $ionicPopup, $state,$stateParams,ShoppingCart,CollectionGoods,GoodsEvaluation) {


    $scope.goodsInfo = $stateParams.goodsInfo;

    $scope.goodsEvaluations = GoodsEvaluation.getEvaluationByGoods($scope.goodsInfo);

    console.log($scope.goodsEvaluations);

    $scope.addToShoppingCart = function (goodsInfo) {
      ShoppingCart.addGoods(goodsInfo);
      var alertPopup = $ionicPopup.alert({
        title: 'success',
        template: '加入购物车成功'
      });
      alertPopup.then(function (res) {

      });
    }

    $scope.addToCollectionGoods = function (goodsInfo) {
      CollectionGoods.addGoods(goodsInfo);
      var alertPopup = $ionicPopup.alert({
        title: 'success',
        template: '收藏成功'
      });
      alertPopup.then(function (res) {

      });
    }

    $scope.goToShoppingCart = function () {

      $state.go('tab.shoppingCart',{});
    }

    $scope.slideHasClicked = function () {

      $state.go("tab.home", {});
    }
  })
  .controller('HomeHomeSearchCtrl', function ($scope,$state,GoodsInfo) {

    $scope.goodsInfo = null;

    $scope.searchKeyValue = {
      key:null
    };

    $scope.search = function () {
      $scope.goodsInfo = GoodsInfo.getGoodsInfoByGoodsName($scope.searchKeyValue.key);
    }

    $scope.returnHome = function () {
      $state.go('tab.home',{});
    }

    $scope.showDetail = function (item) {
      $state.go('tab.home-goodsDetail',{goodsInfo:item});
    }
  });
