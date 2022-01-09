import React from 'react';
import {signup} from '../api/apiCalls';
import Input from '../component/Input';


class UserSignUpPage extends React.Component {

      state= {
          username :null,
          firstname : null,
          lastname : null,
          password : null,
          passwordrepeat: null,
          pendingApicall : false,
          errors : {
            
          }
          

      };


    onChange= event => {
        const {name, value }= event.target;
        const errors = {...this.state.errors}
        errors[name]=undefined

        this.setState({
            [name]:value,
            errors

        });
    };
     onClickSignUp = async event =>{
       event.preventDefault();
      
       const {username , firstname,lastname,password}= this.state;
       const body ={
         username,
         firstname,
         lastname,
         password
       };

      this.setState({pendingApicall:true});

      try {
       const response = await signup(body);
      } catch (error) {
        if(error.response.data.validationErrors){

        }
        this.setState({ errors: error.response.data.validationErrors });
      }
      

      
      this.setState({pendingApicall:false});
    };
    render()  {

       const {pendingApicall, errors }=this.state;
       const {username }= errors;
       return (
         <div className = "container">
         
           <form>
              <h1 className='text-center'> Sign Up </h1>
              <input name= "username" label= "username" error={username} onChange={this.onChange}/>
              <input name= "firstname" label= "firstname" error={firstname} onChange={this.onChange}/>
              <input name= "lastname" label= "lastname" error={lastname} onChange={this.onChange}/>

              <div className="form-group">
                
              
                <label>Password</label>
                <input className = "form-control"  type="password" name="password" onChange={this.onChange}/>
              </div>
              <div className = "form-control">
                <label>Password Pepeat</label>
                <input className = "form-control" type="password" name ="passwordrepeat" onChange={this.onChange}/>
              </div>
              <div className= 'text-center'>
                 <button className="btn btn-primary" onClick={this.onClickSignup} disabled ={pendingApicall}>Sign Up</button>

              </div>

            </form>
        </div>
        );
    }
}
const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPage);
const UserSignUpPageWithApiProgress= withApiProgress(UserSignUpPageWithApiProgress)
export default withTranslation()(UserSignUpPage);