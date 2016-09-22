angular.module('starter.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })
  .factory("UserInfo", function () {
    var _userInfo = [{
      id: 0,
      account: 'abcd',
      password: '1234',
      nickName: "tuyu",
      sex: "男", age: 22,
      address: "china",
      mobile: "18328589111",
      headPortrait: "img/tutu.jpg",
      localLogin: false
    }];

    return {
      getUserInfo: function () {
        for (var i = 0; i < _userInfo.length; i++) {
          if (_userInfo[i].localLogin)
            return _userInfo[i];
        }
        return null;
      },
      setNickName: function (nickName) {
        this.getUserInfo().nickName = nickName;
        //_userInfo.nickName = nickName;
        //console.log(nickName);
      },
      //用作登录验证
      containUser: function (userInfo) {
        //userInfo.password = userInfo.password1;
        for (var i = 0; i < _userInfo.length; i++) {
          if (_userInfo[i].account == userInfo.account && _userInfo[i].password == userInfo.password) {
            _userInfo[i].localLogin = true;
            return true;
          }
        }
        return false;
      },
      //用作注册账户
      newUser: function (userInfo) {
        userInfo.id = _userInfo.length;
        userInfo.account = userInfo.userName;
        userInfo.password = userInfo.password1;
        userInfo.nickName = userInfo.userName;
        userInfo.sex = '男';
        userInfo.headPortrait = 'img/ben.png';
        _userInfo.push(userInfo);
      },
      resetPassword: function (mobile, password) {
        for (var i = 0; i < _userInfo.length; i++) {
          if (_userInfo[i].mobile == mobile) {
            _userInfo[i].password = password;
            return true;
          }
        }
        return false;
      },
      existUser: function (mobile) {
        for (var i = 0; i < _userInfo.length; i++) {
          if (_userInfo[i].mobile == mobile) {
            return true;
          }
        }
        return false;
      },
      checkPassword: function (mobile,password) {
        if(mobile != null && password != null){
          for (var i = 0; i < _userInfo.length; i++) {
            if (_userInfo[i].mobile == mobile && _userInfo[i].password == password) {
              return true;
            }
          }
        }
        return false;
      }
    };
  })
  .factory('AddressesInfo', function () {
    var _addressesInfo = [{
      id: 0,
      province:'chengdushi',
      city: "shuangliuxian",
      region: "wenxinzhen",
      street: "sichuandaxue",
      userName: "tuyu",
      mobile: "18328383112",
      zipCode: "610225",
      default: true,
      selected: true
    }, {
      id: 1,
      province: "成都市",
      city: "双流县",
      region: "文新镇",
      street: "四川大学江安校区",
      userName: "yutu",
      mobile: "18328383111",
      zipCode: "401233",
      default: false,
      selected: false
    }];

    return {
      getAddressesInfo: function () {
        return _addressesInfo;
      },
      setAddressesInfo: function (addressesInfo) {
        _addressesInfo = addressesInfo;
      },
      addAddress: function (addressInfo) {
        if(addressInfo != null){
          addressInfo.id = _addressesInfo[_addressesInfo.length-1].id + 1;
          if(addressInfo.default){
            for(var i = 0;i<_addressesInfo.length;i++){
              _addressesInfo[i].default = false;
              _addressesInfo[i].selected = false;
            }
          }
          _addressesInfo.push(addressInfo);
        }

      },
      removeAddress: function (addressInfo) {
        var idx = _addressesInfo.indexOf(addressInfo);
        _addressesInfo.splice(idx, 1);
      },
      get: function (addressId) {
        for (var i = 0; i < _addressesInfo.length; i++) {
          if (_addressesInfo[i].id === parseInt(addressId)) {
            return _addressesInfo[i];
          }
        }
        return null;
      },
      getDefaultAddress: function () {
        for (var i = 0; i < _addressesInfo.length; i++) {
          if (_addressesInfo[i].default == true) {
            return _addressesInfo[i];
          }
        }
        return null;
      },
      getSelectedAddress: function () {
        for (var i = 0; i < _addressesInfo.length; i++) {
          if (_addressesInfo[i].selected == true) {
            return _addressesInfo[i];
          }
        }
        return null;
      },
      setDefaultAddress: function (addressId) {
        for (var i = 0; i < _addressesInfo.length; i++) {
          if (_addressesInfo[i].id === parseInt(addressId)) {
            _addressesInfo[i].default = true;
            _addressesInfo[i].selected = true;
          } else {
            _addressesInfo[i].default = false;
            _addressesInfo[i].selected = false;
          }
        }
        return;
      },
      selectAddress: function (address) {
        if (address != null) {
          for (var i = 0; i < _addressesInfo.length; i++) {
            if (_addressesInfo[i].id == address.id) {
              _addressesInfo[i].selected = true;
              console.log(_addressesInfo);
            } else {
              _addressesInfo[i].selected = false;
            }

          }
        }

      },
      updateAddress: function (address) {

        if(address != null){
          if(address.default){
            for(var i = 0;i<_addressesInfo.length;i++){
              if(_addressesInfo[i].id == address.id){
                _addressesInfo[i].province = address.province;
                _addressesInfo[i].city = address.city;
                _addressesInfo[i].region = address.region;
                _addressesInfo[i].street = address.street;
                _addressesInfo[i].userName = address.userName;
                _addressesInfo[i].mobile = address.mobile;
                _addressesInfo[i].zipCode = address.zipCode;
                _addressesInfo[i].default = address.default;
                _addressesInfo[i].selected = address.selected;
              }else{
                _addressesInfo[i].default = false;
                _addressesInfo[i].selected = false;
              }
            }
          }else{
            for(var i = 0;i<_addressesInfo.length;i++){
              if(_addressesInfo[i].id == address.id){
                _addressesInfo[i].province = address.province;
                _addressesInfo[i].city = address.city;
                _addressesInfo[i].region = address.region;
                _addressesInfo[i].street = address.street;
                _addressesInfo[i].userName = address.userName;
                _addressesInfo[i].mobile = address.mobile;
                _addressesInfo[i].zipCode = address.zipCode;
                _addressesInfo[i].default = address.default;
                _addressesInfo[i].selected = address.selected;
              }
            }
          }
        }
      }
    };
  })
  .factory('CollectionStores', function () {
    var _collectionStores = [{
      id: 0,
      storeName: "耐克",
      storeUrl: "http://www.naike.com",
      storePicture: "img/ben.png"
    }, {
      id: 1,
      storeName: "香奈儿",
      storeUrl: "http://www.xiangnaer.com",
      storePicture: "img/ben.png"
    }, {
      id: 2,
      storeName: "衣品天成",
      storeUrl: "http://www.yipintiancheng.com",
      storePicture: "img/ben.png"
    }];

    return {
      getCollectionStores: function () {
        return _collectionStores;
      },
      setCollectionStores: function (collectionStores) {
        _collectionStores = collectionStores;
      },
      getStoreById: function (collectionStoreId) {
        for (var i = 0; i < _collectionStores.length; i++) {
          if (_collectionStores[i].id === parseInt(collectionStoreId)) {
            return _collectionStores[i];
          }
        }
        return null;
      },
      remove: function (store) {
        _collectionStores.splice(_collectionStores.indexOf(store), 1);
      }
    };
  })

  .factory('CollectionGoods', function () {
    var _collectionGoods = [{

      goodsId: 5,
      goodsName: "戴尔",
      goodsPrice: 4500,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "戴尔专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/de.jpg",
      goodsPictureBig: "img/de.jpg",
      selected: false
    }, {

      goodsId: 6,
      goodsName: "母婴套装",
      goodsPrice: 190,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "母婴专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/mytz.jpg",
      goodsPictureBig: "img/mytz.jpg",
      selected: false
    }, {

      goodsId: 7,
      goodsName: "Java编程技术",
      goodsPrice: 99,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "机械工业出版社",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/java.png",
      goodsPictureBig: "img/java.png",
      selected: false
    }];

    return {
      getCollectionGoods: function () {
        return _collectionGoods;
      },
      setCollectionStores: function (collectionGoods) {
        _collectionGoods = collectionGoods;
      },
      getGoodsById: function (collectionGoodsId) {
        for (var i = 0; i < _collectionGoods.length; i++) {
          if (_collectionGoods[i].id === parseInt(collectionGoodsId)) {
            return _collectionGoods[i];
          }
        }
        return null;
      },
      addGoods: function (goodsInfo) {
        if (goodsInfo != null && goodsInfo.length != 0)
          if (this.containGoods(goodsInfo)) {
            return
          }
        _collectionGoods.push(goodsInfo);
      },
      remove: function (goods) {
        _collectionGoods.splice(_collectionGoods.indexOf(goods), 1);
      },
      containGoods: function (goodsInfo) {
        for (var i = 0; i < _collectionGoods.length; i++) {
          if (_collectionGoods[i].goodsId == goodsInfo.goodsId)
            return true;
        }
        return false;
      }
    };
  })
  .factory('MyGoods', function () {
    var _myGoods = new Array();
    var _totalMoney = 0;
    //$rootScope.deleteElementByValue = function (element) {
    //  var numDeleteIndex = -1;
    //  for (var i = 0; i < _myGoods.length; i++) {
    //    // 严格比较，即类型与数值必须同时相等。
    //    if (_myGoods[i] === element) {
    //      _myGoods.splice(i, 1);
    //      numDeleteIndex = i;
    //      break;
    //    }
    //  }
    //  return numDeleteIndex;
    //}

    return {
      getMyGoods: function () {
        return _myGoods
      },
      setMyGoods: function (goods) {
        _myGoods.push(goods);
      },
      deleteGoods: function (goods) {
        for (var i = 0; i < _myGoods.length; i++) {
          if (_myGoods[i].goodsId == goods.goodsId) {
            var idx = _myGoods.indexOf(goods);
            _myGoods.splice(idx, 1);
          }
        }
      },
      getTotalMoney: function () {
        return _totalMoney;
      },
      setTotalMoney: function (totalMoney) {
        _totalMoney = totalMoney;
      },
      containGoods: function (goods) {
        for (var i = 0; i < _myGoods.length; i++) {
          if (_myGoods[i] === goods) {
            return true;
            break;
          }
        }
        return false;
      }
    };
  })
  .factory('MyOrders', function () {
    var _myOrders = [{
      id: 0,
      goods: [{
        goodsId: 0,
        goodsName: "连衣裙",
        goodsPrice: 111,
        goodsInventory: 10,
        purchaseNum: 1,
        storeUrl: "小智生活馆",
        storePicture: "xxx",
        storeName: "xxx",
        goodsPictureSmall: "img/lyq.jpg",
        goodsPictureBig: "img/lyq.jpg",
        selected: false,
        evaluated: false
      }, {
        goodsId: 1,
        goodsName: "韩版夹克",
        goodsPrice: 390,
        goodsInventory: 10,
        purchaseNum: 1,
        storeUrl: "小智生活馆",
        storePicture: "xxx",
        storeName: "xxx",
        goodsPictureSmall: "img/hbjk.jpg",
        goodsPictureBig: "img/hbjk.jpg",
        selected: false,
        evaluated: false
      }],
      userInfo: {
        nickName: "tuyu",
        sex: "男", age: 22,
        address: "china",
        headPortrait: "img/tutu.jpg"
      },
      totalMoney: 501,
      createTime: '2016-4-21 12：30：23',
      payed: true,
      delivered: false,
      confirmed: false,
      evaluated: false
    }, {
      id: 1,
      goods: [{
        goodsId: 2,
        goodsName: "BB霜",
        goodsPrice: 19,
        goodsInventory: 10,
        purchaseNum: 1,
        storeUrl: "化妆品专卖店",
        storePicture: "xxx",
        storeName: "xxx",
        goodsPictureSmall: "img/bbs.jpg",
        goodsPictureBig: "img/bbs.jpg",
        selected: false,
        evaluated: false
      }, {
        goodsId: 3,
        goodsName: "电吹风",
        goodsPrice: 120,
        goodsInventory: 10,
        purchaseNum: 1,
        storeUrl: "吹风专卖店",
        storePicture: "xxx",
        storeName: "xxx",
        goodsPictureSmall: "img/jcf.jpg",
        goodsPictureBig: "img/jcf.jpg",
        selected: false,
        evaluated: false
      }],
      userInfo: {
        nickName: "tuyu",
        sex: "男", age: 22,
        address: "china",
        headPortrait: "img/tutu.jpg"
      },
      totalMoney: 139,
      createTime: '2016-4-23 11：20：43',
      payed: false,
      delivered: false,
      confirmed: false,
      evaluated: false
    },
      {
        id: 2,
        goods: [{
          goodsId: 5,
          goodsName: "戴尔",
          goodsPrice: 4500,
          goodsInventory: 10,
          purchaseNum: 1,
          storeUrl: "戴尔专卖店",
          storePicture: "xxx",
          storeName: "xxx",
          goodsPictureSmall: "img/de.jpg",
          goodsPictureBig: "img/de.jpg",
          selected: false,
          evaluated: false
        }, {
          goodsId: 6,
          goodsName: "母婴套装",
          goodsPrice: 190,
          goodsInventory: 10,
          purchaseNum: 1,
          storeUrl: "母婴专卖店",
          storePicture: "xxx",
          storeName: "xxx",
          goodsPictureSmall: "img/mytz.jpg",
          goodsPictureBig: "img/mytz.jpg",
          selected: false,
          evaluated: false
        }],
        userInfo: {
          nickName: "tuyu",
          sex: "男", age: 22,
          address: "china",
          headPortrait: "img/tutu.jpg"
        },
        totalMoney: 469,
        createTime: '2016-4-22 9：34：22',
        payed: true,
        delivered: true,
        confirmed: false,
        evaluated: false
      },
      {
        id: 3,
        goods: [{
          goodsId: 7,
          goodsName: "Java编程技术",
          goodsPrice: 99,
          goodsInventory: 10,
          purchaseNum: 1,
          storeUrl: "机械工业出版社",
          storePicture: "xxx",
          storeName: "xxx",
          goodsPictureSmall: "img/java.png",
          goodsPictureBig: "img/java.png",
          selected: false,
          evaluated: false
        }, {
          goodsId: 8,
          goodsName: "席梦思",
          goodsPrice: 1920,
          goodsInventory: 10,
          purchaseNum: 1,
          storeUrl: "生活馆",
          storePicture: "xxx",
          storeName: "xxx",
          goodsPictureSmall: "img/xms.jpg",
          goodsPictureBig: "img/xmsbig.jpg",
          selected: false,
          evaluated: true
        }],
        userInfo: {
          nickName: "tuyu",
          sex: "男", age: 22,
          address: "china",
          headPortrait: "img/tutu.jpg"
        },
        totalMoney: 2019,
        createTime: '2016-4-22 12：33：13',
        payed: true,
        delivered: true,
        confirmed: true,
        evaluated: false
      }];
    return {
      getAllOrders: function () {
        return _myOrders;
      },
      getCompleted: function () {
        var templateOrder = new Array();
        for (var i = 0; i < _myOrders.length; i++) {
          if (_myOrders[i].payed && _myOrders[i].delivered && _myOrders[i].confirmed) {
            templateOrder.push(_myOrders[i]);
          }
        }
        return templateOrder;
      },
      getNotPayOrders: function () {
        var templateOrder = new Array();
        for (var i = 0; i < _myOrders.length; i++) {
          if (!_myOrders[i].payed) {
            templateOrder.push(_myOrders[i]);
          }
        }
        return templateOrder;
      },
      getNotDeliverOrders: function () {
        var templateOrder = new Array();
        for (var i = 0; i < _myOrders.length; i++) {
          if (_myOrders[i].payed && !_myOrders[i].delivered) {
            templateOrder.push(_myOrders[i]);
          }
        }
        return templateOrder;
      },
      getNotConfirmOrders: function () {
        var templateOrder = new Array();
        for (var i = 0; i < _myOrders.length; i++) {
          if (_myOrders[i].payed && _myOrders[i].delivered && !_myOrders[i].confirmed) {
            templateOrder.push(_myOrders[i]);
          }
        }
        return templateOrder;
      },
      getNotEvaluateOrders: function () {
        var templateOrder = new Array();
        for (var i = 0; i < _myOrders.length; i++) {
          if (_myOrders[i].payed && _myOrders[i].delivered && _myOrders[i].confirmed) {
            for (var j = 0; j < _myOrders[i].goods.length; j++) {
              if (_myOrders[i].goods[j].evaluated == true) {
                //templateOrder.push(_myOrders[i]);
              } else {
                templateOrder.push(_myOrders[i]);
                break;
              }
            }
          }
        }
        return templateOrder;
      },
      payOrder: function (orders) {
        if (orders != null && orders.length != 0) {
          //for(var i = 0;i<orders.length;i++){
          //  for(var j = 0;j<_myOrders.length;j++){
          //    if(orders.id == _myOrders[j].id){
          //      _myOrders[j].payed = true;
          //      //console.log(_myOrders);
          //      return;
          //    }
          //  }
          //}
          //console.log(_myOrders);
          if(orders.id != null)
          console.log(orders.id);
          for (var i = 0; i < _myOrders.length; i++) {
            if (_myOrders[i].id == orders.id) {
              _myOrders[i].payed = true;
              console.log(_myOrders);
            }
          }
        }
      },
      confirmOrders: function (orders) {
        if (orders != null && orders.length != 0) {
          for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < _myOrders.length; j++) {
              if (orders[i].id == _myOrders[j].id) {
                _myOrders[j].confirmed = true;
                //console.log(_myOrders);
                return;
              }
            }
          }
        }
      },
      evaluateGoodsByOrder: function (orderId, goods) {
        if (orderId != null && goods != null && goods.length != 0) {
          for (var i = 0; i < _myOrders.length; i++) {
            if (_myOrders[i].orderId == orderId) {
              for (var j = 0; j < _myOrders[i].goods.length; j++) {
                if (_myOrders[i].goods[j].goodsId == goods.goodsId) {
                  _myOrders[i].goods[j].evaluated = true;
                }
              }
            }
          }
        }
        console.log(_myOrders);
      },
      evaluateOrder: function (order) {

      },
      setOrder: function (order) {
        _myOrders.push(order);
      },
      setOrders: function (orders) {
        for (var i = 0; i < orders.length; i++) {
          if (orders[i] != null && orders[i].length != 0)
            _myOrders.push(orders[i]);
        }
      },
      deleteOrder: function (order) {

        console.log(_myOrders);
        for (var i = 0; i < _myOrders.length; i++) {
          if (_myOrders[i].id == order.id) {
            var idx = _myOrders.indexOf(order);
            _myOrders.splice(idx, 1);
          }
        }
        console.log(_myOrders);
      },
      deleteOrders: function (orders) {


        for (var i = 0; i < orders.length; i++) {
          if (this.containOrder(orders[i])) {
            var idx = _myOrders.indexOf(orders[i]);
            _myOrders.splice(idx, 1);
          }
        }
      },
      containOrder: function (order) {
        for (var i = 0; i < _myOrders.length; i++) {
          if (_myOrders[i] === order) {
            return true;
            break;
          }
        }
        return false;
      },
      newOrder: function (goodsList, userInfo) {
        if (goodsList != null && goodsList.length != 0) {
          var newOrder = {
            id: null,
            goods: null,
            userInfo: null,
            totalMoney: null,
            createTime: null,
            payed: false,
            delivered: false,
            confirmed: false,
            evaluated: false
          }
          newOrder.id = _myOrders.length;
          newOrder.goods = goodsList;
          newOrder.userInfo = userInfo;
          newOrder.totalMoney = this.getTotalMoney(goodsList);
          newOrder.createTime = this.getLocalTime();
          _myOrders.push(new Object(newOrder));
          return newOrder;
        }
        console.log(_myOrders);
      },
      getLocalTime: function () {
        var time = new Date();
        return time.toLocaleDateString().match(/\d+/g)[0] + '-' + time.toLocaleDateString().match(/\d+/g)[1] + '-' + time.toLocaleDateString().match(/\d+/g)[2] + ' ' + time.toLocaleTimeString().match(/\d+/g)[0] + ':' + time.toLocaleTimeString().match(/\d+/g)[1] + ':' + time.toLocaleTimeString().match(/\d+/g)[2];

      },
      getTotalMoney: function (goodsList) {
        var money = 0;
        for (var i = 0; i < goodsList.length; i++) {
          money += goodsList[i].goodsPrice * goodsList[i].purchaseNum;
        }
        return money;
      }
    }
  })
  .factory('GoodsInfo', function () {
    var _goodsInfo = [{

      goodsId: 0,
      goodsName: "连衣裙",
      goodsPrice: 111,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "小智生活馆",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/lyq.jpg",
      goodsPictureBig: "img/lyq.jpg",
      selected: false

    }, {

      goodsId: 1,
      goodsName: "韩版夹克",
      goodsPrice: 390,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "小智生活馆",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/hbjk.jpg",
      goodsPictureBig: "img/hbjk.jpg",
      selected: false
    }, {

      goodsId: 2,
      goodsName: "BB霜",
      goodsPrice: 19,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "化妆品专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/bbs.jpg",
      goodsPictureBig: "img/bbs.jpg",
      selected: false
    }, {

      goodsId: 3,
      goodsName: "电吹风",
      goodsPrice: 120,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "吹风专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/jcf.jpg",
      goodsPictureBig: "img/jcf.jpg",
      selected: false
    }, {

      goodsId: 4,
      goodsName: "尼康",
      goodsPrice: 1900,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "尼康专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/nk.png",
      goodsPictureBig: "img/nk.png",
      selected: false
    }, {

      goodsId: 5,
      goodsName: "戴尔",
      goodsPrice: 4500,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "戴尔专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/de.jpg",
      goodsPictureBig: "img/de.jpg",
      selected: false
    }, {

      goodsId: 6,
      goodsName: "母婴套装",
      goodsPrice: 190,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "母婴专卖店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/mytz.jpg",
      goodsPictureBig: "img/mytz.jpg",
      selected: false
    }, {

      goodsId: 7,
      goodsName: "Java编程技术",
      goodsPrice: 99,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "机械工业出版社",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/java.png",
      goodsPictureBig: "img/java.png",
      selected: false
    }, {

      goodsId: 8,
      goodsName: "席梦思",
      goodsPrice: 1920,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "生活馆",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/xms.jpg",
      goodsPictureBig: "img/xmsbig.jpg",
      selected: false
    }, {

      goodsId: 9,
      goodsName: "沐浴露",
      goodsPrice: 49,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "联合利华",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/myl.jpg",
      goodsPictureBig: "img/myl.jpg",
      selected: false
    }, {

      goodsId: 10,
      goodsName: "哈尔滨啤酒",
      goodsPrice: 15,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "哈啤",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/pj.jpg",
      goodsPictureBig: "img/pj.jpg",
      selected: false
    }, {

      goodsId: 11,
      goodsName: "雪地靴",
      goodsPrice: 230,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "户外用品店",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/xdx.jpg",
      goodsPictureBig: "img/xdx.jpg",
      selected: false
    }, {

      goodsId: 12,
      goodsName: "银座拉杆箱",
      goodsPrice: 450,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "银座",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/lgx.jpg",
      goodsPictureBig: "img/lgx.jpg",
      selected: false
    }, {

      goodsId: 13,
      goodsName: "天梭表",
      goodsPrice: 9890,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "天梭",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/tsb.jpg",
      goodsPictureBig: "img/tsbbig.jpg",
      selected: false
    }, {

      goodsId: 14,
      goodsName: "小米note",
      goodsPrice: 1999,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "小米",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/note.jpg",
      goodsPictureBig: "img/notebig.jpg",
      selected: false
    }];

    return {
      getGoodsInfo: function () {
        return _goodsInfo;
      },
      emptyGoodsInfo: function () {
        _goodsInfo.clean();
        console.log(_goodsInfo);
      },
      deleteGoods: function (goods) {
        var idx = _goodsInfo.indexOf(goods);
        _goodsInfo.splice(idx, 1);
      },
      getGoodsInfoByGoodsName: function (name) {
        var templateGoodsInfo = new Array();
        for (var i = 0; i < _goodsInfo.length; i++) {
          if (_goodsInfo[i].goodsName == name) {
            templateGoodsInfo.push(_goodsInfo[i]);
          }
        }
        if (templateGoodsInfo != null && templateGoodsInfo.length != 0) {
          return templateGoodsInfo;
        } else {
          return null;
        }
      },
      getGoodsInfoByGoodsList: function (goodsList) {
        if (goodsList != null && goodsList.length != 0) {
          var templateGoodsList = new Array();
          for (var i = 0; i < goodsList.length; i++) {
            for (var j = 0; j < _goodsInfo.length; j++) {
              if (goodsList[i].goodsId == _goodsInfo[j].goodsId)
                templateGoodsList.push(_goodsInfo[j]);
            }
          }
          return templateGoodsList;
        }
      }
    }
  })
  .factory('ShoppingCart', function () {
    var _shoppingCart = new Array();

    //_shoppingCart.add();

    _shoppingCart.push(new Object({
      goodsId: 13,
      goodsName: "天梭表",
      goodsPrice: 9890,
      goodsInventory: 10,
      purchaseNum: 1,
      storeUrl: "天梭",
      storePicture: "xxx",
      storeName: "xxx",
      goodsPictureSmall: "img/tsb.jpg",
      goodsPictureBig: "img/tsbbig.jpg",
      selected: false
    }))

    return {
      getGoodsInfo: function () {
        if (_shoppingCart != null && _shoppingCart.length != 0) {
          return _shoppingCart;
        }
      },
      addGoods: function (goodsInfo) {
        if (goodsInfo != null && goodsInfo.length != 0) {
          if (this.containGoods(goodsInfo))
            return;
          _shoppingCart.push(goodsInfo);
        }
      },
      deleteGoods: function (goods) {

        console.log(goods);
        if (goods != null && goods.length != 0) {
          for (var i = 0; i < _shoppingCart.length; i++) {
            if (_shoppingCart[i].goodsId == goods.goodsId) {
              var idx = _shoppingCart.indexOf(goods);
              _shoppingCart.splice(idx, 1);
            }
          }
          console.log(_shoppingCart);
        } else {
          console.log(_shoppingCart);
          return;
        }
      },
      containGoods: function (goodsInfo) {
        for (var i = 0; i < _shoppingCart.length; i++) {
          if (_shoppingCart[i].goodsId == goodsInfo.goodsId)
            return true;
        }
        return false;
      }
    }
  })
  .factory('CategoryDescription', function () {
    var _categoryDescription = '';

    return {
      getCategoryDescription: function () {
        if (_categoryDescription != null && _categoryDescription.length != 0) {
          return _categoryDescription;
        }
      },
      setCategoryDescription: function (description) {
        if (description != null && description.length != 0) {
          _categoryDescription = description;
        }
      }
    }
  })
  .factory('EvaluatingGoodsList', function () {
    var _evaluatingGoodsList = new Array();

    return {
      getAllGoods: function () {
        //var templateList = new Array();
        //for(var i = 0 ;i<_evaluatingGoodsList.length;i++){
        //  if(_evaluatingGoodsList[i].evaluated == false){
        //    templateList.push(_evaluatingGoodsList[i])
        //  }
        //}
        //return templateList;
        return _evaluatingGoodsList;
      },
      containGoods: function (goods) {
        for (var i = 0; i < _evaluatingGoodsList.length; i++) {
          if (_evaluatingGoodsList[i].goodsId == goods.goodsId)
            return true;
        }
        return false;
      },
      addGoods: function (goods) {
        if (goods != null && goods.length != 0) {
          if (this.containGoods(goods)) {
            return;
          } else {
            _evaluatingGoodsList.push(goods);
          }
        }
      },
      deleteGoods: function (goods) {
        if (goods != null && goods.length != 0) {
          //var idx = _evaluatingGoodsList.indexOf(goods);
          //_evaluatingGoodsList.splice(idx,1);
          for (var i = 0; i < _evaluatingGoodsList.length; i++) {
            if (_evaluatingGoodsList[i].goodsId == goods.goodsId) {
              _evaluatingGoodsList[i].evaluated = true;
              _evaluatingGoodsList.splice(i, 1);
            }
          }
          console.log(_evaluatingGoodsList);
        }
      }
    }
  })
  .factory('GoodsEvaluation', function (GetLocalTime) {
    //var _goodsEvaluation = new Array();
    var _goodsEvaluation = [{
      id:0,
      userInfo:{
        id: 0,
        account: 'abcd',
        password: '1234',
        nickName: "tuyu",
        sex: "男", age: 22,
        address: "china",
        mobile: "18328589111",
        headPortrait: "img/tutu.jpg",
        localLogin: false
      },
      goodsInfo:{
        goodsId: 0,
        goodsName: "连衣裙",
        goodsPrice: 111,
        goodsInventory: 10,
        purchaseNum: 1,
        storeUrl: "小智生活馆",
        storePicture: "xxx",
        storeName: "xxx",
        goodsPictureSmall: "img/lyq.jpg",
        goodsPictureBig: "img/lyq.jpg",
        selected: false
      },
      evaluation:'非常好的商品，质量一级棒，好评！',
      createTime:'2016-4-26 2:50:28'
    }];

    return {
      addGoodsEvaluation: function (userInfo, goodsInfo, evaluation) {
        var templateGoodsEvaluation = {id: null, userInfo: null, goodsInfo: null, evaluation: null,createTime:null};
        if (userInfo != null && goodsInfo != null && evaluation != null) {
          templateGoodsEvaluation.id = _goodsEvaluation.length;
          templateGoodsEvaluation.userInfo = userInfo;
          templateGoodsEvaluation.goodsInfo = goodsInfo;
          templateGoodsEvaluation.createTime = GetLocalTime;
          templateGoodsEvaluation.evaluation = evaluation;
          _goodsEvaluation.push(templateGoodsEvaluation);
        }
      },
      getEvaluationByGoods: function (goods) {
        if(goods != null){
          var template = new Array();
          for(var i = 0;i<_goodsEvaluation.length;i++){
            if(_goodsEvaluation[i].goodsInfo.goodsId == goods.goodsId){
              template.push(_goodsEvaluation[i]);
            }
          }
          if(template != null && template.length != 0){
            return template;
          }
        }
        return null;
      }
    }
  })
  .factory('ConfirmCode', function () {
    return {
      getConfirmCode: function () {
        var ver = '' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
        return ver;
      }
    }
  })
  .factory('GetLocalTime', function () {
    var time = new Date();
    return time.toLocaleDateString().match(/\d+/g)[0] + '-' + time.toLocaleDateString().match(/\d+/g)[1] + '-' + time.toLocaleDateString().match(/\d+/g)[2] + ' ' + time.toLocaleTimeString().match(/\d+/g)[0] + ':' + time.toLocaleTimeString().match(/\d+/g)[1] + ':' + time.toLocaleTimeString().match(/\d+/g)[2];
  })
  .factory('Api', function ($http, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint)

    var getApiData = function () {
      return $http.get(ApiEndpoint.url)
        .then(function (data) {
          console.log('Got some data: ', data);
          return data;
        });
    };

    return {
      getApiData: getApiData
    };
  });
