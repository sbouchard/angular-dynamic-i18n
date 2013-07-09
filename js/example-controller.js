(function () {
	
	var module = angular.module("dynamic_i18n_app", ["bootstrap","i18nDynamic", "ngLocale"]);
	
	module.config(function ($locationProvider) {
		$locationProvider.html5Mode(false).hashPrefix('!');
	});
	
	module.run(function ($rootScope, $location) {
		$rootScope.activeTab = 'usage';

		$location.path("usage");
	});
	
	module.directive("callToAction", function () {
		return {
			restrict: "EC",
			transclude: true,
			replace: true,
			template: "<a class='btn' ng-click='track()' ng-transclude></a>",
			link: function (scope, element, attrs, ctrl) {
				scope.track = function () {
					if (_gaq) {
						_gaq.push(["_trackEvent", attrs.category, angular.element(element).text()]);
					}
				};
			}
		};
	});
	
	module.controller("exampleCtrl", function ($scope, $location, $locale, i18nLanguage) {
				
		$scope.$watch("activeTab", function (newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}
			
			if ($location.path() != $scope.activeTab) {
				$location.path($scope.activeTab);
			}
		});
		
		$scope.getNavClass = function (item) {
			return item == $scope.activeTab ? "active" : "";
		};

		$scope.changeLocale = function(newLocale){
			if($scope.language === 'en'){
				i18nLanguage.setLocale('fr');	
				$scope.language = 'fr';
			}else{
				i18nLanguage.setLocale('en');	
				$scope.language = 'en';
			}
		};		

	});
}());
