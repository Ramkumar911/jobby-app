import './index.css'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {BiNavigation} from 'react-icons/bi'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsData: '',
    companyDetailsData: '',
    skillsData: '',
    similarJobsData: '',
    apiJobDetailsStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  updateJobDetails = data => {
    const result = {
      companyLogoUrl: data.company_logo_url,
      companyWebsiteUrl: data.company_website_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      title: data.title,
    }
    return result
  }

  updataeCompanyDetails = data => {
    const result = {
      description: data.description,
      imageUrl: data.image_url,
    }
    return result
  }

  updateSkill = eachSkill => {
    const result = {
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }
    return result
  }

  upDateSimilarJobs = eachJob => {
    const result = {
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }
    return result
  }

  getJobItemDetails = async () => {
    this.setState({apiJobDetailsStatus: apiStatusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(this.props)
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      // console.log(data)
      const jobDetails = this.updateJobDetails(data.job_details)
      const companyDetails = this.updataeCompanyDetails(
        data.job_details.life_at_company,
      )
      const skills = data.job_details.skills.map(eachSkill =>
        this.updateSkill(eachSkill),
      )
      const similarJobs = data.similar_jobs.map(eachJob =>
        this.upDateSimilarJobs(eachJob),
      )
      console.log(jobDetails)
      console.log(companyDetails)
      console.log(skills)
      this.setState({
        jobDetailsData: jobDetails,
        skillsData: skills,
        companyDetailsData: companyDetails,
        similarJobsData: similarJobs,
        apiJobDetailsStatus: apiStatusConstants.success,
      })
      // console.log(jobDetails)
    } else {
      this.setState({apiJobDetailsStatus: apiStatusConstants.failure})
    }
  }

  jobDetailsSuccessView = () => {
    const {
      similarJobsData,
      jobDetailsData,
      companyDetailsData,
      skillsData,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsData
    const {description, imageUrl} = companyDetailsData
    return (
      <div className="job-all-main-cont">
        <div className="job-detail-comp-cont">
          <div className="logo-title-rating-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-img-size"
            />
            <div>
              <h1>{title}</h1>
              <div className="star-rating-cont">
                <BsFillStarFill />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="all-types-cont">
            <div className="location-empolymenttype-cont">
              <div className="location-icon-cont">
                <GoLocation />
                <p>{location}</p>
              </div>
              <div className="location-icon-cont">
                <BsBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="anchor-cont">
            <h1>Description</h1>
            <a href={companyWebsiteUrl} className="an">
              <span>Visit</span>
              <BiNavigation />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="ul-skills-list">
            {skillsData.map(eachSkill => (
              <Skills key={eachSkill.name} eachSkill={eachSkill} />
            ))}
          </ul>
          <h1>Life At Company</h1>
          <div className="company-cont">
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similar-jobs-list-ul">
          {similarJobsData.map(eachJob => (
            <SimilarJobs key={eachJob.id} eachJob={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  jobDetailsProgressView = () => (
    <div data-testid="loader">
      <h1>Loading</h1>
    </div>
  )

  onClickRetryJobsButton = () => {
    this.getJobItemDetails()
  }

  jobDetailsFailureView = () => (
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

  renderJobItemDetails = () => {
    const {apiJobDetailsStatus} = this.state
    switch (apiJobDetailsStatus) {
      case apiStatusConstants.success:
        return this.jobDetailsSuccessView()
      case apiStatusConstants.in_progress:
        return this.jobDetailsProgressView()
      case apiStatusConstants.failure:
        return this.jobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />

        {this.renderJobItemDetails()}
      </div>
    )
  }
}
export default JobItemDetails
