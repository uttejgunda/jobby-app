import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import FilterGroups from '../FilterGroups'
import AllJobsSection from '../AllJobsSection'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    userSearchInput: '',
    userEmploymentType: [],
    userSalaryRange: '',
    allJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {userSearchInput, userEmploymentType, userSalaryRange} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${userEmploymentType}&minimum_package=${userSalaryRange}&search=${userSearchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data

      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        allJobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeInput = event => {
    this.setState({userSearchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobsData()
  }

  onAddEmploymentType = id => {
    this.setState(
      prevState => ({
        userEmploymentType: [...prevState.userEmploymentType, id],
      }),
      this.getJobsData,
    )
  }

  onRemoveEmploymentType = id => {
    const {userEmploymentType} = this.state
    const updatedUserEmploymentType = userEmploymentType.filter(
      eachItem => eachItem !== id,
    )

    this.setState(
      {userEmploymentType: updatedUserEmploymentType},
      this.getJobsData,
    )
  }

  onChangeSalaryRange = id => {
    this.setState({userSalaryRange: id}, this.getJobsData)
  }

  renderSuccessView = () => {
    const {allJobsData} = this.state
    if (allJobsData.length > 0) {
      return (
        <ul className="all-jobs-list-container">
          {allJobsData.map(eachJobCard => (
            <AllJobsSection eachJobCard={eachJobCard} key={eachJobCard.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="jobs-failure-view-image "
        />
        <h1 className="failure-view-title">No Jobs Found</h1>
        <p className="failure-view-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onRetryFetch = () => this.getJobsData()

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

  renderLoader = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderViewSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {userSearchInput, userEmploymentType} = this.state
    console.log(userEmploymentType)

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-content-container">
            <div className="jobs-top-section">
              <div className="search-sm-container">
                <input
                  type="search"
                  className="search-field"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                  value={userSearchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button-container"
                  onClick={this.onClickSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>

              <div className="profile-filters-section-container">
                <ProfileDetails />
                <hr className="jobs-split-line-hr-tag" />
                <FilterGroups
                  onAddEmploymentType={this.onAddEmploymentType}
                  onRemoveEmploymentType={this.onRemoveEmploymentType}
                  onChangeSalaryRange={this.onChangeSalaryRange}
                />
              </div>
            </div>

            <div className="jobs-lg-bottom-section">
              <div className="search-lg-container">
                <input
                  type="search"
                  className="search-field"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                  value={userSearchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button-container"
                  onClick={this.onClickSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderViewSwitch()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
