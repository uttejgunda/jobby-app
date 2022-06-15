import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  BsFillStarFill,
  BsFillBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similarJobDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData
      console.log(similarJobs, 'this is similar')

      const updatedSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      console.log(updatedSimilarJobs, 'this is updated similar')

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: jobDetails.title,
      }
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobDetails: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsCard = () => {
    const {jobDetails, similarJobDetails} = this.state
    const {skills} = jobDetails
    console.log(jobDetails)
    console.log(similarJobDetails)

    return (
      <>
        <div className="job-details-card-container">
          <div className="job-details-card-header">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-image"
            />
            <div>
              <h1 className="job-details-job-title">{jobDetails.title}</h1>
              <div className="job-details-ratings-container">
                <BsFillStarFill className="job-details-rating-star-icon" />
                <p className="job-details-rating-count">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-sub-line-container">
            <div className="job-details-location-internship-container">
              <div className="job-details-location-container">
                <MdLocationOn className="job-details-sub-line-icons" />
                <p className="job-details-sub-line-title">
                  {jobDetails.location}
                </p>
              </div>
              <div className="job-details-internship-container">
                <BsFillBriefcaseFill className="job-details-sub-line-icons" />
                <p className="job-details-sub-line-title">
                  {jobDetails.employmentType}
                </p>
              </div>
            </div>
            <p className="job-details-sub-line-lpa-title">
              {jobDetails.packagePerAnnum}
            </p>
          </div>
          <hr className="job-details-hr-line" />
          <div className="job-details-sub-title-row">
            <h1 className="job-details-card-sub-title">Description</h1>

            <div className="anchor-container">
              <a
                href={jobDetails.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-anchor-tag"
              >
                Visit
              </a>
              <BsBoxArrowUpRight className="anchor-icon" />
            </div>
          </div>
          <p className="job-details-card-desc">{jobDetails.jobDescription}</p>

          <h1 className="job-details-card-sub-title skill-sub-heading">
            Skills
          </h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-title">{eachSkill.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="job-details-card-sub-title">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-details-card-desc life-at-company-desc">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobDetails.map(eachSimilar => (
            <SimilarJobItem similarDetails={eachSimilar} key={eachSimilar.id} />
          ))}
        </ul>
      </>
    )
  }

  onRetryFetch = () => this.getJobDetails()

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view-image"
      />
      <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
      <p className="failure-view-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-retry-button"
        onClick={this.onRetryFetch}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsCard()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg-container">
          <div className="job-details-content-container">
            {this.renderSwitch()}
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
