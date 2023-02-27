import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import EmployementType from '../EmployementType'
import SalaryRange from '../SalaryRange'
import JobData from '../JobData'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    profileData: {},
    apiProfileStatus: apiStatusConstants.initial,
    jobsDataList: [],
    searchJobInput: '',
    salaryRangeInput: [],
    EmploymentTypeInput: [],
    apiJobsStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  changeProfileData = data => {
    const result = {
      name: data.name,
      profileImageUrl: data.profile_image_url,
      shortBio: data.short_bio,
    }
    return result
  }

  getProfileData = async () => {
    this.setState({apiProfileStatus: apiStatusConstants.in_progress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const upDate = this.changeProfileData(data.profile_details)
      // console.log(upDate)
      this.setState({
        profileData: upDate,
        apiProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatusConstants.failure})
    }
  }

  getUpdateJobsData = eachData => {
    const result = {
      companyLogoUrl: eachData.company_logo_url,
      employmentType: eachData.employment_type,
      id: eachData.id,
      jobDescription: eachData.job_description,
      location: eachData.location,
      packagePerAnnum: eachData.package_per_annum,
      rating: eachData.rating,
      title: eachData.title,
    }

    return result
  }

  getJobsData = async () => {
    const {searchJobInput, salaryRangeInput, EmploymentTypeInput} = this.state
    // console.log(salaryRangeInput)
    console.log(EmploymentTypeInput)
    this.setState({apiJobsStatus: apiStatusConstants.in_progress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${EmploymentTypeInput}&minimum_package=${salaryRangeInput}&search=${searchJobInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateJobsDetails = data.jobs.map(eachJob =>
        this.getUpdateJobsData(eachJob),
      )
      // console.log(updateJobsDetails)
      this.setState({
        jobsDataList: updateJobsDetails,
        apiJobsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiStatusConstants.failure})
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="person-profile">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="person-name">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderProfileProgressView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryButton = () => {
    this.getProfileData()
  }

  renderProfileFailureView = () => (
    <button className="retry-button" type="button" onClick={this.retryButton}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.in_progress:
        return this.renderProfileProgressView()
      default:
        return null
    }
  }

  noJobsView = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobSuccessView = () => {
    const {jobsDataList} = this.state
    const jobs = jobsDataList.length > 0
    return jobs ? (
      <ul className="ul-job-data-list-cont">
        {jobsDataList.map(eachJobData => (
          <JobData key={eachJobData.id} eachJobData={eachJobData} />
        ))}
      </ul>
    ) : (
      this.noJobsView()
    )
  }

  renderJobProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryJobsButton = () => {
    this.getJobsData()
  }

  renderJobFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="retry-button"
        onClick={this.onClickRetryJobsButton}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJob = () => {
    const {apiJobsStatus} = this.state
    switch (apiJobsStatus) {
      case apiStatusConstants.success:
        return this.renderJobSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.in_progress:
        return this.renderJobProgressView()
      default:
        return null
    }
  }

  searchJob = event => {
    this.setState({searchJobInput: event.target.value})
  }

  onSalaryRangeInput = salaryRangeId => {
    const {salaryRangeInput} = this.state
    this.setState({salaryRangeInput: salaryRangeId}, this.getJobsData)
  }

  onEmploymentType = employmentTypeId => {
    const {EmploymentTypeInput} = this.state

    if (EmploymentTypeInput.includes(employmentTypeId)) {
      this.setState(
        prevState => ({
          EmploymentTypeInput: prevState.EmploymentTypeInput.filter(
            eachId => eachId !== employmentTypeId,
          ),
        }),
        this.getJobsData,
      )
    }
    // console.log(employmentTypeId)
    else {
      this.setState(
        prevState => ({
          EmploymentTypeInput: [
            ...prevState.EmploymentTypeInput,
            employmentTypeId,
          ],
        }),
        this.getJobsData,
      )
    }
  }

  clickSearchIcon = () => {
    this.getJobsData()
  }

  render() {
    const {searchJobInput} = this.state
    return (
      <div className="jobs-main-bg">
        <Header />
        <div className="options-notifications-cont">
          <div className="job-options-cont">
            <h1>Job options</h1>
            {this.renderProfile()}
            <hr />
            <h1>Type of Employment</h1>
            <ul className="employtype-list-cont">
              {employmentTypesList.map(eachType => (
                <EmployementType
                  key={eachType.employmentTypeId}
                  eachType={eachType}
                  onEmploymentType={this.onEmploymentType}
                />
              ))}
            </ul>
            <hr />
            <h1>Salary Range</h1>
            <ul className="employtype-list-cont">
              {salaryRangesList.map(eachSalary => (
                <SalaryRange
                  key={eachSalary.salaryRangeId}
                  eachSalary={eachSalary}
                  onSalaryRangeInput={this.onSalaryRangeInput}
                />
              ))}
            </ul>
          </div>
          <div className="job-notifications-cont">
            <h1>Job notifications</h1>
            <div className="search-input-cont">
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.searchJob}
                value={searchJobInput}
                data-testid="searchButton"
              />
              <BsSearch
                className="search-icon"
                onClick={this.clickSearchIcon}
              />
            </div>
            {this.renderJob()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
