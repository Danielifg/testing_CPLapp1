import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import styles from './Styles-LoginForm.js'

class LoginForm extends React.Component {
  constructor(props){
    super(props)
  }

render(){
  const { _handleChange, _handleLogin,_handleClickShowPassword,
                                       _handleMouseDownPassword,
                                       userName, showPassword,
                                       password,
                                       classes,
                                     } = this.props;
                                     console.log(userName)
    return(
      <Grid container style={{flexWrap:'wrap',marginTop:'5em'}} >
        <Grid item xs={12} sm={6} className={classes.grid_container_2}>
          <Paper className={classes.paper}>

                          <div>
                              <TextField className={classes.form_imput} id="input-with-icon-grid"
                                        label="User name" value={userName}
                                        onChange={ _handleChange('userName')}/>
                          </div>

                          <div>
                            <FormControl className={classNames(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input   className={classes.form_imput}
                                  id="adornment-password"
                                  type={showPassword ? 'text' : 'password'}
                                  value={password}
                                  onChange={_handleChange('password')}
                                  endAdornment={
                                    <InputAdornment position="end">
                                          <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={ _handleClickShowPassword() }
                                            onMouseDown={ () => _handleMouseDownPassword() }
                                            >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>}/>
                              </FormControl>
                          </div>

                          <div>
                            <Button size="large" className="button" onClick={() => _handleLogin()} >
                                Login
                            </Button>
                          </div>
            </Paper>
        </Grid>
      </Grid>
    )
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm)
