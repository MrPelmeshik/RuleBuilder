import React from "react";
import './GridField.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import ReactGridLayout from "react-grid-layout";


const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];

export const GridField = () => {
    return <div className={'grid-field'}>
        <ReactGridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
        >
            <div key="a" className={'grid-element'}>a</div>
            <div key="b" className={'grid-element'}>b</div>
            <div key="c" className={'grid-element'}>c</div>
        </ReactGridLayout>
    </div>
}