import React, { useState, useEffect } from "react";
import "./App.css";
import TableActions from "./TableActions"
import axios from "axios";
import { Fragment } from "react";
function Table() {
    let [users, setUsers] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    const fetchAPI = async () => {
        setIsLoading(true);
        let { data } = await axios.get(
            `https://random-data-api.com/api/v2/users?size=50&is_xml=true`
        );
        setIsLoading(false);
        setUsers(data);
    };
    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <Fragment>
            <TableActions users={users} setUsers={setUsers} />
        </Fragment>
    );
}

export default Table;
