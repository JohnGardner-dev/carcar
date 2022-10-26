function ListModels(props) {
    return (
      <div>
      <p></p>
      <h3>Vehicle Models</h3>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
        {props.models.map(model => {
          return (
            <tr key={model.id}>
              <td>{ model.name}</td>
              <td>{ model.manufacturer.name}</td>
              <td><img src={ model.picture_url } width="200" height="150" ></img></td>
            </tr>
          );
        })}
        </tbody>
        </table>
        </div>
    )
}

export default ListModels
