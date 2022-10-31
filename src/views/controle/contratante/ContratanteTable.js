import React from "react";

export default props => {



    const rows = props.contratantes.map(
        
        contratante => {
            return (

                <tr key={contratante.id}>
                    <td>{contratante.cpfCnpj}</td>
                    <td>{contratante.nomeRazao}</td>
                    <td>{contratante.dataCadastroContratante}</td>
                    <td>{contratante.ativo}</td>

                    <td>
                        <button type="button" title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(contratante.id)}>
                            <i className="pi pi-pencil"></i>
                        </button>

                        <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(contratante)}>
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
                        <th scope="col">CPF/CNPJ</th>
                        <th scope="col">Razão Social</th>
                        <th scope="col">Data Cadastro</th>
                        <th scope="col">Ativo</th>
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

