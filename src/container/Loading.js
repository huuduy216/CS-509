import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../UI/Loading/Loading';

function loading(props) {
    let redirectPage=null;
    if(props.redirect!=="" && !props.loading && props.routerChange){
        redirectPage=<Redirect to={props.redirect}/>
        console.log("ldkj")
    }
    
    return (
        <React.Fragment>
            {redirectPage}
            <div style={{height:900}}>
                <Loading/>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        redirect:state.auth.redirect,
        load:state.auth.loading,
        routerChange:state.auth.changeRouter
    };
}




export default connect(mapStateToProps, null)(loading);