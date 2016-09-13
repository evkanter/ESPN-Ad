var my_url = 'mlb.json';
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': my_url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

var mlb_events = json.sports["0"].leagues["0"].events;

function getGameCount() {
	return mlb_events.length;
}

function getClockTime(date){
   var now    = new Date(date);
   var hour   = now.getHours(date);
   var minute = now.getMinutes(date);
   var second = now.getSeconds(date);
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = hour;   }
   if (minute < 10) { minute = "0" + minute; }
   if (second < 10) { second = "0" + second; }
   var timeString = hour + ':' + minute + " " + ap;
   return timeString;
}

function init() {
	var games = getGameCount();
	for (k = 0; k < games; k++) { 
		getGameInfo(k);
	}

	var aImageFloater = document.createElement('img');
	aImageFloater.id = 'floater';
	aImageFloater.className = 'rightFloater';
	aImageFloater.alt = '';
	aImageFloater.src = 'images/ClickForLocation.gif';

	document.getElementById("MainContainer").appendChild(aImageFloater);

}
function toggle() {
	var arrowUp = document.getElementById("arrow_up");
	var arrowDown = document.getElementById("arrow_down");

	var compressed = document.getElementById("compressed");
	var fullsize = document.getElementById("fullsize");

	if(arrowUp.style.display == "block") {
		arrowUp.style.display = "none";
		arrowDown.style.display = "block";
		fullsize.style.display = "none";
		compressed.style.display = "block";
  	} else {
		arrowUp.style.display = "block";
		arrowDown.style.display = "none";
		fullsize.style.display = "block";
		compressed.style.display = "none";
	}

} 

function getGameInfo(game) {

	var gameContainerDiv = document.createElement('div');
	gameContainerDiv.id = 'game_container_' + game;
	gameContainerDiv.className = 'GameSize spacerMarginRight';

	var gameOverviewDiv = document.createElement('div');
	gameContainerDiv.id = 'game_overview_' + game;
	gameContainerDiv.className = 'inlineScoreboard scoreboardBox';

	var gameDateDiv = document.createElement('div');
	gameDateDiv.id = 'game_date_' + game;
	gameDateDiv.className = 'date-time scoreboardFontRed';

	var aSpanTime1 = document.createElement('span');
	aSpanTime1.setAttribute("class","time");
	aSpanTime1.setAttribute("id","time_" + game);

	var aSpanScorer1 = document.createElement('span');
	aSpanScorer1.setAttribute("id","scorer_" + game);
	aSpanScorer1.setAttribute("class","spacerMargin outstatus scoreboardFontRed");

	var teamsDiv = document.createElement('div');
	teamsDiv.id = 'teams_' + game;
	teamsDiv.className = 'nav-menu spacerMarginTop';

	var teamsDiv1 = document.createElement('ul');
	teamsDiv1.id = 'teams1_' + game;

	var awayTeamsDiv = document.createElement('li');
	awayTeamsDiv.id = 'away_team_' + game;

	var aSpanLogo = document.createElement('span');
	aSpanLogo.setAttribute("class","logo logowidth");
	aSpanLogo.setAttribute("id","away_logo_" + game);

	var aSpanTeamName = document.createElement('span');
	aSpanTeamName.setAttribute("class","teamwidth");
	aSpanTeamName.setAttribute("id","away_team_name_" + game);

	var aSpanAbbreviation = document.createElement('span');
	aSpanAbbreviation.setAttribute("class","short-name scoreboardFont2 scoreboardSpacing scoreboardCentering");
	aSpanAbbreviation.setAttribute("id","away_team_abbreviation_" + game);

	var aSpanScore = document.createElement('span');
	aSpanScore.setAttribute("class","score scorewidth scoreboardFont2 scoreboardCentering");
	aSpanScore.setAttribute("id","away_team_score_" + game);

	var homeTeamsDiv = document.createElement('li');
	homeTeamsDiv.id = 'home_team_' + game;

	var aSpanLogoHome = document.createElement('span');
	aSpanLogoHome.setAttribute("class","logo logowidth");
	aSpanLogoHome.setAttribute("id","home_logo_" + game);

	var aSpanTeamNameHome = document.createElement('span');
	aSpanTeamNameHome.setAttribute("class","teamwidth");
	aSpanTeamNameHome.setAttribute("id","home_team_name_" + game);

	var aSpanAbbreviationHome = document.createElement('span');
	aSpanAbbreviationHome.setAttribute("class","short-name scoreboardFont2 scoreboardSpacing scoreboardCentering");
	aSpanAbbreviationHome.setAttribute("id","home_team_abbreviation_" + game);

	var aSpanScoreHome = document.createElement('span');
	aSpanScoreHome.setAttribute("class","score scorewidth scoreboardFont2 scoreboardCentering");
	aSpanScoreHome.setAttribute("id","home_team_score_" + game);

	gameContainerDiv.appendChild(gameOverviewDiv);
	gameOverviewDiv.appendChild(gameDateDiv);
	gameDateDiv.appendChild(aSpanTime1);
	gameDateDiv.appendChild(aSpanScorer1);
	gameOverviewDiv.appendChild(teamsDiv);
	teamsDiv.appendChild(teamsDiv1);
	teamsDiv1.appendChild(awayTeamsDiv);
	awayTeamsDiv.appendChild(aSpanLogo);
	awayTeamsDiv.appendChild(aSpanTeamName);
	aSpanTeamName.appendChild(aSpanAbbreviation);
	aSpanTeamName.appendChild(aSpanScore);
	teamsDiv1.appendChild(homeTeamsDiv);
	homeTeamsDiv.appendChild(aSpanLogoHome);
	homeTeamsDiv.appendChild(aSpanTeamNameHome);
	aSpanTeamNameHome.appendChild(aSpanAbbreviationHome);
	aSpanTeamNameHome.appendChild(aSpanScoreHome);

	document.getElementById("MainContainer").appendChild(gameContainerDiv);


	if (typeof mlb_events[game].competitions[0] !== "undefined") {
		var game_date = mlb_events[game].competitions["0"].date;
		var utcDate = game_date;
		var localDate = new Date(utcDate);
		var localDate = getClockTime(localDate);
		$( ".game_date_"+game ).append(localDate);
		$( ".time_"+game ).append(localDate);
		
	}

	if (typeof mlb_events[game].competitions[0].situation !== "undefined") {
		var outs_text = mlb_events[game].competitions["0"].situation.outsText;
		document.getElementById("scorer_"+game).innerHTML = outs_text;
	}
	if (typeof mlb_events[game].competitions[0].status !== "undefined") {
		var inning_text = mlb_events[game].competitions["0"].status.detail;
		var utcDate = inning_text;
		var localDate = new Date(utcDate);

		if (isNaN(localDate)) {
			document.getElementById("time_"+game).innerHTML = inning_text;
		} else {
			var localDate = getClockTime(localDate);
			document.getElementById("time_"+game).innerHTML = localDate;
		}
	}

	for (i = 0; i < mlb_events[game].competitions["0"].competitors.length; i++) { 

		if (mlb_events[game].competitions["0"].competitors[i].homeAway == 'home') {

			var score_home = mlb_events[game].competitions["0"].competitors[i].score;
			var location_home = mlb_events[game].competitions["0"].competitors[i].team.location;
			var name_home = mlb_events[game].competitions["0"].competitors[i].team.name;
			var abbreviation_home = mlb_events[game].competitions["0"].competitors[i].team.abbreviation;
			var standings_summary_home = mlb_events[game].competitions["0"].competitors[i].team.record.summary;
			logourl = 'http://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/' + abbreviation_home + '.png&h=23&w=23';

			document.getElementById("home_team_abbreviation_"+game).innerHTML = abbreviation_home;
			document.getElementById("home_team_score_"+game).innerHTML = score_home;

			var aImageHome = document.createElement('img');
			aImageHome.id = 'home_team_img_' + game;
			aImageHome.alt = '';
			aImageHome.src = logourl;
			aSpanLogoHome.appendChild(aImageHome);

		} else if (mlb_events[game].competitions["0"].competitors[i].homeAway == 'away') {

			var score_away = mlb_events[game].competitions["0"].competitors[i].score;
			var location_away = mlb_events[game].competitions["0"].competitors[i].team.location;
			var name_away = mlb_events[game].competitions["0"].competitors[i].team.name;
			var abbreviation_away = mlb_events[game].competitions["0"].competitors[i].team.abbreviation;
			var standings_summary_away = mlb_events[game].competitions["0"].competitors[i].team.record.summary;

			document.getElementById("away_team_abbreviation_"+game).innerHTML = abbreviation_away;
			document.getElementById("away_team_score_"+game).innerHTML = score_away;

			logourl = 'http://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/' + abbreviation_away + '.png&h=23&w=23';

			var aImageAway = document.createElement('img');
			aImageAway.id = 'away_team_img_' + game;
			aImageAway.alt = '';
			aImageAway.src = logourl;
			aSpanLogo.appendChild(aImageAway);
		}
	}
}
