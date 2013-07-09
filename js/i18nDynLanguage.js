 "use strict";
  	
var i18nModule = angular.module('i18nDynamic', ['ngLocale']);

i18nModule.factory("i18nLanguage", ['$rootScope','$locale', '$log', 'i18nDictionary', function($rootScope, $locale, $log, i18nDictionary){

	var that = this;
	that.language = 'en';
	that.dictionary = {};

	// Come from angularJS localization files
	// Add language that you need for your application
	that.angularLocale = {
						  'fr' : {"DATETIME_FORMATS":{"MONTH":["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],"SHORTMONTH":["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],"DAY":["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],"SHORTDAY":["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],"AMPMS":["AM","PM"],"medium":"yyyy-MM-dd HH:mm:ss","short":"yy-MM-dd HH:mm","fullDate":"EEEE d MMMM y","longDate":"d MMMM y","mediumDate":"yyyy-MM-dd","shortDate":"yy-MM-dd","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":" ","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"","posSuf":" \u00A4","negPre":"(","negSuf":" \u00A4)","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"$"},"pluralCat":function (n) {  if (n >= 0 && n < 2) { return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"fr-ca"},
						  'en' : {"DATETIME_FORMATS":{"MONTH":["January","February","March","April","May","June","July","August","September","October","November","December"],"SHORTMONTH":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"DAY":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"SHORTDAY":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"AMPMS":["AM","PM"],"medium":"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a","fullDate":"EEEE, MMMM d, y","longDate":"MMMM d, y","mediumDate":"MMM d, y","shortDate":"M/d/yy","mediumTime":"h:mm:ss a","shortTime":"h:mm a"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"(\u00A4","negSuf":")","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"$"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"en"},
					   	'es-es': {"DATETIME_FORMATS":{"AMPMS": ["a.m.","p.m."],"DAY": ["domingo","lunes","martes","mi\u00e9rcoles","jueves","viernes","s\u00e1bado"],"MONTH": ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],"SHORTDAY": ["dom","lun","mar","mi\u00e9","jue","vie","s\u00e1b"],"SHORTMONTH": ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],"fullDate": "EEEE, d 'de' MMMM 'de' y","longDate": "d 'de' MMMM 'de' y","medium": "dd/MM/yyyy HH:mm:ss","mediumDate": "dd/MM/yyyy","mediumTime": "HH:mm:ss","short": "dd/MM/yy HH:mm","shortDate": "dd/MM/yy","shortTime": "HH:mm"},"NUMBER_FORMATS": {"CURRENCY_SYM": "\u20ac","DECIMAL_SEP": ",","GROUP_SEP": ".","PATTERNS": [{"gSize": 3,"lgSize": 3,"macFrac": 0,"maxFrac": 3,"minFrac": 0,"minInt": 1,"negPre": "-","negSuf": "","posPre": "","posSuf": ""},{"gSize": 3,"lgSize": 3,"macFrac": 0,"maxFrac": 2,"minFrac": 2,"minInt": 1,"negPre": "-","negSuf": "\u00a0\u00a4","posPre": "","posSuf": "\u00a0\u00a4"}]},"id": "es-es","pluralCat": function (n) {  if (n == 1) {   return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}}
						};

	/**
	 * Constructor
	 */
	function i18nLanguageService () {

		this.setLocale($locale.id);
	}


	// Replace the format content with the new local selected
	i18nLanguageService.prototype.loadAngularLocale = function(language){

            $locale.DATETIME_FORMATS = that.angularLocale[language].DATETIME_FORMATS;
            $locale.NUMBER_FORMATS = that.angularLocale[language].NUMBER_FORMATS;
            $locale.id = language;
	}

	i18nLanguageService.prototype.getTranslation = function(msgKey, locale){
			return that.dictionary[msgKey];
	};

	i18nLanguageService.prototype.setLocale = function(newLocale){

		if(newLocale){
            $log.info('Language modification');
            that.dictionary = i18nDictionary.loadDictionary(newLocale);

            if(that.dictionary){
            	this.loadAngularLocale(newLocale);	
            }else{
            	$log.warn('No dictionary for locale ' + newLocale);	

            	if(newLocale.lastIndexOf("-") > 0){
					newLocale = newLocale.slice(0, newLocale.lastIndexOf("-"));
					if(newLocale){
						this.setLocale(newLocale);
					}
				}
            }
		}	
	};

	return new i18nLanguageService();	
}]);



i18nModule.filter("i18nDyn",  ['$locale', 'i18nLanguage', '$log', function($locale, i18nLanguage, $log){

    return function (msgKey) {
        $log.info('Filter applied for ' + msgKey);
        return i18nLanguage.getTranslation(msgKey, $locale);
    };

}]);





