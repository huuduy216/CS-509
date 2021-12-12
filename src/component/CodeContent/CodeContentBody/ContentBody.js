import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as codeActions from '../../../store/action/code';
import * as authActions from '../../../store/action/auth';
import AWS from 'aws-sdk'


import classes from './ContentBody.module.css';
import { message, Button, Input, Select, Divider, List, Space, Descriptions, Badge, Collapse, Upload } from 'antd';
import { UploadOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { CodeEditor } from '@patternfly/react-code-editor';
import * as ImpleData from '../../../assets/ImplementationData';
import * as ProblemData from '../../../assets/ProblemInstanceData';

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
    }

    const changeCode = (value) => {
        props.changeCodeBody(value);
    }
    //problem instance set
    const changeProblem = (e) => {

    }
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
    const S3_BUCKET = 'cs-509-implementations';
    const REGION = 'us-east-2';

    // const S3_BUCKET = 'cs509file';
    // const REGION = 'us-east-2';

    AWS.config.update({
        accessKeyId: 'AKIA3A3ZLIWMX4LOEHVJ',
        secretAccessKey: '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'
        // accessKeyId: 'AKIAX7N74DVIV5VUHCBZ',
        // secretAccessKey: '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'
    })

    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    })

    const Fileprops = {

        customRequest({
            file,
        }) {
            const params = {
                ACL: 'public-read',
                Body: file,
                Bucket: S3_BUCKET,
                Key: file.name
            };

            myBucket.putObject(params)
                .on('httpUploadProgress', (option) => {
                    // setProgress(Math.round((evt.loaded / evt.total) * 100))
                    console.log(option)
                    // if (evt.loaded === 100)
                    //     console.log("done-----------------")
                })
                .send((err) => {
                    if (!err) {
                        // console.log("done deplo")
                        let url = "https://" + S3_BUCKET + ".s3." + REGION + ".amazonaws.com/" + encodeURI(file.name)
                        console.log(url)
                        // window.location.reload(false);

                    }
                    //  props.addImplementationChild(treeData,key, url);
                })
        },
    };

    const OnchangeUpload = (info) => {
        // console.log(info)
    }



    let Implecontent = (

        <Collapse onChange={callback} >
            <Panel header="machine Config" key="1">
                <Descriptions title="Benchmark Info" bordered>
                    <Descriptions.Item label="CPU">Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="RAM">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="GPU">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="L1">YES</Descriptions.Item>
                    <Descriptions.Item label="L2">2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="L3">
                        2019-04-24 18:00:00
                    </Descriptions.Item>
                    <Descriptions.Item label="running time" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="memory space" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1<br />
                    </Descriptions.Item>
                </Descriptions>
            </Panel>
        </Collapse >
    );
    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

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
        body = (<div className={classes.background}>
            <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                Implementation
            </p>
            <CodeEditor
                isDarkTheme
                code={props.codeDrawDataCode}
                height='800px'
                width='95%'
                onChange={changeCode}
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
                <Button onClick={() => saveImpl()} type="danger" style={{ width: "12%", marginLeft: "48%" }}>Save</Button>
            </div>

        </div>
        );
    } else if (props.codeDrawDataType === "algorithm_problem") {
        body = (
            <div className={classes.background}>
                <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                    Problem Instance
                </p>

                <div className={classes.impleSelectBody}>
                    <Select
                        showSearch
                        style={{ width: "40%", marginLeft: "3%" }}
                        placeholder="Select case"
                        optionFilterProp="children"
                        onChange={changeProblem}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {ProblemData.Problem.map(item =>
                            <Option key={item} value={item}>{item}</Option>
                        )}
                    </Select>
                </div>
                <div style={{ marginLeft: "3%", marginTop: "3%" }}>
                    <Upload {...Fileprops} onChange={OnchangeUpload} percent="100">
                        <Button icon={<UploadOutlined />}>
                            Upload to S3
                        </Button>
                    </Upload>
                </div>
                <Divider />
                <p style={{ fontFamily: "Verdana", fontSize: "20pt", width: "50%" }}>
                    Benchmark
                </p>
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
                    footer={
                        <div>
                            {/* <b>ant design</b> footer part */}
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}

                        >
                            <List.Item.Meta
                                title={<p>{item.title}</p>}
                                description={item.description}
                            />
                            {Implecontent}
                        </List.Item>
                    )}
                />
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
        codeDrawDataTitle: state.code.codeDrawDataTitle,
        codeDrawDataCode: state.code.codeDrawDataCode,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);
