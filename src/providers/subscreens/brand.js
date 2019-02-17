import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Header, Image, Menu, Segment } from "semantic-ui-react";

import { Theme } from "../../constants";
import { BrandService } from "../../services";
import { DrawerContext } from "../drawer";
import { MessengerContext } from "../messenger";

function AbstractBrandSubscreen({ close, id, showMessage }) {
  return (
    <Formik
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(1, "Cow names much be at least one character.")
          .max(40, "Cow names must be fewer than 41 characters. ")
          .required("A name is required for branding a cow.")
      })}
      initialValues={{
        name: ""
      }}
      onSubmit={({ name }) => {
        BrandService.brand(id, name);
        showMessage({
          content: `Successfully branded Cow #${id} as "${name}".`
        });
        close();
      }}
      render={({ handleSubmit, touched, errors }) => (
        <Form as={FormikForm}>
          <Segment
            attached="top"
            style={{
              margin: 0
            }}
          >
            <Image src="https://placehold.it/64x64" centered />
            <Header as="h1" textAlign="center">
              <span className="fancy">Branding</span>
              <Header.Subheader content="Feel the burn." />
            </Header>
            <Field
              name="name"
              render={({ field }) => (
                <Form.Input
                  {...field}
                  placeholder="Enter a name for this Cow."
                  style={
                    errors.name && touched.name
                      ? {
                          border: `1px solid ${Theme.primary}`
                        }
                      : {}
                  }
                />
              )}
            />
            <ErrorMessage
              name="name"
              render={message => (
                <span
                  style={{
                    color: Theme.primary
                  }}
                >
                  {message}
                </span>
              )}
            />
          </Segment>
          <Menu
            size="massive"
            attached
            vertical
            fluid
            items={[
              {
                key: 0,
                icon: "pencil",
                content: "Brand",
                onClick: handleSubmit,
                className: "fancy"
              },
              {
                key: 1,
                icon: "close",
                content: "Cancel",
                onClick: close,
                className: "fancy"
              }
            ]}
          />
        </Form>
      )}
    />
  );
}

export default function BrandSubscreen() {
  return (
    <DrawerContext.Consumer>
      {({ close, subscreenProps: { id } }) => (
        <MessengerContext.Consumer>
          {({ showMessage }) => (
            <AbstractBrandSubscreen
              close={close}
              id={id}
              showMessage={showMessage}
            />
          )}
        </MessengerContext.Consumer>
      )}
    </DrawerContext.Consumer>
  );
}
