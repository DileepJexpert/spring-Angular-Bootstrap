var borderApp = angular
.module('borderApp', ['ui.router','ngAnimate','ngCookies','ngResource','ngStorage','smart-table']);

borderApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'app/common/partial-home.html'
        })
        
        // nested list with custom controller
        .state('entryPermit', {
            url: '/list',
            templateUrl:  "app/entryExist/entrypermit.html",
          
        })
        
        // nested list with just some random string data
        .state('login', {
            url: '/login',
            templateUrl: 'app/common/login.html',
            controller: function($scope, $state, Authorization) {
                $scope.onLogin = function() {
                  Authorization.go('users');
                };
              }
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
            
        })
        
        .state('users', {
                        url: '/users',
                        templateUrl: 'app/partials/userContact.html',
                        data:{
                        	authorization :true,
                        	redirectTo: 'login'
                        },
                        controller: 'UserController'
                    })
                    .state('articles', {
                        url: '/articles',
                        templateUrl: 'app/partials/articles.html',
                        resolve: {
                            articles: 'ArticlesService'
                        },
                        controller: 'ArticlesController'
                    })
                    .state('articles.article', {
                        url: '/:pageName',
                        templateUrl: function ($stateParams) {
                            return 'app/partials/' + 
                                $stateParams.pageName + '.html';
                        }
                    })
    
    .state('catalog', {
        url: '/catalog',
        templateUrl: 'app/ecommerce/catalog/product/product.html'
      
    })
    
      .state('category', {
        url: '/category',
        templateUrl: 'app/ecommerce/catalog/product/category.html',
        controller: 'CategoryController'
      
    })

    .state('categoryDetails', {
        url: '/categories',
        templateUrl: 'app/ecommerce/catalog/product/categoryDetails.html',
        controller: 'CategoryController'
      
    })

        
});

borderApp.run(function($rootScope, $state, Authorization) {

	  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		  console.log('enter in run '+fromState);
	    if (!Authorization.authorized) {
	      if (Authorization.memorizedState && (!_.has(fromState, 'data.redirectTo') || toState.name !== fromState.data.redirectTo)) {
	        Authorization.clear();
	      }
	      if (_.has(toState, 'data.authorization') && _.has(toState, 'data.redirectTo')) {
	        if (_.has(toState, 'data.memory')) {
	          Authorization.memorizedState = toState.name;
	        }
	        $state.go(toState.data.redirectTo);
	      }
	    }

	  });

	  $rootScope.onLogout = function() {
	    Authorization.clear();
	    console.log('home');
	    $state.go('home');
	  };
	})

	.service('Authorization', function($state) {

	  this.authorized = false,
	    this.memorizedState = null;

	  var
	    clear = function() {
	      this.authorized = false;
	      this.memorizedState = null;
	    },

	    go = function(fallback) {
	      this.authorized = true;
	      var targetState = this.memorizedState ? this.memorizedState : fallback;
	      console.log('targetState' +targetState);
	      $state.go(targetState);
	    };

	  return {
	    authorized: this.authorized,
	    memorizedState: this.memorizedState,
	    clear: clear,
	    go: go
	  };
	});
		    

borderApp.run(function($rootScope){
	  
	  $rootScope.$on('$stateChangeStart',
	   function(event, toState  , toParams
	                   , fromState, fromParams) 
	    {
		  console.log('entered in next --------' +toState.name);
	      var isFromHome = fromState.name =='home' ;
	      var isToSearch = toState.name == 'search';
	      if(isToSearch =='#')
	      {
	        event.preventDefault();
	      }
	    });
})