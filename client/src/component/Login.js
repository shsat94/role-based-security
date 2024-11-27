import React, {  useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Login = (props) => {
    const navigate=useNavigate();
    const [Pass, setPass] = useState('password');
    const [credentials, setCreadentials] = useState({ email: '', password: '' });
    const passwordVisibility = () => {
        if (Pass === 'password') {
            setPass('text');
        }
        else {
            setPass('password');
        }

    }

    const handleFormSubmission=async(e)=>{
        e.preventDefault();
        const res= await fetch(`${props.host}/api/auth/signin`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const response=await res.json();
        localStorage.setItem('token',response.authenticationToken);
        if(response.login){
            navigate('/');
        }   
        else{
            alert("Credentials are wrong");
        }
    };

    const onChange=(e)=>{
        setCreadentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <>
      <div className="container" style={{marginTop:'3rem', maxWidth: '20rem', backgroundColor: '#000', padding: '2rem', borderRadius: '1rem', boxShadow: ' 0.5rem 0.5rem 1.3rem green', border: '2px solid white' ,color:'white'}}>
                <form >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Enter Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: 'black', border: '1px solid white',color:'white' }} name='email' onChange={onChange} value={credentials.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Enter Password</label>
                        <input type={`${Pass}`} name='password' className="form-control" id="exampleInputPassword1" style={{ backgroundColor: 'black', border: '1px solid white',color:'white' }} onChange={onChange} value={credentials.password} />
                        <input type="checkbox" onClick={passwordVisibility} style={{ marginTop: '0.4rem', }} /> <span className='mx-1'>Show Password</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" className="btn" onClick={handleFormSubmission} style={{ marginTop:'1rem', backgroundColor: '#90B494', boxShadow: '0 0 0.3rem black', color: 'black', borderRadius: '1rem', minWidth: '10rem',maxHeight:'2.5rem' }}>Login</button>
                    </div>
                    <div className="my-2 form-label" style={{textAlign:'center'}}>
                        Did Not Have a Account?<Link to="/signup">Signup</Link>
                    </div>
                </form>
            </div>
    </>
  )
}

export default Login;