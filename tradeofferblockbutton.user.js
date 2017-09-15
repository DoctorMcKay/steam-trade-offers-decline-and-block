// ==UserScript==
// @name        Steam Trade Offer Block Button
// @namespace   https://www.doctormckay.com
// @description Adds a button to decline a trade offer and block its sender
// @include     *://steamcommunity.com/*/*/tradeoffers*
// @version     1.0.0
// @grant       none
// ==/UserScript==

var $offers = $J('.tradeoffer');
$offers.each(function(idx, offer) {
	console.log('offer');
	var $offer = $J(offer);
	var $link = $J('<a class="whiteLink" href="javascript:void(0)">aaa</a>');
	$link.text('Decline & Block');
	$link.click(function() {
		var offerid = $offer.attr('id').split('_')[1];
		var steamid = $offer.find('.btn_report').attr('href').match(/'(\d+)'/)[1];
		
		ActOnTradeOffer(offerid, 'decline', 'Trade Declined and User Blocked', 'Decline Trade');
		$J.post('/actions/BlockUserAjax', {"sessionID": g_sessionID, "steamid": steamid, "block": 1});
	});
	
	$offer.find('.tradeoffer_footer_actions').append(' | ').append($link);
});
