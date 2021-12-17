import React, { useState } from 'react';

import { connect } from 'react-redux';
import AWS from 'aws-sdk'
import classes from './TreeNode.module.css';
import { RightOutlined, PlusOutlined, DownOutlined, DeleteOutlined, FontColorsOutlined,CloudDownloadOutlined } from '@ant-design/icons';
import Tree from './Tree';
import { Button, Spin, Input, Typography } from 'antd';

import * as CodeAction from '../../../store/action/code';
import * as AuthAction from '../../../store/action/auth';

const { Title } = Typography;






const TreeNode = (props) => {
    const [childVisible, setChildVisibility] = useState(false);
    const addButtonHidden = props.node.type !== "algorithm" && (!props.node.type.includes('implementation')) && (!props.node.type.includes('problem')) && (!props.node.type.includes('benchmark')) ? false : true;
    const hasChild = (props.node.children) && !(Object.prototype.isPrototypeOf(props.node.children) && Object.keys(props.node.children).length === 0) ? true : false;
    const ClassificationItem = props.node.type.includes('classification') ? true : false;
    const AlgorithmItem = props.node.type.includes('algorithm') ? true : false;
    const UrlItem = props.node.type === "url" ? true : false;

    const deleteButtonHidden = true;
    // const deleteButtonHidden = (!node.type.includes('benchmark'))? true : false;
    // const [progress, setProgress] = useState(0);
    const ImplementationItem = props.node.type === "algorithm_implementations" || props.node.type === "algorithm_problem" ? true : false;
    // const S3_BUCKET = 'cs-509-implementations';
    // const REGION = 'us-east-2';

    const clickAddButton = () => {
        props.addChild(props.treeData, props.node.key);
        let history =props.userHistory
        let element= "Added Subclassification||"
        history.push(element)
        props.updateUserHistory(history);
        console.log(history)
        setChildVisibility(true);
    }
    const deleteChildFunction =()=>{
        props.deleteChild(props.treeData, props.node.key)
        let history =props.userHistory
        let element= "Deleted " + props.node.title +"||"
        history.push(element)
        props.updateUserHistory(history);
        console.log(history)
    }
    const clickAddAlgorButton = () => {
        props.addAlgor(props.treeData, props.node.key);
        let history =props.userHistory
        let element= "Added New Algorithm||"
        history.push(element)
        props.updateUserHistory(history);
        setChildVisibility(true);
    }

    //find imple and problem parent
    const findParentAlgor = (id,treeData) => {
        id = id.split("-").map((str) => parseInt(str));
        let changingNode = treeData[id[0]];

        if (id.length > 1) {
            for (let i = 1; i < id.length; i++) {
                changingNode = changingNode.children[id[i]];
            }
        }
        return changingNode;
    }

    const clickDrawDisplay = () => {
        props.setLoadingTime(1000);
        if(props.node.type==="classification"){
            props.getClassificationContent(props.node)
        }else if(props.node.type==="sub_classification"){
            props.getSubClassificationContent(props.node)
        }else if(props.node.type==="algorithm_type"){
            props.getAlgorithmContent(props.node)
        }else if(props.node.type==="algorithm_implementations"){
            // props.getImplementationContent(props.node)
            let nowKey = props.node.key;
            let algorName = findParentAlgor(nowKey.substring(0,nowKey.length-2),JSON.parse(localStorage["tree"]).children).title
            let codeDrawData = {
                "nodeType": "algorithm_implementations",
                "nodeTitle": `${algorName} / Implementation`,
                "nodecode":"",
                "nodekey":props.node.key,
            };
            props.setDrawerData(codeDrawData);
            props.changeCodeLanguage(undefined);
        }else if(props.node.type==="algorithm_problem"){
            let nowKey = props.node.key;
            let algorName = findParentAlgor(nowKey.substring(0,nowKey.length-2),JSON.parse(localStorage["tree"]).children).title
           
            // let codeDrawData = {
            //     "nodeType": "algorithm_problem",
            //     "nodeTitle":  `${algorName} / Problem Instance`,
            //     "nodecode":"",
            //     "nodekey": props.node.key,
            //     "benchmarks":[]
            // };
            // props.setDrawerData(codeDrawData)
            let problemInfo = {
                algorKey: nowKey.substring(0,nowKey.length-2)
            }
            props.getDrawerProblemContent(algorName,nowKey,problemInfo);
        }else{
            props.setContentClear()
        }
        
        // console.log(props.codeDrawData)
        
        setTimeout(() => {
            props.setDrawerDisplay(true);
        }, 150);
        // console.log(Object.keys(props.codeDrawData).length === 0 && Object.getPrototypeOf(props.codeDrawData) === Object.prototype);
    }

    //S3 SETTing
    AWS.config.update({
        accessKeyId: 'AKIA3A3ZLIWMX4LOEHVJ',
        secretAccessKey: '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'
    })

    // const myBucket = new AWS.S3({
    //     params: { Bucket: S3_BUCKET },
    //     region: REGION,
    // })

    // const Fileprops = {
    //     customRequest({
    //         file,
    //     }) { 
    //        let transform = file.name+ Math.floor(Math.random() * 100);
    //        let history =props.userHistory
    //        let element= "Added New File" + file.name +"||"
    //        history.push(element)
    //        props.updateUserHistory(history);
           

    //         const params = {
    //             ACL: 'public-read',
    //             Body: file,
    //             Bucket: S3_BUCKET,
    //             Key: transform
    //         };

    //         myBucket.putObject(params)
    //             .on('httpUploadProgress', (evt) => {
    //                 // setProgress(Math.round((evt.loaded / evt.total) * 100))

    //                 if (evt.loaded === 100)
    //                     console.log("done")
    //             })
    //             .send((err) => {
    //                 if (!err) {
    //                     console.log("done deplo")
    //                     let url = "https://" + S3_BUCKET + ".s3." + REGION + ".amazonaws.com/" + decodeURI(transform)
    //                     console.log(encodeURI(file.name));
    //                     props.addurl(props.treeData, props.node.key, url);
    //                     console.log(url)
    //                 }
    //                 //  props.addImplementationChild(treeData,key, url);
    //             })
    //         setChildVisibility(true);
    //     }
    // };

    //input set
    let auth = localStorage.getItem('timesheetisAuthenticated');
    let inputClass;
    if (!UrlItem) {
        if (!props.editButton && auth) {
            inputClass = (<Input onChange={({ target: { value } }) => props.modifyTree(props.treeData, props.node.key, value)} className={AlgorithmItem || ImplementationItem ? classes.editTitleAlgorithm : classes.editTitle} placeholder="Basic usage" defaultValue={props.node.title} size="small" />
            );
        } else {
            inputClass = (<Title level={5} style={{ marginLeft: "3px", marginTop: "3px" }}>{props.node.title}</Title>);
            if (!auth) {
                inputClass = (<Button onClick={() => { clickDrawDisplay(props.treeData, props.node.key) }} style={{ lineHeight: "10pt", border: "none", backgroundColor: "transparent", fontFamily: "Arial Black", fontSize: "15pt" }}>{props.node.title}</Button>);
            }
        }
    } else {
        let lastIndex = (props.node.title).lastIndexOf("/");
        let fileName = (props.node.title).substring(lastIndex + 1);
        inputClass = (<Button icon={<CloudDownloadOutlined />} type="link" style={{ fontSize: "12pt", marginBottom: "6px", fontWeight: "bold" }} href={props.node.title}> {fileName}</Button>);
    }


    let editItem = (
        <div className={classes.toggler + ' ' + (childVisible ? classes.active : '')}>
            <Button onClick={e => setChildVisibility(v => !v)} className={hasChild ? classes.editButton : classes.editButtonHidden} size="small" icon={childVisible ? <DownOutlined /> : <RightOutlined />} type="text" />
            <Button onClick={() => clickAddButton()} className={(((((!AlgorithmItem) && hasChild) && (!addButtonHidden)) || (ClassificationItem)) && (!props.editButton)) && (!UrlItem) ? classes.editButton : classes.editButtonHidden} size="small" icon={<PlusOutlined />} type="primary" />
            <Button onClick={() => clickAddAlgorButton(props.treeData, props.node.key)} className={(((!AlgorithmItem) && (!addButtonHidden)) && (!props.editButton)) && (!UrlItem) ? classes.editButton : classes.editButtonHidden} size="small" icon={<FontColorsOutlined />} type="primary" danger ghost />
            <Button onClick={() => deleteChildFunction(props.treeData, props.node.key)} className={(deleteButtonHidden && (!props.editButton))  ? classes.editButton : classes.editButtonHidden} size="small" icon={<DeleteOutlined />} type="danger" />
            {inputClass}
            {/* <div className={ImplementationItem ? classes.upload : classes.hideUpload}>
                <Upload {...Fileprops} >
                    <Button icon={<UploadOutlined />} hidden={props.editButton}>
                        Upload to S3
                    </Button>
                </Upload>
            </div> */}
        </div>
    )

    if (!auth) {
        editItem = (
            <div className={classes.toggler + ' ' + (childVisible ? classes.active : '')}>
                <Button onClick={e => setChildVisibility(v => !v)} className={hasChild ? classes.editButton : classes.editButtonHidden} icon={childVisible ? <DownOutlined /> : <RightOutlined />} type="text" />
                {/* <p className={classes.editTitle}>{props.node.title}</p> */}
                {/* <Input disabled onChange={({ target: { value } }) => props.modifyTree(props.treeData, props.node.key, value)} className={AlgorithmItem ? classes.editTitleAlgorithm : classes.editTitle} placeholder="Basic usage" defaultValue={props.node.title} size="small" /> */}
                {inputClass}
            </div>
        )
    }

    if (props.fresh) {
        editItem = (<Spin />);
    }



    return (
        <React.Fragment>
            <li className={classes.dTreeNode}>
                <div className={classes.dFlex} >
                    {editItem}
                </div>
                {
                    hasChild && childVisible && <div className={classes.dTreeContent}>
                        <ul className={classes.dTreeContainer}>
                            <Tree treeData={props.node.children} editButton={props.editButton} readMode={props.readMode}/>
                        </ul>
                    </div>
                }
            </li>

        </React.Fragment>

    );
};


const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        fresh: state.code.fresh,
        codeDrawData: state.code.codeDrawData,
        userHistory : state.code.userHistory
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addChild: (node, id) => dispatch(CodeAction.treeAddClick(node, id)),
        addAlgor: (node, id) => dispatch(CodeAction.treeAddAlgorClick(node, id)),
        deleteChild: (node, id) => dispatch(CodeAction.treeDeleteClick(node, id)),
        modifyTree: (node, id, newTitle) => dispatch(CodeAction.treeModify(node, id, newTitle)),
        addurl: (node, id, url) => dispatch(CodeAction.treeUrlAddClick(node, id, url)),
        setDrawerDisplay: (drawvisible) => dispatch(CodeAction.setCodeDrawerDisplay(drawvisible)),
        getClassificationContent: (node) => dispatch(CodeAction.getClassificationContent(node)),
        getSubClassificationContent:(node)=>dispatch(CodeAction.getSubClassificationContent(node)),
        getAlgorithmContent:(node) => dispatch(CodeAction.getAlgorithmContent(node)),
        editImplementationContent:(node)=>dispatch(CodeAction.editImplementationContent(node)),
        setDrawerData:(DrawerData)=>dispatch(CodeAction.setDrawerData(DrawerData)),
        setContentClear:()=>dispatch(CodeAction.setContentClear()),
        changeCodeLanguage:(language)=>dispatch(CodeAction.changeCodeLanguage(language)),
        setLoadingTime:(time)=>dispatch(AuthAction.setLoadingTime(time)),
        updateUserHistory:(userhistory)=>dispatch(CodeAction.updateUserHistory(userhistory)),
        getBenchmark:(algorKey)=>dispatch(CodeAction.getBenchmark(algorKey)),
        getDrawerProblemContent:(algorName, key, problemInfo)=>dispatch(CodeAction.getDrawerProblemContent(algorName, key, problemInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);

