<?php

	require('libs/phpQuery-onefile.php');
	$allListings = array();




	function getHtmlData($url) {

		$ch = curl_init();
		$timeout = 5;
		$userAgent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)';

		curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		curl_setopt($ch, CURLOPT_FAILONERROR, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		$html = curl_exec($ch);
		curl_close($ch);

		return $html;

	} // end of getHtmlData





	function isDomReference($content){

		if($content){

			return $content;

		}else{

			return false;

		} // end of statement

	} // end of isDomReference





	function extractString($dom){

		$content = $dom->getString();

		return isDomReference($content[0]);

	} // end of extractString





	function extractAttr($dom, $attr){

		 $content = $dom->attr($attr);

		 return $content;

	} // end of extractAttr




	function extractImages($cusDom){

		$length = count($cusDom->find('#detailMedia #mediaContainer #photoBrowse .photoLrge a'));
		$i = 0;
		$allImages = array();
		$image;

		if($length > 5){ $length = 5; } // if there are more than 5 images then cut then length down

		for($i; $i < $length; $i++){

			$image = $cusDom->find('#detailMedia #mediaContainer #photoBrowse .photoLrge a:eq(' . $i . ')');

			if($image->hasClass('primary')){

				$image = $cusDom->find('#detailMedia #mediaContainer #photoBrowse .photoLrge a:eq(' . $i . ') img');
				$allImages[$i] = extractAttr($image, 'src');

			}else{

				$allImages[$i] = extractAttr($image, 'href');

			} // end of statement

		} // end of loop

		return $allImages;

	} // end of extractImages




	function getCustomData($clickUrl){

		$cusHtml = getHtmlData($clickUrl);
		$cusDom = phpQuery::newDocument($cusHtml); // convert the URL for this listing into usable DOM data

		$cusData = array(
			'images' => extractImages($cusDom)
		);

		return $cusData;

	} // end of getCustomData





	function createJsonData($allListings){

		$fileName = 'residential.json';

		if(count($allListings) > 1){

			$jsonData = json_encode($allListings);
			file_put_contents($fileName, $jsonData);

			echo '<h1>Success</h1>';
			echo '<p>Saved JSON file (' . $fileName . ') to the server<p>';

		}else{

			echo '<h1>Failure</h1>';
			echo '<p>Could not save JSON file (' . $fileName . ') to the server<p>';

		} // end of statement
		
	} // end of createJsonData





	function init(){

		$rawUrl = 'http://harcourts.co.nz/Property/Residential?page=1&results=30&view=list';
		$rawHtml = getHtmlData($rawUrl);
		$rawDom = phpQuery::newDocument($rawHtml); // convert the main rawURL into usable DOM data

		$length = count($rawDom->find('#listView > ul > li'));
		$i = 0;
		$listing; $heading; $address; $price; $bed; $bath; $car; $cusData; $jsonData;

		echo 'length = ' . $length;
		
		for($i; $i < $length; $i++){

			// extract content from the DOM
			$listing = $rawDom->find('#listView > ul > li:eq(' . $i . ')');
			$heading = $listing->find('h2 a');
			$clickUrl = 'http://harcourts.co.nz/' . extractAttr($heading, 'href');
			$address = $listing->find('.listAddress h3');
			$price = $listing->find('.propFeatures h3');
			$bed = $listing->find('.propFeatures .bdrm');
			$bath = $listing->find('.propFeatures .bthrm');
			$car = $listing->find('.propFeatures .grge');
			$cusData = getCustomData($clickUrl);

			// save content into an array
			$allListings[$i] = array(
				'latitude' => extractAttr($listing, 'lng'),
				'longitude' => extractAttr($listing, 'lat'),
				'clickUrl' => $clickUrl,
				'heading' => extractString($heading),
				'address' => extractString($address),
				'price' => extractString($price),
				'bed' => extractString($bed),
				'bath' => extractString($bath),
				'car' => extractString($car),
				'images' => $cusData['images']
			);

			// show the user what data has been obtained
			echo '<h3>listing #' . $i . '</h3>';
			echo '<p> Generic Data';
			print_r($allListings[$i]);
			echo '</p>';

		} // end of loop

		createJsonData($allListings);

	}; // end of init




	echo 'run the init function...';
	init();

?>