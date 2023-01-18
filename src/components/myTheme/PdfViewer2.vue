<template>
  <div id="pageContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script>

var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
import * as PDFViewer from "https://mozilla.github.io/pdf.js/web/viewer.js";
import "pdfjs-dist/web/pdf_viewer.css";

export default {
  name: "PdfViewer2",
  props: { docPath: String },
  mounted() {
    this.getPdf();
  },
  methods: {
    async getPdf() {
      let container = document.getElementById("pageContainer");
      let pdfViewer = new PDFViewer({
        container: container,
      });
      let pdf = await pdfjsLib.getDocument(this.docPath);
      pdfViewer.setDocument(pdf);
    },
  },
};
</script>

<style>
#pageContainer {
  margin: auto;
  width: 80%;
}

div.page {
  display: inline-block;
}
</style>