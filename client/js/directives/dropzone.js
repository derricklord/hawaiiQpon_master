(function () {
    'use strict';

    angular
        .module('coupon')
        .directive('dropzone', function() {
                return {
                    restrict: 'C',
                    controller: 'newCtrl',
                    link: function(scope, element, attrs) {
                        var dropzone;
                        var config = {
                            url: '/uploads',
                            maxFilesize: 2,
                            paramName: "uploadfile",
                            maxThumbnailFilesize: 1,
                            parallelUploads: 1,
                            autoProcessQueue: true
                        };

                        var eventHandlers = {
                            'addedfile': function(file) {
                                console.log(file);
                                scope.file = file;
                                if (this.files[1]!=null) {
                                    this.removeFile(this.files[0]);
                                }
                                scope.$apply(function() {
                                    scope.coupon.img = file.name;
                                    scope.filename = file.name;
                                    scope.coupon.hasImage = true;
                                });
                            },

                            'success': function (file, response) {
                            }

                        };

                        dropzone = new Dropzone(element[0], config);

                        angular.forEach(eventHandlers, function(handler, event) {
                            dropzone.on(event, handler);
                        });

                        scope.processDropzone = function() {
                            dropzone.processQueue();
                        };

                        scope.resetDropzone = function() {
                            dropzone.removeAllFiles();
                        }
                    }
                }
            });

})();