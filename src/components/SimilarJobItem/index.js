import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {similarDetails} = props

  return (
    <li className="similar-job-card-container" key={similarDetails.id}>
      <div className="each-job-card-header">
        <img
          src={similarDetails.companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-image"
        />
        <div>
          <h1 className="similar-job-title">{similarDetails.title}</h1>
          <div className="similar-job-ratings-container">
            <BsFillStarFill className="similar-rating-star-icon" />
            <p className="similar-rating-count">{similarDetails.rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-card-sub-title">Description</h1>
      <p className="similar-job-card-desc">{similarDetails.jobDescription}</p>

      <div className="similar-location-internship-container">
        <div className="similar-location-container">
          <MdLocationOn className="sub-line-icons" />
          <p className="similar-sub-line-title">{similarDetails.location}</p>
        </div>
        <div className="similar-internship-container">
          <BsFillBriefcaseFill className="similar-sub-line-icons" />
          <p className="similar-sub-line-title">
            {similarDetails.employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
