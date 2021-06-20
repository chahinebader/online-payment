interface Props {
  totalPrice: number;
  config: any;
}
const Summary: React.FC<Props> = ({ totalPrice, config }) => {
  return (
    <div className="mt-10">
      <div className="nav">
        <ul className="mx-auto"></ul>
      </div>
      <div className="row row-1">
        <div className="col-3 d-flex ">
          {" "}
          <span id="card-header">
            Duration {config?.duration || 12} months
          </span>{" "}
        </div>
        <div className="col-3 d-flex ">
          {" "}
          <span id="card-header">
            Storage of {config?.storage || 5} Gigabytes
          </span>{" "}
        </div>
        <div className="col-3 d-flex ">
          {" "}
          <span id="card-header">
            {config?.upfront ? "with " : "without " || "without "}upfront
            payment
          </span>{" "}
        </div>
        <div className="col-3 d-flex ">
          {" "}
          <span id="card-header">Total Price : {totalPrice} $</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Summary;
