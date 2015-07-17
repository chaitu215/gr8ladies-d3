var w=200,h=200,r=h/2,color=d3.scale.ordinal().range(["#FF66CC","#66CCFF","#CCFF66"]),data,totalWomen,totalMen,totalNonBinary,totalEmployees,totalWomenInLeadership,totalMenInLeadership,totalNonBinaryInLeadership,totalInLeadership,femaleDevelopers,maleDevelopers,nonBinaryDevelopers,totalDevelopers,femaleQA,maleQA,totalQA,nonBinaryQA,totals,leadershipTotals,developerTotals,qaTotals,graphPieChart=function(a,b){var c=d3.select(a).append("svg:svg").data([b]).attr("width",w).attr("height",h).append("svg:g").attr("transform","translate("+r+","+r+")"),d=d3.layout.pie().value(function(a){return a.value}),e=d3.svg.arc().outerRadius(r),f=c.selectAll("g.slice").data(d).enter().append("svg:g").attr("class","slice");f.append("svg:path").attr("fill",function(a,b){return color(b)}).attr("d",function(a){return e(a)});var g=d3.select(a).append("svg").attr("class","legend").attr("width",2*r).attr("height",2*r).selectAll("g").data(color.domain().slice().reverse()).enter().append("g").attr("transform",function(a,c){return b[c].value>0?"translate(0,"+20*c+")":void 0});g.append("rect").attr("width",18).attr("height",18).style("fill",color),g.append("text").attr("x",24).attr("y",9).attr("dy",".35em").text(function(a,c){return b[a].value>0?b[a].label+"("+b[a].count+") -- "+b[a].value+"%":void 0})},graphTable=function(a,b,c){var d=d3.select(a).append("table"),e=d.append("thead"),f=d.append("tbody");e.append("tr").selectAll("th").data(["Name","Percentage Women"]).enter().append("th").text(function(a){return a});var g=f.selectAll("tr").data(b).enter().append("tr");g.selectAll("td").data(function(a){return[{column:"name",value:a.name},{column:"percentage",value:a[c]}]}).enter().append("td").attr("style","font-family: Courier").html(function(a){return a.value});return d},formatPercentage=function(a){return Math.round(100*a*10)/10},checkIfValueExists=function(a){return a||0};d3.json("assets/data/data.json",function(a,b){if(totalWomen=_.sum(_.pluck(b,"totalWomen")),totalMen=_.sum(_.pluck(b,"totalMen")),totalNonBinary=_.sum(_.pluck(b,"totalNonBinary")),totalEmployees=totalWomen+totalMen+totalNonBinary,totalWomenInLeadership=_.sum(_.pluck(b,"leadershipWomen")),totalMenInLeadership=_.sum(_.pluck(b,"leadershipMen")),totalNonBinaryInLeadership=_.sum(_.pluck(b,"leadershipNonBinary")),totalInLeadership=totalMenInLeadership+totalWomenInLeadership+totalNonBinaryInLeadership,femaleDevelopers=_.sum(_.pluck(b,"developersWomen")),maleDevelopers=_.sum(_.pluck(b,"developersMen")),nonBinaryDevelopers=_.sum(_.pluck(b,"developersNonBinary")),totalDevelopers=maleDevelopers+femaleDevelopers+nonBinaryDevelopers,femaleQA=_.sum(_.pluck(b,"qaWomen")),maleQA=_.sum(_.pluck(b,"qaMen")),nonBinaryQA=_.sum(_.pluck(b,"nonBinaryQA")),totalQA=maleQA+femaleQA+nonBinaryQA,totals=[{label:"Women",value:formatPercentage(totalWomen/totalEmployees),count:totalWomen},{label:"Men",value:Math.round(totalMen/totalEmployees*100*10)/10,count:totalMen},{label:"Non-binary Gender Identity",value:formatPercentage(totalNonBinary/totalEmployees),count:totalNonBinary}],leadershipTotals=[{label:"Women",value:formatPercentage(totalWomenInLeadership/totalInLeadership),count:totalWomenInLeadership},{label:"Men",value:formatPercentage(totalMenInLeadership/totalInLeadership),count:totalMenInLeadership},{label:"Non-binary Gender Identity",value:formatPercentage(totalNonBinaryInLeadership/totalInLeadership),count:totalNonBinaryInLeadership}],developerTotals=[{label:"Women",value:formatPercentage(femaleDevelopers/totalDevelopers),count:femaleDevelopers},{label:"Men",value:formatPercentage(maleDevelopers/totalDevelopers),count:maleDevelopers},{label:"Non-binary Gender Identity",value:formatPercentage(nonBinaryDevelopers/totalDevelopers),count:nonBinaryDevelopers}],qaTotals=[{label:"Women",value:formatPercentage(femaleQA/totalQA),count:femaleQA},{label:"Men",value:formatPercentage(maleQA/totalQA),count:maleQA},{label:"Non-binary Gender Identity",value:formatPercentage(nonBinaryQA/totalQA),count:nonBinaryQA}],graphPieChart("#pieChartTotals",totals),graphPieChart("#pieChartLeadership",leadershipTotals),graphPieChart("#pieChartDevelopers",developerTotals),graphPieChart("#pieChartQA",qaTotals),_.each(b,function(a){var b=checkIfValueExists(a.totalWomen)+checkIfValueExists(a.totalMen)+checkIfValueExists(a.totalNonBinary);a.totalPercentageWomen=b?formatPercentage(checkIfValueExists(a.totalWomen)/b):0;var c=checkIfValueExists(a.leadershipWomen)+checkIfValueExists(a.leadershipMen)+checkIfValueExists(a.leadershipNonBinary);a.leadershipPercentageWomen=c?formatPercentage(checkIfValueExists(a.leadershipWomen)/c):0;var d=checkIfValueExists(a.developersWomen)+checkIfValueExists(a.developersMen)+checkIfValueExists(a.developersNonBinary);a.developersPercentageWomen=d?formatPercentage(checkIfValueExists(a.developersWomen)/d):0;var e=checkIfValueExists(a.qaWomen)+checkIfValueExists(a.qaMen)+checkIfValueExists(a.qaNonBinary);a.qaPercentageWomen=e?formatPercentage(checkIfValueExists(a.qaWomen)/e):0}),_.compact(_.pluck(b,"totalPercentageWomen")).length<5)d3.select("#tableTotals").text("Fewer than 5 Companies Reporting. Please consider contributing.");else{var c=_.sortByOrder(b,"totalPercentageWomen","desc").slice(0,5);graphTable("#tableTotals",c,"totalPercentageWomen")}if(_.compact(_.pluck(b,"leadershipPercentageWomen")).length<5)+d3.select("#tableLeadership").text("Fewer than 5 Companies Reporting. Please consider contributing.");else{var d=_.sortByOrder(b,"leadershipPercentageWomen","desc").slice(0,5);graphTable("#tableLeadership",d,"leadershipPercentageWomen")}if(_.compact(_.pluck(b,"developersPercentageWomen")).length<5)d3.select("#tableDevelopers").text("Fewer than 5 Companies Reporting. Please consider contributing.");else{var e=_.sortByOrder(b,"developersPercentageWomen","desc").slice(0,5);graphTable("#tableDevelopers",e,"developersPercentageWomen")}if(_.compact(_.pluck(b,"qaPercentageWomen")).length<5)d3.select("#tableQA").text("Fewer than 5 Companies Reporting. Please consider contributing.");else{var f=_.sortByOrder(b,"qaPercentageWomen","desc").slice(0,5);graphTable("#tableQA",f,"qaPercentageWomen")}});