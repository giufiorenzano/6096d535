import React from "react";

const Call = ({ call }) => {
  return (
    <li>
     {/*  <span>{call.created_at}</span> */}
      <span>{call.from}</span>
    </li>
  )
}

export default Call