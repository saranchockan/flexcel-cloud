export const TEMPLATES = {
    OneACOff: {
        "name": "1AC Off", //Worksheet name
        "color": "", //Worksheet color
        "index": 0, //Worksheet index
        "status": 1, //Worksheet active status
        "order": 0, //The order of the worksheet
        "hide": 0,//Whether worksheet hide 
        "row": 60, //the number of rows in a sheet
        "column": 5, //the number of columns in a sheet
        "defaultRowHeight": 19, //Customized default row height
        "defaultColWidth": 200, //Customized default column width
        "celldata": [
            {
                r: 0,
                c: 0,
                v: {
                    v: '1AC',
                    tb: 2,
                    fc: '#8b0000',
                    ht: 0,
                },
            },
            {
                r: 0,
                c: 1,
                v: {
                    v: '1NR',
                    tb: 2,
                    fc: '#8b0000',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 2,
                v: {
                    v: '1AR',
                    tb: 2,
                    fc: '#8b0000',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 3,
                v: {
                    v: '2NR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 4,
                v: {
                    v: '2AR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
        ], //Initial the cell data
        "config": {
            "merge": {}, //merged cells
            "rowlen": {}, //Table row height
            "columnlen": {}, //Table column width
            "rowhidden": {}, //hidden rows
            "colhidden": {}, //hidden columns
            "borderInfo": {}, //borders
            "authority": {}, //Worksheet protection
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable": false,//Whether is pivot table
        "pivotTable": {},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "chart": [], //Chart configuration
        "zoomRatio": 1, // zoom ratio
        "image": [], //image
        "showGridLines": 1, //Whether to show grid lines
        "sizes": null
    },
    OneNROff: {
        "name": "1NR Off", //Worksheet name
        "color": "", //Worksheet color
        "index": 1, //Worksheet index
        "status": 0, //Worksheet active status
        "order": 1, //The order of the worksheet
        "hide": 0,//Whether worksheet hide 
        "row": 60, //the number of rows in a sheet
        "column": 4, //the number of columns in a sheet
        "defaultRowHeight": 19, //Customized default row height
        "defaultColWidth": 200, //Customized default column width
        "celldata": [
            {
                r: 0,
                c: 0,
                v: {
                    v: '1NR',
                    tb: 2,
                    fc: '#8b0000',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 1,
                v: {
                    v: '1AR',
                    tb: 2,
                    fc: '#8b0000',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 2,
                v: {
                    v: '2NR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 3,
                v: {
                    v: '2AR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
        ], //Initial the cell data
        "config": {
            "merge": {}, //merged cells
            "rowlen": {}, //Table row height
            "columnlen": {}, //Table column width
            "rowhidden": {}, //hidden rows
            "colhidden": {}, //hidden columns
            "borderInfo": {}, //borders
            "authority": {}, //Worksheet protection
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable": false,//Whether is pivot table
        "pivotTable": {},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "chart": [], //Chart configuration
        "zoomRatio": 1, // zoom ratio
        "image": [], //image
        "showGridLines": 1, //Whether to show grid lines
        "sizes": null
    },
    OneAROff: {
        "name": "1AR Off", //Worksheet name
        "color": "", //Worksheet color
        "index": 2, //Worksheet index
        "status": 0, //Worksheet active status
        "order": 2, //The order of the worksheet
        "hide": 0,//Whether worksheet hide 
        "row": 60, //the number of rows in a sheet
        "column": 3, //the number of columns in a sheet
        "defaultRowHeight": 19, //Customized default row height
        "defaultColWidth": 200, //Customized default column width
        "celldata": [
            {
                r: 0,
                c: 0,
                v: {
                    v: '1AR',
                    tb: 2,
                    fc: '#8b0000',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 1,
                v: {
                    v: '2NR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 2,
                v: {
                    v: '2AR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
        ], //Initial the cell data
        "config": {
            "merge": {}, //merged cells
            "rowlen": {}, //Table row height
            "columnlen": {}, //Table column width
            "rowhidden": {}, //hidden rows
            "colhidden": {}, //hidden columns
            "borderInfo": {}, //borders
            "authority": {}, //Worksheet protection
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable": false,//Whether is pivot table
        "pivotTable": {},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "chart": [], //Chart configuration
        "zoomRatio": 1, // zoom ratio
        "image": [], //image
        "showGridLines": 1, //Whether to show grid lines
        "sizes": null
    },
    TwoNROff: {
        "name": "2NR Off", //Worksheet name
        "color": "", //Worksheet color
        "index": 3, //Worksheet index
        "status": 0, //Worksheet active status
        "order": 3, //The order of the worksheet
        "hide": 0,//Whether worksheet hide 
        "row": 60, //the number of rows in a sheet
        "column": 2, //the number of columns in a sheet
        "defaultRowHeight": 19, //Customized default row height
        "defaultColWidth": 200, //Customized default column width
        "celldata": [
            {
                r: 0,
                c: 0,
                v: {
                    v: '2NR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
            {
                r: 0,
                c: 1,
                v: {
                    v: '2AR',
                    tb: 2,
                    fc: '#0064FF',
                    ht: 0,
                }
            },
        ], //Initial the cell data
        "config": {
            "merge": {}, //merged cells
            "rowlen": {}, //Table row height
            "columnlen": {}, //Table column width
            "rowhidden": {}, //hidden rows
            "colhidden": {}, //hidden columns
            "borderInfo": {}, //borders
            "authority": {}, //Worksheet protection
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable": false,//Whether is pivot table
        "pivotTable": {},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "chart": [], //Chart configuration
        "zoomRatio": 1, // zoom ratio
        "image": [], //image
        "showGridLines": 1, //Whether to show grid lines
        "sizes": null
    }
}