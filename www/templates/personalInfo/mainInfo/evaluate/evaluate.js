/**
 * Created by tuyu on 16/3/26.
 */
angular.module('starter.controllers')
  .controller('MainInfoAllOrdersEvaluateCtrl', function ($scope, $stateParams, $state,EvaluatingGoodsList) {
    //$scope.evaluateGoods =$stateParams.evaluateGoods;
    $scope.evaluateGoods =EvaluatingGoodsList.getAllGoods();
    //$scope.evaluateAllGoods =EvaluatingGoodsList.getAllGoods();
    //$scope.evaluateGoods = new Array();
    //for(var i = 0 ;i<$scope.evaluateAllGoods.length;i++){
    //  if($scope.evaluateAllGoods[i].evaluated == false)
    //    $scope.evaluateGoods.push($scope.evaluateAllGoods[i]);
    //}

    $scope.editEvaluate = function (goods) {
      $state.go('tab.mainInfo-allOrders-evaluate-editEvaluate', {evaluateGoods: goods})
    }
  })
  .controller('MainInfoAllOrdersEditEvaluateCtrl', function ($scope, $state,$ionicPopup, $stateParams,EvaluatingGoodsList,MyOrders,GoodsEvaluation,UserInfo) {
    $scope.evaluateGoods = $stateParams.evaluateGoods;


    $scope.evaluation = {words:''};

    $scope.submitEvaluation = function (goods) {


console.log($scope.evaluation.words );
      if($scope.evaluation.words != null && $scope.evaluation.words.length >5 && $scope.evaluation.words.length<100){
        $ionicPopup.confirm({
          title:'评价成功',
          content:'感谢您的评价，有您的鼓励我们会做的更好！'
        }).then(function (res) {
          GoodsEvaluation.addGoodsEvaluation(UserInfo.getUserInfo(),goods,$scope.evaluation.words);
          for(var i = 0 ;i<$scope.evaluateGoods.length;i++){
            if($scope.evaluateGoods.goodsId == goods.goodsId)
              $scope.evaluateGoods.splice(i,1);
          }
          MyOrders.evaluateGoodsByOrder(goods.orderId,goods)
          EvaluatingGoodsList.deleteGoods(goods);
          $state.go('tab.mainInfo-allOrders-evaluate',{});
        });
      }else{
        $ionicPopup.confirm({
          title:'请输入5-100字评价，谢谢合作'
        }).then(function (res) {

        })
      }



    }
  })
