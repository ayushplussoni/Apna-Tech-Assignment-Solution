import React from 'react';
import { useState } from 'react';
const Frontend=()=>
{
	const [deletedState,setdeletedState]=useState(-1);
	const login= async ()=>
	{
		const username=document.getElementById("username").value;
  		const password=document.getElementById("password").value;
  		
		const url="http://localhost:5000/login/";
  		let api=url.concat(username).concat("/").concat(password);
  		const response =  await fetch(api,{method:"GET"});
  		const data = await response.text();
  		var object = JSON.parse(data);
  		if(object.loginStatus==="success")
  		{
  			setloggedUser(1);
			setmessage("You are Logged In");
  		}	
	}
	function deleteItem(x,y)
	{
		setdeletedState(x);
		
		const temporary=[];
		for(var i=0;i<y.length;i++)
			if(y[i].id!=x)temporary.push(y[i]);
		setmessage(temporary.map((d) => <li key={d.id}>{d.name}<button onClick={()=>deleteItem(d.id,temporary)}>Delete</button></li>));	
	}
	const deleteState=async()=>
	{
		const url="http://localhost:5000/deleteState/.concat(deleteState)";
  		const response =  await fetch(url,{method:"POST"});
  		const data = await response.text();
  		var object = JSON.parse(data);
  		setdeletedState(-1);
  		setmessage(object.map((d) => <li key={d.name}>{d.name}<button onClick={()=>deleteItem(d.id,object)}>Delete</button></li>));


	}
	const process=async()=>
	{
		const url="http://localhost:5000/process/";
  		const response =  await fetch(url,{method:"GET"});
  		const data = await response.text();
  		var object = JSON.parse(data);
  		setmessage(object.map((d) => <li key={d.name}>{d.name}<button onClick={()=>deleteItem(d.id,object)}>Delete</button></li>));
	}
	const [loggedUser,setloggedUser]=useState(0);
	const [message,setmessage]=useState("You are not-Logged In");
	return(<div><div className="login-segment">
		<label htmlFor="username" >Username</label>
          <input type="text" id="username" name="username"/><br />
          <label htmlFor="password" >Password </label>
          <input type="password" id="password" name="password"/><br />
          <button onClick={login} >Log-In</button>
          <div className="message">{message}</div>
          </div><br />
          <div className="submission-segment" style={{visibility:loggedUser===0?"hidden":"visible"}}>
          <form action="/uploadfile" enctype="multipart/form-data" method="POST"> 
   <input type="file" name="myFile" />
   <input type="submit" value="Upload a file"/><br />
</form>

<button onClick={process}>Display File</button>
          </div>

		</div>)
}
export default Frontend;