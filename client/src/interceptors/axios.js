import axios from "axios";
import api from "../api";

let refresh = false;

api.interceptors.response.use(resp=> resp, async error=>{
    
    if (error.response.status === 401 && !refresh){
        console.log('here it is')
        refresh =true;
        
        const response = await api.post('/token/refresh/',{
            refresh:localStorage.getItem('refresh')
        }, { headers:{
            'Content-Type' : 'application/json',
             },
        withCredentials:true});
        console.log('hellow workd')
        console.log(response)
        if (response.status === 200){
            console.log(response.status)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            localStorage.setItem('token',response.data.access);
            localStorage.setItem('refresh',response.data.refresh);
            console.log('done')
            return api(error.config)
        } else{
            console.log('refresh failed')
        }
    }
    refresh = false
    return error
})


