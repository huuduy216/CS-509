import React from 'react';
import classes from './Loading.module.css';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const Loading = (props) => {


    return (
        <React.Fragment>
            <div className={classes.background}>
                <Spin indicator={antIcon} />
                <h1>Loading...</h1>
            </div>
        </React.Fragment >

    );
};

export default Loading;