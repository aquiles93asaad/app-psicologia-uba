"user strict";

angular.module('PsiPlannerApp')

.service('DateTransformerService', function() {

    /****************/
    /* PRIVATE METHODS
    /****************/
    function getDateAsString(date) {
        var dateString = "";
        dateString += date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + 'T';
        dateString += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + 'Z';

        return dateString;
    }

    function getStringAsDate(dateString) {
        return new Date(moment(dateString));
    }
    /****************/
    /* PUBLIC METHODS
    /****************/
    return {
        getDateAsString: getDateAsString,
        getStringAsDate: getStringAsDate
    }
});
