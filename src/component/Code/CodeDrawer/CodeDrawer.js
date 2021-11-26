import React from 'react';
import classes from './CodeDrawer.module.css';
import { Drawer, Divider, Select } from 'antd';
import { connect } from 'react-redux';
import * as CodeAction from '../../../store/action/code';
// import * as AuthAction from '../../../store/action/auth';
import { CodeEditor } from '@patternfly/react-code-editor';
import * as ImpleData from '../../../assets/ImplementationData';
import Loading from '../../../UI/Loading/Loading';

const CodeDrawer = (props) => {

    // console.log(props.codeDrawData)

    const onClose = () => {
        props.setDrawerDisplay(false);
    };

    //drawer body
    let body = (<div className={classes.body}></div>);
    //implementation
    const { Option } = Select;


    if (props.loading) {
        body = (<Loading />)
    } else {
        // let auth = localStorage.getItem('timesheetisAuthenticated');
        if (props.codeDrawData.nodeType === "classification" || props.codeDrawData.nodeType === "sub_classification" || props.codeDrawData.nodeType === "algorithm_type") {
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


        // implementation details
        function onChange(value) {
            let key = props.codeDrawData.nodekey;
            props.getImplementationContent(key,value);
       
         }

        if (props.codeDrawData.nodeType === "algorithm_implementations") {
            body = (
                <div className={classes.body}>
                    <Divider />
                    <CodeEditor
                        isReadOnly
                        isDarkTheme
                        isCopyEnabled
                        code={props.codeDrawDataCode}
                        height='500px'
                        width='650px'
                    />
                    <Select
                        showSearch
                        style={{ width: 200, marginTop: "30px" }}
                        placeholder="Select Language"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {ImpleData.language.map(item =>
                            <Option key={item} value={item}>{item}</Option>
                        )}
                    </Select>

                </div>
            )
        }
        if (props.codeDrawData.nodeType === "algorithm_problem")
            body = (
                <div className={classes.body}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a language"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Best Case">Best Case</Option>
                        <Option value="Worst Case">Worst Case</Option>
                    </Select>
                </div>
            )
    }



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
        codeDrawDataCode: state.code.codeDrawDataCode,
        codeDrawDataLanguage: state.code.codeDrawDataLanguage,
        loading: state.auth.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setDrawerDisplay: (drawvisible) => dispatch(CodeAction.setCodeDrawerDisplay(drawvisible)),
        getImplementationContent:(key,language)=>dispatch(CodeAction.getImplementationContent(key,language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeDrawer);