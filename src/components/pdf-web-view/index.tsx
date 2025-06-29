import React from "react";

import { Page, Text, View, Document, StyleSheet, Font, PDFViewer } from "@react-pdf/renderer";

Font.register({
  family: "PT Serif",
  fontWeight: 400,
  src: "http://fonts.gstatic.com/s/ptserif/v8/EgBlzoNBIHxNPCMwXaAhYPesZW2xOQ-xsNqO47m55DA.ttf",
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
          <View style={[styles.section, styles.header]}>
            <Text style={styles.title}>{personName}</Text>
            <Text style={styles.subTitle}>{subTitleText}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: "PT Serif",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textAlign: "center",
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
    fontSize: 11,
  },
});

export default React.memo<{ personName: string; subTitleText: string }>(PDFWebView);
