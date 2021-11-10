import React, { useState } from 'react';

import { connect } from 'react-redux';
import AWS from 'aws-sdk'
import classes from './TreeNode.module.css';
import { RightOutlined, PlusOutlined, DownOutlined, DeleteOutlined,FontColorsOutlined } from '@ant-design/icons';
import Tree from './Tree';
import { Button,Spin,Input } from 'antd';
import { Upload } from 'antd';
import * as CodeAction from '../../../store/action/code';








const TreeNode = (props) => {
    const [progress , setProgress] = useState(0);
const [selectedFile, setSelectedFile] = useState(null);
    const [childVisible, setChildVisibility] = useState(false);
    const addButtonHidden = props.node.type!=="algorithm"&& (!props.node.type.includes('problem'))&& (!props.node.type.includes('benchmark'))? false : true;
    const hasChild = props.node.children ? true : false;
    const ClassificationItem = props.node.type.includes('classification')?true:false;
    const AlgorithmItem = props.node.type.includes('algorithm')?true:false;
    const ImplementationItem = props.node.type==="algorithm_implementations"||props.node.type==="algorithm_problem"?true:false;
    const deleteButtonHidden = true;
    // const deleteButtonHidden = (!node.type.includes('benchmark'))? true : false;
    const S3_BUCKET ='cs-509-implementations';
    const REGION ='us-east-2';


AWS.config.update({
    accessKeyId: 'AKIA3A3Z************',
    secretAccessKey: '86WxkHcq6*************'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})
    let handleFileInput =(e)=>{
        setSelectedFile(e.target.files[0]);
    }
    const uploadFile = (file, treeData,key) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                
                if(evt.loaded==100)
                console.log("done")
            })
            .send((err) => {
                if (!err) console.log("done deplo")
             let   url = "https://" + S3_BUCKET+".s3." + REGION  + ".amazonaws.com/"+ encodeURI(file.name)
                console.log(url)
              //  props.addImplementationChild(treeData,key, url);
            })
    }

    let editItem = (
        <div className={classes.toggler + ' ' + (childVisible ? classes.active : '')}>
            <Button onClick={e => setChildVisibility(v => !v)} className={hasChild?classes.editButton:classes.editButtonHidden} size="small" icon={childVisible ? <DownOutlined /> : <RightOutlined />} type="text" />
            <Button onClick={()=>props.addChild(props.treeData,props.node.key)} className={!AlgorithmItem&&hasChild&&!addButtonHidden||ClassificationItem?classes.editButton:classes.editButtonHidden} size="small" icon={<PlusOutlined />} type="primary" />
            <Button onClick={()=>props.addAlgor(props.treeData,props.node.key)} className={!AlgorithmItem&&!addButtonHidden?classes.editButton:classes.editButtonHidden} size="small" icon={<FontColorsOutlined/>} type="primary" danger ghost/>
            <Button onClick={()=>props.deleteChild(props.treeData,props.node.key)} className={deleteButtonHidden?classes.editButton:classes.editButtonHidden} size="small" icon={<DeleteOutlined />} type="danger" />
           
            {/* <p className={classes.editTitle}>{props.node.title}</p> */}
            <Input onChange={({ target: { value } })=>props.modifyTree(props.treeData,props.node.key,value)} className={AlgorithmItem?classes.editTitleAlgorithm:classes.editTitle} placeholder="Basic usage" defaultValue={props.node.title} size="small"/>
             <div  className = {ImplementationItem? classes.upload:classes.hideUpload}>
                 {/* <Upload className={classes.uploadButton} onChange={(response) => {
            if (response.file.status !== 'uploading') {
              console.log(response.file, response.fileList);
            }
            if (response.file.status === 'done') {
                console.log("issue")
            //   message.success(`${response.file.name} 
            //                    file uploaded successfully`);
            } else if (response.file.status === 'error') {
            //   message.error(`${response.file.name} 
            //                  file upload failed.`);
            console.log("error")
            }
          }} action={'/upload'}  > */}
             {/* <Button>Upload</Button> */}
             {/* </Upload> */}
             <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile, props.treeData,props.key)}> Upload to S3</button>
             </div>
        </div>
    )
   
    if(props.fresh){
        editItem=(<Spin/>);
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
                            <Tree treeData={props.node.children} />
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
        fresh:state.code.fresh
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addChild:(node,id)=>dispatch(CodeAction.treeAddClick(node,id)),
        addAlgor:(node,id)=>dispatch(CodeAction.treeAddAlgorClick(node,id)),
        deleteChild:(node,id)=>dispatch(CodeAction.treeDeleteClick(node,id)),
        modifyTree:(node,id,newTitle)=>dispatch(CodeAction.treeModify(node,id,newTitle)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);

