import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Header, Image, Menu, Segment } from "semantic-ui-react";

import { MessengerContext } from "../messenger";

function AbstractSellSubscreen({ type, cow, straw }) {
  if (type === "cow") {
    const { forSale } = cow;

    if (forSale) {
      return <p>Cow for Sale</p>;
    } else {
      return (
        <Formik
          validationSchema={{}}
          initialValues={{}}
          onSubmit={console.log}
          render={() => <Form as={FormikForm}>{/* // */}</Form>}
        />
      );
    }
  }

  if (type === "straw") {
    const { forSale } = straw;

    if (forSale) {
      return <p>Straw for Sale</p>;
    } else {
      return (
        <Formik
          validationSchema={{}}
          initialValues={{}}
          onSubmit={console.log}
          render={() => <Form as={FormikForm}>{/* // */}</Form>}
        />
      );
    }
  }
}

export default function SellSubscreen() {
  return (
    <MessengerContext.Consumer>
      {() => <AbstractSellSubscreen />}
    </MessengerContext.Consumer>
  );
}
