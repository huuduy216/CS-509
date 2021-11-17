import React from 'react';
import classes from './CodeDrawer.module.css';
import { Drawer, Divider, Select, Input } from 'antd';
import { connect } from 'react-redux';
import * as CodeAction from '../../../store/action/code';








const CodeDrawer = (props) => {


    const onClose = () => {
        props.setDrawerDisplay(false);
    };

    console.log(props.codeDrawData)

    //drawer body
    let body = (<div className={classes.body}></div>);
    //implementation
    const { Option } = Select;
    const { TextArea } = Input;
    function onChange(value) {
        console.log(`selected ${value}`);
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

    let auth = localStorage.getItem('timesheetisAuthenticated');

    if (props.codeDrawData.nodeType === "classification") {
        body = (
            <div className={classes.textbody}>
                <p>In mathematics and computer science, an algorithm is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation.[1] Algorithms are used as specifications for performing calculations, data processing, automated reasoning, automated decision-making and other tasks. In contrast, a heuristic is an approach to problem solving that may not be fully specified or may not guarantee correct or optimal results, especially in problem domains where there is no well-defined correct or optimal result.</p>
            </div>
        )
        if (auth) {
            body = (
                <div className={classes.textbody}>
                    <TextArea rows={20} style={{ marginTop: "10px" }} />

                </div>
            )
        }
    }
    // if (props.codeDrawData.nodeType === "algorithm_type")
    // if (props.codeDrawData.nodeType === "sub_classification")
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
                <TextArea rows={10} style={{ marginTop: "10px" }} />
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
                <p className="site-description-item-profile-p">Last Updated : 28 Jun, 2021</p>
                <Divider />
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