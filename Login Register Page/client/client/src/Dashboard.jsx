import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function Dashboard(){
    const[suc,setSuc]=useState()
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
    useEffect(()=>{
        axios.get('http://localhost:3000/dashboard')
        .then(res=>{
           if(res.data==="Success"){
            setSuc("Succeded ok ")
           }else{
            navigate('/')
           }
    }).catch(err=>console.log(err))
    },[])
    return(
        <div>Dashboard</div>
    )
}
export default Dashboard