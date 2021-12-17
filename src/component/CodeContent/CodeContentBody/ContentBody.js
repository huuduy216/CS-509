import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as codeActions from '../../../store/action/code';
import * as authActions from '../../../store/action/auth';
import AWS from 'aws-sdk'


import classes from './ContentBody.module.css';
import { Upload, Modal, message, Button, Input, Select, Divider, List, Descriptions, Collapse, Form } from 'antd';
import { CloudDownloadOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

import { CodeEditor } from '@patternfly/react-code-editor';
import * as ImpleData from '../../../assets/ImplementationData';


const { Option } = Select;

const { TextArea } = Input;

const { Panel } = Collapse;


const ContentBody = (props) => {
    //classification edit button
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
        } else if (props.codeDrawDataType === "sub_classification") {
            props.setSubClassContent(props.NodeValue, props.subtitle, props.textbody)
        } else if (props.codeDrawDataType === "algorithm_type") {
            props.setAlgorithmContent(props.NodeValue, props.subtitle, props.textbody)
        }
    }
    //implementation set
    const warning = () => {
        message.warning('Please choose a language');
    };

    const saveImpl = () => {

        if (props.codeLanguage === "") {
            warning();
        } else {
            props.setLoadingTime(1000);
            props.setImplementationContent(props.NodeValue, props.codeLanguage, props.codeDrawDataCode);
            window.location.reload(false);

        }
    }

    const changeLanguage = (e) => {
        props.setCodeLanguage(e);
        props.editImplementationContent(props.NodeValue, e);
        props.setProblemType(e)
        props.getBenchmarkContent(props.NodeValue, e, "algorithm_implementations");
    }

    const changeCode = (value) => {
        props.changeCodeBody(value);
    }

    const deleteBenchmark = (idBenchmark) => {
        let history = props.userHistory
        let element = "Deleted Benchmark||"
        history.push(element)
        props.updateUserHistory(history);
        props.deleteBenchmarkContent(idBenchmark, props.NodeValue, props.problemType);

    }
    //problem instance set
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
                        <Button icon={<DeleteOutlined />} type="danger" style={{ marginTop: "15px" }} onClick={() => deleteBenchmark(item.idBenchmark)} />
                    </List.Item>
                )}
            />
        )
    }

    const changeProblem = (e) => {
        props.setProblemType(e);
        props.getBenchmarkContent(props.NodeValue, e, "algorithm_problem");
        setShowUrl(props.codeDrawProblemInfo[e].url)
    }

    const uploadBenchmark = () => {
        let history = props.userHistory
        let element = "Added New Benchmark||"
        history.push(element)
        props.updateUserHistory(history);
        props.changeContentType("algorithm_benchmark");

    }
    const [isCaseModalVisible, setIsCaseModalVisible] = useState(false);
    const [caseName, setCaseName] = useState("");
    const [uploadFileName, setUploadFileName] = useState("");
    const [caseUrl, setCaseUrl] = useState("");
    const [showUrl, setShowUrl] = useState("")

    const handleCaseOk = () => {
        let algorid = props.dbId[props.NodeValue.substring(0, props.NodeValue.length - 2)]
        let problemIns = {
            casename: caseName,
            fileName: uploadFileName,
            url: caseUrl,
            algorId: algorid
        }
        // console.log(props.dbId)
        // console.log(problemIns)
        props.postProblemContent(problemIns);
        setIsCaseModalVisible(false);
        props.setLoadingTime(2000);
        window.location.reload(false);
    };

    const handleCaseCancel = () => {
        setCaseName("")
        setUploadFileName("")
        setIsCaseModalVisible(false);
    };

    const changeCaseName = (e) => {

        setCaseName(e.target.value);
    }
    //Problem instance //add cases  //S3
    const S3_BUCKET = 'cs-509-implementations';
    const REGION = 'us-east-2';

    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    })

    const Fileprops = {
        customRequest({
            file,
        }) {
            let transform = file.name + Math.floor(Math.random() * 100);
            let history = props.userHistory
            let element = "Added New File" + file.name + "||"
            history.push(element)
            props.updateUserHistory(history);


            const params = {
                ACL: 'public-read',
                Body: file,
                Bucket: S3_BUCKET,
                Key: transform
            };

            myBucket.putObject(params)
                .on('httpUploadProgress', (evt) => {
                    // setProgress(Math.round((evt.loaded / evt.total) * 100))

                    if (evt.loaded === 100)
                        console.log("done")
                })
                .send((err) => {
                    if (!err) {
                        console.log("done deplo")
                        let url = "https://" + S3_BUCKET + ".s3." + REGION + ".amazonaws.com/" + decodeURI(transform)
                        setUploadFileName(file.name);
                        setCaseUrl(url)
                        // console.log(encodeURI(file.name));
                        // console.log(url)
                    }
                    //  props.addImplementationChild(treeData,key, url);
                })
        }
    };
    //Problem instance //add cases 
    let AddCaseModal = (
        <Modal title="Add Cases" visible={isCaseModalVisible} onOk={handleCaseOk} onCancel={handleCaseCancel} width={"70%"} style={{ marginTop: "11%", marginRight: "17%" }} okButtonProps={{ disabled: caseName === "" || uploadFileName === "" }}>
            <div>
                Cases name:   <Input value={caseName} onChange={(e) => changeCaseName(e)} placeholder="Input Case Name" style={{ width: "60%", marginLeft: "3%", marginBottom: "5%" }} />
            </div>
            <div>
                Upload Problem Instance: <Input value={uploadFileName} readOnly placeholder="Cases File" style={{ width: "50%", marginLeft: "3%" }} />
                <Upload {...Fileprops} showUploadList={false}>
                    <Button icon={<UploadOutlined />} style={{ marginTop: "10%" }}>
                        Upload
                    </Button>
                </Upload>
            </div>

        </Modal>
    );

    const deleteCases = () => {
        let deleteCaseInfo = {
            ...props.codeDrawProblemInfo[props.problemType],
            caseName: props.problemType
        }

        props.deleteProblemContent(deleteCaseInfo);
        props.setLoadingTime(3000)
        window.location.reload(false);
    }

    const addCases = () => {
        setIsCaseModalVisible(true);
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

        let key = props.NodeValue;
        let id = key.substring(0, key.length - 2);

        benchmark["algorId"] = props.dbId[id]
        benchmark["like"] = "0"
        benchmark["star"] = "0"
        benchmark["benchmarkType"] = props.problemType

        props.postBenchmarkContent(benchmark);
        props.setLoadingTime(2000);
        window.location.reload(false);

    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const listData = [];
    for (let i = 0; i < 22; i++) {
        listData.push({
            title: `JJQ ${i}`,
            description:
                'uploaded 2021-11-08 01:01:20',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    function callback(key) {
        // console.log(key);
    }

    //S3 SETTing


    // const S3_BUCKET = 'cs509file';
    // const REGION = 'us-east-2';

    AWS.config.update({
        accessKeyId: 'AKIA3A3ZLIWMX4LOEHVJ',
        secretAccessKey: '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'
        // accessKeyId: 'AKIAX7N74DVIV5VUHCBZ',
        // secretAccessKey: '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'
    })

    //contentbody type
    let body = null;
    if (props.codeDrawDataType === "classification" || props.codeDrawDataType === "sub_classification" || props.codeDrawDataType === "algorithm_type") {
        body = (
            <div className={classes.background}>

                <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                    {props.codeDrawDataTitle}
                </p>
                <Input value={props.subtitle} onChange={(e) => props.changeSubtitle(e.target.value)} disabled={textEdit} style={{ width: "80%", marginTop: "2%" }} placeholder="Date/author/..." />
                <TextArea value={props.textbody} onChange={(e) => props.changeTextBody(e.target.value)} disabled={textEdit} rows={20} style={{ marginTop: "3%", width: "80%", height: "60%" }} placeholder="content..." />
                <div className={classes.buttonBody}>
                    <Button onClick={clickTextEditButton} type="primary" style={{ width: "12%" }}>{textEdit ? "Edit" : "View"}</Button>
                    <Button onClick={() => saveText()} type="danger" style={{ width: "12%", marginLeft: "80%" }}>Save</Button>
                </div>
            </div>
        );
    } else if (props.codeDrawDataType === "algorithm_implementations") {
        drawBenchmark(props.codeDrawBenchmark)
        body = (<div className={classes.background}>
            <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                {props.AlgorNameForImplAndProblem} / Implementation
            </p>
            <CodeEditor
                isDarkTheme
                code={props.codeDrawDataCode}
                height='800px'
                width='95%'
                onChange={changeCode}
                isDownloadEnabled
                downloadButtonToolTipText={'Download'}
                downloadButtonAriaLabel={'Download code'}
            />
            <div className={classes.impleSelectBody}>
                <Select
                    value={props.codeLanguage}
                    showSearch
                    style={{ width: "40%" }}
                    placeholder="Select Language"
                    optionFilterProp="children"
                    onChange={changeLanguage}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {ImpleData.language.map(item =>
                        <Option key={item} value={item}>{item}</Option>
                    )}
                </Select>

                <Button onClick={() => saveImpl()} type="danger" style={{ width: "12%", marginLeft: "48%" }} disabled={props.codeLanguage === undefined}>Save</Button>
            </div>
            <Divider />
            <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                Benchmark
            </p>
            {benchmarkBody}
            <Button type="primary" onClick={uploadBenchmark} style={{ width: "30%" }} disabled={props.problemType === "" || props.problemType === undefined}>Upload Benchmark</Button>


        </div>
        );
    } else if (props.codeDrawDataType === "algorithm_problem") {
        drawBenchmark(props.codeDrawBenchmark)
        body = (
            <div className={classes.background}>
                <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                    {props.AlgorNameForImplAndProblem} / Problem Instance
                </p>
                <Button onClick={addCases} type="primary" style={{ width: "10%", fontWeight: "bolder", fontSize: "12pt" }}>Add</Button>
                <div className={classes.impleSelectBody}>
                    <Select
                        value={props.problemType}
                        showSearch
                        style={{ width: "42.5%", marginLeft: "0%" }}
                        placeholder="Select case"
                        optionFilterProp="children"
                        onChange={changeProblem}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {props.codeDrawProblem.map(item =>
                            <Option key={item.caseName} value={item.caseName}>{item.caseName}</Option>
                        )}
                    </Select>
                </div>
                <Button icon={<CloudDownloadOutlined />} type="link" style={{ width: "40%", fontWeight: "bolder", fontSize: "12pt", marginTop: "18px" }} hidden={props.problemType === "" || props.problemType === undefined} href={showUrl}> {props.problemType}</Button>
                <Button onClick={deleteCases} type="danger" style={{ width: "40%", fontWeight: "bolder", fontSize: "12pt", marginTop: "18px" }} disabled={props.problemType === "" || props.problemType === undefined}>Delete   {props.problemType}</Button>

                <Divider />
                <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                    Benchmark
                </p>
                {benchmarkBody}
                <Button type="primary" onClick={uploadBenchmark} style={{ width: "30%", fontWeight: "bolder", fontSize: "12pt" }} disabled={props.problemType === "" || props.problemType === undefined}>Upload Benchmark</Button>
            </div>
        );
    } else if (props.codeDrawDataType === "algorithm_benchmark") {
        body = (

            <div className={classes.background}>
                <p style={{ fontSize: "19pt" }}>Upload Benchmark</p>
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

    return (
        <React.Fragment>
            {AddCaseModal}
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
        userHistory: state.code.userHistory,
        codeDrawDataType: state.code.codeDrawDataType,
        codeDrawDataTitle: state.code.codeDrawDataTitle,
        codeDrawDataCode: state.code.codeDrawDataCode,
        codeDrawBenchmark: state.code.codeDrawBenchmark,
        codeDrawProblem: state.code.codeDrawProblem,
        codeDrawProblemInfo: state.code.codeDrawProblemInfo,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        setClassContent: (key, subtitle, textbody) => dispatch(codeActions.postClassificationContent(key, subtitle, textbody)),
        setSubClassContent: (key, subtitle, textbody) => dispatch(codeActions.postSubClassificationContent(key, subtitle, textbody)),
        setAlgorithmContent: (key, subtitle, textbody) => dispatch(codeActions.postAlgorithmContent(key, subtitle, textbody)),
        setImplementationContent: (key, language, codebody) => dispatch(codeActions.postImplementationContent(key, language, codebody)),
        editImplementationContent: (key, language) => dispatch(codeActions.editImplementationContent(key, language)),
        setContentClear: () => dispatch(codeActions.setContentClear()),
        changeSubtitle: (subtitle) => dispatch(codeActions.changeSubtitle(subtitle)),
        changeTextBody: (textbody) => dispatch(codeActions.changeTextBody(textbody)),
        changeCodeBody: (codeBody) => dispatch(codeActions.changeCodeBody(codeBody)),
        setLoadingTime: (time) => dispatch(authActions.setLoadingTime(time)),
        getBenchmarkContent: (key, benchmarkType, callType) => dispatch(codeActions.getBenchmarkContent(key, benchmarkType, callType)),
        deleteBenchmarkContent: (idBenchmark, NodeValue, problemType) => dispatch(codeActions.deleteBenchmarkContent(idBenchmark, NodeValue, problemType)),
        changeContentType: (type) => dispatch(codeActions.changeContentType(type)),
        postBenchmarkContent: (benchmarkBody) => dispatch(codeActions.postBenchmarkContent(benchmarkBody)),
        updateUserHistory: (userhistory) => dispatch(codeActions.updateUserHistory(userhistory)),
        postProblemContent: (problemIns) => dispatch(codeActions.postProblemContent(problemIns)),
        deleteProblemContent: (deleteCaseInfo) => dispatch(codeActions.deleteProblemContent(deleteCaseInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);
