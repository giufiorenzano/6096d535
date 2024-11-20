import React from "react"
import LoaderSvg from '../../assets/loader.svg'

import { useLoader } from "../../providers/loader.jsx";

import './style.css'

const Loader = () => {
  const { loading } = useLoader();

  return (
    <div className={`loader flex align-center justify-center ${loading ? 'show' : 'd-none'}`}>
      <div className="card-loader flex align-center justify-center">
        <LoaderSvg />
      </div>
    </div>
  )
}

export default Loader