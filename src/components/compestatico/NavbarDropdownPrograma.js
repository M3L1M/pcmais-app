import React from "react";

function NavbarDropdownPrograma({ render }){
    if (render) {
        return (
            <li className="nav-item dropdown">
                <div className="dropdown">
                    <button className="btn nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Programa
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#/programa">Programa</a>
                        <a className="dropdown-item" >Licença</a>

                    </div>
                </div>
            </li>
        )

    } else {
        return false;
    }
}

export default NavbarDropdownPrograma;