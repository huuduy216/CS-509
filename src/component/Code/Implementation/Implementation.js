import React, { useState, useEffect } from 'react';

import classes from './Implementation.module.css';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const Implementation = (props) => {

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

 
    return (
        <React.Fragment>

                <p className={classes.p}>Implementation</p>
                <Tree
                    showLine
                    className={classes.tree}
                    defaultExpandedKeys={['0-0-0']}
                    switcherIcon={<DownOutlined />}
                    onSelect={onSelect}
                    treeData={[
                        {
                            title: 'Machine Configurations',
                            key: '0-0',
                            children: [
                                {
                                    title: 'CPU',
                                    key: '0-0-0',
                                    children: [
                                        {
                                            title: 'Intel Core i9',
                                            key: '0-0-0-0',
                                            children: [
                                                {
                                                    title: '11900T',
                                                    key: '0-0-0-0-0',
                                                },
                                                {
                                                    title: '11980HK',
                                                    key: '0-0-0-0-1',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    title: 'Cache',
                                    key: '0-0-1',
                                    children: [
                                        {
                                            title: 'L1 Cache',
                                            key: '0-0-1-0',
                                        },
                                    ],
                                },
                                {
                                    title: 'Cores',
                                    key: '0-0-2',
                                    children: [
                                        {
                                            title: 'Single Core',
                                            key: '0-0-2-0',
                                        },
                                    ],
                                },
                            ],
                        },
                    ]
                    }
                />
        </React.Fragment>

    );
};

export default Implementation;