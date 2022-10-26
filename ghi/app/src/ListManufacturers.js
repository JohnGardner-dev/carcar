function ListManufacturers(props) {

    return (
      <div>
      <p></p>
        <h3>Manufacturers</h3>
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
        </div>

    )
}

export default ListManufacturers
