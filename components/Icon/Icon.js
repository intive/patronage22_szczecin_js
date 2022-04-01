const Icon = (props) => {
  return (
    <>
      {props.className
        ? <span className={`material-icons ${props.className}`} onClick={props.onClick}>{props.name}</span>
        : <span className='material-icons' onClick={props.onClick}>{props.name}</span>}
    </>
  )
}

export default Icon
