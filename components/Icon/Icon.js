const Icon = (props) => {
  return (
    <>
      {props.className
        ? <span className={`material-icons ${props.className}`}>{props.name}</span>
        : <span className='material-icons'>{props.name}</span>}
    </>
  )
}

export default Icon
