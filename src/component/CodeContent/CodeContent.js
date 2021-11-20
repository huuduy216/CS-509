import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './CodeContent.module.css';
import { TreeSelect, PageHeader } from 'antd';
import * as codeActions from '../../store/action/code';

import ContentBody from './CodeContentBody/ContentBody'
const CodeContent = (props) => {


    //transfer datatree
    let changeId = (arr) => {
        arr.map((item) => {
            item.value = item.key
            if (item.children && item.children.length > 0) {
                changeId(item.children)
            }
            return item;
        })
        return arr;
    }
    const spaceTreeData = changeId([props.spaceTreeData]);
    //select tree
    const [value, setValue] = useState(undefined);
    const onChange = (value) => {
        
        props.editClassificationContent(value);
        setValue(value);
    };

    let codeContent = (
        <div className={classes.background}>
            <div className={classes.header}>
                <PageHeader
                    className={classes.pageheader}
                    onBack={() => window.history.back()}
                    title="Content"
                    subTitle="Edit content"
                >
                    <TreeSelect
                        style={{ width: '50%', marginLeft: "3%", marginTop: "6%" }}
                        value={value}
                        dropdownStyle={{ maxHeight: 4000, overflow: 'auto' }}
                        treeData={spaceTreeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChange}
                    />
                </PageHeader>
            </div>
            {/* <Divider/> */}
            <div className={classes.body}>
                <ContentBody NodeValue={value} spaceTreeData={spaceTreeData} setLoading={props.setLoading}/>
            </div>
        </div>
    );

  
    return (
        <React.Fragment>
            {codeContent}
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        edit: state.code.edit,
        role: state.auth.role,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editClassificationContent: (key) => dispatch(codeActions.editClassificationContent(key)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContent);
