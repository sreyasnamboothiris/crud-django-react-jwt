import React from 'react'

function Buttons({content,style,type,onClick}) {
  return (
    <>
      <button onClick={onClick ? onClick : undefined} type={type ? type:undefined} className={style}>{content}</button>
    </>
  )
}

export default Buttons
