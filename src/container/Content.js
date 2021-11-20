import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';

import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Loading from '../UI/Loading/Loading';
import axios from '../axios/axios-local'
import ParticlesBg from 'particles-bg'
import CodeContent from '../component/CodeContent/CodeContent'

const Content = (props) => {
    const [spaceTreeData, SetSpaceTreeData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData() {
            const response = await axios.get('/normal/getcodetree', config);
            let tree = JSON.stringify(response.data)
            localStorage.setItem('tree', tree);
            // console.log(response.data.children)
            // props.changeTree(response.data.children);
            SetSpaceTreeData(response.data)
        }

        fetchData();
    }, [])
    let content = (
        <div>
            <Toolbar />
            <CodeContent spaceTreeData={spaceTreeData} setLoading={setLoading}/>
            <ParticlesBg type="cobweb" bg={true} />
        </div>)

    if (loading) {
        content = (
            <div>
                <Loading />
            </div>);
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}


const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(null, mapDispatchToProps)(Content);