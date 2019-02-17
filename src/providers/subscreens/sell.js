import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Header, Image, Menu, Segment } from "semantic-ui-react";

import dollarCow from "../../assets/cow_dollar.svg";
import { Theme } from "../../constants";
import { BrandService, UpstreamService } from "../../services";
import { DrawerContext } from "../drawer";
import { MessengerContext } from "../messenger";

function AbstractSellSubscreen({ close, showMessage, type, cow, straw }) {
  if (type === "cow") {
    const { id, forSale } = cow;

    let cowName = BrandService.getName(id);

    if (cowName === "(unbranded)") {
      cowName = null;
    }

    if (forSale) {
      return (
        <>
          <Segment
            attached="top"
            style={{
              margin: 0
            }}
          >
            <Image src="https://placehold.it/64x64" centered />
            <Header as="h1" textAlign="center">
              <span className="fancy">Cancel Selling {cowName || "a Cow"}</span>
              <Header.Subheader content="Too attached to let go? Coward." />
            </Header>
          </Segment>
          <Menu
            size="massive"
            attached
            vertical
            fluid
            items={[
              {
                key: 0,
                icon: "usd",
                content: "Stop Selling",
                onClick: close,
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
        </>
      );
    } else {
      return (
        <Formik
          validationSchema={Yup.object().shape({
            price: Yup.number()
              .min("1", "Cows must be sold for at least 1 Wei.")
              .required("A Cow cannot be sold without a price.")
          })}
          initialValues={{
            price: 0
          }}
          onSubmit={async ({ price }) => {
            const salePosted = await UpstreamService.sellCow(id, price);

            if (salePosted) {
              showMessage({
                content: "Successfully placed a Cow for sale."
              });
            } else {
              showMessage({
                content: "Unable to place that Cow for sale.",
                severity: "negative"
              });
            }

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
                <Image
                  src={dollarCow}
                  centered
                  style={{
                    width: "64px",
                    height: "64px"
                  }}
                />
                <Header
                  as="h1"
                  textAlign="center"
                  style={{
                    marginTop: 0
                  }}
                >
                  <span className="fancy">Sell {cowName || "a Cow"}</span>
                  <Header.Subheader content="That's cow-pitalism." />
                </Header>
                <label htmlFor="price">Price (in Wei)</label>
                <Field
                  name="price"
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="Enter a price for this Cow."
                      style={
                        errors.price && touched.price
                          ? {
                              border: `1px solid ${Theme.primary}`
                            }
                          : {}
                      }
                    />
                  )}
                />
                <ErrorMessage
                  name="price"
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
                    icon: "usd",
                    content: "Sell",
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
  }

  if (type === "straw") {
    const { forSale } = straw;

    if (forSale) {
      return (
        <>
          <Segment
            attached="top"
            style={{
              margin: 0
            }}
          >
            <Image
              src={dollarCow}
              centered
              style={{
                width: "64px",
                height: "64px"
              }}
            />
            <Header
              as="h1"
              textAlign="center"
              style={{
                marginTop: 0
              }}
            >
              <span className="fancy">Cancel Selling a Straw</span>
              <Header.Subheader content="They were probably getting a straw deal, anyway." />
            </Header>
          </Segment>
          <Menu
            size="massive"
            attached
            vertical
            fluid
            items={[
              {
                key: 0,
                icon: "usd",
                content: "Stop Selling",
                onClick: close,
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
        </>
      );
    } else {
      return (
        <Formik
          validationSchema={Yup.object().shape({
            price: Yup.number()
              .min("1", "Straws must be sold for at least 1 Wei.")
              .required("A Straw cannot be sold without a price.")
          })}
          initialValues={{
            price: 0
          }}
          onSubmit={console.log}
          render={({ handleSubmit, touched, errors }) => (
            <Form as={FormikForm}>
              <Segment
                attached="top"
                style={{
                  margin: 0
                }}
              >
                <Image
                  src={dollarCow}
                  centered
                  style={{
                    width: "64px",
                    height: "64px"
                  }}
                />
                <Header
                  as="h1"
                  textAlign="center"
                  style={{
                    marginTop: 0
                  }}
                >
                  <span className="fancy">Sell a Straw</span>
                  <Header.Subheader content="Too high a price is highway straw-bbery." />
                </Header>
                <label htmlFor="price">Price (in Wei)</label>
                <Field
                  name="price"
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="Enter a price for this Straw."
                      style={
                        errors.price && touched.price
                          ? {
                              border: `1px solid ${Theme.primary}`
                            }
                          : {}
                      }
                    />
                  )}
                />
                <ErrorMessage
                  name="price"
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
                    icon: "usd",
                    content: "Sell",
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
  }
}

export default function SellSubscreen() {
  return (
    <DrawerContext.Consumer>
      {({ close, subscreenProps: { type, cow, straw } }) => (
        <MessengerContext.Consumer>
          {({ showMessage }) => (
            <AbstractSellSubscreen
              type={type}
              cow={cow}
              straw={straw}
              close={close}
              showMessage={showMessage}
            />
          )}
        </MessengerContext.Consumer>
      )}
    </DrawerContext.Consumer>
  );
}
