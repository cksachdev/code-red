var myApp = angular.module('myApp',[]);

myApp.controller("myController",["$scope","$location","$filter","$timeout",
  function($scope,$location,$filter,$timeout){

    $scope.settingHolder = {
      "name": "",
      "selector": "",
      "valueType": "greater_than",
      "threshold": "",
      "contains": "",
      "alertType": "Success"
    };

    $scope.siteSettingHolder = {
      "siteName": "",
      "siteUrl": "",
      "allSettings": [angular.copy($scope.settingHolder)]
    };

    $scope.valueTypes = [
      "less_than",
      "greater_than"
    ]

    $scope.alertTypes = [
      "Error",
      "Warning",      
      "Success"
    ]

    $scope.selectedSiteIndex = 0;
    $scope.siteSettings = [];

    $scope.updateSettings = function() {
      stringified = JSON.stringify($scope.siteSettings)
      localStorage.setItem("codeRed", stringified)

      chrome.storage.sync.set({'codeRed': stringified}, function() {
        console.log('Settings saved');
      });
    }

    $scope.getSettings = function() {
      stringified = localStorage.getItem("codeRed")
      $scope.siteSettings = JSON.parse(stringified)

      chrome.storage.sync.get(['codeRed'], function(items) {
        if (items.codeRed!=null) {
          $scope.siteSettings = JSON.parse(items.codeRed)
        }
      });
    }

    $scope.addSetting = function() {
      $scope.siteSettings[$scope.selectedSiteIndex].allSettings.push(angular.copy($scope.settingHolder))
    }

    $scope.addSiteSetting = function() {
      $scope.siteSettings.push(angular.copy($scope.siteSettingHolder))
      $scope.selectedSiteIndex = $scope.siteSettings.length - 1
    }

    $scope.removeSetting = function(index) {
      $scope.siteSettings[$scope.selectedSiteIndex].allSettings.splice(index, 1)
    }

    $scope.removeSiteSetting = function(index) {
      $scope.siteSettings.splice(index, 1)
      $scope.selectedSiteIndex = $scope.siteSettings.length - 1
    }

    $scope.init = function() {
      $scope.getSettings()
      if ($scope.siteSettings==null || $scope.siteSettings.length == 0) {
        $scope.siteSettings = [];
        $scope.addSiteSetting()
      }
    }
    $scope.init()
  }
])
