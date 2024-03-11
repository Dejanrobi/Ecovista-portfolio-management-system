import React from 'react'

import "./PageHeader.css";

const PageHeader = ({header}) => {
  return (
    <div className='page-header '>
        <h2>{header}</h2>
        <hr className='margin-tb-15' />
      
    </div>
  )
}

export default PageHeader
