import React from "react";
import { render } from "react-dom";
import { Grid } from 'semantic-ui-react';

import { Card, Image, Transition, Divider } from 'semantic-ui-react';
import DP from '../../test.jpg'
const style = {
  height: 30,
  border: "1px solid",
  width:678,
  
  padding: 80
};

class Post extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };
  

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };
  

  render() {
    
	
    return (
      <div
	  style={{
		marginTop: '10vh',
	}}>
        <h1>Create Post Component Goes Here</h1>
        <hr />
        <Grid>
        <Transition animation='slide up' visible={true}>
					<Card
						centered
						fluid
						style={{
							maxWidth: '720px',
              boxShadow: '0 2px 4px 5px rgba(255,208,0,0.40)',
			  margin: "0 auto"
			  ,marginTop:'20px'
			  ,marginBottom:'10px'
						}}
						raised
					>
						<Card.Content>
							<Image
								src={DP} // Image goes from the database
								size='mini'
								floated='left'
								style={{
									objectFit: 'cover',
									borderRadius: '60%',
									height: '8vh',
									width: '8vh',
					
								}}
							/>
							<span style={{position:"relative",fontSize: '2em' ,padding:"5dp",margin:"5px"}}>Shiva</span>
							<i className="material-icons" style={{
                                float:"right"}} onClick={()=>{console.log("Deleted")}}>delete</i>
							<span style={{position:"relative",fontSize: '20px' ,padding:"15dp",margin:"10px"}}>MIT</span>
							<br/>
							
							<span style={{position:"relative",fontSize: '20px' ,padding:"10dp",margin:"10px"}}>yesterday at 9:30</span>
							
							
						</Card.Content>
						<Card.Content>
							
							{/*post.files*/ 1 && (
								<Image
									src={DP}
									style={{ paddingTop: '4vh', paddingBottom: '2vh',objectFit: 'cover',width:'100%',height:'100%' }}
								/>
							)}
							<hr/>
							<Card.Description style={{fontSize:'2em'}}>My First Post</Card.Description>
							
							<p>&nbsp;</p>
						</Card.Content>
						<Card.Content extra>
						
						<i className="fa fa-heart" onClick={()=>{}}  style={{fontSize:'2em',color:'red'}}></i>
						
							
						</Card.Content>
					</Card>
					
				</Transition>
				
				
        </Grid>
        <br/>
        <br/>
      </div>
    );
  }
}

export default Post


