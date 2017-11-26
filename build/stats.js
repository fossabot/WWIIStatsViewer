const request = require('request');

function getStats(game, gamertag, platform) {
    var settings = {
        method: "GET",
        type: 'json',
        url: "https://my.callofduty.com/api/papi-client/crm/cod/v2/title/"+ game +"/platform/"+ platform + "/gamer/"+gamertag+"/profile/",
        headers: {
            'content-type': 'application/json'
        }
    };
    request(settings, function(response, status, body) {
        var info = JSON.parse(body);
        if(info.status !== "error" && info.data.title !== null) {
            $('.kdr').text(info.data.mp.lifetime.all.kdRatio);
            $('.kills').text(info.data.mp.lifetime.all.kills);
            $('.deaths').text(info.data.mp.lifetime.all.deaths);
            $('.wins').text(info.data.mp.lifetime.all.wins);
            $('.loss').text(info.data.mp.lifetime.all.losses);
            $('.acc').text(info.data.mp.lifetime.all.accuracy + "%");

            //side panel
            $('.time').text(secondsToHms(info.data.mp.lifetime.all.timePlayed));
            $('.codp').text(info.data.mp.lifetime.all.prestigeShopTokens);
            $('.codu').text(info.data.mp.lifetime.all.unlockPoints);

            //second panel
            var results = info.data.mp.levelXpGained + info.data.mp.levelXpRemainder;
            $('.rank').text(info.data.mp.level);
            $('.xper').text(info.data.mp.levelXpGained);
            $('.xpne').text(info.data.mp.levelXpRemainder);
            $('.per').text(results);

            //Third Panel
            $('.plant').text(info.data.mp.lifetime.all.plants);
            $('.capt').text(info.data.mp.lifetime.all.captures);
            $('.dest').text(info.data.mp.lifetime.all.destructions);
            $('.matp').text(info.data.mp.lifetime.all.matchesPlayed);
            $('.matc').text(info.data.mp.lifetime.all.matchesCompleted);
            try {
                $('.mou').text(info.data.mp.weekly.all.divisionXpMountain);
                $('.exp').text(info.data.mp.weekly.all.divisionXpExpeditionary);
                $('.inf').text(info.data.mp.weekly.all.divisionXpInfantry);
                $('.arm').text(info.data.mp.weekly.all.divisionXpArmored);
                $('.air').text(info.data.mp.weekly.all.divisionXpAirborne);
            } catch (exception) {
                $('.mou').text("0");
                $('.exp').text("0");
                $('.inf').text("0");
                $('.arm').text("0");
                $('.air').text("0");
            }
            $('.panel').fadeIn();
            $('.error').fadeOut();
            $('.mp').fadeIn();
        }
        else
            $('.error').fadeIn();
            var html = '<div class="panel_red">' +
                '<h2> Unexpected Error. </h2>' +
                '<p> User Cannot be found. </p>' +
                '<p> Try another search query. </p>' +
                '</div>';
            $('.error').html(html);
    });
}
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? "h, " : "h, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "m, " : "m, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    return hDisplay + mDisplay + sDisplay;
}