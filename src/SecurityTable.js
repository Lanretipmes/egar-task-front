import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableInlineCellEditing,
    TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import {EditingState, SelectionState} from "@devexpress/dx-react-grid";
import {GridComponent} from "@syncfusion/ej2-react-grids"
import {Plugin, Template, TemplatePlaceholder} from "@devexpress/dx-react-core";
import {withStyles} from "@material-ui/core";


function SecurityTable(props) {

    const getRowId = row => row.id;

    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'date', title: 'Date' },
        { name: 'name', title: 'Security' },
        { name: 'cost', title: 'Cost' },
    ];

    const [rows, setRows] = useState(props.data);

    const [startEditAction, setStartEditAction] = useState('click');
    const [selection, setSelection] = useState([-1]);
    const [selectTextOnEditStart, setSelectTextOnEditStart] = useState(true);


    const EditPropsPanel = props => (
        <Plugin name="EditPropsPanel">
            <Template name="toolbarContent">
                <TemplatePlaceholder/>
            </Template>
        </Plugin>
    );

    const FocusableCell = ({ onClick, ...restProps }) => (
        <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
    );

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

    return (
        <Paper>
            <Grid
                rows={props.data}
                columns={columns}
                getRowId={getRowId}
            >
                <SelectionState
                    selection={selection}
                    onSelectionChange={setSelection}
                    />
                <Table />
                <EditingState onCommitChanges={commitChanges} />
                <Table cellComponent={FocusableCell} />
                <TableHeaderRow />
                <Toolbar />
                <EditPropsPanel
                    defaultAction={startEditAction}
                    changeAction={setStartEditAction}
                    isSelectText={selectTextOnEditStart}
                    changeSelectText={setSelectTextOnEditStart}
                />
                <TableInlineCellEditing
                    startEditAction={startEditAction}
                    selectTextOnEditStart={selectTextOnEditStart}
                />
            </Grid>
        </Paper>
    )
}

export default SecurityTable;

