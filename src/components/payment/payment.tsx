import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import valid from "card-validator";

export interface FormValues {
  cardNumber: string;
  expirationDate: string;
  cvv: number;
}
type ChildProps = {
  nextPhase(values: any): any;
  previousPhase(values: any): any;
};
const validationSchema = Yup.object().shape({
  cardNumber: Yup.string().test(
    "test-number",
    "Credit Card number is invalid",
    (value) => valid.number(value).isValid
  ),
  expirationDate: Yup.string().test(
    "test-date",
    "Date invalid Please insert a date of format month/year or a date not expired",
    (value) => valid.expirationDate(value).isValid
  ),
  cvv: Yup.string().test(
    "test-date",
    "CVV invalid and must contain 3 numbers",
    (value) => valid.cvv(value).isValid
  ),
});
const Payment: React.FC<ChildProps> = ({ nextPhase, previousPhase }) => {
  const initialValues: FormValues = {
    cardNumber: "",
    expirationDate: "06/2021",
    cvv: 0,
  };
  const nextStep = (values: any) => {
    console.log(values);

    nextPhase(values);
  };

  return (
    <div>
      <div className="nav">
        <ul className="mx-auto"></ul>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          nextStep(values);
        }}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form>
            <span id="card-header">Saved cards:</span>
            <div className="row row-1">
              <div className="col-2">
                <img
                  className="img-fluid"
                  alt="card"
                  src={
                    /^4[0-9]{12}(?:[0-9]{3})?$/.test(values.cardNumber)
                      ? "https://img.icons8.com/color/48/000000/visa.png"
                      : "https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  }
                />
              </div>
              <div className="col-7">
                {" "}
                <Field
                  type="text"
                  name="cardNumber"
                  placeholder="**** **** **** 3193"
                />{" "}
              </div>
              <div className="col-3 d-flex justify-content-center">
                {" "}
                <a href="/#">Card number</a>{" "}
              </div>
              {errors.cardNumber && touched.cardNumber ? (
                <p className="text-red-500">{errors.cardNumber}</p>
              ) : null}
            </div>
            <div className="row three">
              <div className="col-6">
                <div className="row-1">
                  <div className="row row-2">
                    {" "}
                    <span id="card-inner">Exp date</span>{" "}
                  </div>
                  <div className="row row-2">
                    {" "}
                    <Field
                      name="expirationDate"
                      type="text"
                      placeholder="06/2021"
                    />{" "}
                  </div>
                </div>
                {errors.expirationDate && touched.expirationDate ? (
                  <p className="text-red-500">{errors.expirationDate}</p>
                ) : null}
              </div>
              <div className="col-6">
                <div className="row-1">
                  <div className="row row-2">
                    {" "}
                    <span id="card-inner">CVV</span>{" "}
                  </div>
                  <div className="row row-2">
                    {" "}
                    <Field name="cvv" type="text" placeholder="654" />{" "}
                  </div>
                </div>
                {errors.cvv && touched.cvv ? (
                  <p className="text-red-500">{errors.cvv}</p>
                ) : null}
              </div>
            </div>
            <div className="row two">
              <div className="col-6">
                <button
                  className="btn d-flex mx-auto"
                  type="button"
                  onClick={() => previousPhase(1)}
                >
                  <b>Previous</b>
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn d-flex mx-auto"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  <b>Next</b>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
