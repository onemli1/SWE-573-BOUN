import React from 'react';



class LoginPage extends Component{
    state = {
        username: null,
        password:null
    }

    onChange= event=>{
        const {name,value}= event.target;
        this.setState({
            [name]:value
        })

    }




    render(){
        return(
            <div className= "container">
                <form>
                    <h1 className='text-cwntwe'>Login</h1>
                    <ınput label ="Username" name="username" onChange={this.onChange}/>
                    <ınput label = "Password" name= "password" type ="password" onChange={this.onChange}/>
                    <div className= "text-center">
                        <button className= "btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default LoginPage;