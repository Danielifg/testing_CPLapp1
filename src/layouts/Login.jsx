import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import { compose  } from 'recompose'
import { setReportsData, setSearchDates,set_Reports_Data_To_Display,setSearchFlag } from '../redux/actions'
import  {FETCH_MAIN_DATA, format}  from '../graphql/Queries'
import moment from 'moment';
import LoginForm from '../components/LoginForm/LoginForm'


class Login extends React.Component{
constructor(props){
    super(props)
    this.state = {
      password: '',
      showPassword: false,
      userName:'',
      searching:false,
      from : format(moment(new Date()).subtract(1,'months')),
      to : format(new Date()),      
    }
}

_handleChange = prop => event => {
 this.setState({ [prop]: event.target.value });
 this.props.setSearchDates(this.state.from,this.state.to);
};

_handleMouseDownPassword = event => {
 event.preventDefault();
};

_handleClickShowPassword = () => {
 this.setState(state => ({ showPassword: !state.showPassword }));
};

_handleLogin = () => {
 const {from,to,searching} = this.props
 const { userName,password } =  this.state

// *** Apollo-graphql-call ***
 const operation = { query: FETCH_MAIN_DATA, variables: {from, to} }
 this.props.setReportsData(operation)
// ****************************

 this.props.setSearchFlag(true)
 this.props.history.push(`/${userName}`)
}

render(){
          return (
                    <LoginForm _handleChange = {this._handleChange}
                               _handleLogin  = {this._handleLogin}
                               _handleMouseDownPassword = {() => this._handleMouseDownPassword}
                               _handleClickShowPassword = {() => this._handleClickShowPassword}
                               userName = {this.state.userName}
                               showPassword ={this.state.showPassword}
                               password ={ this.state.password}
                              />
                  );
  }
}


function mapStateToProps(state){
  return{
      showDetails: state.showDetails,
      details: state.details,
      from: state.from,
      to: state.to,
      reportsData: state.reportsData,
      searching : state.searching
  }
}

function mapDispatchToProps(dispatch){
  return{
      setReportsData              : (operation)    => dispatch(setReportsData(operation)),
      setSearchDates              : (from,to)      => dispatch(setSearchDates(from,to)),
      set_Reports_Data_To_Display : (reports_data) => dispatch(set_Reports_Data_To_Display(reportsData)),
      setSearchFlag               : (searching)      => dispatch(setSearchFlag(searching))
  }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),withRouter)(Login)
