import React, {Component} from 'react';


class Control extends Component {
	render() {// method in the class can be omitted "function"
	 return(
		<div>
			<input onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('update');
			}.bind(this)}type="button" value="Update"></input>
			<input onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('delete');
			}.bind(this)} type="button" value="delete"></input>
			<input onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('list');
			}.bind(this)} type="button" value="List"></input>
		</div>
	 ); 
	}
  }

  export default Control;