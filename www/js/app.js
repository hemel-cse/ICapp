// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Fully', ['ionic', 'Fully.controllers', 'Fully.services', 'ngMap'])

.run(function($ionicPlatform, $ionicPopup) {
        
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
  
  
  
// BLOG  
    
.state('app.blog', {
    url: "/blog",
    views: {
      'menuContent': {
        templateUrl: "templates/blog.html",
      }
    }
  })
  
.state('app.posts', {
      url: "/posts/:categId",
      views: {
        'menuContent': {
          templateUrl: "templates/blog/posts.html",
          controller: 'PostsCtrl'
        }
      }
    })
  
  .state('app.page', {
      url: "/page/:pageId",
      views: {
        'menuContent': {
          templateUrl: "templates/blog/page.html",
          controller: 'PageCtrl'
        }
      }
    })

  .state('app.post', {
    url: "/post/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/blog/post.html",
        controller: 'PostCtrl'
      }
    }
  })
  
  
  
  // BUSINESS  
  
  .state('app.business', {
      url: "/business",
      views: {
        'menuContent': {
          templateUrl: "templates/business.html",
          controller: 'BusinessCtrl'
        }
      }
    })
  
  .state('app.business-services', {
      url: "/business-services",
      views: {
        'menuContent': {
          templateUrl: "templates/business/services.html",
          controller: 'BusinessCtrl'
        }
      }
    })
  
  .state('app.business-service', {
      url: "/business-service",
      views: {
        'menuContent': {
          templateUrl: "templates/business/service.html",
          controller: 'BusinessCtrl'
        }
      }
    })
  
  .state('app.business-portfolio', {
      url: "/business-portfolio",
      views: {
        'menuContent': {
          templateUrl: "templates/business/portfolio.html",
          controller: 'BusinessCtrl'
        }
      }
    })
  
  .state('app.business-contact', {
      url: "/business-contact",
      views: {
        'menuContent': {
          templateUrl: "templates/business/contact.html",
          controller: 'BusinessCtrl'
        }
      }
    })
  
 
    // SHOP  
  
  .state('app.shop', {
      url: "/shop",
      views: {
        'menuContent': {
          templateUrl: "templates/shop/main.html",
          controller: 'ShopCtrl'
        }
      }
    })
  
  .state('app.shop-products', {
      url: "/shop-products",
      views: {
        'menuContent': {
          templateUrl: "templates/shop/products.html",
          controller: 'ShopCtrl'
        }
      }
    })
  
  .state('app.shop-product', {
      url: "/shop-product",
      views: {
        'menuContent': {
          templateUrl: "templates/shop/product.html",
          controller: 'ShopCtrl'
        }
      }
    })
  
  .state('app.shop-cart', {
      url: "/shop-cart",
      views: {
        'menuContent': {
          templateUrl: "templates/shop/cart.html",
          controller: 'ShopCtrl'
        }
      }
    })
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
