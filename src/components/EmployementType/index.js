import './index.css'

const EmployementType = props => {
  const {eachType, onEmploymentType} = props
  const {label, employmentTypeId} = eachType

  const onEmploye = () => {
    onEmploymentType(employmentTypeId)
  }

  return (
    <li>
      <input type="checkbox" id={employmentTypeId} onClick={onEmploye} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmployementType
