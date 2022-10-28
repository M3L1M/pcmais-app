import React, { Component } from "react";
import currencyFormartter from "currency-formatter";

export default props => {
    const rows = props.clientes.map(cliente => {
        
        return (
            <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.cpfCnpj}</td>
                <td>{cliente.nomeRazao}</td>
                <td>
                    <button type="button" title="Observar"
                        className="btn btn-primary"
                        onClick={e => props.editAction(cliente.id)}>
                        <i className="pi pi-search mr-2"></i>
                    </button>
                    <button type="button" title="teste"
                        className="btn btn-primary"
                        onClick={e => props.modalAction()}>
                        <i className="pi pi-search mr-2"></i>
                    </button>
                </td>
            </tr>

            
        )

        

        

    })




    return (

        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">CPF/CNPJ</th>
                        <th scope="col">Nome Razão</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>





        </div>

    )
}