/**
 * Created by tuyu on 16/3/15.
 */
angular.module('starter.controllers')
  .controller('MainInfoCtrl', function ($rootScope, $scope, $http, $state, UserInfo) {

    $scope.goto = function (idx) {

      switch (idx) {
        case 0:
          $state.go('login', {});
          break;
        case 1:
          if ($rootScope.userStatus == 'login') {
            $state.go('tab.mainInfo-collection-collectionGoods', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 2:
          if ($rootScope.userStatus == 'login') {
            $state.go('tab.mainInfo-allOrders', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 3:
          if ($rootScope.userStatus == 'login') {
            $state.go('tab.mainInfo-setting', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 4:
          if ($rootScope.userStatus == 'login') {
            $state.go('tab.mainInfo-help', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 5:
          if ($rootScope.userStatus == 'login') {
            $state.go('tab.mainInfo-notPayedOrders', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 6:
          if ($rootScope.userStatus == 'login') {
            $state.go('', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 7:
          if ($rootScope.userStatus == 'login') {
            $state.go('', {});
          } else {
            $state.go('login', {});
          }
          break;
        case 8:
          if ($rootScope.userStatus == 'login') {
            $state.go('', {});
          } else {
            $state.go('login', {});
          }
          break;
        default :
          break;
      }
    }

    $scope.userInfo = UserInfo.getUserInfo();


    $rootScope.userStatus = $rootScope.userStatus == null ? 'notLogin' : $rootScope.userStatus;


  })
  .controller('MainInfoCollectionCtrl', function ($scope) {
  })
  .controller('MainInfoAllOrdersCtrl', function ($scope, $state, $ionicPopup, MyOrders,EvaluatingGoodsList,ShoppingCart) {

    $scope.viewInit = function () {
      /*
       获取所有的订单
       */
      $scope.orders = MyOrders.getAllOrders();

      /*
       获取已完成的订单
       */
      $scope.completedOrders = MyOrders.getCompleted();

      /*
       获取所有待付款的订单
       */
      $scope.notPayOrders = MyOrders.getNotPayOrders();

      /*
       获取所有待发货的订单
       */
      $scope.notDeliverOrders = MyOrders.getNotDeliverOrders();

      /*
       获取所有待收货的订单
       */
      $scope.notConfirmOrders = MyOrders.getNotConfirmOrders();

      /*
       获取所有待评价的订单
       */
      $scope.notEvaluateOrders = MyOrders.getNotEvaluateOrders();
      //console.log("init function do");
      //console.log($scope.notConfirmOrders);
    }
    //$scope.$on('$stateChangeSuccess', $scope.viewInit.update);

    $scope.$on('$ionicView.afterEnter', function() {

      //console.log('afterEnter');
      $scope.notEvaluateOrders = MyOrders.getNotEvaluateOrders();

    }, false);
    /*
     获取所有的订单
     */
    $scope.orders = MyOrders.getAllOrders();

    /*
     获取已完成的订单
     */
    $scope.completedOrders = MyOrders.getCompleted();

    /*
     获取所有待付款的订单
     */
    $scope.notPayOrders = MyOrders.getNotPayOrders();

    /*
     获取所有待发货的订单
     */
    $scope.notDeliverOrders = MyOrders.getNotDeliverOrders();

    /*
     获取所有待收货的订单
     */
    $scope.notConfirmOrders = MyOrders.getNotConfirmOrders();

    /*
     获取所有待评价的订单
     */
    $scope.notEvaluateOrders = MyOrders.getNotEvaluateOrders();


    $scope.dataSource = new Array();
    $scope.dataSource = $scope.completedOrders;

    /*
     ng-switch的model
     */
    $scope.showModel = 'first';
    $scope.showOption = 'first';

    /*
     是否显示footerbar中的操作按钮
     */
    $scope.checkboxSelectAll = false;

    $scope.showCancelOrder = false;

    $scope.showGoToPay = false;

    $scope.showReminder = false;

    $scope.showConfirmGoods = false;

    $scope.showEvaluate = false;

    /*
     定义标题
     */
    $scope.viewTitle = "已完成订单";

    $scope.orderStatus = "已完成";

    $scope.evaluateStatus = false;

    /*
     点击按钮，显示区域和footer都会根据ng-switch的model切换
     */
    $scope.selectModel = function (showModel) {
      //$scope.showModel = showModel;
      $scope.showOption = showModel;
      switch (showModel) {
        case 'first':
          $scope.dataSource = $scope.completedOrders;
          $scope.viewTitle = "已完成订单";
          $scope.orderStatus = "已完成";
          if($scope.evaluateStatus)
            $scope.evaluateStatus = !$scope.evaluateStatus;
          break;
        case 'second':
          $scope.dataSource = $scope.notPayOrders;
          $scope.viewTitle = "待付款订单";
          $scope.orderStatus = "待付款";
          if($scope.evaluateStatus)
            $scope.evaluateStatus = !$scope.evaluateStatus;
          break;
        case 'third':
          $scope.dataSource = $scope.notDeliverOrders;
          $scope.viewTitle = "待发货订单";
          $scope.orderStatus = "待发货";
          if($scope.evaluateStatus)
            $scope.evaluateStatus = !$scope.evaluateStatus;
          break;
        case 'fourth':
          $scope.dataSource = $scope.notConfirmOrders;
          $scope.viewTitle = "待收货订单";
          $scope.orderStatus = "待收货";
          if($scope.evaluateStatus)
            $scope.evaluateStatus = !$scope.evaluateStatus;
          break;
        case 'fifth':
          $scope.dataSource = $scope.notEvaluateOrders;
          $scope.viewTitle = "待评价订单";
          $scope.orderStatus = "待评价";
          if(!$scope.evaluateStatus)
          $scope.evaluateStatus = !$scope.evaluateStatus;
          break;
      }
    }

    /*
     ng-if显示订单是否完成
     */
    $scope.completed = function (order) {
      if (order.payed && order.delivered && order.confirmed) {
        return true;
      } else {
        return false;
      }

    }

    //$scope.watchNotEvaluatedOrder = function () {
    //  for(var i = 0 ;i<$scope.notEvaluateOrders.length;i++){
    //    for(var j = 0 ;j<$scope.notEvaluateOrders[i].goods.length;j++){
    //      var k =0;
    //      if($scope.notEvaluateOrders[i].goods[j] == false){
    //        continue;
    //      }else{
    //        k++;
    //      }
    //      if(k == $scope.notEvaluateOrders[i].goods.length)
    //      return true;
    //    }
    //  }
    //  return false;
    //}

    //$scope.$watch($scope.watchNotEvaluatedOrder, function (newValue,oldValue,scope) {
    //  if(newValue){
    //    $scope.notEvaluateOrders = MyOrders.getNotEvaluateOrders();
    //    console.log($scope.notEvaluateOrders);
    //  }
    //});

    /*
     用$scope.$watch来监听checkbox中的项是否被选中，选中了就显示footerbar中的操作按钮
     */
    $scope.myWatch = function () {
      //console.log("jian ting qi zuo yong le " );

      var orders = $scope.dataSource;
      //console.log(orders);
      if (orders != null && orders.length != 0) {
        for (var i = 0; i < orders.length; i++) {
          if (orders[i].selected == true) {
            return true;
          }
        }
      }
      return false;
    }

    $scope.$watch($scope.myWatch, function (newValue, oldValue, scope) {
      //console.log(newValue);
      if (newValue) {
        $scope.showCancelOrder = true;
        $scope.showGoToPay = true;

        $scope.showReminder = true;

        $scope.showConfirmGoods = true;

        $scope.showEvaluate = true;
      } else {
        $scope.showCancelOrder = false;
        $scope.showGoToPay = false;

        $scope.showReminder = false;

        $scope.showConfirmGoods = false;

        $scope.showEvaluate = false;
      }
    })

    /*
     footerbar中的全选按钮点击效果
     */
    $scope.selectAll = function (showModel) {
      //console.log(showModel);
      switch (showModel) {
        case 'first':
          for (var i = 0; i < $scope.orders.length; i++) {
            $scope.orders[i].selected = $scope.checkboxSelectAll;
          }
          break;
        case 'second':
          for (var i = 0; i < $scope.notPayOrders.length; i++) {
            $scope.notPayOrders[i].selected = $scope.checkboxSelectAll;
          }
          break;
        case 'third':
          for (var i = 0; i < $scope.notDeliverOrders.length; i++) {
            $scope.notDeliverOrders[i].selected = $scope.checkboxSelectAll;
          }
          break;
        case 'fourth':
          for (var i = 0; i < $scope.notConfirmOrders.length; i++) {
            $scope.notConfirmOrders[i].selected = $scope.checkboxSelectAll;
          }
          break;
        case 'fifth':
          for (var i = 0; i < $scope.notEvaluateOrders.length; i++) {
            $scope.notEvaluateOrders[i].selected = $scope.checkboxSelectAll;
          }
          break;
        default :
          for (var i = 0; i < $scope.orders.length; i++) {
            $scope.orders[i].selected = $scope.checkboxSelectAll;
          }
          break;
      }

    }

    /*
     已完成订单中的删除订单按钮点击事件
     */
    $scope.cancelOrder = function () {
      $ionicPopup.confirm({
        title: '删除订单',
        content: '您确定要取消选中的订单？',
        subTitle: '亲，求求您了，别把我删掉！'
      }).then(function (res) {
        if (res) {
          //console.log("你删除了订单");
          var tempDeleteOrders = new Array();
          for (var i = 0; i < $scope.completedOrders.length; i++) {
            if ($scope.completedOrders[i].selected == true && MyOrders.containOrder($scope.completedOrders[i])) {
              var order = $scope.completedOrders[i];
              $scope.completedOrders.pop(order);
              if (!order.evaluated) {
                $scope.notEvaluateOrders.pop(order);
              }
              tempDeleteOrders.push(order);
            }
          }
          if (tempDeleteOrders != null && tempDeleteOrders.length != 0) {
            MyOrders.deleteOrders(tempDeleteOrders);
          }
        } else {
          //console.log("thank you for not cancel the orders.");
        }
      })
    }

    /*
     再次购买
     */
    $scope.buyAgain = function () {

      $ionicPopup.confirm({
        title: '已加入购物车',
        content: '请到购物车中结算'
      }).then(function (res) {
        if (res) {
          for(var i = 0; i < $scope.completedOrders.length; i++){
            for(var j = 0;j<$scope.completedOrders[i].goods.length;j++){
              ShoppingCart.addGoods($scope.completedOrders[i].goods[j]);
            }
          }
          $state.go('tab.shoppingCart', {})
        } else {

        }
      })
    }

    $scope.deleteNotPayedOrder = function (order) {

      $ionicPopup.confirm({
        title:"删除订单",
        content:'确定要删除订单吗？'
      }).then(function (res) {
        if(res){
          var tempDeleteOrders = new Array();
          for (var i = 0; i < $scope.notPayOrders.length; i++) {
            if ($scope.notPayOrders[i].selected == true && MyOrders.containOrder($scope.notPayOrders[i])) {
              var order = $scope.notPayOrders[i];
              $scope.notPayOrders.pop(order);
              //if (!order.evaluated) {
              //  $scope.notPayOrders.pop(order);
              //}
              tempDeleteOrders.push(order);
            }
          }
          if (tempDeleteOrders != null && tempDeleteOrders.length != 0) {
            MyOrders.deleteOrders(tempDeleteOrders);
          }
          $scope.viewInit();
        }else{

        }
      })

    }

    $scope.goToPay = function () {
      var notPayOrders = $scope.notPayOrders;
      $state.go('tab.mainInfo-allOrders-payment', {payOrders: notPayOrders});

    }

    $scope.reminder = function () {
      $ionicPopup.confirm({
        title: '已发送请求',
        content: '后台已接受到您的催单请求，将尽快为您发货！'
      }).then(function (res) {

      })
    }

    $scope.confirmGoods = function () {

      $ionicPopup.confirm({
        title: '确认收货',
        content: '您确定已经收到商品了吗？'
      }).then(function (res) {
        if (res) {
          MyOrders.confirmOrders($scope.notConfirmOrders);
          //$state.go('tab.mainInfo-allOrders',{confirmOrders:$scope.notConfirmOrders});
          $scope.viewInit();
          $scope.selectModel('fifth');
        }
      })

    }

    $scope.evaluateGoods = function () {

      //var evaluateGoods = new Array();
      //var evaluateGoods = ;
      if ($scope.notEvaluateOrders != null && $scope.notEvaluateOrders.length != 0) {
        for (var i = 0; i < $scope.notEvaluateOrders.length; i++) {
          if ($scope.notEvaluateOrders[i].selected == true) {
            //evaluateGoods.push($scope.notEvaluateOrders[i].goods);
            for(var j = 0 ;j<$scope.notEvaluateOrders[i].goods.length;j++){
              //evaluateGoods[j] = $scope.notEvaluateOrders[i].goods[j];
              $scope.notEvaluateOrders[i].goods[j].orderId = $scope.notEvaluateOrders[i].orderId;
              if($scope.notEvaluateOrders[i].goods[j].evaluated == false)
              EvaluatingGoodsList.addGoods($scope.notEvaluateOrders[i].goods[j]);
            }
          }
        }
      }

      $state.go('tab.mainInfo-allOrders-evaluate', {});
    }


    /*
     回到首页
     */
    $scope.goHome = function () {
      $state.go("tab.home", {});
    }
  })
  .controller("MainInfoCollectionCollectionGoodsCtrl", function ($scope, $state, CollectionGoods) {

    $scope.doRefresh = function () {
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.collectionGoods = CollectionGoods.getCollectionGoods();
    $scope.remove = function (goods) {

      CollectionGoods.remove(goods);
    };

    $scope.showDetail = function (item) {
      $state.go('tab.mainInfo-collection-collectionGoods-goodsDetail', {goodsInfo: item});
    }
  })
  .controller('MainInfoCollectionCollectionGoodsGoodsDetailCtrl', function ($scope, $state, $ionicPopup, $stateParams, ShoppingCart, CollectionGoods,GoodsEvaluation) {
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

      $state.go('tab.shoppingCart', {});
    }

    $scope.slideHasClicked = function () {

      $state.go("tab.home", {});
    }
  })
  .controller("MainInfoCollectionCollectionStoreCtrl", function ($scope, CollectionStores) {
    $scope.collectionStores = CollectionStores.getCollectionStores();
    $scope.remove = function (store) {

      CollectionStores.remove(store);
    };
  })
  .controller('MainInfoNotPayedOrdersCtrl', function ($scope, MyOrders, ShoppingCart) {

    //$scope.notPayedOrders = MyOrders.getNotPayOrders();
    $scope.notPayedOrders = ShoppingCart.getGoodsInfo();

    $scope.item = {flag: false};

    $scope.deleteNotPayedOrders = function () {
      $scope.item.flag = !$scope.item.flag;
    }

    $scope.delete_item = function (order) {
      //MyOrders.deleteOrder(order);
      //console.log($scope.notPayedOrders);
      ShoppingCart.deleteGoods(order);
    }
  });
