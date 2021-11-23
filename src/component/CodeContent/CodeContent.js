import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './CodeContent.module.css';
import { TreeSelect, PageHeader } from 'antd';
import * as codeActions from '../../store/action/code';

import ContentBody from './CodeContentBody/ContentBody'
const CodeContent = (props) => {


    let treelist ={};
    //transfer datatree
    let changeId = (arr) => {
        arr.map((item) => {
            item.value = item.key
            treelist[item.value] = item.type
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
        if(treelist[value]==="classification"){
            props.editClassificationContent(value);
        }else if(treelist[value]==="sub_classification"){
            props.editSubClassificationContent(value);
        }else if(treelist[value]==="algorithm_type"){
            props.editAlgorithmContent(value);
        }else{
            props.setContentClear()
        }
        
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

                </PageHeader>

            </div>
            {/* <Divider/> */}
            <div className={classes.body}>
                <TreeSelect
                    style={{ width: '50%', marginTop: "6%" ,marginLeft:"13%"}}
                    value={value}
                    dropdownStyle={{ maxHeight: 4000, overflow: 'auto' }}
                    treeData={spaceTreeData}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    onChange={onChange}
                />
                <ContentBody  NodeValue={value} spaceTreeData={spaceTreeData} setLoading={props.setLoading} />
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
        editSubClassificationContent: (key) => dispatch(codeActions.editSubClassificationContent(key)),
        editAlgorithmContent: (key) => dispatch(codeActions.editAlgorithmContent(key)),
        setContentClear:()=>dispatch(codeActions.setContentClear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContent);
