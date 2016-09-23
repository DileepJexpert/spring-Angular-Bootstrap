  borderApp.controller('ArticlesController',
      
                ['$scope', 'articles',
        function ($scope, articles) {
      
            $scope.articles = articles;
      
        }]);
  
