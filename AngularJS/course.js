var app = angular.module('coursePage', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    
    $scope.courses = {};
    $scope.courseName = '';
    $scope.subjectName = '';
    $scope.courseId = '';

    $http({
        method: 'GET',
        url: '/api/course/getAllCourses'
    }).then(function successCallback(response) {
        $scope.courses = response.data;
        console.log($scope.courses);

    }, function errorCallback(response) {
        console.log(response);
    });

    $scope.showInsertForm = false;
    $scope.hideUpdateForm = false;

    $scope.insertBtnClicked = function () {
        $http.post('/api/course/insert', {
            name: $scope.courseName,
            subject: $scope.subjectName
        }).then(function successCallback(response) {
            $scope.courses = response.data;
            console.log($scope.courses);

            $scope.showInsertForm = false;
            $scope.hideUpdateForm = true;

        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.showForm = function () {
        $scope.showInsertForm = true;
        $scope.hideUpdateForm = true;

        $scope.courseId = '';
        $scope.courseName = '';
        $scope.subjectName = '';

    };

    $scope.backBtnClicked = function () {
        $scope.showInsertForm = false;
        $scope.hideUpdateForm = true;
    };


    $scope.deleteBtnClicked = function () {

        $http.delete('/api/course/delete/' + $scope.courseId, {
        })
            .then(function successCallback(response) {
                $scope.courses = response.data;
                $scope.hideUpdateForm = true;

                $scope.courseId = '';
                $scope.courseName = '';
                $scope.subjectName = '';
                $scope.showInsertForm = false;
                $scope.hideUpdateForm = true;

            console.log($scope.courses);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.updateBtnClicked = function () {
        $http.post('/api/course/update', {
            id: $scope.courseId, 
            name: $scope.courseName,
            subject: $scope.subjectName
        }).then(function successCallback(response) {
            $scope.courses = response.data;
            console.log($scope.courses);

            $scope.courseId = '';
            $scope.courseName = '';
            $scope.subjectName = '';
            $scope.showInsertForm = false;
            $scope.hideUpdateForm = true;

        }, function errorCallback(response) {
            console.log(response);
        });
    };


    $scope.tableRowClick = function (courseRow) {
        console.info(courseRow.id);
        console.info(courseRow.name);
        console.info(courseRow.subject);

        $scope.courseId = courseRow.id;
        $scope.courseName = courseRow.name;
        $scope.subjectName = courseRow.subject;

        $scope.showInsertForm = true;
        $scope.hideUpdateForm = false;

    };

}]);