import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as codeActions from '../../../store/action/code';


import classes from './ContentBody.module.css';
import { Button, Input } from 'antd';

const { TextArea } = Input;

const ContentBody = (props) => {

    //classification eidt button
    const [textEdit, setTextEdit] = useState(true)
    const clickTextEditButton = () => {
        setTextEdit(!textEdit);
    }
    const saveText = () => {
        props.setLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 1800);
        if (props.codeDrawDataType === "classification") {
            props.setClassContent(props.NodeValue, props.subtitle, props.textbody)
        }else if(props.codeDrawDataType === "sub_classification"){
            props.setSubClassContent(props.NodeValue,props.subtitle,props.textbody)
        }else if(props.codeDrawDataType === "algorithm_type"){
            props.setAlgorithmContent(props.NodeValue,props.subtitle,props.textbody)
        }
    }
    //contentbody type
    let body = null;
    if (props.codeDrawDataType === "classification" || props.codeDrawDataType ==="sub_classification"||props.codeDrawDataType ==="algorithm_type") {
        body = (
            <div className={classes.background}>

                <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                    {/* {changingNode.title} */}
                </p>
                <Input value={props.subtitle} onChange={(e) => props.changeSubtitle(e.target.value)} disabled={textEdit} style={{ width: "50%", marginTop: "2%" }} placeholder="Date/author/..." />
                <TextArea value={props.textbody} onChange={(e) => props.changeTextBody(e.target.value)} disabled={textEdit} rows={20} style={{ marginTop: "3%", width: "80%" }} placeholder="content..." />
                <Button onClick={clickTextEditButton} type="primary" style={{ width: "80px", marginTop: "2%" }}>{textEdit ? "Edit" : "View"}</Button>
                <Button onClick={() => saveText()} type="danger" style={{ width: "80px", marginTop: "2%", justifyContent: "center" }}>Save</Button>
            </div>
        );
    }

    return (
        <React.Fragment>
            {body}
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        edit: state.code.edit,
        role: state.auth.role,
        codeDrawData: state.code.codeDrawData,
        subtitle: state.code.codeDrawDataSubtitle,
        textbody: state.code.codeDrawDataBodytext,
        codeDrawDataType: state.code.codeDrawDataType,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setClassContent: (key, subtitle, textbody) => dispatch(codeActions.postClassificationContent(key, subtitle, textbody)),
        setSubClassContent: (key, subtitle, textbody) => dispatch(codeActions.postSubClassificationContent(key, subtitle, textbody)),
        setAlgorithmContent: (key, subtitle, textbody) => dispatch(codeActions.postAlgorithmContent(key, subtitle, textbody)),
        setContentClear:()=>dispatch(codeActions.setContentClear()),
        changeSubtitle: (subtitle) => dispatch(codeActions.changeSubtitle(subtitle)),
        changeTextBody: (textbody) => dispatch(codeActions.changeTextBody(textbody)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);
