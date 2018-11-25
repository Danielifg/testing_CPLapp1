const styles = theme => ({
login: {
      margin:'auto',
    marginAuto:'5em',
},
paper: {
 padding: theme.spacing.unit * 2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexWrap:'wrap',
  flexDirection:'column',
  justifyContent:'space-between',
  flex:1,
},
root: {
  display: 'flex',
  flexWrap: 'wrap',
},
grid_container: {
  flexWrap:'wrap',
  marginTop: '5em',
},
margin: {
  margin: theme.spacing.unit,
},
grid_container_2:{
  margin:'auto',
  marginTop: 'auto'
},
withoutLabel: {
  marginTop: theme.spacing.unit * 3,
},
textField: {
  flexBasis: 200,
},
selectEmpty: {
  marginTop: theme.spacing.unit * 2,
},
form_imput:{
  width: '16em'
}});

export default styles;
