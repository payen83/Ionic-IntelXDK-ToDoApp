/*
 * Please see the included README.md file for license terms and conditions.
 */

angular.module('myApp', ['ionic'])
.controller('myAppCtrl', function($scope){
    $scope.uuid = function(){
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    
    $scope.todo = {};
    $scope.todos = [];
    var todos = localStorage.getItem('todos');
    if (todos != undefined){
        $scope.todos = JSON.parse(todos);
    }
    $scope.addToDo = function($event){
        activate_page("#create_edit");
    }
    
    $scope.saveToDo = function($event){
        //console.log($scope.todo);
        $scope.todo.id = $scope.uuid();
        $scope.todos.push($scope.todo);
        localStorage.setItem('todos', JSON.stringify($scope.todos));
        $scope.todo = {};
        activate_page("#mainpage");
    }
    
})

// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...
