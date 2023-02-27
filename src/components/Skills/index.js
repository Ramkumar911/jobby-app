import './index.css'

const Skills = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill
  return (
    <li className="li-skills-list">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default Skills
