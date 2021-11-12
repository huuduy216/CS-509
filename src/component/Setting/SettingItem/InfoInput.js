import React from 'react';
import classes from './InfoInput.module.css';
import {
    Form,
    Input,
} from 'antd';



function Info(props) {

    

    let input = (
        <Input value={props.content} disabled={true} className={classes.input} />
    );
    let inputedit = (
        <Input placeholder={props.content} className={classes.input} />
    )
    

    let infoForm = (
        <Form.Item label={props.label} name={props.name} labelCol={{ span: 4 }} rules={props.rules}>
            <div style={{ display: "flex" }}>
                {props.inputEdit ? inputedit : input}
            </div>
        </Form.Item>
    )
    return (
        <React.Fragment>
            {infoForm}
        </React.Fragment>

    );
};

export default Info;