import React,{useState} from 'react';
import classes from './CodeDrawer.module.css';
import { connect } from 'react-redux';
import * as CodeAction from '../../../store/action/code';
import * as AuthAction from '../../../store/action/auth';

import { Drawer, Button, Select, Divider, List, Descriptions, Collapse, Form, Input } from 'antd';


// import * as AuthAction from '../../../store/action/auth';
import { CodeEditor } from '@patternfly/react-code-editor';
import * as ImpleData from '../../../assets/ImplementationData';
import Loading from '../../../UI/Loading/Loading';

const { Panel } = Collapse;


const CodeDrawer = (props) => {

    // console.log(props.codeDrawData)
    const [benchmarkType, setBenchmarkType] = useState("")

    const onClose = () => {
        setBenchmarkType("")
        props.setDrawerDisplay(false);
    };

    //drawer body
    let body = (<div className={classes.body}></div>);
    //implementation
    const { Option } = Select;
    //problem instance
    //benchmark
    const listData = [];
    for (let i = 0; i < 2; i++) {
        listData.push({
            title: `JJQ ${i}`,
            description:
                'uploaded 2021-11-08 01:01:20',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    let benchmarkBody = null;
    const drawBenchmark = (listData) => {

        benchmarkBody = (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        // console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
            
                    >
                        <List.Item.Meta
                            title={<p>{item.username}</p>}
                            description={item.date}
                        />
                        <Collapse onChange={callback} >
                            <Panel header="machine Config" key="1">
                                <Descriptions title="Benchmark Info" bordered>
                                    <Descriptions.Item label="CPU">{item.cpu}</Descriptions.Item>
                                    <Descriptions.Item label="RAM">{item.ram}</Descriptions.Item>
                                    <Descriptions.Item label="GPU">{item.gpu}</Descriptions.Item>
                                    <Descriptions.Item label="L1">{item.l1}</Descriptions.Item>
                                    <Descriptions.Item label="L2">{item.l2}</Descriptions.Item>
                                    <Descriptions.Item label="L3">
                                        {item.l3}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="running time">
                                        {item.time}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="memory space">
                                        {item.space}
                                    </Descriptions.Item>

                                </Descriptions>
                            </Panel>
                        </Collapse >
                    </List.Item>
                )}
            />
        )
    }


    const onChangecase = (e)=>{
        setBenchmarkType(e)
        props.getBenchmark(props.codeDrawData.nodekey,e,"algorithm_problem")
    }

    function callback(key) {
        // console.log(key);
    }

    const uploadBenchmark = () => {
        props.setLoadingTime(1200);

        let codeDrawData = {
            "nodeType": "algorithm_benchmark",
            "nodeTitle": "Upload Benchmark ",
            "nodecode": "",
            "nodekey": props.codeDrawData.nodekey,
        };
        props.setDrawerData(codeDrawData);
    }

    const onFinish = (values) => {
        let benchmark =
            { "date": "", "L1": "", "L2": "", "L3": "", "cpu": "", "time": "", "gpu": "", "space": "", "username": "", "ram": "" }
        Object.keys(values).forEach((key) => {
            if (values[key] !== undefined) {
                benchmark[key] = values[key]
            }
        }
        )

        let key = props.codeDrawData.nodekey;
        let id = key.substring(0, key.length - 2);
        id = id.split("-").map((str) => parseInt(str));
        let changingNode = props.spaceTreeData[id[0]];

        if (id.length > 1) {
            for (let i = 1; i < id.length; i++) {
                changingNode = changingNode.children[id[i]];
            }
        }

        benchmark["algorId"] = changingNode["dbId"]
        benchmark["like"] = "0"
        benchmark["star"] = "0"
        benchmark["benchmarkType"]=benchmarkType
        props.postBenchmarkContent(benchmark);
        props.setLoadingTime(2000);
        window.location.reload(false);

    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

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
            props.getImplementationContent(key, value);
            setBenchmarkType(value)
            props.getBenchmark(props.codeDrawData.nodekey,value,"algorithm_implementations")

        }

        if (props.codeDrawData.nodeType === "algorithm_implementations") {
            drawBenchmark(props.codeDrawData.benchmarks)
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
                    <Divider />
                    {benchmarkBody}
                    <Button type="primary" onClick={uploadBenchmark} disabled={benchmarkType===""}>Upload Benchmark</Button>
                

                </div>
            )
        }
        if (props.codeDrawData.nodeType === "algorithm_problem") {
            drawBenchmark(props.codeDrawData.benchmarks)
            body = (
                <div className={classes.body}>


                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a case"
                        optionFilterProp="children"
                        onChange={onChangecase}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Best Case">Best Case</Option>
                        <Option value="Worst Case">Worst Case</Option>
                    </Select>
                    <Divider />
                    <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                        Benchmark
                    </p>
                    <Divider />
                    {benchmarkBody}
                    <Button type="primary" onClick={uploadBenchmark} disabled={benchmarkType===""}>Upload Benchmark</Button>
                </div>
            )
        }

        if (props.codeDrawData.nodeType === "algorithm_benchmark") {
            body = (
                <div className={classes.body}>
                    <Divider />
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}

                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{ required: true, message: 'Please input date!' }]}
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="CPU"
                            name="cpu"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="RAM"
                            name="ram"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="GPU"
                            name="gpu"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="L1"
                            name="L1"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="L2"
                            name="L2"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="L3"
                            name="L3"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Running Time"
                            name="time"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Memory Space"
                            name="space"
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ marginTop: "10px", width: "50%" }}>
                                Upload
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        }
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
    )
}
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
        getImplementationContent: (key, language) => dispatch(CodeAction.getImplementationContent(key, language)),
        setLoadingTime: (time) => dispatch(AuthAction.setLoadingTime(time)),
        setDrawerData: (DrawerData) => dispatch(CodeAction.setDrawerData(DrawerData)),
        postBenchmarkContent: (benchmarkBody) => dispatch(CodeAction.postBenchmarkContent(benchmarkBody)),
        getBenchmark: (key,benchmarkType,callType)=>dispatch(CodeAction.getBenchmark(key,benchmarkType,callType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeDrawer)