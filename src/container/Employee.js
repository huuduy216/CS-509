import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';

import axios from '../axios/axios-local'
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Code from '../component/Code/Code'
import CodeDrawer from '../component/Code/CodeDrawer/CodeDrawer'
import ParticlesBg from 'particles-bg'


const Employee = (props) => {

    const [spaceTreeData, SetSpaceTreeData] = useState([]);



    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        async function fetchData() {
            const response = await axios.get('/normal/getcodetree', config);
            // console.log(response.data.tree.children)
            // props.changeTree(response.data.children);
            let DB = response.data.DB;
            let AddDbId = (arr) => {
                arr.map((item) => {
                    // item.key = id + '-' + item.key;
                    item["dbId"]=DB[item.key]
                    if (item.children && item.children.length > 0) {
                        AddDbId(item.children)

                    } return null;
                })
                return arr;
            }
            
            let tree = AddDbId(response.data.tree.children)
            localStorage.setItem('tree', JSON.stringify(tree));
            
            SetSpaceTreeData(response.data.tree.children)
        }

        fetchData();
    }, [])


    return (
        <React.Fragment>
            <Toolbar />
            <Code spaceTreeData={spaceTreeData} />
            <CodeDrawer />
            <ParticlesBg type="cobweb" bg={true} />

        </React.Fragment>
    )
}



const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(null, mapDispatchToProps)(Employee);