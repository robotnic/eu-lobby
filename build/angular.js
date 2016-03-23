//HEAD 
(function(app) {
try { app = angular.module("angular-demo"); }
catch(err) { app = angular.module("angular-demo", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("../public/modules/dossier/cal.html","<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "\n" +
    "<script>\n" +
    "moment.monthsShort()\n" +
    "\n" +
    "</script>\n" +
    "</body>\n" +
    "</html>\n" +
    "")

$templateCache.put("../public/modules/dossier/index.html","<div>\n" +
    "<h1>{{dossier.procedure.title}}</h1>\n" +
    "\n" +
    "Final: <a ng-href=\"{{dossier.procedure.final.url}}\">{{dossier.procedure.final.title}}</a>\n" +
    "<h3>Committees</h3>\n" +
    "<hr/>\n" +
    "<ul>\n" +
    "<li ng-repeat=\"item in dossier.committees\" ng-style=\"!item.responsible && {'color':'gray'}\">\n" +
    "<b>{{item.committee}}</b>\n" +
    "{{item.committee_full}}\n" +
    "(<span ng-repeat=\"rapporteur in item.rapporteur\">{{rapporteur.name}}, </span>\n" +
    "<span ng-repeat=\"shadow in item.shadow\">{{shadow.name}} </span>)\n" +
    "</li>\n" +
    "</ul>\n" +
    "\n" +
    "<div ng-repeat=\"\">\n" +
    "</div>\n" +
    "\n" +
    "<h2>Changes</h2>\n" +
    "<ul>\n" +
    "<li ng-repeat=\"(key,value) in dossier.changes\">\n" +
    "{{key|date:'dd. MMM yyyy'}}\n" +
    "</li>\n" +
    "</ul>\n" +
    "\n" +
    "<h2>Activities</h2>\n" +
    "<div ng-repeat=\"activity in dossier.activities\">\n" +
    "<h3>{{activity.type}}</h3>\n" +
    "<a ng-repeat=\"doc in activity.docs\" ng-href=\"{{doc.url}}\">\n" +
    "      <md-button md-no-ink class=\"md-primary\">{{doc.title}}</md-button>\n" +
    "</a>\n" +
    "</div>\n" +
    "<h2>Votings</h2>\n" +
    "\n" +
    "<div ng-repeat=\"voting in votings.data\" layout=\"row\" tyle=\"width:600px\">\n" +
    "<span class=\"flex-10\" style=\"color:green\"> 👍{{voting.For.total}}</span>\n" +
    "<span class=\"flex-10\"  style=\"color:red\">👎{{voting.Against.total}}</span>\n" +
    "<span class=\"flex-70\" ui-sref=\"votesget({voteid:voting.voteid})\"  > {{voting.title}}</span>\n" +
    "<span class=\"flex-10\"  >\n" +
    "{{voting.voteid}}\n" +
    "\n" +
    "</div>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "\n" +
    "<hr/>\n" +
    "<pre>\n" +
    "\n" +
    "<json-formatter json=\"votings\" open=\"1\"></json-formatter>\n" +
    "</pre>\n" +
    "</div>\n" +
    "")

$templateCache.put("../public/modules/dossier/list.html","<md-content>\n" +
    "<md-list  ng-cloak>\n" +
    "  <md-subheader class=\"md-no-sticky\">Dossiers</md-subheader>\n" +
    "  <div infinite-scroll='loadMore()' infinite-scroll-distance='2'>\n" +
    "\n" +
    "  <md-list-item ng-repeat=\"item in dossiers.data track by $index\" ui-sref=\"dossierget({dossierid:item._id})\">\n" +
    "        <div class=\"md-list-item-text\">\n" +
    "          <h3 style=\"argin-bottom:0\">{{ item.procedure.title }}</h3>\n" +
    "	<span ng-repeat=\"committee in item.committees\" ng-if=\"committee.rapporteur\">{{committee.rapporteur[0].name}}, </span>\n" +
    "	  <p ng-repeat=\"subject in item.procedure.subject\" style=\"margin-top:0\">\n" +
    "	  {{subject}}\n" +
    "	  </p>\n" +
    "	</div>\n" +
    "  </md-list-item>\n" +
    "  </div>\n" +
    "</md-list>\n" +
    "</md-content>\n" +
    "<!--\n" +
    "<div ng-repeat=\"item in dossiers.data\">\n" +
    "{{item.procedure.title}}\n" +
    "<div ng-repeat=\"subject in item.procedure.subject\">\n" +
    "{{subject}}\n" +
    "</div>\n" +
    "-->\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("../public/modules/mep/index.html","<div>\n" +
    "<md-progress-linear ng-if=\"loading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "\n" +
    "<img ng-src=\"{{mep.Photo}}\" style=\"float:left;margin:2px;transform: scale(0.8);\"/><!-- 170x215-->\n" +
    "<h2>{{mep.Name.full}}</h2>\n" +
    "<p>{{mep.Birth.date|date:'dd. MMMM yyyy'}}, {{mep.Birth.place}}</p>\n" +
    "<div class=\"sozialbuttons\">\n" +
    "<a ng-repeat=\"mail in mep.Mail\" href=\"mailto:{{mail}}\" title=\"{{mail}}\"><img src=\"icons/email.jpg\"/></a>\n" +
    "<a ng-repeat=\"site in mep.Homepage\" ng-href=\"{{site}}\" title=\"{{site}}\"><img src=\"icons/www.jpg\"/></a>\n" +
    "<a ng-repeat=\"site in mep.Facebook\" ng-href=\"{{site}}\" title=\"Facebook\"><img src=\"icons/facebook.jpg\"/></a>\n" +
    "<a ng-repeat=\"site in mep.Twitter\" ng-href=\"{{site}}\" title=\"Twitter\"><img src=\"icons/twitter.jpg\"/></a>\n" +
    "</div>\n" +
    "\n" +
    "<ul>\n" +
    "<li ng-repeat=\"item in mep.Groups\">\n" +
    "<b>{{item.groupid}}</b> {{item.Organization}}\n" +
    "</li>\n" +
    "</ul>\n" +
    "\n" +
    "<div>{{mep.CV[0]}}</div>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<md-card>\n" +
    "<cal mep=\"mep\" onselect=\"select(day)\"></cal>\n" +
    "</md-card>\n" +
    "\n" +
    "\n" +
    "<br/>\n" +
    "<br/>\n" +
    "  <md-content>\n" +
    "    <md-tabs md-dynamic-height md-border-bottom>\n" +
    "      <md-tab label=\"{{topic}}\" ng-repeat=\"topic in ['Committees','Delegations']\">\n" +
    "        <md-content class=\"md-padding\">\n" +
    "	<li ng-repeat=\"item in mep[topic]\">\n" +
    "		<b>{{item.abbr}}</b>\n" +
    "		{{item.Organization}}\n" +
    "	</li>\n" +
    "	</md-content>\n" +
    "      </md-tab>\n" +
    "    </md-tabs>\n" +
    "  </md-content>\n" +
    "\n" +
    "<!--\n" +
    "<div ng-repeat=\"topic in ['Committees','Delegations']\">\n" +
    "<h3>{{topic}}</h3>\n" +
    "<hr/>\n" +
    "<ul>\n" +
    "<li ng-repeat=\"item in mep[topic]\">\n" +
    "{{item.Organization}}\n" +
    "</li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "-->\n" +
    "<br/>\n" +
    "<br/>\n" +
    "<!--\n" +
    "  <md-content>\n" +
    "    <md-tabs md-dynamic-height md-border-bottom>\n" +
    "      <md-tab label=\"{{key}}\" ng-repeat=\"(key,value) in mep.activities\">\n" +
    "        <md-content class=\"md-padding\">\n" +
    "<md-list  ng-cloak>\n" +
    "  <md-list-item class=\"secondary-button-padding\" ng-href=\"{{item.titleUrl}}\" ng-repeat=\"item in value['8']\">\n" +
    "    <p>{{item.date | date:'dd. MMM yyyy'}} {{item.title}}</p>\n" +
    "    <md-button ng-repeat=\"format in item.formatList\" class=\"d-secondary\" ng-href=\"{{format.url}}\">{{format.type}}</md-button>\n" +
    "  </md-list-item>\n" +
    "</md-list>\n" +
    "\n" +
    "	</md-content>\n" +
    "      </md-tab>\n" +
    "    </md-tabs>\n" +
    "  </md-content>\n" +
    "-->\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<h1>votings</h1>\n" +
    "<!--\n" +
    "<div ng-repeat=\"voting in votings |orderBy:'ts'\" class=\"{{voting.vote}}\">\n" +
    "{{voting.ts|date :'dd. MMM yyyy'}} {{voting.title}}\n" +
    "</div>\n" +
    "<pre>\n" +
    "</pre>\n" +
    "-->\n" +
    "</div>\n" +
    "")

$templateCache.put("../public/modules/mep/list.html","<md-progress-linear ng-if=\"loading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "    <div layout=\"row\">\n" +
    "\n" +
    "      <md-input-container style=\"margin-right: 10px;\">\n" +
    "\n" +
    "        <md-select ng-model=\"selectedCountry\" placeholder=\"select country\">\n" +
    "          <md-option ng-repeat=\"(key,value) in countries\" value=\"{{key}}\">\n" +
    "            {{key}}\n" +
    "          </md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "      <md-input-container style=\"margin-right: 10px;\">\n" +
    "        <md-select ng-model=\"selectedParty\" placeholder=\"select party\">\n" +
    "          <md-option ng-repeat=\"(key,value) in parties\" value=\"{{key}}\">\n" +
    "            {{key}}\n" +
    "          </md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "      <md-input-container style=\"margin-right: 10px;\">\n" +
    "	 <label>Search by name</label>\n" +
    "        <input>\n" +
    "      </md-input-container>\n" +
    "      <md-input-container>\n" +
    "	<md-button class=\"md-raised md-primary\">search</md-button>\n" +
    "      </md-input-container>\n" +
    "</div>\n" +
    "\n" +
    "<md-container>\n" +
    "      <md-list flex infinite-scroll='loadMore()' infinite-scroll-distance='2'>\n" +
    "        <md-subheader class=\"md-no-sticky\">3 line item</md-subheader>\n" +
    "        <md-list-item class=\"md-3-line\"  ng-repeat=\"mep in meps.data\" ui-sref=\"mepsget({userid:mep.UserID})\">\n" +
    "		<img class=\"md-avatar\" alt=\"{{mep.Name.full}}\" ng-src=\"{{mep.Photo}}\" />\n" +
    "		<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "\n" +
    "	<h3>{{mep.Name.full}} \n" +
    "	<img src=\"{{mep.Groups[0].country|flag}}\" style=\"height:20px\" title=\"{{mep.Groups[0].country}}\"/>\n" +
    "	</h3>\n" +
    "\n" +
    "	<h4> {{mep.Birth.date | date:'dd. MMM yyyy'}}, {{mep.Birth.place}}</h4>\n" +
    "	  <div flex><img style=\"height:20px\" ng-src=\"{{mep.Groups[0].groupid|partylogo}}\" title=\"{{mep.Groups[0].groupid}}\"/>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "	</md-list-item>\n" +
    "      </md-list>\n" +
    "\n" +
    "</md-container>\n" +
    "\n" +
    "\n" +
    "<!--\n" +
    "<md-container>\n" +
    "  <div infinite-scroll='loadMore()' infinite-scroll-distance='2'>\n" +
    "	<div layout=\"row\" ng-repeat=\"mep in meps.data\" ui-sref=\"mepsget({userid:mep.UserID})\">\n" +
    "	  <div flex=\"10\" ng-style=\"{'border-left':'6px solid '+parties[mep.Groups[0].groupid].color}\">\n" +
    "	<img style=\"height:120px;margin:0px;transform:scale(0.5)\" ng-src=\"{{mep.Photo}}\" />\n" +
    "	</div>\n" +
    "	  <div flex>\n" +
    "	<h3>{{mep.Name.full}} \n" +
    "\n" +
    "	<img src=\"{{mep.Groups[0].country|flag}}\" style=\"height:20px\" title=\"{{mep.Groups[0].country}}\"/>\n" +
    "	</h3>\n" +
    "\n" +
    "	<p> {{mep.Birth.date | date:'dd. MMM yyyy'}}, {{mep.Birth.place}}</p>\n" +
    "		</div>\n" +
    "	  <div flex><img style=\"height:50px\" ng-src=\"{{mep.Groups[0].groupid|partylogo}}\" title=\"{{mep.Groups[0].groupid}}\"/>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "</md-container>\n" +
    "-->\n" +
    "<!--\n" +
    "<div ng-repeat=\"mep in meps.data\" ui-sref=\"mepsget({userid:mep.UserID})\">\n" +
    "<img style=\"float:left;height:50px;margin:10px;\" ng-src=\"{{mep.Photo}}\" />\n" +
    "<h3>{{mep.Name.full}}\n" +
    "<img src=\"{{mep.Groups[0].country|flag}}\" style=\"height:20px\" title=\"{{mep.Groups[0].country}}\"/>\n" +
    "</h3>\n" +
    "<p> {{mep.Birth.date | date:'dd. MMM yyyy'}}, {{mep.Birth.place}}</p>\n" +
    "<br/>\n" +
    "<img style=\"height:50px\" ng-src=\"{{mep.Groups[0].groupid|partylogo}}\" title=\"{{mep.Groups[0].groupid}}\"/>\n" +
    "</div>\n" +
    "{{meps}}\n" +
    "-->\n" +
    "")

$templateCache.put("../public/modules/vote/index.html","<div>\n" +
    "<md-progress-linear ng-if=\"loading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "\n" +
    "    <div ui-sref=\"dossierget({dossierid:voteresult.dossierid})\">\n" +
    "        <h1>{{voteresult.title}}</h1>\n" +
    "        <p>{{voteresult.eptitle}}</p>\n" +
    "        <p>{{voteresult.ts|date:'dd. MMMM yyyy'}}</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-repeat=\"type in ['For','Against','Abstain']\">\n" +
    "        <h1 ng-click=\"open=!open\">{{type}} {{voteresult[type].total}}</h1>\n" +
    "<md-tabs md-dynamic-height md-border-bottom >\n" +
    "      <md-tab label=\"{{party.group}}\" ng-repeat=\"party in voteresult[type].groups\" md-on-select=\"selectParty(party)\">\n" +
    "\n" +
    "      </md-tab>\n" +
    "</md-tabs>\n" +
    "        <md-card g-repeat=\"group in voteresult[type].groups\">\n" +
    "	  <md-content class=\"md-padding autocomplete\" layout=\"column\" ng-class=\"type\">\n" +
    "\n" +
    "                <md-card-title>\n" +
    "                    <md-card-title-text >\n" +
    "                        <span class=\"md-headline\">{{group.group}} {{group.votes.length}}</span>\n" +
    "                    </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "\n" +
    "                <div class=\"md-media-lg card-media\">\n" +
    "    <md-contact-chips\n" +
    "        ng-model=\"ctrl.contacts\"\n" +
    "        md-contacts=\"ctrl.querySearch($query)\"\n" +
    "        md-contact-name=\"name\"\n" +
    "        md-contact-image=\"image\"\n" +
    "        md-contact-email=\"email\"\n" +
    "        md-require-match=\"true\"\n" +
    "        md-highlight-flags=\"i\"\n" +
    "        filter-selected=\"ctrl.filterSelected\"\n" +
    "        placeholder=\"To\">\n" +
    "    </md-contact-chips>\n" +
    "                    <md-list class=\"fixedRows\">\n" +
    "                        <md-list-item class=\"md-2-line contact-item\" ng-repeat=\"vote in group.votes\" style=\"display:inline-block;in-width:160px\" ui-sref=\"mepsget({'userid':vote.ep_id})\">\n" +
    "                            <img ng-src=\"http://www.europarl.europa.eu/mepphoto/{{vote.ep_id}}.jpg\" class=\"md-avatar\" alt=\"{{vote.userid}}\"  />\n" +
    "                            <div class=\"md-list-item-text compact\">\n" +
    "                                <h3>{{vote.name}}</h3>\n" +
    "                            </div>\n" +
    "                        </md-list-item>\n" +
    "                    </md-list>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "	</md-content>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "<!--\n" +
    "	<div>\n" +
    "	<div ng-repeat=\"for in voteresult[type]\">\n" +
    "	<div ng-repeat=\"group in for track by $index\">\n" +
    "	<h2>{{group.group}}</h2>\n" +
    "	<span ng-repeat=\"vote in group.votes\" ui-sref=\"mepsget({'userid':vote.userid})\">\n" +
    "	<img style=\"height:30px;\" ng-src=\"http://www.europarl.europa.eu/mepphoto/{{vote.userid}}.jpg\"/>\n" +
    "	{{vote.name}}\n" +
    "	</span>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "	<hr/>\n" +
    "	</div>\n" +
    "-->\n" +
    "</div>\n" +
    "")

$templateCache.put("../public/modules/vote/list.html","<div style=\"position:relative\">\n" +
    "<md-progress-linear style=\"position:absolute\" ng-if=\"loading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "</div>\n" +
    "<md-content>\n" +
    "<input ng-model=\"searchstring\"/><md-button ng-click=\"search()\">seach</md-button>\n" +
    "<md-list  ng-cloak>\n" +
    "  <md-subheader class=\"md-no-sticky\">Votings</md-subheader>\n" +
    "  <div infinite-scroll='loadMore()' infinite-scroll-distance='2'>\n" +
    "\n" +
    "<div ng-repeat=\"report in reports\">\n" +
    "<md-card>\n" +
    "     <md-card-title>\n" +
    "          <md-card-title-text>\n" +
    "            <span class=\"md-headline\">{{report.items[0].ts|date:\"dd. MMM yyyy\"}}<b> {{report.items[0].eptitle}}</b></span>\n" +
    "            <span class=\"md-subhead\">{{report.title}}</span>\n" +
    "		<md-button ui-sref=\"dossierget({dossierid:report.items[0].dossierid})\">dossier</md-button>\n" +
    "          </md-card-title-text>\n" +
    "          <md-card-title-media>\n" +
    "            <div class=\"md-media-lg card-media\">\n" +
    "	<img ng-repeat=\"rapporteur in report.items[0].rapporteur\" ui-sref=\"mepsget({'userid':rapporteur.ref})\"\n" +
    "ng-src=\"http://www.europarl.europa.eu/mepphoto/{{rapporteur.ref}}.jpg\" style=\"height:140px;width:120px;\"/>\n" +
    "		</div>\n" +
    "          </md-card-title-media>\n" +
    "        </md-card-title>\n" +
    "        <md-card-content>\n" +
    "\n" +
    "\n" +
    "	<div ayout=\"row\" tyle=\"max-width:1000px\">\n" +
    "	\n" +
    "	<div lex=\"33\" ng-style=\"item.passed==true ? {'background-color':'rgba(0,255,0,0.1)'}:{'background-color':'rgba(255,0,0,0.1)'}\" style=\"min-width:300px;border:0px solid black;margin:15px;display:inline-block\"  ng-repeat=\"item in report.items| orderBy:'ts':false\" ui-sref=\"votesget({voteid:item.voteid})\" title=\"{{item.ts|date:'HH:mm:ss'}}\">\n" +
    "	<div style=\"position:relative\">\n" +
    "		<div style=\"position:absolute;right:5px;top:11px\">\n" +
    "			<span style=\"color:green\">{{item.For.total}}</span>\n" +
    "			<span style=\"color:red\">{{item.Against.total}}</span>\n" +
    "			<span style=\"color:grey\">{{item.Abstain.total}}</span>\n" +
    "		</div>\n" +
    "		<div >\n" +
    "		<div class=\"resultbar For\" style=\"left:0;width:{{item.For.percent }}%;\"></div>\n" +
    "		<div class=\"resultbar Against\" style=\"left:{{item.For.percent}}%;width:{{item.Against.percent}}%;\"></div>\n" +
    "		<div class=\"resultbar Abstain\" style=\"left:{{0+item.For.percent + item.Against.percent}}%;width:{{item.Abstain.percent}}%;\"></div>\n" +
    "		</div>\n" +
    "<div class=\"title\">{{item.subtitle}}</div>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "	<br/>\n" +
    "	<br/>\n" +
    "        </md-card-content>\n" +
    "</md-card>\n" +
    "<br/>\n" +
    "<br/>\n" +
    "</div>\n" +
    "</div>\n" +
    "<!--\n" +
    "  <md-list-item ng-repeat=\"item in list.data\" ui-sref=\"votesget({voteid:item.voteid})\">\n" +
    "        <div class=\"md-list-item-text\">\n" +
    "          <h3 style=\"argin-bottom:0\">{{ item.title }}</h3>\n" +
    "          <p style=\"margin-top:0\">\n" +
    "          <i>{{item.ts|date:\"dd. MMM yyyy\"}}</i> {{item.eptitle}}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "  </md-list-item>\n" +
    "</md-list>\n" +
    "-->\n" +
    "</md-content>\n" +
    "\n" +
    "")
}]);
})();