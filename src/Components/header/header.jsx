import './header.css'

// component to show name and  user last name
export const UserInfo = ({name , lastName}) =>{
    return <div className="header-container"> {`${name} ${lastName}`}</div>

}