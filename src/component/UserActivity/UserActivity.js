import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as AuthAction from '../../store/action/auth';


import Loading from '../../UI/Loading/Loading';
import axios from '../../axios/axios-local'
import ParticlesBg from 'particles-bg'
import UserContent from '../UserContent/UserContent'



const UserActivity = (props) => {
    const [userActivityData, SetUserActivityData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData() {
            // const response = await axios.get('/normal/getuserActivity', config);
            // let userActivity = JSON.stringify(response.data.tree)
            // localStorage.setItem('userActivity', userActivity);
            
            // SetUserActivityData(response.data.tree)
            console.log("done")
            SetUserActivityData([{
                "Name":"User1",
                "History" : " did this",
                "Id":"1"
              
              
              
              },{
                  "Name":"User2",
                  "History" : " did this",
                  "Id":"2"
                
              },{
              "Name":"User3",
                "History" : " did that",
                "Id":"3"}
              ])
        }

        fetchData();
    }, [])
    let content = (
        <div>
           
            <UserContent userActivityData={userActivityData} SetUserActivityData={SetUserActivityData} setLoading={setLoading}/>
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


export default connect(mapStateToProps, null)(UserActivity);