import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

export default function(SpecificComponent,option,adminRoute=null){
  function AuthenticationCheck(props){
    let user = useSelector(state=>state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(auth()).then(res=>{
        // 로그인 하지 않았다면,
        if(!res.payload.isAuth){
          // 로그인이 필요하다면
          if(option){
            props.history.push('/login');
          }
        }else{
          // 어드민 페이지를 요청했으나, 어드민이 아니라면
          if(adminRoute && !res.payload.isAdmin){
            props.history.push('/');
          }else{// 로그인하지 않아야 접근할 수 있는 페이지를 요청했다면
            if(option === false){
              props.history.push('/');
            }
          }
        }
      })
    },[]);
    return (
      <SpecificComponent {...props} user={user} />
    )
  }
  return AuthenticationCheck;
}