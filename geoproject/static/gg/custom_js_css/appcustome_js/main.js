(function () {
    angular.module("chartsApp", ['ng-fusioncharts', 'ui.grid']).directive("convertTable", function () {
        return {
            link: function (scope, element, attrs) {
                scope.pctFormat = function (value, data, cell, row, options) { //plain text value
                    return value + "%";
                };
                //############# column configuration for page 7 big table#################
                $(element).tabulator({
                    fitColumns: true
                    , columns: [{
                            title: "id"
                            , field: "id"
                            , align: "right"
                            , sorter: "number"
                    }, {
                            title: "brand"
                            , field: "name"
                    }, {
                            title: "percentage"
                            , field: "pct"
                            , align: "center"
                            , formatter: "progress"
                    }, {
                            title: "percentage"
                            , field: "pct"
                            , align: "center"
                            , formatter: scope.pctFormat
                    }, {
                            title: "count"
                            , field: "count"
                    }
                        , {
                            title: "nb"
                            , field: "count"
                        }]
                , })
                $(element).tabulator("setData", attrs.convertTable);
            }
        }
    }).directive("convertTable2", function () {
        return {
            link: function (scope, element, attrs) {
                scope.pctFormat = function (value, data, cell, row, options) { //plain text value
                    return value + "%";
                };
                //########## column configuration for page 4 big table####################
                $(element).tabulator({
                    fitColumns: true
                    , columns: [{
                            title: "brand"
                            , field: "name"
                    }, {
                            title: "percentage"
                            , field: "pct"
                            , align: "center"
                            , formatter: "progress"
                    }, {
                            title: "percentage"
                            , field: "pct"
                            , align: "center"
                            , formatter: scope.pctFormat
                    }, {
                            title: "count"
                            , field: "count"
                    }
                        , {
                            title: "nb"
                            , field: "count"
                        }]
                , })
                $(element).tabulator("setData", attrs.convertTable2);
            }
        }
    }).service("dataService", function ($http) {
        //############### MEthod to get ajax data for provided URL############
        this.getData = function (url) {
            return $http.get(url)
        }
        this.lineChartConfig = function () {
            //############### line chart config################
            return {
                "chart": {
                    "caption": "Daily Visits"
                    , "linethickness": "1"
                    , "showvalues": "0"
                    , "formatnumberscale": "0"
                    , "anchorradius": "2"
                    , "divlinecolor": "666666"
                    , "divlinealpha": "30"
                    , "divlineisdashed": "1"
                    , "labelstep": "2"
                    , "bgcolor": "FFFFFF"
                    , "showalternatehgridcolor": "0"
                    , "labelpadding": "10"
                    , "canvasborderthickness": "1"
                    , "legendiconscale": "1.5"
                    , "legendshadow": "0"
                    , "legendborderalpha": "0"
                    , "canvasborderalpha": "50"
                    , "numvdivlines": "5"
                    , "vdivlinealpha": "20"
                    , "showborder": "0"
                }
                , "categories": [
                    {
                        "category": []
        }
    ]
                , "dataset": []
            }
        }
        this.funnelChartConfig = function () {
            ////############### pyramid chart config#################
            return {
                "chart": {
                    "caption": ""
                    , "subcaption": ""
                    , "linethickness": "1"
                    , "showvalues": "0"
                    , "formatnumberscale": "0"
                    , "anchorradius": "2"
                    , "divlinecolor": "666666"
                    , "divlinealpha": "30"
                    , "divlineisdashed": "1"
                    , "labelstep": "2"
                    , "bgcolor": "FFFFFF"
                    , "showalternatehgridcolor": "0"
                    , "labelpadding": "10"
                    , "canvasborderthickness": "1"
                    , "legendiconscale": "1.5"
                    , "legendshadow": "0"
                    , "legendborderalpha": "0"
                    , "canvasborderalpha": "50"
                    , "numvdivlines": "5"
                    , "vdivlinealpha": "20"
                    , "showborder": "0"
                    , "showtooltip": "1"
                    , "paletteColors": "#46b8da,#993f6c,#cc0000"
                    , labelDisplay: "wrap"
                    , "showLabelsAtCenter": "1"
                    , "baseFontSize": "12"
                    , baseFontColor: "#fff"
                    , "numberSuffix": "$"
                    , "plotToolText": "$label"
                    , showToolTipShadow: "1"
                    , "toolTipBorderColor": "#FFFFFF"
                    , "plottooltext": "<div class='tooltip-custom'>$label</div>"
                    , "showLegend": "1"
                    , "outCnvBaseFontColor": "#8D8D8D"
                , }
                , "data": []
                , "styles": {
                    "definition": [
                        {
                            "name": "myToolTipFont"
                            , "type": "font"
                            , "font": "Arial"
                            , "size": "12"
                            , "color": "FF5904"
      }
    ]
                    , "application": [
                        {
                            "toobject": "ToolTip"
                            , "styles": "myToolTipFont"
      }
    ]
                }
            }
        };
        this.areaChartConfig = function () {
            //############### area chart config###############
            return {
                "chart": {
                    "caption": ""
                    , "subcaption": ""
                    , "plotgradientcolor": ""
                    , "bgcolor": "FFFFFF"
                    , "showalternatehgridcolor": "0"
                    , "showplotborder": "0"
                    , "showvalues": "0"
                    , "labeldisplay": "WRAP"
                    , "divlinecolor": "CCCCCC"
                    , "showcanvasborder": "0"
                    , "canvasborderalpha": "0"
                    , "palettecolors": "990000"
                    , "yaxisvaluespadding": "10"
                    , "showborder": "0"
                }
                , "data": []
            }
        }
        this.circularGraphObject = function () {
            //############### c ircular graph config###############
            return {
                "chart": {
                    "enableSmartLabels": "1"
                    , "chartTopMargin": "0"
                    , "chartRightMargin": "0"
                    , "chartBottomMargin": "0"
                    , "caption": ""
                    , "subCaption": ""
                    , "numberPrefix": ""
                    , "bgColor": "#ffffff"
                    , "showBorder": "0"
                    , "use3DLighting": "0"
                    , "showShadow": "0"
                    , "enableSmartLabels": "0"
                    , "startingAngle": "310"
                    , "showLabels": "0"
                    , "showValues": "1"
                    , "showPercentValues": "1"
                    , "showLegend": "1"
                    , "legendShadow": "0"
                    , "legendPosition": "right"
                    , "legendBorderAlpha": "0"
                    , "defaultCenterLabel": ""
                    , "centerLabel": ""
                    , "centerLabelBold": "0"
                    , "showTooltip": "1"
                    , "decimals": "0"
                    , "captionFontSize": "14"
                    , "subcaptionFontSize": "14"
                    , "subcaptionFontBold": "0"
                    , "useDataPlotColorForLabels": "1"
                    , "legendlabel": "ddd"
                }
                , "data": undefined
            }
        }
    }).controller('rootCtrl', function ($scope, dataService) {
       
       //config variable for pyramid chart 
        $scope.pyCharts = dataService.funnelChartConfig();
        $scope.pyFlag = false;
        $scope.pyramidColors = ["#9BAEBC", "# E65065", "#CB145B"];
        
        // config variable for line chart
        
        $scope.line_flag = false;
        $scope.line_chart = dataService.lineChartConfig();
        
        //config variable for circular graph
        $scope.left_circular = false;
       $scope.firstChart_2 = dataService.circularGraphObject();
        $scope.firstChart_3 = dataService.circularGraphObject();
        
        //reload the graph
        $scope.reloadGraph = function () {
            $scope.createGraph();
        }
        $scope.createGraph = function () {
            dataService.getData("../../static/gg/custom_js_css/custom_json/index.json").then(dataSuccessFull);

            function dataSuccessFull(response) {
                function circularGraphWithoutCaption(response) {
                    var circulargraphData = response;
                    var graphFormatedData = [];
                    var colors = ["#CD0A59", "#E84F63", "#D3D3D3"]
                    for (var i = 0; i < circulargraphData.length; i++) {
                        var obj = circulargraphData[i];
                        graphFormatedData.push({
                            "label": obj.label
                            , "value": obj.count
                            , "color": colors[i % colors.length]
                        })
                    }
                    return graphFormatedData;
                }
                // complete json for the page
                var allData = response.data;
                //****************extracting pyramid chart data***************
                var pyramidData = allData.pyramid1;
                $scope.pyCharts.chart.caption = pyramidData.meta.title
                var funnelData = pyramidData.data.categories;
                var arrData = []
                for (var index = 0; index < funnelData.length; index++) {
                    var obj = funnelData[index];
                    arrData.push({
                        label: obj.label + '{BR} ' + obj.value
                        , value: obj.value
                        , color: $scope.pyramidColors[index % $scope.pyramidColors.length]
                    });
                }
                //**************pyramid chart******************
                $scope.pyCharts.data = arrData;
                $scope.pyFlag = true;
                
                var tableData = response.data.table_small_right1;
                $scope.columns_1 = tableData.columns;
                $scope.data_1 = tableData.rows;
                //*******************line chart***************
                $scope.line_chart.chart.caption = "caption for graph";
                $scope.line_chart.chart.subcaption = "subcaption for graph";
                $scope.line_flag = true;
                $scope.line_chart.categories[0].category = [];
                var lineChartXAxis = response.data.line_graph.xaxis.data;
                lineChartXAxis.forEach(function (item) {
                    $scope.line_chart.categories[0].category.push({
                        "label": item.value
                        , "stepSkipped": false
                    })
                });
                $scope.line_chart.chart.caption = response.data.line_graph.meta.title;
                var line_colors = ["#C72C5E", "#DE3E58", "#A1B1C3"];;
                $scope.line_chart.dataset = [];
                response.data.line_graph.series.forEach(function (item, index) {
                        item.color = line_colors[index % line_colors.length];
                        $scope.line_chart.dataset[index] = item;
                    })
                    //************* bottom tables********
                var alltables = response.data;
                $scope.bottomTable1 = alltables.table_bottom_1;
                $scope.bottomTable2 = alltables.table_bottom_2;
                $scope.bottomTable3 = alltables.table_bottom_3;
                //*************** left circular graph
                var graphConfigLeftCircular = {};
                var graphFormatedData_1 = circularGraphWithoutCaption(response.data.Circular_Graph_left);
                $scope.firstChart_2.data = graphFormatedData_1;
                $scope.firstChart_2.chart.caption = "Circular_Graph1";
                $scope.left_circular = true;
                //*************************************right circular grpah***************
                var graphFormatedData_2 = circularGraphWithoutCaption(response.data.Circular_Graph_right);
                $scope.firstChart_3.data = graphFormatedData_2;
                $scope.firstChart_3.chart.caption = "Circular_Graph1";
                $scope.rightCircular = true;
            }
        }
        $scope.createGraph();
    })
})();