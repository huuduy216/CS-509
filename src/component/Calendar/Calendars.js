import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios-local';

import classes from './Calendars.module.css';
import CalendarsItem from './CalendarsItem/CalendarsItem'
import CalendarBar from './CalendarsItem/CalendarBar/CalendarBar'

const Calendars = (props) => {

    const [project, setProject] = useState({});

    useEffect(() => {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage["timesheettoken"]
            }
        }
        async function fetchData() {
            const response = await axios.post('/getproject', localStorage['timesheetUsername'], config);
            setProject(response.data);
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <div className={classes.background}>
                <div className={classes.title}>
                    <CalendarBar projectInfo={project} />
                </div>
                <div className={classes.body}>
                    <CalendarsItem projectInfo={project} />
                </div>
            </div>
        </React.Fragment>

    );
};

export default Calendars;