import React from "react";


//<NavbarItem render={props.isUsuarioAutenticado} href='#/programa' label='Programa'/>
function NavbarDropdown({render,...props}){
  if(render){
    return(
      <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle show" data-bs-toggle="dropdown" role="button" aria-expanded="true">{props.label}</a>
            <div className="dropdown-menu show" data-popper-placement="bottom-start" >
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href='#/programa'>Programa</a>
              
            </div>
          </li>
    )
  }else{
    return false;
  }}
  
    

export default NavbarDropdown