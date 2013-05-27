var app = angular.module('app', []);

app.directive('cbTabs', function() {
    return {
        replace: false,
        restrict: 'A',
        link: function(scope, element, $rootScope, attrs, controller) {
            tabNames = [];
            scope.selectedTab = null;
            angular.forEach(element.children(), function(child) {
                if (child.tagName == 'A') {
                    var tabName = child.getAttribute('tab');
                    if (tabName) {
                        var ae = angular.element(child);
                        ae.addClass('tab-title');

                        //
                        // Add a click callback
                        //
                        child.onclick = function() {
                            scope.selectedTab = tabName;
                            scope.$digest();
                            console.log("Selected tab: " + tabName);
                        };

                        //
                        // Watch changes in selectedTab so we can modify the title CSS
                        //
                        scope.$watch('selectedTab', function(value) {
                            if (tabName == value) {
                                ae.removeClass('tab-not-selected');
                                ae.addClass('tab-selected');
                            } else {
                                ae.addClass('tab-not-selected');
                                ae.removeClass('tab-selected');
                            }
                        });

                        //
                        // Select the first tab
                        //
                        tabNames.push(tabName);
                        if (tabNames.length == 1) {
                            console.log("Initial tab: " + tabName);
                            scope.selectedTab = tabName;
                        }
                        console.log("Found child: " + child + " tabName: " + tabName);
                    }
                } else if (child.tagName == 'DIV') {
                    var ae = angular.element(child);
                    ae.addClass('tab-content');
                    scope.$watch('selectedTab', function(value) {
                        var tabName = child.getAttribute('id');
                        var displayValue = value == tabName ? 'block' : 'none';
                        ae.css('display', displayValue);
                        console.log("Display for " + tabName + ": " + displayValue);
                    });
                }
            });
        }
    };
});

function MainController($scope) {
    console.log("Controller starting");
}