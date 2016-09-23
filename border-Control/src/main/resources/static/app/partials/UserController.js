  borderApp.controller('UserController',
		     ['$scope', '$state', 
		        function ($scope, $state) {
		      
		            $scope.navigate = function () {
		            	  console.log('targetState' +$scope.username);
		                $state.go('articles');
		            }
		            
		            
		           
		      
		        }]);
  
  
   