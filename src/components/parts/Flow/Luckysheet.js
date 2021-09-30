import React from 'react';
class Luckysheet extends React.Component {
    state = {
        tmpRowHeight: 0,
        tmp: true,

    }

    componentDidMount() {
        const luckysheet = window.luckysheet;
        luckysheet.create({
            title: "flow",
            container: "luckysheet",
            showinfobar: false,
            column: 5,
            rows: 40,
            allowCopy: true,
            smoothScroll: true,
            showtoolbar: false,
            showstatisticBar: false,
            showstatisticBarConfig: {
                count: false, // Count bar
                view: false, // Print view
                zoom: false // Zoom
            },
            sheetFormulaBar: false,
            rowHeaderWidth: 0,
            columnHeaderHeight: 0,
            defaultColWidth: 200,
            data: this.props.luckysheetData,
            showsheetbarConfig: {
                add: true, //Add worksheet
                menu: false, //Worksheet management menu
                sheet: true //Worksheet display
            },
            hook: {
                addNewSheet: (c) => {

                    return false
                },
                cellEditBefore: (range) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];

                        if (element.row[0] == 0 || element.row[1] == 0) {
                            return false
                        }
                    }
                },
                cellRenderBefore: (cell, position, sheet, ctx) => {
                    // if(position.r == 1) return false
                }, 
                updated: (o) => {
                    let shouldUndo = false
                    if (this.state.tmp) {
                        if (o.curdata != null && o.curdata.length >= 1)
                            if (JSON.stringify(o.curdata[0]) !== JSON.stringify(o.data[0])) {
                                shouldUndo = true
                            }

                        if (shouldUndo) {
                            this.state.tmp = false
                            luckysheet.undo()
                            return
                        }
                    } else {
                        this.state.tmp = true
                    }

                    if (o.type == 'datachange') {
                        for (let index = 0; index < o.range.length; index++) {
                            const element = o.range[index];

                            let rowHeights = luckysheet.getRowHeight(element.row)
                            for (let index = element.row[0]; index <= element.row[1]; index++) {
                                rowHeights[index] = "auto"
                            }

                            luckysheet.setRowHeight(rowHeights)
                        }
                    }
                },
            },
        });
    }

    render() {
        const luckyCss = {
            margin: '0px',
            padding: '0px',
            height: '100%',
            width: '100%',
            left: '0px',
            top: '0px',
            MozUserSelect: "none",
            WebkitUserSelect: "none",
            msUserSelect: "none"
        }
        return (
            <div
                id="luckysheet"
                style={luckyCss}
            ></div>
        )
    }
}

export default Luckysheet