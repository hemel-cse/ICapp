angular.module('Fully.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $state, $timeout, $ionicLoading, $ionicModal, $ionicPopup, $ionicHistory, locationService) {
  // Form data for the login and reset password modal
    $scope.loginData = {};
    $scope.resetData = {};
    $scope.registerData = {};
    
    if(Parse.User.current()) {
        $rootScope.currentUser = Parse.User.current();
        $rootScope.currentUser.email = Parse.User.current().get('email');
    }
    else {
        $rootScope.currentUser = '';
    $rootScope.currentUser.email = '';
    }
    
    $scope.back = function() {
       $ionicHistory.goBack();
    };
    
    
//// PayPal Function ////
    
$rootScope.paid = false;
    
$scope.payWithPaypal = function(price) {
            
            $ionicLoading.show({
                template: 'Loading...'
            });

            /*
             * Licensed to the Apache Software Foundation (ASF) under one
             * or more contributor license agreements.  See the NOTICE file
             * distributed with this work for additional information
             * regarding copyright ownership.  The ASF licenses this file
             * to you under the Apache License, Version 2.0 (the
             * "License"); you may not use this file except in compliance
             * with the License.  You may obtain a copy of the License at
             *
             * http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing,
             * software distributed under the License is distributed on an
             * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
             * KIND, either express or implied.  See the License for the
             * specific language governing permissions and limitations
             * under the License.
             */
            
            var app = {
            // Application Constructor
            initialize: function() {
            this.bindEvents();
            },
            // Bind Event Listeners
            //
            // Bind any events that are required on startup. Common events are:
            // 'load', 'deviceready', 'offline', and 'online'.
            bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            },
            // deviceready Event Handler
            //
            // The scope of 'this' is the event. In order to call the 'receivedEvent'
            // function, we must explicity call 'app.receivedEvent(...);'
            onDeviceReady: function() {
            app.receivedEvent('deviceready');
            },
            // Update DOM on a Received Event
            receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            
            console.log('Received Event: ' + id);
            
            // start to initialize PayPalMobile library
            app.initPaymentUI();
            },
            initPaymentUI : function () {
            var clientIDs = {
            "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
            "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
            };
            PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
            
            },
            onSuccesfulPayment : function(payment) {
            // console.log("payment success: " + JSON.stringify(payment, null, 4));
            // document.getElementById("paypalStatus").innerHTML = "Payment received!";
            
            $timeout(function() {
                $rootScope.paid = true;
            }, 1000);
            
            
            
            },
            onAuthorizationCallback : function(authorization) {
            // console.log("authorization: " + JSON.stringify(authorization, null, 4));
            // document.getElementById("paypalStatus").innerHTML = "Payment canceled";
            },
            createPayment : function () {
            
            // for simplicity use predefined amount
            // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
            if(price) {
            var payPrice = price } else {
            var payPrice = '50';
            }
            
            var paymentDetails = new PayPalPaymentDetails(payPrice, "0.00", "0.00");
            var payment = new PayPalPayment(payPrice, "USD", "Fully PayPal Payment", "Sale", paymentDetails);
            return payment;
            },
            configuration : function () {
            // for more options see `paypal-mobile-js-helper.js`
            var config = new PayPalConfiguration({merchantName: "Fully", merchantPrivacyPolicyURL: "https://fully.com/policy", merchantUserAgreementURL: "https://fully.com/agreement"});
            return config;
            },
            onPrepareRender : function() {
            // buttons defined in index.html
            //  <button id="buyNowBtn"> Buy Now !</button>
            //  <button id="buyInFutureBtn"> Pay in Future !</button>
            //  <button id="profileSharingBtn"> ProfileSharing !</button>
            // var buyNowBtn = document.getElementById("buyNowBtn");
            //  var buyInFutureBtn = document.getElementById("buyInFutureBtn");
            //  var profileSharingBtn = document.getElementById("profileSharingBtn");
            
            $scope.btnClick = function(e) {
            
            // single payment
            PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
            };
            $scope.btnClick();
            
            //  buyInFutureBtn.onclick = function(e) {
            // future payment
            //      PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
            //  };
            
            //  profileSharingBtn.onclick = function(e) {
            // profile sharing
            //      PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
            //  };
            },
            onPayPalMobileInit : function() {
            // must be called
            // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
            PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", app.configuration(), app.onPrepareRender);
            },
            onUserCanceled : function(result) {
            // console.log(result);
           // document.getElementById("paypalStatus").innerHTML = result;
            }
            };
            
            
            
            $timeout(function() {
                     app.initialize();
                     $ionicLoading.hide();
                     }, 1000);

         }
    
    
//// Login Modal ///
  // Create the login modal
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
    $scope.registerModal.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      Parse.User.logIn($scope.loginData.username, $scope.loginData.password, {
        success: function(user) { 
            
            // saving current user 
            $rootScope.currentUser = [];
            var currentUser = Parse.User.current();
                if (currentUser && currentUser.get('emailVerified') == "1") {
                    $rootScope.currentUser = currentUser;
                    $rootScope.currentUser.email = currentUser.get('email');
                } else if (currentUser && currentUser.get('emailVerified') == "0") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Oops',
                        template: 'Please verify your email.'
                    });
                        alertPopup.then(function(res) {
     
                    });
                    $rootScope.currentUser = null;
                    $rootScope.currentUser.email = null;
                    
                } 
            
            $scope.loginModal.hide();                
            // Do stuff after successful login.
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
           $ionicPopup.alert({
     title: 'Oops',
     template: error.message
   });
        }
      });

  };
    
    // Perform the logout action when the user press logout
    $scope.doLogout = function() {
            Parse.User.logOut();
            
            $state.transitionTo("app.home");
            $rootScope.currentUser = null;
    };
   

//// Register User Modal ///
  // Create the modal
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.registerModal.show();
      $scope.loginModal.hide();
  };

  // Perform the register action when the user submits the form
  $scope.doRegister = function() {      
      
    if($scope.registerData.coords) {
        var coords = $scope.registerData.coords;   
    } else {
        var coords = new Parse.GeoPoint({latitude: 0, longitude: 0});
    }
      
      var user = new Parse.User();
        user.set("username", $scope.registerData.username);
        user.set("password", $scope.registerData.password);
        user.set("email", $scope.registerData.email);
        user.set("phone", $scope.registerData.phone);
        user.set("location", $scope.registerData.location);
      
      user.set("coords", coords);
    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
            $scope.registerModal.hide();
            $ionicPopup.alert({
                title: 'Success!',
                template: 'Check your email in order to activate your account'
                });        
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
    $ionicPopup.alert({
     title: 'Oops',
     template: error.message
   });
        }
    });

  };
    

    
//// Reset Password Modal ///
     // Create the reset password modal
    $ionicModal.fromTemplateUrl('templates/reset.html', {
    scope: $scope
    }).then(function(modal) {
        $scope.resetModal = modal;
    });

    // Triggered in the reset password modal to close it
    $scope.closeReset = function() {
        $scope.resetModal.hide();
    };

    // Open the reset password modal
    $scope.reset = function() {
        $scope.resetModal.show();
    };

    // Perform the reset password action when the user submits the email address
    $scope.doReset = function() {
    Parse.User.requestPasswordReset($scope.resetData.email, {
        success: function() {
            $ionicPopup.alert({
                title: 'Success!',
                template: 'Check your email in order to reset your password'
            });

    $scope.resetModal.hide();
        // Password reset request was sent successfully
    },
    error: function(error) {
        // Show the error message somewhere
    var alertPopup = $ionicPopup.alert({
        title: 'Oops',
        template: error.message
    });
    alertPopup.then(function(res) {
     
   });
  }
});
}; 
    
  
// Getting Location 
    $rootScope.getLocation = function() {
        var onGeoSuccess = function(position) {
        var latlng = position.coords.latitude + ', ' + position.coords.longitude;
                    
        // Get location (city name, state)
        locationService.getLocation(latlng).then(function(location){
        var itemLocation = 
            location.results[0].address_components[4].long_name+
            ', ' +
            location.results[0].address_components[5].long_name;
        $scope.registerData.location = itemLocation;
        $scope.registerData.coords = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
            
        $rootScope.userLocation = itemLocation;
        $rootScope.userCoords = latlng;
            
            },function(error){
                // Something went wrong!
            });
        };

        // onError Callback receives a PositionError object
        function onGeoError(error) {
            alert(error.message);
        }

        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError); 
    }
 
 })



// DRAGGABLE MENU BUTTON


.directive('draggable', function($document, $timeout) {
  return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0, width =0, elementW = 0, elementH = 0, parentHeight, parentWidth;
    parentHeight = element.parent().prop('clientHeight');
    parentWidth = element.parent().prop('clientWidth');
    $timeout(function() {
      elementW = element.prop('clientWidth');
      elementH = element.prop('clientHeight');
    },200);

    element.on('dragstart', function(event) {
      // Prevent default dragging of selected content
      event.gesture.preventDefault();
      startX = event.gesture.center.pageX - x;
      startY = event.gesture.center.pageY - y;
      $document.on('drag', move);
      $document.on('dragend', release);
    });

    function move(event) {
      y = event.gesture.center.pageY - startY;
      x = event.gesture.center.pageX - startX;
      if (x >= 0 && x <= (parentWidth-elementW)) {
        element.css({
          left:  x + 'px'
        });
      }
      if (y >= 0 && y <= parentHeight-elementH) {
        element.css({
          top:  y + 'px'
        });
      }
    }

    function release() {
      $document.unbind('drag', move);
      $document.unbind('dragend', release);
    }
  };
})



.controller('HomeCtrl', function($scope, $rootScope, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });
    
    
// Getting Parse Configuration - Logo and any other config settings for your app    
    Parse.Config.get().then(function(config) {
            $rootScope.mainLogo = config.get("Logo");
            $rootScope.customClass = config.get("customClass");
            $rootScope.about = config.get("About");
            $rootScope.aboutPicture = config.get("AboutPicture")._url;
            $rootScope.contactAddress1 = config.get("ContactAddress1");
            $rootScope.contactAddress2 = config.get("ContactAddress2");
            $rootScope.contactAddressPhone = config.get("ContactAddressPhone");
            $ionicLoading.hide();
    }, function(error) {
      // Something went wrong (e.g. request timed out)

    });     
    
})


// BLOG 

.controller('CategoriesCtrl', function($scope, $http, $ionicLoading, $ionicScrollDelegate, BlogService) {
            
            BlogService.GetPages().then(function(pages){
                                        $scope.pages = pages;
                                        },function(error){
                                        //Something went wrong!
                                        });
            
            BlogService.GetCategories().then(function(categories){
                                             $scope.categories = categories;
                                             },function(error){
                                             //Something went wrong!
                                             });
            })



.controller('PageCtrl', function($scope, $stateParams, $ionicLoading, $ionicScrollDelegate, BlogService) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            BlogService.GetPage($stateParams.pageId).then(function(page){
                                                          $scope.page = page;
                                                          $ionicLoading.hide();
                                                          },function(error){
                                                          //Something went wrong!
                                                          });
            
            })


.controller('PostsCtrl', function($scope, $http, $stateParams, $ionicLoading, $ionicScrollDelegate, BlogService) {
            
            $ionicLoading.show({
                               template: 'Loading...'
                               });
    
            $scope.nextPage = function() {
            $scope.page = $scope.page + 1;
            $ionicScrollDelegate.scrollTop();
            }
            
            $scope.previousPage = function() {
            $scope.page = $scope.page - 1;
            $ionicScrollDelegate.scrollTop();
            }
            
            
            
            BlogService.GetCategory($stateParams.categId).then(function(category){
                                                               $scope.category = category;
                                                               $ionicLoading.hide();
                                                               },function(error){
                                                               //Something went wrong!
                                                               });
    
    
             $ionicLoading.show({
                               template: 'Loading...'
                               });                   
                                
                                BlogService.GetPosts($stateParams.categId, $scope.page).then(function(posts){
                                                                                                                                                 $scope.posts = posts;
                $scope.pages = pages;
                $ionicLoading.hide();                                                                                                      
                                                                                                                                },function(error){
                                                                                                                      //Something went wrong!
                                                                                                                      });
                         
            })

.controller('PostCtrl', function($scope, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, BlogService) {
            $ionicLoading.show({
                               template: 'Loading...'
                               });
            BlogService.GetPost($stateParams.id).then(function(post){
                                                      $scope.post = post;
                                                      $ionicLoading.hide();
                                                      },function(error){
                                                      //Something went wrong!
                                                      });
            
            BlogService.GetComments($stateParams.id).then(function(comments){
                                                          $scope.comments = comments;
                                                          
                                                          },function(error){
                                                          //Something went wrong!
                                                          });

            
})




// MAP

.controller('MapCtrl', function($scope) {
  
    $scope.mapItems = [ { name: 'iPhone 6 NEW',
    coords: '45.7584376,22.9217171',
    location: 'Județul Hunedoara, Romania',
    id: 'HC6vsibKr7',
    i: 0 },
  { name: 'Gaming PC',
    coords: '45.7593376,22.9118171',
    location: 'Județul Hunedoara, Romania',
    id: 'VDNJNnmpmg',
    i: 1 },
  { name: 'Apple Mac Pro',
    coords: '45.7524376,22.9057171',
    location: 'Județul Hunedoara, Romania',
    id: 'KCOoTn49mc',
    i: 2 },
  { name: 'LED 1080P Projector',
    coords: '45.7526376,22.9037171',
    location: 'Județul Hunedoara, Romania',
    id: 'd0dxuXVqgv',
    i: 3 }
];
    
})



// BUSINESS

.controller('BusinessCtrl', function($scope, $rootScope, $ionicPopup) {
    
    $scope.contactData = [];
    
      // Perform the register action when the user submits the form
  $scope.doContact = function() {      

      var ContactMessage = Parse.Object.extend("Messages");
      var contactMessage = new ContactMessage();
      
        contactMessage.set("FullName", $scope.contactData.fullname);
        contactMessage.set("Email", $scope.contactData.email);
        contactMessage.set("PhoneNumber", $scope.contactData.phone);
        contactMessage.set("Message", $scope.contactData.message);
      
          contactMessage.save(null, {
              success: function(contactMessage) {
                // Execute any logic that should take place after the object is saved.
                $ionicPopup.alert({
                            title: 'Success!',
                            template: 'We will get back to you as soon as possible.'
                            });
              },
              error: function(contactMessage, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                $ionicPopup.alert({
                 title: 'Oops',
                 template: error.message
               });
              }
        });

  };
    
})


// SHOP

.controller('ShopCtrl', function($scope) {
    

    $scope.getCategories = function() {
     
        $scope.categories = [ { 
            name: 'Sport',
            picture: 'sport.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
                             { 
            name: 'Dress',
            picture: 'dress.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
            { 
            name: 'Hat',
            picture: 'hat.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
                             { 
            name: 'Shoe',
            picture: 'shoes.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
            { 
            name: 'Suit',
            picture: 'suit.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
                             { 
            name: 'Shirt',
            picture: 'shirt.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
            { 
            name: 'Winter',
            picture: 'winter.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
 
  
];
        
    }
    
    
    $scope.getProducts = function() {
     
        $scope.products = [ { 
            name: 'Wolverine Bonny Pull On Boot',
            picture: '1.jpg',
            description: 'The Bonny Pull On Boot from Wolverine® exudes a cool, classic style that works with both professional and more casual attire.',
            price: '315.00' },
            { 
            name: 'Roxy Carrington',
            picture: '2.jpg',
            description: 'Roxy® wants you to cowgirl up with the Carrington!',
            price: '74.00' },
            { 
            name: 'Roxy Carrington',
            picture: '3.jpg',
            description: 'Western bootie with perfed design.',
            price: '74.00' },
            { 
            name: 'Roxy Berlin',
            picture: '4.jpg',
            description: 'Your traveler may not make it to Berlin but they\'ll definitely love these Roxy® boots!',
            price: '84.00' },
            { 
            name: 'Roxy Morrison',
            picture: '5.jpg',
            description: 'Add a little rock \'n\' roll chic to the mix with the stylish Roxy® Morrison boot!',
            price: '69.00' },
            { 
            name: 'Roxy Morrison',
            picture: '6.jpg',
            description: 'Weathered faux leather upper with perforated detailing.',
            price: '69.00' },
            { 
            name: 'Chooka Classic Dot Rain Boot',
            picture: '7.jpg',
            description: 'Spread a little sunshine with these rockin\' rain boots!',
            price: '70.00' },
            { 
            name: 'Chooka Top Solid Rain Boot',
            picture: '8.jpg',
            description: 'Easy pull-on construction with dual adjustable buckles at side and pull tab at back.',
            price: '70.00' },
                             
 
  
];
        
    }
    
    
    $scope.getProduct = function() {
     
        $scope.product =  { 
            name: 'Wolverine Bonny Pull On Boot',
            picture: '1.jpg',
            description: 'The Bonny Pull On Boot from Wolverine® exudes a cool, classic style that works with both professional and more casual attire.',
            price: '315.00' }
;
        
    }
    
    
    
})


// SHARE

.controller('ShareCtrl', function($scope) {

            $scope.onShare = function() {
                window.plugins.socialsharing.share('message')
            };
})