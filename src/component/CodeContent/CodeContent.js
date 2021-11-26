import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './CodeContent.module.css';
import { TreeSelect, PageHeader } from 'antd';
import * as codeActions from '../../store/action/code';

import ContentBody from './CodeContentBody/ContentBody'
const CodeContent = (props) => {

    const [codeLanguage,setCodeLanguage] = useState("");

    let treelist = {};
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
        props.setContentClear()
        setCodeLanguage(undefined)
        if (treelist[value] === "classification") {
            props.editClassificationContent(value);
        } else if (treelist[value] === "sub_classification") {
            props.editSubClassificationContent(value);
        } else if (treelist[value] === "algorithm_type") {
            props.editAlgorithmContent(value);
        }else if (treelist[value] === "algorithm_implementations") {
            props.changeContentType("algorithm_implementations");
        }else if (treelist[value] === "algorithm_problem") {
            props.changeContentType("algorithm_problem");
        } else {
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
                    <TreeSelect
                        style={{ width: '72.5%', marginLeft: "11.5%",marginTop:"40px" }}
                        value={value}
                        dropdownStyle={{ maxHeight: 4000, overflow: 'auto' }}
                        treeData={spaceTreeData}
                        placeholder="Please select content"
                        treeDefaultExpandAll
                        onChange={onChange}
                    />
                </PageHeader>

            </div>
            {/* <Divider/> */}
            <div className={classes.body}>
                <ContentBody NodeValue={value} spaceTreeData={spaceTreeData} setLoading={props.setLoading} codeLanguage={codeLanguage} setCodeLanguage={setCodeLanguage}/>
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
        changeContentType:(type)=>dispatch(codeActions.changeContentType(type)),
        setContentClear: () => dispatch(codeActions.setContentClear()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContent);
