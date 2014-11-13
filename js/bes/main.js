/*jshint devel: true*/
/*jslint browser: true */
/*global jQuery: false, $: false*/

var $widget = (function(){

	'use strict';

	return {};

})();

$(document).ready(function(){

	'use strict';

	// --- --- --- --- ---
	// INITIALISATION
	// --- --- --- --- ---
	(function($, $W){

		$W.init = function(){

			console.log('running widget initialisation');

			$W.settings.init();
			$W.getJson.init('residential');
			$W.fitImage.init();
			$W.cycle.init();

		}; // end of init

		return $W;

	})(jQuery, $widget);

	// --- --- --- --- ---
	// SETTINGS
	// --- --- --- --- ---
	(function($, $W){

		var $CM;

		$W.settings = {

			init: function(){

				$CM = $W.settings;

				$CM.widget = $('#real-estate-widget');
				$CM.header = $CM.widget.find('> header');
				$CM.mainImage = $CM.widget.find('> .main-image');
				$CM.footer = $CM.widget.find('> footer');

			}, // end of init

			json: {
				// listings: xxx,
				// dataLength: xxx,
				// dataMap: xxx,
				// reference: xxx
			}

		}; // end of settings

		return $W;

	})(jQuery, $widget);

	// --- --- --- --- ---
	// GET JSON
	// --- --- --- --- ---
	(function($, $W){

		var $CM;

		$W.getJson = {

			init: function($ref){

				$CM = $W.getJson;

				var $url = 'cron/' + $ref + '.json';

				$.getJSON($url, function($data){

					console.log('sucessfully got ' + $ref + ' data');

					$CM.storeSettings($data);
					$W.populate.init();

				}).fail(function(){

					console.log('failed to get ' + $ref + ' data');

					$CM.dataFailed();

				});

			}, // end of init

			storeSettings: function($data){

				var $dataLength = $data.length,
					$dataMap = $CM.createDataMap($data, $dataLength);

				$W.settings.json = {
					listings: $data,
					dataLength: $dataLength,
					dataMap: $dataMap,
					reference: null
				};

			}, // end of storeSettings

			createDataMap: function($data, $dataLength){

				var $dataMap = [],
					$i = 0;

				for($i; $i < $dataLength; $i++){

					$dataMap.push($i);

				} // end of loop

				return $dataMap;

			}, // end of createDataMap

			dataFailed: function(){


			} // end of dataFailed

		}; // end of getJson

		return $W;

	})(jQuery, $widget);

	// --- --- --- --- ---
	// POPULATE DATA
	// --- --- --- --- ---
	(function($, $W){

		var $CM;

		$W.populate = {

			init: function(){

				$CM = $W.populate;

				var $settings = $W.settings.json;

				if($settings.reference){

					console.log('change reference');

					$CM.fadeOutListing($settings);

				}else{

					console.log('load new content');

					$CM.changeListing($settings);

				} // end of statement

			}, // end of init

			fadeOutListing: function(){


			}, // end of fadeOutListing

			changeListing: function(){

				

			}, // end of changeListing

			fadeInListing: function(){


			}, // end of fadeInListing

		}; // end of populate

	})(jQuery, $widget);

	// --- --- --- --- ---
	// FIT IMAGE
	// --- --- --- --- ---
	(function($, $W){

		var $CM;

		$W.fitImage = {

			init: function(){

				$CM = $W.fitImage;

				var $offset = $CM.findOffset();
				$CM.setOffset($offset);

			}, // end of init

			findOffset: function(){

				var $header = $W.settings.header,
					$top = $header.outerHeight(),
					// --- --- ---
					$footer = $W.settings.footer,
					$bottom = $footer.outerHeight();

				console.log('header = ' + $top + ' / footer = ' + $bottom);

				return {
					setTop: $top,
					setBottom: $bottom
				};

			}, // end of findOffset

			setOffset: function($offset){

				console.log('setting image offset');

				var $image = $W.settings.mainImage;

				$image.css({
					'top': $offset.setTop,
					'bottom': $offset.setBottom
				});

			} // end of setOffset

		}; // end of fitImage

		return $W;

	})(jQuery, $widget);

	// --- --- --- --- ---
	// CYCLE LISTING
	// --- --- --- --- ---
	(function($, $W){

		var $CM;

		$W.cycle = {

			init: function(){

				$CM = $W.cycle;

				$CM.listeners();

			}, // end of init

			listeners: function(){

				var $footer = $W.settings.footer,
					$price = $footer.find('> .price');

				$price.on('click', '.cycle-listing', function(){

					console.log('cycle listing');

				});

			} // end of listiners

		}; // end of cycle

		return $W;

	})(jQuery, $widget);

	$widget.init();

}); // end of document ready