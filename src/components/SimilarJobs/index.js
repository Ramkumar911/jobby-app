import './index.css'

import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

const SimilarJobs = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob
  return (
    <li className="similar-jobs-list">
      <div className="logo-title-rating-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}
export default SimilarJobs
