import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Tree } from 'antd';
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

const Algorithm = (props) => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} size="large" danger>Delete</Button>
            <Button type="primary" className={classes.EditButton} size="large">ADD</Button>
            <Button type="primary" className={classes.EditButton} size="large">Merge Selected</Button>
        </div>
    );

    if (props.role === "user") {
        Editbutton = (
            <div className={classes.headerRest}>
                <Button type="primary" className={classes.EditButton} size="large">ADD</Button>
                <Button type="primary" className={classes.EditButton} size="large">Merge Selected</Button>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className={classes.header}>
                <p className={classes.p}>Algorithm</p>
                {Editbutton}
            </div>
            <Tree
                className={classes.tree}
                checkable
                onExpand={onExpand}
                defaultExpandedKeys={['0-0-0-0-1-0-0-0-1']}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
            />
        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        edit: state.code.edit,
        role: state.auth.role

    };
}

export default connect(mapStateToProps, null)(Algorithm);