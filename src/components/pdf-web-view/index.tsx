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
  enableSummary = false,
  summary = "",
}: {
  personName: string;
  subTitleText?: string;
  enableSummary?: boolean;
  summary?: string;
}) {
  const renderKey = React.useRef(0);

  // TODO: fixes the bug with @react-pdf/renderer where
  // removing an element crashes the app
  // https://stackoverflow.com/questions/79583113/typeerror-eo-is-not-a-function-when-deleting-in-react-pdf
  React.useEffect(() => {
    renderKey.current += 1;
  }, [enableSummary, summary]);

  return (
    <PDFViewer key={renderKey.current} style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={[styles.section, styles.header]}>
            <Text style={styles.title}>{personName}</Text>
            <Text style={styles.subTitle}>{subTitleText}</Text>
          </View>
          {enableSummary && (
            <View style={styles.section}>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          )}
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
    fontSize: 11,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    textAlign: "center",
    margin: 10,
    padding: "10 0 0",
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
    fontWeight: "bold",
  },
  summary: {},
});

export default React.memo<{ personName: string; subTitleText: string; enableSummary?: boolean; summary?: string }>(
  PDFWebView
);
