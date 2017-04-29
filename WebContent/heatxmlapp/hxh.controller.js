sap.ui.controller("heatxmlapp.hxh", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf heatxmlapp.hxh
*/
	onInit: function() {
		
		this.oPage = this.byId("p");
        //Set model for system growth chart
        var oData = {
            "results": [{
                "Country": "Italy",
                "Penetration": "0.80"
            }, {
                "Country": "USA",
                "Penetration": "0.68"
            }, {
                "Country": "Portugal",
                "Penetration": "0.48"
            }, {
            	"Country": "China",
            	"Penetration": "0.19"
            },{
            	"Country": "Japan",
            	"Penetration": "0.25"
            }, {
                "Country": "Spain",
                "Penetration": "0.97"
            }, {
                "Country": "Germany",
                "Penetration": "0.30"
            }]
        };
        
        this._chartModel = new sap.ui.model.json.JSONModel(oData);
        this.getView().setModel(this._chartModel, 'SalesByCountry');

      //Create dimension 
        var aDimensionDefinitions = [{
            name: "Country",
            value: "{Country}"
        }];
        var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
            'uid': "categoryAxis",
            'type': "Dimension",
            'values': ["Country"]
        });
        
        var aMeasuresDefinitions = [];
        var aMeasureValues = [];
        var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
            'uid': "color",
            'type': "Measure"
        });
        var sMeasureUnit = "%";
        var oMeasure = new sap.viz.ui5.data.MeasureDefinition({
            name: 'Penetration',
            value: {
                path: 'Penetration'
            }
        });
        aMeasuresDefinitions.push(oMeasure);
        aMeasureValues.push('Penetration');
        feedValueAxis.setValues(aMeasureValues);
        // create a VizFrame
        var oVizFrame = new sap.viz.ui5.controls.VizFrame({
            vizType: "heatmap"
        });

        oVizFrame.setModel(this._chartModel);
        //Create dataSet
        var oDataset = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: aDimensionDefinitions,
            measures: aMeasuresDefinitions,
            data: {
                path: "/results",
                events: {
                    dataReceived: function(oEvent) {}
                }
            }
        });
        var oPopOver = new sap.viz.ui5.controls.Popover();
        oVizFrame.setDataset(oDataset);

        oVizFrame.setVizProperties({
            legend: {
              formatString:[["0%"]]
            },
            plotArea: {
                dataLabel: { visible: true }
            },
            dataLabel: {
              formatString: [["0%"]],
              visible: true
            },
            title: {
                visible: false
            }
            
        });
        
        var scales = [{
     				'feed': 'color',
            'numOfSegments': 6,
            'legendValues': [0,0.2,0.4,0.6,0.8,1],
            "palette": ["sapUiChartPaletteSequentialHue2Light3", 			
            						"sapUiChartPaletteSequentialHue2Light1", 
                        "sapUiChartPaletteSequentialHue2",
                        "sapUiChartPaletteSequentialHue2Dark2",
                        "sapUiChartPaletteSequentialHue3Dark2",
                        "sapUiChartPaletteSequentialNeutral"]
				}];
				oVizFrame.setVizScales(scales);
        
        oVizFrame.addFeed(feedValueAxis);
        oVizFrame.addFeed(feedCategoryAxis);
        oPopOver.connect(oVizFrame.getVizUid());
        this.oPage.addContent(oVizFrame);
        
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf heatxmlapp.hxh
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf heatxmlapp.hxh
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf heatxmlapp.hxh
*/
//	onExit: function() {
//
//	}

});