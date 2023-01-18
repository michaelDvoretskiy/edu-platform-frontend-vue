<template>
  <div class="content">
    <div class="pagination">
      <div class="wrap">
        Scale:
        <select name="scale" id="scale" onChange="renderPage(pageNum);" style="margin-right:50px;">
          <option value="0.5">0.5</option>
          <option value="1">1</option>
          <option value="1.5" selected>1.5</option>
          <option value="2">2</option>
        </select>
        <button id="prev">Previous</button>
        <button id="next">Next</button>

        &nbsp; &nbsp;
        <span>Page: <span id="page_num"></span> /
        <span id="page_count"></span></span>
      </div>
    </div>

    <canvas id="the-canvas"></canvas>
  </div>

</template>

<script>

var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

export default {
  name: "PdfViewer",
  props: { docPath: String },
  mounted() {
    this.getPdf();
  },
  data() {
    return {
      pdfDoc: 0
    }
  },
  methods: {
    getPdf() {
      pdfjsLib.getDocument(this.docPath).then(function(pdfDoc_) {
        this.pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;
      });
    },
  },
};
</script>

<style>
div.content{
  background: black;
  margin:0px;
}
.pagination {
  position: fixed;
  background: #ffffff;
  width: 100%;
  float: left;
  padding: 5px;
  border: solid 1px black;
}
.pagination .wrap{
  float:right;
  width: 400px;
}
#the-canvas {
  border: 1px solid black;
  direction: ltr;
  margin: 0 auto;
  display: block;
}
@media print {
  body {display:none;}
}
</style>