import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const AllJobsSection = props => {
  const {eachJobCard} = props

  return (
    <li className="each-job-card-container" key={eachJobCard.id}>
      <Link to={`/jobs/${eachJobCard.id}`} className="link-tag">
        <div className="each-job-card-header">
          <img
            src={eachJobCard.companyLogoUrl}
            alt="company logo"
            className="each-job-image"
          />
          <div className="each-job-card-header-text-container">
            <h1 className="each-job-title">{eachJobCard.title}</h1>
            <div className="each-job-ratings-container">
              <BsFillStarFill className="rating-star-icon" />
              <p className="rating-count">{eachJobCard.rating}</p>
            </div>
          </div>
        </div>

        <div className="sub-line-container">
          <div className="location-internship-container">
            <div className="location-container">
              <MdLocationOn className="sub-line-icons" />
              <p className="sub-line-title">{eachJobCard.location}</p>
            </div>
            <div className="internship-container">
              <BsFillBriefcaseFill className="sub-line-icons" />
              <p className="sub-line-title">{eachJobCard.employmentType}</p>
            </div>
          </div>
          <p className="sub-line-lpa-title">{eachJobCard.packagePerAnnum}</p>
        </div>
        <hr className="each-job-hr-line" />
        <h1 className="each-job-card-sub-title">Description</h1>
        <p className="each-job-card-desc">{eachJobCard.jobDescription}</p>
      </Link>
    </li>
  )
}

export default AllJobsSection
