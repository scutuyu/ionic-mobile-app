angular.module('starter.controllers', [])

  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.tabs.position('bottom');
  })

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('MainInfoHelpCtrl', function ($scope,UserInfo) {
    $scope.userInfo = UserInfo.getUserInfo();
  })




