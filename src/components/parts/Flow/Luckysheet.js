import React from 'react';

class Luckysheet extends React.Component {
    state = {
        tmpRowHeight: 0,
        tmp: true,
        c: 0
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
            showtoolbar: false,
            sheetFormulaBar: false,
            rowHeaderWidth: 0,
            columnHeaderHeight: 0,
            defaultColWidth: 200,
            data: this.props.luckysheetData,
            showsheetbarConfig: {
                add: false, //Add worksheet
                menu: false, //Worksheet management menu
                sheet: true //Worksheet display
            },
            hook: {
                // rangeClearBefore: (range, data) => {
                //     for (let index = 0; index < range.length; index++) {
                //         const element = range[index];

                //         if(element.row[0] == 0 || element.row[1] == 0){
                //             return false
                //         }
                //     }
                // },
                // rangeDeleteBefore: (range, data) => {
                //     for (let index = 0; index < range.length; index++) {
                //         const element = range[index];

                //         if(element.row[0] == 0 || element.row[1] == 0){
                //             return false
                //         }
                //     }
                // },
                cellEditBefore: (range) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];

                        if (element.row[0] == 0 || element.row[1] == 0) {
                            return false
                        }
                    }
                },
                // rangeCutBefore: (range, data) => {
                //     for (let index = 0; index < range.length; index++) {
                //         const element = range[index];

                //         if(element.row[0] == 0 || element.row[1] == 0){
                //             return false
                //         }
                //     }
                // },
                updated: (o) => {
                    let onceUndo = 0
                    if (o.type == 'datachange') {
                        if (o.curdata.length >= 1 && onceUndo == 0)
                            if (JSON.stringify(o.curdata[0]) !== JSON.stringify(o.data[0])) {
                                if (this.state.tmp) {
                                    onceUndo++
                                    this.state.tmp = false
                                    luckysheet.undo()
                                    return
                                } else {
                                    this.state.tmp = true
                                }
                            }
                        for (let index = 0; index < o.range.length; index++) {
                            const element = o.range[index];

                            let rowHeights = luckysheet.getRowHeight(element.row)
                            for (let index = element.row[0]; index <= element.row[1]; index++) {
                                rowHeights[index] = "auto"
                            }

                            console.log(rowHeights)

                            luckysheet.setRowHeight(rowHeights)
                        }
                    }
                    this.props.autosave()
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