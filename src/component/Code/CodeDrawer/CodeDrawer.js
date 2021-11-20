import React from 'react';
import classes from './CodeDrawer.module.css';
import { Drawer, Divider, Select } from 'antd';
import { connect } from 'react-redux';
import * as CodeAction from '../../../store/action/code';


const CodeDrawer = (props) => {

    // console.log(props.codeDrawData)

    const onClose = () => {
        props.setDrawerDisplay(false);
    };

    //drawer body
    let body = (<div className={classes.body}></div>);
    //implementation
    const { Option } = Select;



    // let auth = localStorage.getItem('timesheetisAuthenticated');

    if (props.codeDrawData.nodeType === "classification") {
        body = (
            <div>
                <p className="site-description-item-profile-p">{props.codeDrawData.subtitle}</p>
                <Divider />
                <div className={classes.textbody}>
                    <p>{props.codeDrawData.textbody}</p>
                </div>
            </div>);
    }
    // if (props.codeDrawData.nodeType === "algorithm_type")
    // if (props.codeDrawData.nodeType === "sub_classification")

    // implementation details
    function onChange(value) {
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    if (props.codeDrawData.nodeType === "algorithm_implementations")
        body = (
            <div className={classes.body}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a language"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="C">C</Option>
                    <Option value="C++">C++</Option>
                    <Option value="Java">Java</Option>
                </Select>
            </div>
        )

    if (props.codeDrawData.nodeType === "algorithm_problem")
        body = (
            <div className={classes.body}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a language"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Best Case">Best Case</Option>
                    <Option value="Worst Case">Worst Case</Option>
                </Select>
            </div>
        )

    return (
        <React.Fragment>
            <Drawer width={700} placement="right" onClose={onClose} visible={props.drawerVisible}>
                <p className="site-description-item-profile-p" style={{ fontFamily: "Verdana", fontSize: "20pt" }}>
                    {props.codeDrawData.nodeTitle}
                </p>
                {body}
            </Drawer>
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        drawerVisible: state.code.codeDrawerDisplay,
        codeDrawData: state.code.codeDrawData,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setDrawerDisplay: (drawvisible) => dispatch(CodeAction.setCodeDrawerDisplay(drawvisible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeDrawer);