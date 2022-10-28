import React from "react";
import ClienteService from "../../../app/pcmais/service/ClienteService";

export default props => {



    const rows = props.programas.map(
        
        programa => {
            return (

                <tr key={programa.id}>
                    <td>{programa.descricao}</td>
                    <td>{programa.cpfCnpj}</td>
                    <td>{programa.nomeRazao}</td>

                    <td>
                        <button type="button" title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(programa.id)}>
                            <i className="pi pi-pencil"></i>
                        </button>

                        <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(programa)}>
                            <i className="pi pi-trash mr-2"></i>
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
                        <th scope="col">Descricao</th>
                        <th scope="col">CNPJ</th>
                        <th scope="col">Razão Social</th>
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

