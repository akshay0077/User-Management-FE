import {commonrequest} from "./ApiCall"
import {BASE_URL} from "./helper"

export const registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/api/v1/user/register`,data,header);
}

export const usergetfunc = async(search,page)=>{
    return await commonrequest("GET",`${BASE_URL}/api/v1/user/details?search=${search}&page=${page}`,"");
}

export const singleUsergetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/api/v1/user/${id}`,"");
}

export const editfunc = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/v1/user/edit/${id}`,data,header);
}

export const deletfunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/api/v1/user/delete/${id}`,{});
}

export const statuschangefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/v1/user/status/${id}`,{data})
}

export const exporttocsvfunc = async()=>{
    return await commonrequest("GET",`${BASE_URL}/api/v1/userexport`,"");
}