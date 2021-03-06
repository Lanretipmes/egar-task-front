import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditColumn,
    TableEditRow,
} from '@devexpress/dx-react-grid-material-ui';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const getRowId = row => row.id;

const FocusableCell = ({ onClick, row, ...restProps}) => (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const SecurityTable = (props) => {
    const [open, setOpen] = useState(false);

    const [newDate, setNewDate] = useState("");
    const [newSecurity, setNewSecurity] = useState("");
    const [newCost, setNewCost] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (event) => {
        setNewDate(event.target.value);
    };

     const handleSecurityChange = (event) => {
        setNewSecurity(event.target.value);
    };

     const handleCostChange = (event) => {
        setNewCost(event.target.value);
    };

    const data = props.data;

    const [editingRowIds, setEditingRowIds] = useState([]);
    const [addedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [deletedRowIds, setDeletedRowIds] = useState([]);
    const [editingStateColumnExtensions] = useState([
        { columnName: 'id', editingEnabled: false },
    ]);


    const commitChanges = ({changed, deleted }) => {
        let selectedRow;
        if (changed){
            data.filter(row => row.id === editingRowIds[0]).forEach(row => selectedRow = row);
            selectedRow = {...selectedRow, ...rowChanges[editingRowIds[0]]};
            props.updateRow(selectedRow);
        }
        if (deleted){
            const deletedSet = new Set(deleted);
            data.filter(row => deletedSet.has(row.id)).forEach(row => selectedRow = row);
            props.deleteRow(selectedRow);
        }
    };

    const onApply = () => {
        if (newDate !== "" && newSecurity !== "" && newCost !== "") {
            let newRow = {date: newDate, name: newSecurity, cost: newCost};
            props.addRow(newRow);
            setOpen(false);
        }
        else alert("Incorrect data");
    };


        const columns = [
            { name: 'id', title: 'ID' },
            { name: 'date', title: 'Date' },
            { name: 'name', title: 'Security' },
            { name: 'cost', title: 'Cost' },
        ];

        return (
        <Paper>
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <TextField
                            margin="normal"
                            name="date"
                            label="Date"
                            value={newDate}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleDateChange}
                        />
                        <TextField
                            margin="normal"
                            name="security"
                            label="Security"
                            value={newSecurity}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleSecurityChange}
                        />
                        <TextField
                            margin="normal"
                            name="cost"
                            label="Cost"
                            value={newCost}
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleCostChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onApply}>Add security</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Grid
                rows={props.data}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                    rowChanges={rowChanges}
                    onRowChangesChange={setRowChanges}
                    onAddedRowsChange={handleClickOpen}
                    addedRows={addedRows}
                    editingRowIds={editingRowIds}
                    onEditingRowIdsChange={setEditingRowIds}
                    deletedRowIds={deletedRowIds}
                    onDeletedRowIdsChange={setDeletedRowIds}
                    columnExtensions={editingStateColumnExtensions}
                />
                <Table cellComponent={FocusableCell}/>
                <TableHeaderRow/>
                <TableEditRow/>
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                />
            </Grid>
        </Paper>
        )
};

export default SecurityTable;
