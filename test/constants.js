(function () {

    'use strict';

    angular.module('osdAuth')
        .constant('CURRENT_USER', {"id":1,"name":"","email":"admin@osedea.com","createdAt":"2015-05-11 15:14:18","updatedAt":"2015-05-29 16:55:14","firstName":"Admin","lastName":"Osedea","about":"Test asd","communicationFrequency":"all","communicationEmail":true,"communicationSms":false,"phone":null,"employer":"CWRU","workEmail":null,"workCity":"Montreal","workState":"QC","workZip":"","lastLogin":"2015-05-29 16:55:14","workUnit":"Cardiology","rating":0,"license":"RN","credentials":"PhD, RN","createdAtW3c":"2015-05-11T15:14:18-04:00","credentialsWithLocation":"PhD, RN, Montreal, QC","fullName":"Admin Osedea","updatedAtW3c":"2015-05-29T16:55:14-04:00","file":null,"groups":[{"id":1,"name":"admin","description":"Administrators group","createdAt":"2015-05-11 15:14:17","updatedAt":"2015-05-11 15:14:17"}],"savedSolutions":[{"id":1,"title":"Holly Boehm","description":"Officiis autem quisquam autem facere qui quia. Voluptatem nulla numquam quis voluptatem et sint. Illo molestiae voluptas beatae eos ipsam. Sit voluptatem vel laudantium sapiente accusantium est voluptates.","userId":89,"requestId":122,"createdAt":"2015-05-11 15:14:31","updatedAt":"2015-05-13 17:03:40","published":true,"fileDescriptionOne":"","fileDescriptionTwo":"","rating":3,"hipaa":false,"createdAtTimeAgo":"2 weeks before","createdAtW3c":"2015-05-11T15:14:31-04:00","type":"solution","updatedAtTimeAgo":"2 weeks before","updatedAtW3c":"2015-05-13T17:03:40-04:00","pivot":{"user_id":1,"solution_id":1}},{"id":604,"title":"Some Solution","description":"Some Description","userId":1,"requestId":null,"createdAt":"2015-05-27 11:20:29","updatedAt":"2015-05-27 11:26:19","published":true,"fileDescriptionOne":null,"fileDescriptionTwo":null,"rating":0,"hipaa":true,"createdAtTimeAgo":"2 days before","createdAtW3c":"2015-05-27T11:20:29-04:00","type":"solution","updatedAtTimeAgo":"2 days before","updatedAtW3c":"2015-05-27T11:26:19-04:00","pivot":{"user_id":1,"solution_id":604}}]});

}());