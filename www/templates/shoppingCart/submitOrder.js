/**
 * Created by tuyu on 16/1/15.
 */
angular.module('starter.controllers')
  .controller('ShoppingCartSubmitCtrl', function ($scope, $state, MyGoods, AddressesInfo, GoodsInfo,$ionicPopup,ShoppingCart,MyOrders,UserInfo) {
    $scope.templateMyGoods = MyGoods.getMyGoods();
    $scope.templateTotalMoney = MyGoods.getTotalMoney();

    $scope.newOrder = null;
    //$scope.addressInfo = {
    //  addressId: 0,
    //  city: "chengdu",
    //  region: "shuangliu",
    //  userName: "tuyu",
    //  mobile: "183283831112",
    //  zipCode: "610225"
    //};

    //$scope.addressInfo = AddressesInfo.getDefaultAddress();
    $scope.addressInfo = AddressesInfo.getSelectedAddress();

    $scope.chooseAddress = function () {
      $state.go("tab.shoppingCart-submit-consigneeAddress", {});
    }

    $scope.submitOrder = function () {
      $ionicPopup.confirm({
        title: "是否提交订单",
        content: "总共" + $scope.templateTotalMoney + "元钱"
      }).then(function (res) {
        if (res) {
          //console.log("you submit your order.")
          if($scope.templateMyGoods != null && $scope.templateMyGoods.length != 0){
            $scope.newOrder = MyOrders.newOrder(GoodsInfo.getGoodsInfoByGoodsList($scope.templateMyGoods),UserInfo.getUserInfo());
            for(var i = 0;$scope.templateMyGoods.length != 0;i = 0){
              //GoodsInfo.deleteGoods($scope.templateMyGoods[i]);
              console.log($scope.templateMyGoods[i]);
              ShoppingCart.deleteGoods($scope.templateMyGoods[i]);
              MyGoods.deleteGoods($scope.templateMyGoods[i]);
              //ShoppingCart.deleteGoods($scope.templateMyGoods[i]);
            }
            console.log('newOrder' + $scope.newOrder);
            $state.go('tab.shoppingCart-submit-payedOrNot',{newOrder:$scope.newOrder});
          }else{
            $state.go('tab.shoppingCart',{});
          }

        } else {
          console.log("you don't submit your order.");
        }
      })
    }

  })
  .controller('ShoppingCartSubmitConsigneeAddressCtrl', function ($scope, AddressesInfo) {
    $scope.AddressesInfo = AddressesInfo.getAddressesInfo();
    for (var i = 0; i < $scope.AddressesInfo.length; i++) {
      if ($scope.AddressesInfo[i].selected == true) {
        $scope.selected = {choice: $scope.AddressesInfo[i]}

      }

    }

    $scope.changeDefault = function (address) {
      console.log($scope.AddressesInfo);
      AddressesInfo.setDefaultAddress(address.id);
    }

    $scope.selectAddress = function (address) {
      AddressesInfo.selectAddress(address);
      console.log(address);
    }
  })
  .controller('ShoppingCartSubmitPayedOrNotCtrl', function ($scope,$state,$stateParams) {
    console.log('payornot' + $stateParams.newOrder);

    $scope.payNow = function () {
      $state.go("tab.shoppingCart-submit-payedOrNot-payStyle", {newOrder:$stateParams.newOrder});
    }

    $scope.payLater = function () {
      $state.go("tab.shoppingCart", {});
    }
  })
  .controller('ShoppingCartSubmitPayedOrNotPayStyleCtrl', function ($scope,$state,$stateParams) {
    console.log('paystyle' + $stateParams.newOrder);

    $scope.pay = function (idx) {
      switch(idx){
        case 1:
          $state.go("tab.shoppingCart-submit-payedOrNot-payStyle-payment", {order:1,newOrder:$stateParams.newOrder});
              break;
        case 2:
          $state.go("tab.shoppingCart-submit-payedOrNot-payStyle-payment", {order:2,newOrder:$stateParams.newOrder});
              break;
        default :
              break;
      }
    }
  })
  .controller('ShoppingCartSubmitPayedOrNotPayStylePaymentCtrl', function ($scope,$stateParams,$ionicPopup,$state,MyOrders) {
    $scope.payStyle = $stateParams.order == 1 ? '支付宝支付' : '微信支付';

    console.log('pay' + $stateParams.newOrder);

    $scope.account = {
      num:null,
      password:null
    };
    $scope.pay = function () {
      if($scope.account.num == null){
        $ionicPopup.alert({
          title:'请输入账号',
          content:'账号不能为空'
        })
      }else{
        if($scope.account.password == null){
          $ionicPopup.alert({
            title:'请输入密码',
            content:'密码不能为空'
          })
        }else{
          $ionicPopup.confirm({
            title:'支付完成',
            content:'您已成功支付'
          }).then(function (res) {
            //MyOrders.payOrder($stateParams.payOrders);
            MyOrders.payOrder($stateParams.newOrder);
            $state.go('tab.shoppingCart',{})
          })
        }
      }
    }
  });
