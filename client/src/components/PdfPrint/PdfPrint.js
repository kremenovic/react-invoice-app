import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
const styles = StyleSheet.create({
  top: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 30px",
    flexDirection: "row",
  },

  middle: {
    display: "flex",
    justifyContent: "space-between",
    padding: "50px 30px",
    flexDirection: "row",
  },

  invoiceItems: {
    display: "flex",
    padding: "20px 15px",
    flexDirection: "column",
    backgroundColor: "#E5E7EB",
    margin: "0px 30px",
    borderRadius: "5px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
  },

  invoiceRow: {
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bottom: {
    display: "flex",
    padding: "20px 15px",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#373B53",
    alignItems: "center",
    margin: "0px 30px",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    color: "white",
  },
});

const PdfPrint = ({
  id,
  items,
  billFrom,
  billTo,
  issue,
  due,
  description,
  total,
}) => (
  <Document>
    <Page size="A4" stlye={{ backgroundColor: "white" }}>
      <View style={{ padding: "30px", fontSize: "36px", textAlign: "center" }}>
        <Text>INVOICE</Text>
      </View>
      <View style={[styles.top]}>
        <View>
          <Text style={{ fontSize: "16px", paddingBottom: "3px" }}>
            {id ? `#${id}` : "#QA9327"}
          </Text>
          <Text style={{ fontSize: "12px", color: "#888EB0" }}>
            {description}
          </Text>
        </View>
        <View
          style={{
            fontSize: "12px",
            color: "#888EB0",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text>{billFrom[0].billFromStreetAddress}</Text>
          <Text>{billFrom[0].billFromCity}</Text>
          <Text>{billFrom[0].billFromPostCode}</Text>
          <Text>{billFrom[0].billFromCountry}</Text>
        </View>
      </View>
      <View style={[styles.middle]}>
        <View>
          <Text
            style={{
              fontSize: "12px",
              color: "#888EB0",
              marginBottom: "10px",
            }}
          >
            Invoice Datesss
          </Text>
          <Text style={{ fontSize: "16px" }}>
            {moment(issue).format("DD MMM YYYY")}
          </Text>
          <View style={{ marginTop: "20px" }}>
            <Text
              style={{
                fontSize: "12px",
                color: "#888EB0",
                marginBottom: "10px",
              }}
            >
              Payment Due
            </Text>
            <Text style={{ fontSize: "16px" }}>
              {moment(parseInt(due)).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: "12px",
              color: "#888EB0",
              marginBottom: "10px",
            }}
          >
            Bill To
          </Text>
          <Text style={{ fontSize: "16px" }}>
            {billTo[0]?.billToClientName}
          </Text>
          <View
            style={{
              fontSize: "12px",
              color: "#888EB0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "10px",
            }}
          >
            <Text>{billTo[0].billToStreetAddress}</Text>
            <Text>{billTo[0]?.billToCity}</Text>
            <Text>{billTo[0]?.billToCode}</Text>
            <Text>{billTo[0].billToCountry}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: "12px",
              color: "#888EB0",
              marginBottom: "10px",
            }}
          >
            Sent To
          </Text>
          <Text style={{ fontSize: "16px" }}>
            {" "}
            {billTo[0].billToClientEmail}
          </Text>
        </View>
      </View>
      <View style={[styles.invoiceItems]}>
        <View style={[styles.invoiceRow]}>
          <Text
            style={{
              fontSize: "12px",
              color: "#888EB0",
              marginBottom: "10px",
              width: "160px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            Item Name
          </Text>
          <Text
            style={{
              fontSize: "12px",
              color: "#888EB0",
              marginBottom: "10px",
              width: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            QTY.
          </Text>
          <Text
            style={{
              fontSize: "12px",
              color: "#888EB0",
              marginBottom: "10px",
              width: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            Price
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: "#888EB0",
              marginBottom: "10px",
              width: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            Total
          </Text>
        </View>
        {items?.map((item, index) => {
          return (
            <View style={[styles.invoiceRow]} key={index}>
              <Text
                style={{
                  fontSize: "14px",
                  marginBottom: "10px",
                  width: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {item.itemName}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  marginBottom: "10px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {item.quantity}
              </Text>
              <Text
                style={{
                  fontSize: "14px",

                  marginBottom: "10px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                ${parseFloat(item.price).toFixed(2)}
              </Text>
              <Text
                style={{
                  fontSize: "14px",

                  marginBottom: "10px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                ${parseFloat(item.total).toFixed(2)}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={[styles.top, styles.bottom]}>
        <Text style={{ fontSize: "12px", color: "#fff" }}>Amount Due</Text>
        <Text style={{ fontSize: "24px", color: "#fff" }}>${total}</Text>
      </View>
    </Page>
  </Document>
);

export default PdfPrint;
