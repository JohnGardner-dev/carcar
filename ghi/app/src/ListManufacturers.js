function ListManufacturers(props) {

    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {props.manufacturers.map(manufacturer => {
          return (
            <tr key={manufacturer.id}>
              <td>{ manufacturer.id }</td>
              <td>{ manufacturer.name }</td>
            </tr>
          );
        })}
        </tbody>
        </table>

    )
}

export default ListManufacturers
