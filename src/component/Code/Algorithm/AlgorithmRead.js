import React, { useState, useEffect } from 'react';

import classes from './AlgorithmRead.module.css';
import { Tree, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const treeData = [
    {
        title: 'Sorting Algorithms',
        key: '0-0',
        children: [
            {
                title: 'Merge Sort',
                key: '0-0-0',
                children: [
                    {
                        title: 'Implementations',
                        key: '0-0-0-0',
                        children: [
                            {
                                title: 'Java',
                                key: '0-0-0-0-0',
                                children: [
                                    {
                                        title: 'Benchmarks',
                                        key: '0-0-0-0-0-0',
                                        children: [
                                            {
                                                title: 'CPU',
                                                key: '0-0-0-0-0-0-0',
                                                children: [
                                                    {
                                                        title: 'Intel Core i9',
                                                        key: '0-0-0-0-0-0-0-0',
                                                        children: [
                                                            {
                                                                title: '11900T',
                                                                key: '0-0-0-0-0-0-0-0-0',

                                                            },
                                                            {
                                                                title: '11980HK',
                                                                key: '0-0-0-0-0-0-0-0-1',
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: 'Intel Core i7',
                                                        key: '0-0-0-0-0-0-0-1',
                                                    },
                                                    {
                                                        title: 'Intel Core i5',
                                                        key: '0-0-0-0-0-0-0-2',
                                                    }
                                                ]

                                            },
                                            {
                                                title: 'Catche',
                                                key: '0-0-0-0-0-0-1',
                                                children: [
                                                    {
                                                        title: 'L1 Cache',
                                                        key: '0-0-0-0-0-0-1-0',

                                                    },
                                                    {
                                                        title: 'L2 Cache',
                                                        key: '0-0-0-0-0-0-1-1',
                                                    },
                                                    {
                                                        title: 'Smart Cache',
                                                        key: '0-0-0-0-0-0-1-2',
                                                    },
                                                ]
                                            },
                                            {
                                                title: 'Core',
                                                key: '0-0-0-0-0-0-2',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                title: 'C',
                                key: '0-0-0-0-1',
                                children: [
                                    {
                                        title: 'Benchmarks',
                                        key: '0-0-0-0-1-0',
                                        children: [
                                            {
                                                title: 'CPU',
                                                key: '0-0-0-0-1-0-0',
                                                children: [
                                                    {
                                                        title: 'Intel Core i9',
                                                        key: '0-0-0-0-1-0-0-0',
                                                        children: [
                                                            {
                                                                title: '11900T',
                                                                key: '0-0-0-0-1-0-0-0-0',

                                                            },
                                                            {
                                                                title: '11980HK',
                                                                key: '0-0-0-0-1-0-0-0-1',
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: 'Intel Core i7',
                                                        key: '0-0-0-0-1-0-0-1',
                                                    },
                                                    {
                                                        title: 'Intel Core i5',
                                                        key: '0-0-0-0-1-0-0-2',
                                                    }
                                                ]

                                            },
                                            {
                                                title: 'Catche',
                                                key: '0-0-0-0-1-0-1',
                                                children: [
                                                    {
                                                        title: 'L1 Cache',
                                                        key: '0-0-0-0-1-0-1-0',

                                                    },
                                                    {
                                                        title: 'L2 Cache',
                                                        key: '0-0-0-0-1-0-1-1',
                                                    },
                                                    {
                                                        title: 'Smart Cache',
                                                        key: '0-0-0-0-1-0-1-2',
                                                    },
                                                ]
                                            },
                                            {
                                                title: 'Core',
                                                key: '0-0-0-0-1-0-2',
                                            }
                                        ]
                                    }
                                ]
                            },

                        ]
                    },
                    {
                        title: "Problem Instances",
                        key: '0-0-0-1',
                        children: [
                            {
                                title: "Instance 1",
                                key: '0-0-0-1-0',
                                children: [
                                    {
                                        title: "Benchmarks",
                                        key: '0-0-0-1-0-0'

                                    },
                                ]
                            },
                            {
                                title: "Instance 2",
                                key: '0-0-0-1-1',
                                children: [
                                    {
                                        title: "Benchmarks",
                                        key: '0-0-0-1-1-0'

                                    },
                                ]
                            }
                        ]
                    }
                ],
            },
            {
                title: 'Quick Sort',
                key: '0-0-1',
                children: [
                    {
                        title: 'Implementations',
                        key: '0-0-1-0',
                        children: [

                            { title: 'Java', key: '0-0-1-0-0' },
                            { title: 'C', key: '0-0-1-0-1' },
                        ]
                    },
                ],
            },
        ],
    },
    {
        title: 'Graph Algorithms',
        key: '0-1',
        children: [
            { title: 'Search', key: '0-1-0' },
            { title: 'Single-source, Shortest Path', key: '0-1-0-1' },
            { title: 'All-pairs, Shortest Path', key: '0-1-0-2' },
        ],
    },
];

const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
};

let Editbutton = (
    <div className={classes.headerRest}>
        <Button type="primary" className={classes.EditButton} size="large">Upload Benchmarks</Button>
    </div>
);

const AlgorithmRead = (props) => {

    return (
        <React.Fragment>
            <div className={classes.header}>
                <p className={classes.p}>Algorithm</p>
                {Editbutton}
            </div>
            <Tree
                className={classes.tree}
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0-0-1-0-0-0-1']}
                onSelect={onSelect}
                treeData={treeData}
            />
        </React.Fragment>

    );
};

export default AlgorithmRead;