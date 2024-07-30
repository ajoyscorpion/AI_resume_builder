import React from 'react'
import './PersonalInformation.css'

function PersonalInformation({data}) {
  return (
    <div className="personal-info">
        {/* Name */}
        <h2>{data.name}</h2>
        {/* Place */}
        <p>{data.city}, {data.state}, {data.country}</p>
        {/* email */}
        <p>Email : {data.email}</p>
        {/* Additional links */}
        {data.additionalLinks.map((item,index) => (
            <p key={index}>{item.type} : {item.url}</p>
        ))}
        {/* Phone No */}
        <p>Phone No. : {data.countryCode} {data.phone}</p>
    </div>
  )
}

export default PersonalInformation
