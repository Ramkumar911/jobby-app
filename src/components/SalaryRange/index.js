import './index.css'

const SalaryRange = props => {
  const {eachSalary, onSalaryRangeInput} = props
  const {salaryRangeId, label} = eachSalary

  const onClickSalary = () => {
    onSalaryRangeInput(salaryRangeId)
  }

  return (
    <li>
      <input
        type="Radio"
        id={salaryRangeId}
        onClick={onClickSalary}
        value={salaryRangeId}
        name="salary"
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryRange
