import './title.css'

export function Title({children,name}){
    return(
      <div className='title'>
        {children}
        <span>{name}</span>
      </div>
    )
}