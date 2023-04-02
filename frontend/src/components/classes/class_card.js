const ClassCard = (props) => {
  return (
    <>
      <div className="class-card">
        <h3>{props.data.name}</h3>
        {!props.my && (
          <h4>
            {props.data.admin.first_name + " " + props.data.admin.last_name}
          </h4>
        )}
        {!props.my ? (
          <div className="add-button">
            <button
              onClick={() => {
                props.onAdd(props.data._id,props.data.name);
              }}
            >
              Add+
            </button>
          </div>
        ) : (
          <div className="add-button">
            <button
              onClick={() => {
                props.onWithdraw(props.data._id,props.data.name);
              }}
            >Withdraw</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ClassCard;
