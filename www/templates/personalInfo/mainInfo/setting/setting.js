/**
 * Created by tuyu on 16/3/17.
 */
angular.module('starter.controllers')
  .controller('MainInfoSettingCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $state,$ionicPopover,UserInfo) {
    $scope.xxx = '男';
    //$rootScope.userInfo = {nickName: "tuyu", sex: "男", age: 22, address: "chengdu", headPortrait: "img/ben.png"}
    $scope.userInfo = UserInfo.getUserInfo();
    //修改性别
    $scope.showSex = function () {
      var radioPopup = $ionicPopup.show({
        //template: '<input type="password" ng-model="data.wifi">',
        title: '请选择性别',
        //subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          {
            text: '<b>男</b>',
            type: 'button-positive',
            onTap: function (e) {
              //$scope.userInfo.sex="男";
              $scope.userInfo.sex = "男";
              radioPopup.close();
            }
          },
          {
            text: '<b>女</b>',
            //type: 'button-positive',
            onTap: function (e) {
              //$scope.userInfo.sex="女";
              $scope.userInfo.sex = "女";
              radioPopup.close();
            }
          },
        ]
      });
    };
//得到头像的popover

    $ionicPopover.fromTemplateUrl('showHeadPortrait.html',{
      scope:$scope
    }).then(function (portraitPopover) {
      $scope.portraitPopover = portraitPopover;
    });

    //修改头像

    $scope.showHeadPortrait = function ($event) {

      $scope.portraitPopover.show($event);
    };

    $scope.choosePortrait = function (url) {
      $scope.userInfo.headPortrait = url;
      $scope.portraitPopover.hide();
    }

//修改昵称addressId
    $scope.showNickName = function () {
      //var myNickName = $ionicPopup.show({
      //  templateUrl:'#tab/mainInfo/setting/nickName'
      //});

      $ionicPopup.prompt({
        title:'输入昵称',
        template:'输入完成后点击OK按钮',
        inputPlaceholder:"昵称"
      }).then(function (res) {
        if(res == null){
          return;
        }else{
          UserInfo.setNickName(res);
        }
      })

      //$state.go('tab.mainInfo-setting-nickName', {});
    };


//修改收货地址
    $scope.showAddress = function () {
      $state.go('tab.mainInfo-setting-address', {});
    }
    //账户管理
    $scope.showAccountManagement = function () {
      $state.go('tab.mainInfo-setting-accountManagement', {});
    }
  })
  .controller("MainInfoSettingAccountManagementCtrl", function ($rootScope,$scope, $state) {

    $scope.showLoginPwd = function () {
      $state.go('tab.mainInfo-setting-accountManagement-loginPwd', {});
    }

    $scope.showPayPwd = function () {
      $state.go('tab.mainInfo-setting-accountManagement-payPwd', {});
    }

    $scope.quitAccount = function () {
      $rootScope.userStatus = 'notLogin';
      $state.go('login',{});
    }
  })
  .controller("MainInfoSettingAccountManagementLoginPwdCtrl", function ($scope, $ionicPopup, $state,$ionicPopup,UserInfo) {

    $scope.first = true;
    $scope.second = false;
    $scope.myColor2 = "color:rgba(231, 206, 204, 0.98)";
    //$scope.identity = {
    //  phoneNum:"18328589114",
    //  verificationCode:""
    //};

    $scope.identity = {
      phoneNum: null,
      verificationCode: null,
      templateVerCode:null
    };
    $scope.clickNext = function () {
      if($scope.identity.phoneNum != null){
        if($scope.identity.verificationCode != null){
          if($scope.identity.templateVerCode != $scope.identity.verificationCode){
            $ionicPopup.alert({
              title:'验证码错误',
              content:'点击获取验证码按钮自动获取验证码'
            })
          }else{
            $scope.myColor1 = "color:rgba(231, 206, 204, 0.98)";
            $scope.myColor2 = "color:rgba(0,0,0,0,0.98)";
            $scope.first = false;
            $scope.second = true;

          }

        }else{
          $ionicPopup.alert({
            title:'请输入验证码',
            content:'验证码不能为空'
          })
        }

      }else{
        $ionicPopup.alert({
          title:'请输入手机号',
          content:'手机号不能为空'
        })
      }

    }
    $scope.password = {
      oldPassword:null,
      newPassword:null,
      confirmPassword:null
    }
    $scope.submit = function () {
      if($scope.password.newPassword != null && $scope.password.confirmPassword != null && $scope.password.newPassword == $scope.password.confirmPassword && $scope.password.newPassword.length>5 && $scope.password.newPassword.length<19){

        if(UserInfo.checkPassword(UserInfo.getUserInfo() == null ? null : UserInfo.getUserInfo().mobile,$scope.password.oldPassword)){
          UserInfo.resetPassword( UserInfo.getUserInfo().mobile,$scope.password.newPassword);
          $ionicPopup.alert({
            title: 'success',
            template: '登陆密码修改成功'
          }).then(function (res) {
            $state.go('tab.mainInfo-setting-accountManagement', {});
          })
        }else{
          $ionicPopup.alert({
            title:'密码错误',
            content:'旧密码错误'
          }).then(function (res) {
            if(res){
              $scope.password.oldPassword = null;
              $scope.password.newPassword = null;
              $scope.password.confirmPassword = null;
            }
          })
        }
      }else{
        $ionicPopup.alert({
          title:'密码输入不正确',
          content:'两次密码输入不一致'
        }).then(function (res) {
          if(res){
            $scope.password = {
              oldPassword:null,
              newPassword:null,
              confirmPassword:null
            }
          }

        })
      }
    }

    $scope.getConfirmation = function () {
      if($scope.identity.phoneNum == null || $scope.identity.phoneNum.length != 11 || !UserInfo.existUser($scope.identity.phoneNum)){
        $ionicPopup.alert({
          title:'请输入正确的手机号',
          content:'输入手机号获取验证码'
        }).then(function (res) {

        })
      }else{
        var ver = '' + Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
        $ionicPopup.alert({
          title:'请输入验证码',
          content:'验证码：'+ ver
        }).then(function (res) {
          $scope.identity.verificationCode = ver;
          $scope.identity.templateVerCode = ver;
        })
      }
    }
  })
  .controller('MainInfoSettingNickNameCtrl', function ($scope, UserInfo, $ionicPopup, $state) {

    $scope.userInfo = UserInfo.getUserInfo();
    //$scope.nick = $scope.userInfo.nickName;


    $scope.saveNickName = function () {
      //var userInfo = {"nikName":"nickName"};
      var myNick = $scope.userInfo.nickName;
      UserInfo.setNickName(myNick);
      var Popup = $ionicPopup.show({
        title: '修改成功',
        scope: $scope,
        buttons: [
          {
            text: '<b>取消</b>',
            onTap: function (e) {
              Popup.close();
              $state.go('tab.mainInfo-setting', {});
            }
          },
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              Popup.close();
              $state.go('tab.mainInfo-setting', {});
            }
          },
        ]
      });
    }

    $scope.refreshUserInfo = function () {

    }
  })
  .controller('ShowHeadPortraitCtrl', function ($scope) {
  })
  .controller("MainInfoSettingAccountManagementPayPwdCtrl", function ($scope, $ionicPopup,$state) {

    $scope.first = true;
    $scope.second = false;
    $scope.myColor2 = "color:rgba(231, 206, 204, 0.98)";

    $scope.identity = {
      phoneNum: null,
      verificationCode: null
    };
    $scope.clickNext = function () {
      if($scope.identity.phoneNum != null){
        if($scope.identity.verificationCode != null){
          $scope.myColor1 = "color:rgba(231, 206, 204, 0.98)";
          $scope.myColor2 = "color:rgba(0,0,0,0,0.98)";
          $scope.first = false;
          $scope.second = true;

        }else{
          $ionicPopup.alert({
            title:'请输入验证码',
            content:'验证码不能为空'
          })
        }

      }else{
        $ionicPopup.alert({
          title:'请输入手机号',
          content:'手机号不能为空'
        })
      }

    }
    $scope.password = {
      oldPassword:null,
      newPassword:null,
      confirmPassword:null
    }

    $scope.getConfirmation = function () {
      if($scope.identity.phoneNum == null){
        $ionicPopup.alert({
          title:'请输入手机号',
          content:'输入手机号获取验证码'
        }).then(function (res) {

        })
      }else{
        var ver = '' + Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
        $ionicPopup.alert({
          title:'请输入验证码',
          content:'验证码：'+ ver
        }).then(function (res) {
          $scope.identity.verificationCode = ver;
        })
      }
    }

    $scope.submit = function () {
      if($scope.password.newPassword != null && $scope.password.confirmPassword != null && $scope.password.newPassword == $scope.password.confirmPassword){
        $ionicPopup.alert({
          title: 'success',
          template: '登陆密码修改成功'
        }).then(function (res) {
          $state.go('tab.mainInfo-setting-accountManagement', {});
        })
      }else{
        $ionicPopup.alert({
          title:'密码输入不正确',
          content:'两次密码输入不一致'
        }).then(function (res) {
          if(res){
            $scope.password = {
              oldPassword:null,
              newPassword:null,
              confirmPassword:null
            }
          }

        })
      }
    }
  })
  .controller('MainInfoSettingAddressCtrl', function ($scope, $ionicPopup, AddressesInfo,$state) {
    $scope.AddressesInfo = AddressesInfo.getAddressesInfo();

    $scope.newAddress = function () {
      $state.go('tab.mainInfo-setting-newAddress',{});
    }

    $scope.item = {flag:false}
    $scope.showDeleteButton = function () {
      $scope.item.flag = !$scope.item.flag;
    }

    $scope.delete_item = function (item) {
      AddressesInfo.removeAddress(item);
    }

    $scope.viewDetail = function (item) {
      $state.go('tab.mainInfo-setting-address-addressDetail',{addressDetail:item});
    }
  })

  .controller("MainInfoSettingAddressAddressDetailCtrl", function ($scope, $stateParams, AddressesInfo, $state, $ionicPopup) {
    //var templateAddress = AddressesInfo.get($stateParams.addressDetail);
    var templateAddress = $stateParams.addressDetail;
    $scope.oldAddress = templateAddress;

    $scope.saveAddress = function (province,city,region,street,userName,mobile,zipCode,defaultAddress) {
      $ionicPopup.confirm({
        title: '是否保存',
        content: "是否要保存修改？"
      }).then(function (res) {
        if (res) {
          var newAddress = {id:null,province:null,city:null,street:null,userName:null,mobile:null,zipCode:null,default:false,selected:false};
          newAddress.id = $scope.oldAddress.id;
          newAddress.province = province;
          newAddress.city = city;
          newAddress.region = region;
          newAddress.street = street;
          newAddress.userName = userName;
          newAddress.mobile = mobile;
          newAddress.zipCode = zipCode;
          newAddress.default = defaultAddress;
          newAddress.selected = defaultAddress;
          AddressesInfo.updateAddress(newAddress);
          $state.go('tab.mainInfo-setting-address', {});
        } else {
          $state.go('tab.mainInfo-setting-address', {});
        }
      })
    }
  })
  .controller('MainInfoSettingNewAddressCtrl', function ($rootScope,$scope,$ionicPopup,$state,AddressesInfo) {

    $scope.item = {text:'hello',checked:true};
    $scope.newAddress = {province:null,city:null,region:null,street:null,zipCode:null,userName:null,mobile:null,default:false,selected:false};

    $scope.checkDefaultAddress = function () {
    }

    $scope.saveNewAddress = function () {
      if($scope.item.checked){
        $scope.newAddress.default = true;
        $scope.newAddress.selected = true;
      }
      AddressesInfo.addAddress($scope.newAddress);
      $ionicPopup.confirm({
        title:'已添加',
        content:'已添加新地址'
      }).then(function (res) {
        $state.go('tab.mainInfo-setting-address',{});
      })
    }
  });
