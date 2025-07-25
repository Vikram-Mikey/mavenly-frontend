import React from 'react';

const Loading = () => (
  <div style={{height:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'linear-gradient(90deg,#ff5757 0%,#4998da 100%)'}}>
    <div style={{fontSize:44,color:'#fff',fontWeight:700,marginBottom:18,letterSpacing:1}}>Loading Profile...</div>
    <div style={{width:60,height:60,border:'6px solid #fff',borderTop:'6px solid #2563eb',borderRadius:'50%',animation:'spin 1s linear infinite'}} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
  </div>
);

export default Loading;
