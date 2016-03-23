/*
 * Please see the included README.md file for license terms and conditions.
 */

angular.module('myApp', ['ionic', 'ngCordova'])
.controller('myAppCtrl', function($scope){
    
    $scope.headerTitle = "Create To Do";
    $scope.showDeleteButton = 'undefined';
    $scope.todo = {};
    $scope.todos = [];
    
    var todos = localStorage.getItem('todos');
    if (todos != undefined){
        $scope.todos = JSON.parse(todos);
    }
    
    $scope.$index = 0;
    var $index = localStorage.getItem('$index');
    if($index != undefined){
        $scope.$index = JSON.parse($index);
    }
    
    $scope.addToDo = function($event){
        $scope.todo = {};
        $scope.showDeleteButton = false;
        activate_page("#create_edit");
    }
    
    $scope.deleteToDo = function($todo){
        
        navigator.notification.confirm('Are you Sure?', onConfirm, ' Delete To do', 'Delete,Cancel');  

        function onConfirm(button){
            if (button == 1){ // if click button Delete
                console.log("delete");
                for (var i=0;i<$scope.todos.length;i++){
                    if($scope.todos[i].id == $scope.todo.id){
                        $scope.todos.splice(i, 1);
                        localStorage.setItem('todos', JSON.stringify($scope.todos));
                        location.reload();
                        activate_page('#mainpage');
                    }
                }
            }
            else{
                return true;
            }
        }                                                                
    }
    //begin set alarm
    
    $scope.setAlarm = function($action){
        if($scope.todo.hasAlarm){
            cordova.plugins.notification.local[$action]({
            //cordova.plugins.notification.local.schedule({
                id: $scope.todo.id,
                title: $scope.todo.title,
                text: $scope.todo.description,
                at: $scope.todo.datetime
            });
        navigator.notification.alert("Successful set Alarm", function(){},"Success", "OK");
        } else {
            $scope.todo = {};
        }
        
    } 
    //end set alarm
    $scope.editTodo = function($todo){
        $scope.headerTitle = "Edit To Do Item";
        $scope.showDeleteButton = true;
        $scope.todo = $todo;
        $scope.todo.datetime = new Date($scope.todo.datetime)
        activate_page("#create_edit");
    }

    $scope.saveToDo = function($event){
        
        //console.log($scope.todo.datetime);
        if ($scope.todo.id == undefined){
            $scope.$index = $scope.$index+1;
            $scope.todo.id = $scope.$index;
            localStorage.setItem('$index', JSON.stringify($scope.$index));
            $scope.todos.push($scope.todo);
            //$scope.setAlarm('schedule');
            //--start
            
            cordova.plugins.notification.local.hasPermission(function(granted){
              if(granted == true)
              {
                navigator.notification.alert("This will set Alarm", function(){},"Set Alarm", "OK");
                $scope.setAlarm('schedule');
              }
              else
              {
                navigator.notification.alert("This will require permission", function(){},"Set Permission", "OK");
                cordova.plugins.notification.local.registerPermission(function(granted) {
                    if(granted == true)
                    {
                      //schedule(id, title, message, schedule_time);
                        $scope.setAlarm('schedule');
                    }
                    else
                    {
                      navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
                    }
                });
              }
            });
            
            //--finish
            
            
        } else{
            for (var i=0; i<$scope.todos.length;i++){
                if($scope.todos[i].id == $scope.todo.id){
                    $scope.todos[i] = $scope.todo;
                }
            }
             navigator.notification.alert("This will update alarm");
             $scope.setAlarm('update');
        }
        
        localStorage.setItem('todos', JSON.stringify($scope.todos)); 
        //$scope.setAlarm();
        $scope.todo = {};
        activate_page("#mainpage");
    }
    
//    combineDateAndTime = function(date, time) {
//    timeString = time.getHours() + ':' + time.getMinutes() + ':00';
//
//    var year = date.getFullYear();
//    var month = date.getMonth() + 1; // Jan is 0, dec is 11
//    var day = date.getDate();
//    var dateString = '' + year + '-' + month + '-' + day;
//    var combined = new Date(dateString + ' ' + timeString);
//    return combined;
//}
    
    $scope.showDatePicker = function($mode){
        $cordovaDatePicker.show({
            date: new Date(),
            mode: $mode,
            minDate: ionic.Platform.isAndroid() ? Date.parse(new Date()) : new Date()     
        }).then(function(success){
                console.log(success);
        }, function(error){
        console.log(error);
        })
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
