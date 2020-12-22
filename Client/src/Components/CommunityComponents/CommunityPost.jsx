import React, {Component} from 'react';
import TOC from "./Components/TOC";
import ReadContent from "./Components/ReadContent";
import Subject from "./Components/Subject";
import Control from "./Components/Control";
import UpdateContent from "./Components/UpdateContent";
import CreateContent from './Components/CreateContent';
import axios from 'axios';
import { Button } from 'reactstrap';


// Use class
class CommunityPost extends Component{
	constructor(props){
		super(props);	
		this.state ={
		mode:'list',
      	selected_content_id:0,
		contents:[],
		type:this.props.type,
		subject:"Community Post",
		subtitle: "Do you play any games? Let's share it!"
	}

}	
	// receive data by using fetch
	componentDidMount() {
		console.log('componentDidMount()');

		if(this.state.type ==='feedbackpost'){
			this.setState({
				subject:"Feed Back Post",
				subtitle: "Feel free to leave any feed back for this web page!"
			})
		}
		
		axios.post('/communitypost/senddata', {type:this.state.type})
		.then(response => 
			this.setState(() => ({contents: response.data.rows})))
		.then(console.log(this.state.contents))
		
	}

	// receive data by using axios (don't need to convert)
	async setData(_id, _writer,_title,_desc,_mode) {
		console.log('setData()');
		let data = {
			id:_id,
			writer:_writer,
			title:_title,
			description:_desc,
			mode:_mode,
			type:this.state.type
		}

		await axios.post('/communitypost/receivedata',data)
		.then(response => 
			this.setState(() => ({contents: response.data.rows[1]})))
			// {this.setState({contents: response.data.rows[1]})})
		.then(console.log(this.state.contents))
		.catch(function (error) {
		console.log(error);
		});
  	}
	
	getReadContent(){
		console.log('getReadContent()');
		let i =0;
		  while(i<this.state.contents.length){
			let data = this.state.contents[i];
			if(data.id === this.state.selected_content_id){
			  return data;
			}
			i=i+1;
		  }
	  }
	  
	getContent(){
		console.log('getContent()');
		let _article,_content = null;
		if(this.state.mode ==='list'){
			_article = <TOC onChangePage = {
				async function(id){ 
				await this.setState({
					mode:'read',
					selected_content_id:Number(id)
				});
				}.bind(this)
			} data={this.state.contents}></TOC>
			return _article
		}

		//read
		else if (this.state.mode ==='read'){
		  _content = this.getReadContent();
			console.log(_content);
		  _article = <ReadContent id={_content.id} writer={_content.writer} title= {_content.title} desc= {_content.description} date={_content.date} time={_content.time} ></ReadContent>
		}

		// Update
		else if(this.state.mode ==='update'){
		  _content = this.getReadContent();
		  _article = <UpdateContent data = {_content} onSubmit={
			function(_id, _writer, _title, _desc){
			  //add content to this.state.cotnents
			  this.setData(_id, _writer, _title, _desc,'update');
			  this.setState({
				mode:'read'
			  });
			}.bind(this)
		  }></UpdateContent>
		 
		}

		//create
		else if (this.state.mode ==='create'){
			_article = <CreateContent onSubmit={
				 async function(_writer,_title,_desc){
				//add content to this.state.cotnents
				await this.setData(0,_writer,_title,_desc,'create');
				await this.setState({
					selected_content_id:this.state.contents[this.state.contents.length-1].id,
					mode:'read'
					});
				}.bind(this)
			}></CreateContent>
		}
		return _article;
	  }

	  createController() {
		  let _button;
		if(this.state.mode ==='read'){
			console.log('createController()');
			_button = <Control onChangeMode={function(_mode){
				//delete
				if(_mode === 'delete'){
					if(window.confirm('really?')){
						console.log(this.state.selected_content_id);
						this.setData(this.state.selected_content_id,'','','','delete');
						this.setState({
						mode:'list',
						selected_content_id:0
						});
						alert('deleted!');
					}
				}
				else{
				this.setState({
				mode:_mode
				});			
			}
			}.bind(this)}></Control>
			return _button;
		} 	
		else {return null;}
	  }

	  createPost() {
		  let _post;
		if (this.state.mode !=='create') {
			console.log('createPost()');
			_post = <Button onClick = {function(e){
				e.preventDefault();
				this.setState({mode: 'create'})
			}.bind(this)}type="button">Add New Post</Button>

			return _post;
		}
		else return null;
	  }

	  render(){
    
		return(
		<div className="CommunityPost">
			<Subject 
			title={this.state.subject}
			sub={this.state.subtitle}
			onChangePage={function(){
			this.setState({mode:'list'});
			
			}.bind(this)}
			></Subject>

			{this.getContent()}
			
			{this.createController()}

			{this.createPost()}			

		</div>
		);
	  }
	}


export default CommunityPost;