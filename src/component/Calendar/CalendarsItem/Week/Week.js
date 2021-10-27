import React from 'react';
import { connect } from 'react-redux';

import { SelectOutlined} from '@ant-design/icons';

import classes from './Week.module.css';


const week = [
    {
        title: 'Project'
    },
    {
        title: 'Su'
    },
    {
        title: 'Mo'
    },
    {
        title: 'Tu'
    },
    {
        title: 'We'
    },
    {
        title: 'Th'
    },
    {
        title: 'Fr'
    },
    {
        title: 'Sa'
    },
];

const Week = (props) => {

    let result = ["Project"];

    if (props.weekdate.length !== 0) {
        for (let i = 1; i < 8; i++) {
            result.push(week[i].title + "," + props.weekdate[i - 1]);
        }
    } else {
        for (let i = 1; i < 8; i++) {
            result.push(week[i].title);
        }
    }

    // console.log(result)

    return (
        <React.Fragment>
            <div className={classes.background}>
                {result.map(
                    item => (
                        <div key={item} className={classes.body}>{item}</div>
                    )
                )}
                <div className={classes.choice} ><SelectOutlined size="large"/></div>

            </div>
        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        weekdate: state.timesheet.weekDate
    };
}




export default connect(mapStateToProps, null)(Week);
