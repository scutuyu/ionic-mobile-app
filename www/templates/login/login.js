/**
 * Created by tuyu on 16/1/21.
 */
/**
 * Created by tuyu on 16/1/14.
 */
angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope,$rootScope, $state,$ionicPopup,UserInfo) {

    $scope.userAccount = {account:null,password:null};
    $scope.login = function () {
      if($scope.userAccount.account == null){
        $ionicPopup.alert({
          title:'用户名不能为空'
        })
      }else{
        if($scope.userAccount.password == null){
          $ionicPopup.alert({
            title:'密码不能为空'
          })
        }else{
          //if($scope.userAccount.account == 'abcd'&& $scope.userAccount.password == '1234'){
          //  $state.go("tab.home", {});
          //  $rootScope.userStatus = 'login';
          //}else{
          //  $ionicPopup.alert({
          //    title:'用户名或者密码不正确'
          //  })
          //}
          if(UserInfo.containUser($scope.userAccount)){
            $state.go("tab.home", {});
            $rootScope.userStatus = 'login';
          }else{
            $ionicPopup.alert({
              title:'用户名或者密码不正确'
            })
          }
        }
      }
    }

    $scope.userRegister = function () {
      $state.go('login-register',{});
    }

    $scope.getPassword = function () {
      $state.go('login-getPassword',{});
    }

    $scope.notLogin = function () {
      $state.go("tab.home", {});
      $rootScope.userStatus = 'notLogin';
    }

    //$scope.globalQuery = function ($event) {
    //  if(!$event){
    //    $event = window.event;
    //  }
    //  if (($event.keyCode || $event.which) == 13) {
    //    $("#aotuLogin").click();
    //  }
    //}
  })
  .controller('LoginRegisterCtrl', function ($scope,$state,$ionicPopup,ConfirmCode,UserInfo) {

    $scope.newUserInfo = {userName:null,password1:null,password2:null,mobile:null,confirmCode:null};

    $scope.newUser = function () {
      if($scope.newUserInfo.userName == null){
        $ionicPopup.alert({
          title:'用户名不正确',
          content:'用户名不能为空'
        })
      }else{//用户名不为空
        if($scope.newUserInfo.password1 == null || $scope.newUserInfo.password2 == null){
          $ionicPopup.alert({
            title:'密码不正确',
            content:'密码不能为空'
          })
        }else{//密码不为空
          if($scope.newUserInfo.password1 != $scope.newUserInfo.password2 || $scope.newUserInfo.password1.length<6 || $scope.newUserInfo.password1.length>18){
            $ionicPopup.alert({
              title:'密码错误',
              content:'请输入6-18位的密码'
            }).then(function (res) {
              if(res)
                $scope.newUserInfo.password1 = $scope.newUserInfo.password2 = null;
                $scope.newUserInfo.confirmCode = null;
            });
          }else{//两次密码一致
            if($scope.newUserInfo.mobile != null && $scope.newUserInfo.confirmCode != null){
              UserInfo.newUser(new Object($scope.newUserInfo));
              $ionicPopup.alert({
                title:'注册成功',
                content:'注册成功'
              }).then(function (res) {
                if(res)
                  $state.go('login',{});
              });
            }else{//手机号和验证码不为空
              $ionicPopup.alert({
                title:'手机号或验证码不正确',
                content:'输入手机号获取验证码'
              })
            }
          }
        }
      }
      //if($scope.newUserInfo.password1 == null || $scope.newUserInfo.password2 == null){
      //  $ionicPopup.alert({
      //    title:'密码不正确',
      //    content:'密码不能为空'
      //  })
      //}


    }

    $scope.getConfirmCode = function (mobile) {

      if($scope.newUserInfo.mobile != null && $scope.newUserInfo.mobile.length == 11){

        if(!UserInfo.existUser(mobile)){
          var ver = ConfirmCode.getConfirmCode();
          $ionicPopup.confirm({
            title: '验证码',
            content:'验证码: '+ ver
          }).then(function (res) {
            $scope.newUserInfo.confirmCode = ver;
          });
        }else{
          $ionicPopup.alert({
            title:"手机号已注册",
            content:'请重新输入手机号'
          })
        }

      }else{
        $ionicPopup.alert({
          title:'手机号或验证码不正确',
          content:'输入手机号获取验证码'
        })
      }
    }
  })
  .controller('LoginRegisterGetPasswordCtrl', function ($scope,$state,$ionicPopup,$state,ConfirmCode,UserInfo) {

    $scope.info = {mobile:null,confirmCode:null};

    $scope.setNewPassword = function () {
      if($scope.info.mobile != null && $scope.info.mobile.length == 11 && $scope.info.confirmCode != null){
        $state.go('login-getPassword-setNewPassword',{mobile:$scope.info.mobile});
      }else{
        $ionicPopup.alert({
          title:'手机号或验证码不正确',
          content:'输入手机号获取验证码'
        })
      }
    }

    $scope.getConfirmCode = function (mobile) {


      if($scope.info.mobile != null && $scope.info.mobile.length == 11){

        if(UserInfo.existUser(mobile)){

        var ver = ConfirmCode.getConfirmCode();
        $ionicPopup.confirm({
          title: '验证码',
          content:'验证码: '+ ver
        }).then(function (res) {
          $scope.info.confirmCode = ver;
        });
        }else{
          $ionicPopup.alert({
            title:"手机号匹配失败",
            content:'没有找到与该手机号相关的信息'
          })
        }
      }else{
        $ionicPopup.alert({
          title:'手机号或验证码不正确',
          content:'输入手机号获取验证码'
        })
      }
    }
  })
  .controller('LoginRegisterGetPasswordSetNewPasswordCtrl', function ($scope,$state,$ionicPopup,$stateParams,UserInfo) {

    $scope.info = {password1:null,password2:null};

    $scope.confirmNewPassword = function () {

      if($scope.info.password1 != null && $scope.info.password1 != null && $scope.info.password1 == $scope.info.password2 && $scope.info.password1.length>5 && $scope.info.password1.length<19){
        if(UserInfo.resetPassword($stateParams.mobile,$scope.info.password1 )){
          $ionicPopup.confirm({
            title:'密码设置成功',
            content:'请牢记新密码'
          }).then(function (res) {
            if(res)
              $state.go('login',{});
          });
        }else{
          $ionicPopup.alert({
            title:'设置失败',
            content:'密码重置失败，请重新试一次'
          })
        }


      }else{
        $ionicPopup.alert({
          title:'密码设置不正确',
          content:'请输入6-18位的密码'
        }).then(function (res) {
          if(res){
            $scope.info.password1 = $scope.info.password2 = null;
          }
        })
      }
    }
  });
