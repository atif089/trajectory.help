import React from "react";
import { Page, Text, View, Document, StyleSheet, Font, PDFViewer } from "@react-pdf/renderer";
import { useEditorStore } from "@/store/editor.store";
import { useDebounce } from "@/hooks/use-debounce";

const PDF_REFRESH_UPDATE_INTERVAL = 1000;

Font.register({
  family: "PT Serif",
  fontWeight: 400,
  src: "http://fonts.gstatic.com/s/ptserif/v8/EgBlzoNBIHxNPCMwXaAhYPesZW2xOQ-xsNqO47m55DA.ttf",
});

function PDFContainer() {
  const { personName, subTitleText, enableSummary, summary } = useEditorStore();
  const debouncedEnableSummary = useDebounce(enableSummary, PDF_REFRESH_UPDATE_INTERVAL);
  const debouncedPersonName = useDebounce(personName, PDF_REFRESH_UPDATE_INTERVAL);
  const debouncedSubTitleText = useDebounce(subTitleText, PDF_REFRESH_UPDATE_INTERVAL);
  const debouncedSummary = useDebounce(summary, PDF_REFRESH_UPDATE_INTERVAL);

  const renderKey = React.useRef(0);

  // TODO: fixes the bug with @react-pdf/renderer where
  // removing an element crashes the app
  // https://stackoverflow.com/questions/79583113/typeerror-eo-is-not-a-function-when-deleting-in-react-pdf
  React.useEffect(() => {
    renderKey.current += 1;
    console.log("renderKey.current", renderKey.current);
  }, [debouncedEnableSummary, debouncedSummary]);

  return (
    <PDFViewer key={renderKey.current} style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={[styles.section, styles.header]}>
            <Text style={styles.title}>{debouncedPersonName}</Text>
            <Text style={styles.subTitle}>{debouncedSubTitleText}</Text>
          </View>
          {enableSummary && (
            <View style={styles.section}>
              <Text style={styles.summary}>{debouncedSummary}</Text>
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
    backgroundColor: "#ffffff",
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

export default React.memo(PDFContainer);
