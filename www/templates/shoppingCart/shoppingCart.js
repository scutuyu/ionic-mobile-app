/**
 * Created by tuyu on 16/1/14.
 */
angular.module('starter.controllers')
  .controller('ShoppingCartCtrl', function ($scope, $http, $state, MyGoods, GoodsInfo, $ionicPopup, ShoppingCart, $rootScope) {
    $scope.doRefresh = function () {
      //  $http.get('/new-items')
      //    .success(function (newItems) {
      //      $scope.items = newItems;
      //    })
      //    .finally(function () {
      //      // 停止广播ion-refresher
      //      $scope.$broadcast('scroll.refreshComplete');
      //    });
      $scope.$broadcast('scroll.refreshComplete');
    };

    //$scope.goodsInfo = GoodsInfo.getGoodsInfo();
    $scope.goodsInfo = ShoppingCart.getGoodsInfo();

    $scope.calculateTotalMoney = function () {

      if ($scope.goodsInfo != null && $scope.goodsInfo.length != 0) {
        var total = 0;
        var isSelected = 0;
        for (var i = 0; i < $scope.goodsInfo.length; i++) {
          if ($scope.goodsInfo[i].selected == true) {
            isSelected = 1;
          } else {
            isSelected = 0;
          }
          total = total + $scope.goodsInfo[i].goodsPrice * $scope.goodsInfo[i].purchaseNum * isSelected;
        }
        return total;
      }
      return 0;
    };

    $scope.subtractPurchaseNum = function (goodsId) {
      for (var i = 0; i < $scope.goodsInfo.length; i++) {
        if ($scope.goodsInfo[i].goodsId == goodsId && $scope.goodsInfo[i].purchaseNum != 1) {
          $scope.goodsInfo[i].purchaseNum--;
        }
      }
    };

    $scope.addPurchaseNum = function (goodsId) {
      for (var i = 0; i < $scope.goodsInfo.length; i++) {
        if ($scope.goodsInfo[i].goodsId == goodsId) {
          $scope.goodsInfo[i].purchaseNum++;
        }
      }
    };

    $scope.clickCheckBox = function (goods) {
      if (goods.selected == false) {
        goods.selected = true;
        MyGoods.setMyGoods(goods);
        //$scope.myGoods.push(goods);
      } else {
        goods.selected = false;
        MyGoods.deleteGoods(goods);
        //$scope.myGoods.pop(goods)
      }
    }

    $scope.checkboxSelectAll = false;

    $scope.selectAll = function () {
      for (var i = 0; i < $scope.goodsInfo.length; i++) {
        $scope.goodsInfo[i].selected = $scope.checkboxSelectAll;
      }
    }

    $scope.ngsubmit = function () {

      if ($rootScope.userStatus == 'login') {

        var templateGoods = new Array();

        for (var i = 0; i < $scope.goodsInfo.length; i++) {
          if ($scope.goodsInfo[i].selected == true && MyGoods.containGoods($scope.goodsInfo[i])) {
            continue;
          } else if ($scope.goodsInfo[i].selected == true && !MyGoods.containGoods($scope.goodsInfo[i])) {
            MyGoods.setMyGoods($scope.goodsInfo[i]);
            templateGoods.push($scope.goodsInfo[i]);
          } else if ($scope.goodsInfo[i].selected == false && MyGoods.containGoods($scope.goodsInfo[i])) {
            MyGoods.deleteGoods($scope.goodsInfo[i]);
          }
          //MyGoods.setTotalMoney($scope.calculateTotalMoney());
          //$state.go("tab.shoppingCart-payment", {});
        }
        MyGoods.setTotalMoney($scope.calculateTotalMoney());

        if ($scope.calculateTotalMoney() == 0) {
          $ionicPopup.alert({
            title: '请先选择商品',
            content: '没有选中商品就不能提交订单'
          }).then(function (res) {
            return;
          });
        } else {
          $state.go("tab.shoppingCart-submit", {goodsInfo: templateGoods});
        }
      } else {
        $ionicPopup.alert({
          title: '请先登录',
          content: '登录后才能提交订单'
        }).then(function (res) {
          $state.go('login', {});
        })
      }

    }
    $scope.ng_change = function (selected) {
      if (selected) {

      }
    }

    $scope.item = {flag: false};

    $scope.editShoppingCart = function () {
      $scope.item.flag = !$scope.item.flag;
    }

    $scope.delete_item = function (goods) {
      ShoppingCart.deleteGoods(goods);
      console.log($scope.goodsInfo);
    }
  });
