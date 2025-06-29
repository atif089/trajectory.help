import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewer: {
    width: "100%",
    height: "100%",
  },
  subTitle: {
    fontSize: 12,
  },
});

function PDFWebView({
  personName = "John Doe",
  subTitleText = "Engineering Leader | +1 (512) 555-5555",
}: {
  personName: string;
  subTitleText?: string;
}) {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>{personName}</Text>
            <Text style={styles.subTitle}>{subTitleText}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default React.memo<{ personName: string; subTitleText: string }>(
  PDFWebView,
);
