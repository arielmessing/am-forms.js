checkboxFactory.$inject = ['$compile', '$templateRequest'];
function checkboxFactory($compile, $templateRequest) {
	
	var ddo = {
		
		restrict: 'A',
		
		scope: { 
			springCheckbox: '=spring'
		},
		
		controller: ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
			
			$scope.checked = function() {
				return $scope.element.is(':checked');  
			};
			
			$scope.disabled = function() {
				return $scope.element.is(':disabled');  
			};
		}],

		link: function($scope, $element, $attrs) {
			
			$scope.attributes = $attrs; 
			
			$scope.element = $element;
			
			if ($attrs.id) {
				$scope.id = $attrs.id;
				
			} else {
				var id = 'checkbox__' + Math.floor((Math.random() * 100000));
				
				$element.attr('id', id);
				$scope.id = id;
			}
			
            $templateRequest('templates/checkbox.html').then(function(html) {
            	var template = angular.element(html);
            	
            	var compiled = $compile(template)($scope);

            	$element.after(compiled);
            	var directiveElement = $element.next();
            	
            	directiveElement.find('.am-input__hidden-wrapper').append($element);
            	
            	$scope.selectUI = directiveElement;
            });
		}
	};
	
	return ddo;
}