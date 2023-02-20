const ProjectShowcase = props => {
  const {Details} = props

  const {name, imageUrl} = Details
  console.log(name)
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default ProjectShowcase
