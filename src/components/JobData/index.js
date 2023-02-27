import './index.css'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {Link} from 'react-router-dom'

const JobData = props => {
  const {eachJobData} = props
  // console.log(eachJobData)
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobData
  return (
    <Link to={`/jobs/${id}`} className="link-l">
      <li className="li-job-data-c">
        <div className="logo-title-rating-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobData
