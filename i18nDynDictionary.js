"use strict";
  	
var i18nModule = angular.module('i18nDynamic');

i18nModule.factory("i18nDictionary", ['$rootScope', '$log', function($rootScope, $log){

	/**
	 * Constructor
	 */
	function i18nDictionaryService () {
	};


	// This is the method to override to load/fetch your own dictionary
	// The only requirement your language JSON files in your approot/i18n/, named as the language you are targeting, ie
	i18nDictionaryService.prototype.loadDictionary = function(language){
		var keys = null;

		if(language === 'en'){
			keys = {'key1':'My house is your house', 
					'key2':'Welcome',
					'key3':'Have a nice day'};
		}else if(language === 'fr'){
			keys = {'key1':'Ma maison est ta maison', 
					'key2':'Bienvenue',
					'key3':'Bonne journée'};
		}else if(language === 'es-es'){
			keys = {'key1':'Mi casa y su casa', 
					'key2':'Mucho gusto',
					'key3':'¡Que pase un buen día!'};
		}	
		return keys;

	};


	return new i18nDictionaryService();
}]);