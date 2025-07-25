import React, { useState } from 'react';

function WebinarPlayer({ videoUrl }) {
  const [showWebinar, setShowWebinar] = useState(false);
  if (!videoUrl) {
    return <p style={{color:'#d32f2f',fontWeight:600}}>Webinar video coming soon for this program.</p>;
  }
  return !showWebinar ? (
    <div style={{textAlign:'center'}}>
      <button
        style={{
          background:'#2563eb',color:'#fff',fontWeight:700,fontSize:18,padding:'12px 32px',border:'none',borderRadius:8,boxShadow:'0 2px 8px #2563eb22',cursor:'pointer',marginTop:8
        }}
        onClick={() => setShowWebinar(true)}
      >
        ▶ Play Webinar
      </button>
    </div>
  ) : (
    <div style={{display:'flex',justifyContent:'center'}}>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="Webinar Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{borderRadius:12, boxShadow:'0 4px 18px #0002', maxWidth:'98vw'}}
      ></iframe>
    </div>
  );
}

export default WebinarPlayer;
