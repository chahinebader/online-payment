import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { submitPayment } from "../../api/prices";

export interface FormValues {
  email: string;
  terms: boolean;
}
type ChildProps = {
  // Note that even if we go to previous we should not keep any state of the credit card information for security policy
  previousPhase(values: any): any;
};
const Confirmation: React.FC<ChildProps> = ({ previousPhase }) => {
  const initialValues: FormValues = { email: "", terms: false };
  const [paymentValidated, setPaymentValidated] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    terms: Yup.boolean().oneOf([true], "Terms and conditions must be accepted"),
  });
  return (
    <div>
      <div className="nav">
        <ul className="mx-auto"></ul>
      </div>
      <span id="card-header">Confirmation:</span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          submitPayment().then((res: any) => {
            console.log(res);
            setPaymentValidated(true);
          });
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-2 ">
                {" "}
                <a href="/#">Email</a>{" "}
              </div>
              <div className="col-10">
                {" "}
                <Field
                  type="text"
                  name="email"
                  id="duration"
                  className="row row-1"
                />
              </div>
              {errors.email && touched.email ? (
                <p className="text-red-500">{errors.email}</p>
              ) : null}
            </div>
            <div className="row">
              <div className="col-10 ">
                {" "}
                Click here to indicate that you have read and agree to the terms
                presented in the{" "}
                <a href="/#" className="terms">
                  Terms and Conditions agreement{" "}
                </a>
              </div>
              <div className="col-2">
                {" "}
                <Field
                  type="checkbox"
                  name="terms"
                  id="duration"
                  className="row row-1 fixed-check"
                />
              </div>
              {errors.terms && touched.terms ? (
                <p className="text-red-500">{errors.terms}</p>
              ) : null}
            </div>
            {!paymentValidated && (
              <div className="row">
                <div className="col-6">
                  <button
                    disabled={isSubmitting}
                    className="btn d-flex mx-auto"
                    type="button"
                    onClick={() => previousPhase(2)}
                  >
                    <b>Previous</b>
                  </button>
                </div>
                <div className="col-6">
                  {" "}
                  <button
                    disabled={isSubmitting}
                    className="btn d-flex mx-auto"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    <b>Proceed</b>
                  </button>
                </div>
              </div>
            )}
            
            {isSubmitting && (
              <div className="row mt-10">
                <div className="loader"></div>
              </div>
            )}
            {paymentValidated && (
              <div>
                {" "}
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>{" "}
                <span className="centred">Payment Validated</span>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Confirmation;
