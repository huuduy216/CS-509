import React, { useState, useEffect } from 'react';

import { Table, Tag, Space, Button } from 'antd';

import classes from './BenchmarkEdit.module.css';


const BenchmarkEdit = (props) => {


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'CPU',
            level: 1,
           
        },
        {
            key: '2',
            name: 'Intel Core i9',
            level: 2,
        },
        {
            key: '3',
            name: 'Cache',
            level: 1,
        },
    ];
    return (
        <React.Fragment>
            <Table columns={columns} dataSource={data}  className={classes.table}/>
            <Button type="primary">ADD</Button>

        </React.Fragment>

    );
};

export default BenchmarkEdit;