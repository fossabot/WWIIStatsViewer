const request = require('request');

function getStats(game, gamertag, platform) {
	var settings = {
		method: "GET",
		type: 'json',
		url: "https://my.callofduty.com/api/papi-client/crm/cod/v2/title/" + game + "/platform/" + platform + "/gamer/" + gamertag + "/profile/",
		headers: {
			'content-type': 'application/json'
		}
	};
	try {
		request(settings, function(response, status, body) {
			var info = JSON.parse(body);
			if (info.status !== "error" && info.data.title !== null) {
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
			} else $('.error').fadeIn();
			var html = '<div class="panel_red">' + '<h2> Unexpected Error. </h2>' + '<p> User Cannot be found. </p>' + '<p> Try another search query. </p>' + '</div>';
			$('.error').html(html);
		});
	} catch (exception) {
		return null;
	}
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

function checkStats(game, platform, page) {
	var settings = {
		method: "GET",
		type: 'json',
		url: "https://my.callofduty.com/api/papi-client/leaderboards/v2/title/" + game + "/platform/" + platform + "/time/alltime/type/core/mode/career/page/" + page,
		headers: {
			'content-type': 'application/json'
		}
	};
	try {
		request(settings, function(response, status, body) {
			var info = JSON.parse(body);
			try {
				for (i = 0; i < info.data.entries.length; i++) {
					$('.tbody').append("<tr><td>" + info.data.entries[i].rank + "</td><td>" + info.data.entries[i].username + "</td><td>" + info.data.entries[i].values.totalXp + "</td><td>" + info.data.entries[i].values.score + "</td><td>" + info.data.entries[i].values.gamesPlayed + "</td><td>" + secondsToHms(info.data.entries[i].values.timePlayed) + "</td></tr>")
				};
			} catch (exception) {
				return null;
			}
		});
	} catch (exception) {
		return;
	}
}

function getCSRF() {  
	var url = {    
		method: 'GET',
		    uri: "https://profile.callofduty.com/",
		    headers: {      
			'Content-Type': 'application/json'    
		},
		  
	};  
	request(url, (err, response, body) => {    
		var token = response.headers['set-cookie'][2].replace("XSRF-TOKEN=", "").replace("; Domain=callofduty.com; Path=/", "");    
		console.log(token);  
	});
}

function getData() {
	var url = {    
		method: 'GET',
		    uri: "https://profile.callofduty.com/cod/userInfo/MTQ0OTE2NTk5NDg2MjE1ODcwMDI6MTUxMzI0ODY5NTA1MTplZDBkYzcwOTg3Y2M2MDcwNWJhMDBlMDY2YTk5MDJjNA",
		    headers: {      
			'Content-Type': 'application/json',
			'Cookie': 'AMCV_0FB367C2524450B90A490D4C%40AdobeOrg=1099438348%7CMCIDTS%7C17501%7CMCMID%7C06274282484548674580096429307447731106%7CMCAAMLH-1512636251%7C6%7CMCAAMB-1512643887%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1512046287s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-17506%7CvVersion%7C2.1.0; mbox=PC#7b3f20e658be47a393e4606c18564e9b.26_14#1519815088|session#a5b8dde9ef63450b8abdc7c55440c6dc#1512040948|check#true#1512039148; s_nr=1512039089070-Repeat; ACT_SSO_REMEMBER_ME=MTQ0OTE2NTk5NDg2MjE1ODcwMDI6MTZmNDhlYzg2NzRkMzkxNmIxNzQyZmM4OWNjY2NlMDM0ZTU3MTdkNDFhYjZjYjZiZjU4YzY0ZGYwYzU0N2E3MQ; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnt9fQ; __utma=229673283.361720785.1511957272.1511967999.1512031449.5; __utmz=229673283.1511957272.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ATVI_VISITOR_ID=anon-1511959111787-0.8013522209195922; atvi-cookie=true; AMCVS_0FB367C2524450B90A490D4C%40AdobeOrg=1; ACT_SSO_LOCALE=en_US; __utmc=229673283; s_ppvl=https%253A%2F%2Fprofile.callofduty.com%2Fcod%2Flogin%2C74%2C74%2C978%2C1920%2C978%2C1920%2C1080%2C1%2CL; s_ppv=https%253A%2F%2Fprofile.callofduty.com%2Fcod%2Flogin%253FredirectUrl%253Dhttps%25253A%25252F%25252Fmy.callofduty.com%25252Fwwii%25252Fstats%25252Flifetime%2C74%2C74%2C978%2C1920%2C978%2C1920%2C1080%2C1%2CL; s_cc=true; s_sq=%5B%5BB%5D%5D; new_SiteId=cod; comid=cod; XSRF-TOKEN=9e9d114c-c67a-443d-92ca-c5273789dc84; s_dfa=activision.prd; gpv_c8=no%20value; redirectUrl=https://my.callofduty.com/wwii/stats/lifetime; SSO_REDIRECTED_AT_LOGIN=https://my.callofduty.com/wwii/stats/lifetime; ACT_SSO_COOKIE=MTQ0OTE2NTk5NDg2MjE1ODcwMDI6MTUxMzI0ODY5NTA1MTplZDBkYzcwOTg3Y2M2MDcwNWJhMDBlMDY2YTk5MDJjNA; s_ACT_SSO_COOKIE=MTQ0OTE2NTk5NDg2MjE1ODcwMDI6MTUxMzI0ODY5NTA1MTplZDBkYzcwOTg3Y2M2MDcwNWJhMDBlMDY2YTk5MDJjNA; atkn=eyJhbGciOiAiUlNBLU9BRVAiLCAiZW5jIjogIkExMjhDQkMtSFMyNTYiLCAia2lkIjogInVub18xIn0.L9Ss-VwI0yaFq3_LaIqjqc7BTbiwsCkoqDQC22KfgUnBZxwSyJIIgp9c-TtuSR9CNDOf_S6qQY8AVK7Pmrdqly-65GUxBYRUCselvkHSu1cO_hf3iBtVDQsFPvsK-xABqiiN2j4CLD3wMPLtTLpajBoxVFUGLs4xrhkj5YAIAx0.KPf6KFhqruXL2wrhDXZgyg.KG5q24pOBX4piP6shzFIOo3DG4LQ1RuwJAneqtvYgiHpfBl7Hm7kHyzhtRS9N5gJdDDVc5KCIo94sVfpzE_46_b6A0iEBPHmsl0Y3TRS2s97VyOpxLMMEDc-99FyTPlmPRdjryfmf7KiS74tKZXULBp0v085DbyVc1ENo2fxPlIVJCdzyjMd4vCC_qAyF3vFQHcAZPlHTDSmnO8J-ewerJXrbaPJopdoOQ7q_kgaZ9BFOIYgf9mAf4vBhi6dIkGn4iKKsdqHDfc9E2uzDcrwJg.KRKLn9jEPBOnMhav9z7ZEg; rtkn=eyJhbGciOiAiUlNBLU9BRVAiLCAiZW5jIjogIkExMjhDQkMtSFMyNTYiLCAia2lkIjogInVub18xIn0.GwDf9rS2kdczP-72HhzXA_e2y3OAnw19Lg4coW1v7ans31TQJDDTUPDQiKy9vuZffS3HndZ9KeVf2j-SbpArmqd72v56USOUAZcs4TrJ1A-7WknFOmJBlIjSGAfAgrvA32C6zZ80kYVzxXLTSE3B8x_CmEgwV-R98CgHe87wNPo.J6DIkDXompDc1OtNJ52qyw.-CmV0by7AaLODshIVKpqGMbiSW2qniORCKnuIQhn9380kmqK_WVS3nTvZPSUJMPGIG4oUVdTm87wreP_DKPfW23tLW7WLRxvONT0_P-L24yndFLr66YW3T0wKu6EUT9Kvu9mEE9AiicK-j2Cl5EJcKJMIxcRYlIzCVxDGoTBluTd7Y4nBsr9cpmR6yF0nafXofjNEJompwVt60m6LkDSIoy1kG65uMpxZyYmBsVkwLqLHhpyfDPboYrVPuuxih3zMHoKk_P0FPJGJzLDwMbU3w.qHqSK9WG8UaTZUFLtl-P4w; ACT_SSO_EVENT=LOGIN_SUCCESS:1512039095096; umbrellaId=3306746010444912014; s_umbrellaId=3306746010444912014; agegate=; country=; utkn=; urtkn=; facebookId=true; twitchId=true; twitterId=true; youTubeId=true'    
		},
		  
	};  
	request(url, (err, response, body) => {    
		console.log(body);  
	});
}