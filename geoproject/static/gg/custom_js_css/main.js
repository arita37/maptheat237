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
                    , "legendposition": "up"
                    , "canvasborderalpha": "50"
                    , "numvdivlines": "5"
                    , "vdivlinealpha": "20"
                    , "showborder": "0"
                }
                , "categories": [
                    {
                        "category": [

            ]
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
        /***************creating pyramid chart start*********************/
        $scope.pyCharts = dataService.funnelChartConfig();
        $scope.pyFlag = false;
        $scope.pyramidColors = ["#9BAEBC", "# E65065", "#CB145B"];
        var promise = dataService.getData("https://raw.githubusercontent.com/mahesh-pal/mahesh-pal.github.io/master/pyChart.json").then(function (response) {
            $scope.pyCharts.chart.caption = response.data.pyramid1.meta.title
            var sum = 0;
            var funnelData = response.data.pyramid1.data.categories;
            var arrData = []
            for (var index = 0; index < funnelData.length; index++) {
                var obj = funnelData[index];
                arrData.push({
                    label: obj.label + '{BR} ' + obj.value
                    , value: obj.value
                    , color: $scope.pyramidColors[index % $scope.pyramidColors.length]
                });
            }
            $scope.pyCharts.data = arrData;
            $scope.pyFlag = true;
        });
        /*******************pyramisd chart end***************************/
        //*****************page 1 first row top right table start*****************
        dataService.getData("https://raw.githubusercontent.com/mahesh-pal/mahesh-pal.github.io/master/bigTable.json").then(function (response) {
            var table = response.data.table1;
            $scope.columns_1 = table.columns;
            $scope.data_1 = table.rows;
        });
        //************************table end********************
        //************************line chart start*****************
        $scope.flag = false;
        $scope.line_chart = dataService.lineChartConfig();
        $scope.line_chart.chart.caption = "caption for graph";
        $scope.line_chart.chart.subcaption = "subcaption for graph";
        dataService.getData("https://raw.githubusercontent.com/mahesh-pal/mahesh-pal.github.io/master/line-graph.json").then(function (response) {
                var category = [];
                var dataSet = []
                var resArr = response.data.categories;
                var linecolors = ["#C00035", "#DE5762", "#9CAFC4"]
                for (var index = 0; index < resArr.length; index++) {
                    var dataSetObj = {}
                    var obj = resArr[index];
                    category.push({
                        label: obj.label
                    });
                    dataSetObj.seriesname = obj.seriesname;
                    dataSetObj.color = linecolors[index % linecolors.length];
                    dataSetObj.anchorbordercolor = linecolors[index % linecolors.length];
                    dataSetObj.anchorbgcolor = linecolors[index % linecolors.length];
                    dataSetObj.data = obj.data;
                    dataSet.push(dataSetObj);
                }
                $scope.line_chart.dataset = dataSet;
                $scope.line_chart.categories[0].category = category;
                $scope.flag = true;
                //console.log($scope.line_chart)
            })
            //****************line chart end*******************
            //**********circular graph start****************
        function circularGraphWithoutCaption(response) {
            var circulargraphData = response.data.Circular_Graph1;
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
        //**********circular graph end****************
        //*****************************circular groaph start**************************************
        var graphConfig = dataService.circularGraphObject();
        $scope.firstChart_2 = graphConfig;
        var promise = dataService.getData("https://raw.githubusercontent.com/mahesh-pal/mahesh-pal.github.io/master/circular-graph.json").then(function (response) {
            var graphFormatedData = circularGraphWithoutCaption(response);
            graphConfig.data = graphFormatedData;
            graphConfig.chart.caption = "Circular_Graph1";
            $scope.firstChart_2 = graphConfig;
        });
        //***************************
        var graphConfig = dataService.circularGraphObject();
        $scope.firstChart_3 = graphConfig;
        var promise = dataService.getData("https://raw.githubusercontent.com/mahesh-pal/mahesh-pal.github.io/master/circular-graph.json").then(function (response) {
            var graphFormatedData = circularGraphWithoutCaption(response);
            graphConfig.data = graphFormatedData;
            graphConfig.chart.caption = "Circular_Graph1";
            $scope.firstChart_3 = graphConfig;
        });
        //************************************** page 3 tables
        var promise = dataService.getData("https://raw.githubusercontent.com/mahesh-pal/mahesh-pal.github.io/master/bottom-table.json").then(function (response) {
            var alltables = response.data;
            $scope.bottomTable1 = alltables.table_bottom_1;
            $scope.bottomTable2 = alltables.table_bottom_2;
            $scope.bottomTable3 = alltables.table_bottom_3;
            //console.log($scope.alltables);
        });
    })
})();