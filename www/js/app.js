angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .constant('ApiEndpoint', {
    url: 'http://localhost:63342/api'
  })
  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $ionicConfigProvider.tabs.style("standard");

    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })


      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.mainInfo', {
        url: '/mainInfo',
        cache:false,
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/mainInfo.html',
            controller: 'MainInfoCtrl'
          }
        }
      })
      .state('tab.mainInfo-collection', {
        url: '/mainInfo/collection',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/collection/collection.html',
            controller: 'MainInfoCollectionCtrl'
          }
        }
      })
      .state('tab.mainInfo-collection-collectionGoods', {
        url: '/mainInfo/collection/collectionGoods',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/collection/collectionGoods.html',
            controller: 'MainInfoCollectionCollectionGoodsCtrl'
          }
        }
      })
      .state('tab.mainInfo-collection-collectionGoods-goodsDetail', {
        url: '/mainInfo/collection/collectionGoods/goodsDetail',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/collection/goodsDetail.html',
            controller: 'MainInfoCollectionCollectionGoodsGoodsDetailCtrl'
          }
        },
        params:{
          goodsInfo:null
        }
      })
      .state('tab.mainInfo-collection-collectionStore', {
        url: '/mainInfo/collection/collectionStore',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/collection/collectionStore.html',
            controller: 'MainInfoCollectionCollectionStoreCtrl'
          }
        }
      })
      .state('tab.mainInfo-help', {
        url: '/mainInfo/help',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/help.html',
            controller: 'MainInfoHelpCtrl'
          }
        }
      })
      .state('tab.mainInfo-allOrders', {
        url: '/mainInfo/allOrders',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/allOrders.html',
            controller: 'MainInfoAllOrdersCtrl'
          }
        },
        params:{
          payOrders:null,
          confirmOrders:null
        },
        cache:false
      })
      .state('tab.mainInfo-notPayedOrders', {
        url: '/mainInfo/notPayedOrders',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/notPayedOrders.html',
            controller: 'MainInfoNotPayedOrdersCtrl'
          }
        },
        //params:{
          //payOrders:null,
          //confirmOrders:null
        //}
      })
      .state('tab.mainInfo-allOrders-evaluate',{
        url:'/mainInfo/allOrders/evaluate',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/evaluate/evaluate.html',
            controller:'MainInfoAllOrdersEvaluateCtrl'
          }
        },
        params:{
          evaluateGoods:null
        }
      })
      .state('tab.mainInfo-allOrders-evaluate-editEvaluate',{
        url:'/mainInfo/allOrders/evaluate/editEvaluate',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/evaluate/editEvaluate.html',
            controller:'MainInfoAllOrdersEditEvaluateCtrl'
          }
        },
        params:{
          evaluateGoods:null
        }
      })
      .state('tab.mainInfo-allOrders-payment',{
        url:'/mainInfo/allOrders/payment',
        cache:'false',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/payment/payment.html',
            controller:'MainInfoAllOrdersPaymentCtrl'
          }
        },
        params:{
          payOrders:null
        }
      })
      .state('tab.mainInfo-allOrders-payment-zhiFuBao',{
        url:'/mainInfo/allOrders/payment/zhiFuBao',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/payment/zhiFuBao.html',
            controller:'MainInfoAllOrdersPaymentZhiFuBaoCtrl',
          }
        },
        params:{
          payOrders:null
        },
        cache:false
      })
      .state('tab.mainInfo-allOrders-payment-weiXin',{
        url:'/mainInfo/allOrders/payment/weiXin',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/payment/weiXin.html',
            controller:'MainInfoAllOrdersPaymentWeiXinCtrl'
          }
        },
        params:{
          payOrders:null
        },
        cache:false
      })
      .state('tab.mainInfo-setting', {
        url: '/mainInfo/setting',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/setting/setting.html',
            controller: 'MainInfoSettingCtrl'
          }
        }
      })
      .state('tab.mainInfo-setting-address', {
        url: '/mainInfo/setting/address',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/setting/address/address.html',
            controller: 'MainInfoSettingAddressCtrl'
          }
        }
      })
      .state('tab.mainInfo-setting-address-addressDetail', {
        url: '/mainInfo/setting/address/addressDetail',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/setting/address/addressDetail.html',
            controller: 'MainInfoSettingAddressAddressDetailCtrl'
          }
        },
        params:{
          addressDetail:null
        }
      })
      .state('tab.mainInfo-setting-newAddress', {
        url: '/mainInfo/setting/newAddress',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/setting/address/newAddress.html',
            controller: 'MainInfoSettingNewAddressCtrl'
          }
        }
      })
      .state('tab.mainInfo-setting-nickName', {
        url: '/mainInfo/setting/nickName',
        views: {
          'tab-mainInfo': {
            templateUrl: 'templates/personalInfo/mainInfo/setting/nickName.html',
            controller: 'MainInfoSettingNickNameCtrl'
          }
        }
      })
      .state('tab.mainInfo-setting-accountManagement',{
        url:'/mainInfo/setting/accountManagement',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/setting/accountManagement/accountManagement.html',
            controller:'MainInfoSettingAccountManagementCtrl'
          }
        }
      })
      .state('tab.mainInfo-setting-accountManagement-loginPwd',{
        url:'/mainInfo/setting/accountManagement/loginPwd',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/setting/accountManagement/loginPwd.html',
            controller:'MainInfoSettingAccountManagementLoginPwdCtrl'
          }
        }
      })
      .state('tab.mainInfo-setting-accountManagement-payPwd',{
        url:'/mainInfo/setting/accountManagement/payPwd',
        views:{
          'tab-mainInfo':{
            templateUrl:'templates/personalInfo/mainInfo/setting/accountManagement/payPwd.html',
            controller:'MainInfoSettingAccountManagementPayPwdCtrl'
          }
        }
      })
      .state('tab.category', {
        url: '/category',
        views: {
          'tab-category': {
            templateUrl: 'templates/category/category.html',
            //templateUrl: 'templates/tab-account.html',
            controller: 'CategoryCtrl'
          }
        }
      })
      .state('tab.category-goodsDetail', {
        url: '/category/goodsDetail',
        views: {
          'tab-category': {
            templateUrl: 'templates/category/goodsDetail.html',
            //templateUrl: 'templates/tab-account.html',
            controller: 'CategoryGoodsDetailCtrl'
          }
        },
        params:{
          goodsInfo:null
        }
      })
      .state('tab.category-categorySearch',{
        url:'/category/categorySearch',
        views:{
          'tab-category':{
            templateUrl:'templates/category/categorySearch.html',
            controller:'CategoryCategorySearchCtrl'
          }
        }
      })
      .state('tab.shoppingCart', {
        url: '/shoppingCart',
        views: {
          'tab-shoppingCart': {
            templateUrl: 'templates/shoppingCart/shoppingCart.html',
            controller: 'ShoppingCartCtrl'
          }
        }
      })
      .state('tab.shoppingCart-submit', {
        url: '/shoppingCart/submit',
        cache:false,
        views: {
          'tab-shoppingCart': {
            templateUrl: 'templates/shoppingCart/submitOrder.html',
            controller: 'ShoppingCartSubmitCtrl'
          }
        }
      })
      .state('tab.shoppingCart-submit-payedOrNot', {
        url: '/shoppingCart/submit/payedOrNot',
        cache:false,
        views: {
          'tab-shoppingCart': {
            templateUrl: 'templates/shoppingCart/payedOrNot.html',
            controller: 'ShoppingCartSubmitPayedOrNotCtrl'
          }
        },
        params:{
          newOrder:null
        }
      })
      .state('tab.shoppingCart-submit-payedOrNot-payStyle', {
        url: '/shoppingCart/submit/payedOrNot/payStyle',
        cache:false,
        views: {
          'tab-shoppingCart': {
            templateUrl: 'templates/shoppingCart/payStyle.html',
            controller: 'ShoppingCartSubmitPayedOrNotPayStyleCtrl'
          }
        },
        params:{
          newOrder:null
        }
      })
      .state('tab.shoppingCart-submit-payedOrNot-payStyle-payment', {
        url: '/shoppingCart/submit/payedOrNot/payStyle/payment',
        cache:false,
        views: {
          'tab-shoppingCart': {
            templateUrl: 'templates/shoppingCart/payment.html',
            controller: 'ShoppingCartSubmitPayedOrNotPayStylePaymentCtrl'
          }
        },
        params:{
          order:null,
          newOrder:null
        }
      })
      .state('tab.shoppingCart-submit-consigneeAddress',{
        url:'/consigneeAddress',
        views:{
          'tab-shoppingCart':{
            templateUrl:'templates/shoppingCart/consigneeAddress.html',
            controller:'ShoppingCartSubmitConsigneeAddressCtrl'
          }
        }
      }
    )
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.home-search',{
        url:'/home/search',
        views:{
          'tab-home':{
            templateUrl:'templates/home/homeSearch.html',
            controller:'HomeHomeSearchCtrl'
          }
        }
      })
      .state('tab.home-goodsDetail', {
        url: '/home/goodsDetail',
        views: {
          'tab-home': {
            templateUrl: 'templates/home/goodsDetail.html',
            controller: 'HomeGoodsDetailCtrl'
          }
        },
        params:{
          goodsInfo:null
        }
      })
      .state('login', {
        url: '/login',
            templateUrl: 'templates/login/login.html',
            controller: 'LoginCtrl'
      })
      .state('login-register', {
        url: '/login/register',
        templateUrl: 'templates/login/register.html',
        controller: 'LoginRegisterCtrl'
      })
      .state('login-getPassword', {
        url: '/login/register/getPassword',
        templateUrl: 'templates/login/getPassword.html',
        controller: 'LoginRegisterGetPasswordCtrl',
        cache:false
      })
      .state('login-getPassword-setNewPassword', {
        url: '/login/register/getPassword/setNewPassword',
        templateUrl: 'templates/login/setNewPassword.html',
        controller: 'LoginRegisterGetPasswordSetNewPasswordCtrl',
        params:{
          mobile:null
        }
      });
    $urlRouterProvider.when('','/login');

  });
