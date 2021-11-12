import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router'

import { Button, Form, DatePicker, Select, InputNumber } from 'antd';

import classes from './SettingItem.module.css';
import axios from '../../../axios/axios-local'
import InfoInput from './InfoInput';
import * as userActions from '../../../store/action/user'

const { Option } = Select;


function Settingitem(props) {

    const history = useHistory();
    const [user, setUser] = useState({});
    const [inputEdit, setinputEdit] = useState(false);


    //get user info from backend
    useEffect(() => {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage["timesheettoken"]
            }
        }
        async function fetchData() {
            const response = await axios.post('/getuser', localStorage['timesheetUsername'], config);
            setUser(response.data);
        }
        fetchData();
    }, [])
    //setting form
    const onFinish = (values) => {
        console.log(values);
        history.go(0)
    }

    const clickEdit = () => {
        if (!inputEdit) {
            setinputEdit(true);
        }
    };

    //submit button
    let submitButton = (<Button size="large" htmlType="submit" style={{ marginLeft: 137, marginTop: 15 }} disabled>SUBMIT EDIT</Button>);
    if (inputEdit) { submitButton = (<Button type="primary" size="large" htmlType="submit" style={{ marginLeft: 137, marginTop: 15 }}>SUBMIT EDIT</Button>) }

    let settingItem = (
        <div className={classes.background}>
            <p className={classes.title}>{props.title}</p>
            <div className={classes.body}>
                <Form

                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                    layout="horizontal"
                >
                    <InfoInput label={"username"} name={"username"} content={user.username}
                        inputEdit={inputEdit}
                        rules={[{ required: true, message: 'Please input your username' }]} />
                    <InfoInput label={"email"} name={"email"} content={user.email}
                        inputEdit={inputEdit}
                        rules={[{ required: true, message: 'Please input your email' }]} />
                    <InfoInput label={"phone"} name={"phone"} content={user.phone}
                        inputEdit={inputEdit}
                        rules={[{ required: true, message: 'Please input your phone number' }]} />
                    <Form.Item label={"department"} name={"department"} labelCol={{ span: 5 }}
                        rules={[{ required: true, message: 'Please select your department' }]}>
                        <Select allowClear style={{ width: 100 }} placeholder={user.department}>
                            <Option value="iam">iam</Option>
                            <Option value="full stack">full stack</Option>
                        </Select>
                    </Form.Item>
                    <InfoInput label={"first name"} name={"firstname"} content={user.firstName}
                        inputEdit={inputEdit}
                        rules={[{ required: true, message: 'Please input your firstname' }]} />
                    <InfoInput label={"last name"} name={"lastname"} content={user.lastName}
                        inputEdit={inputEdit}
                        rules={[{ required: true, message: 'Please input your lastname' }]} />
                    <Form.Item label={"age"} name={"age"} labelCol={{ span: 4 }}
                        rules={[{ required: true, message: 'Please input your age' }]}>
                        <InputNumber min={1} max={120} />
                    </Form.Item>
                    <Form.Item label={"birth"} name={"birthdate"} labelCol={{ span: 4 }}
                        rules={[{ required: true, message: 'Please select a date' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label={"sex"} name={"sex"} labelCol={{ span: 4 }}
                        rules={[{ required: true, message: 'Please select a sex' }]}>
                        <Select allowClear style={{ width: 100 }} placeholder={user.sex}>
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: "flex" }}>
                            <Button onClick={clickEdit} size="large" style={{ marginLeft: 80, marginTop: 15 }}>EDIT</Button>
                            {submitButton}
                        </div>
                    </Form.Item>

                </Form>

            </div>

        </div >
    )

    return (

        <React.Fragment>
            {settingItem}
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        user: state.user.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getuser: (username) => dispatch(userActions.userGet(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settingitem);