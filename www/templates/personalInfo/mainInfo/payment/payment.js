/**
 * Created by tuyu on 16/3/24.
 */
angular.module('starter.controllers')
  .controller('MainInfoAllOrdersPaymentCtrl', function ($scope,$state,$stateParams) {

    $scope.pay = function (idx) {
      if(idx == 1){
        $state.go('tab.mainInfo-allOrders-payment-zhiFuBao',{payOrders:$stateParams.payOrders});
      }else{
        $state.go('tab.mainInfo-allOrders-payment-weiXin',{payOrders:$stateParams.payOrders});
      }

    }

  })
  .controller('MainInfoAllOrdersPaymentZhiFuBaoCtrl', function ($scope,$ionicPopup,$stateParams,$state,MyOrders) {

    $scope.showPayFlag = {show:true};
    $scope.showSuccessFlag = {show:false};

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
            for(var  i = 0;i<$stateParams.payOrders.length;i++){
              MyOrders.payOrder($stateParams.payOrders[i]);
            }

            //$scope.account.num = $scope.account.password = null;
            //$state.go('tab.mainInfo-allOrders',{payOrders:$stateParams.payOrders})
            $scope.showPayFlag.show = false;
            $scope.showSuccessFlag.show = true;
          })
        }
      }
    }

  })
  .controller('MainInfoAllOrdersPaymentWeiXinCtrl', function ($scope,$ionicPopup,$state,$stateParams,MyOrders) {
    $scope.showPayFlag = {show:true};
    $scope.showSuccessFlag = {show:false};
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
            for(var  i = 0;i<$stateParams.payOrders.length;i++){
              MyOrders.payOrder($stateParams.payOrders[i]);
            }
            //$state.go('tab.mainInfo-allOrders',{payOrders:$stateParams.payOrders})
            $scope.showPayFlag.show = false;
            $scope.showSuccessFlag.show = true;
          })
        }
      }
    }
  })
