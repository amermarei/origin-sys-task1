import React from "react";
import "./App.css";
import MaterialTable from "material-table";
import { Fragment } from "react";
import { useState } from "react";
function TableActions({ users, setUsers }) {
    let [selectedRow, setSelectedRow] = useState([]);
    const columns = [
        {
            title: "ID",
            field: "id",
            align: "left",
        },
        {
            title: "Name",
            field: "first_name",
            align: "left",
        },
        {
            title: "Gender",
            field: "gender",
            align: "left",
        },
        {
            title: "Email",
            field: "email",
            align: "left",
        },
        {
            title: "Birth Day",
            field: "date_of_birth",
            align: "left",
        },
    ];

    let hundleDelete = () => {
        let updatedData = users.filter((row) => !selectedRow.includes(row));
        setUsers(updatedData);
    };
    return (
        <Fragment>
            <MaterialTable
                title="Users Data"
                data={users}
                columns={columns}
                align="left"
                onSelectionChange={(row) => setSelectedRow(row)}
                editable={{
                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            const index = selectedRow.tableData.id;
                            const updateRow = [...users];
                            updateRow.splice(index, 1);
                            setTimeout(() => {
                                setUsers(updateRow);
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (updateRow, oldRow) =>
                        new Promise((resolve, reject) => {
                            let index = oldRow.tableData.id;
                            let updateRows = [...users];
                            updateRows[index] = updateRow;
                            setTimeout(() => {
                                setUsers(updateRows);
                                resolve();
                            }, 1000);
                        }),
                    onBulkUpdate: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            let Rows = Object.values(selectedRow);
                            let updatedRows = [...users];
                            let index;
                            Rows.map((user) => {
                                index = user.oldData.tableData.id;
                                updatedRows[index] = user.newData;
                            });
                            setUsers(updatedRows);
                            resolve();
                        }),
                }}
                options={{
                    actionsColumnIndex: -1,
                    filtering: true,
                    selection: true,
                    exportButton: true,
                    exportAllData: true,
                    grouping: true,
                    rowStyle: {
                        backgroundColor: "#EEE",
                    },
                    headerStyle: {
                        backgroundColor: "#01579b",
                        color: "#FFF",
                    },
                }}
                actions={[
                    {
                        icon: "delete",
                        tooltip: "Delete Rows",
                        onClick: () => hundleDelete(),
                    },
                ]}
            />
        </Fragment>
    );
}

export default TableActions;
