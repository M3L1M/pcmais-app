import React from "react";

function NavbarDropdownCliente({ render }) {
    if (render) {
        return (
            <li className="nav-item dropdown">
                <div className="dropdown">
                    <button className="btn nav-link dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Cliente
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#/cliente">Cliente</a>
                        <a className="dropdown-item" href="#/contratante">Contratante</a>
                        <a className="dropdown-item" >Contrato</a>
                    </div>
                </div>
            </li>
        )

    } else {
        return false;
    }
}

export default NavbarDropdownCliente;