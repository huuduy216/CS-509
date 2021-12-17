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
    const [dbId, SetDbId] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData() {
            const response = await axios.get('/normal/getcodetree', config);
            // let tree = JSON.stringify(response.data.tree)
            // localStorage.setItem('tree', tree);
            // console.log(response.data.children)
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
            let tree = AddDbId([response.data.tree])
            localStorage.setItem('tree', JSON.stringify(tree));
            SetSpaceTreeData(response.data.tree)
            SetDbId(response.data.DB);
        }

        fetchData();
    }, [])
    let content = (
        <div>
            <Toolbar />
            <CodeContent spaceTreeData={spaceTreeData} setLoading={setLoading} dbId={dbId}/>
            <ParticlesBg type="cobweb" bg={true} />
        </div>)

    if (loading || props.loading) {
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


const mapStateToProps = state => {

    return {
        loading:state.auth.loading,
    };
}

const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);