export class PdfFrameContent {
  static getHtml(base64content, key, file, token) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
              body{
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
    </head>
    <body>
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

      <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
      <script>
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.addEventListener('contextmenu', event => event.preventDefault());

        var url = '${file}';
        var pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

        var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');
        
        function getStoredData(key) {
          const request = getDB()
          request.onsuccess = function () {
            console.log("Database opened successfully");
            const db = request.result;
            const transaction = db.transaction("frames", "readwrite");
            const store = transaction.objectStore("frames");
            store.put({ id: 1, colour: "Red", make: "Toyota" });
            
            const idQuery = store.get(4);
            transaction.oncomplete = function () {
              db.close();
            };
            return idQuery;
          };
        }
        
        function storeData(key, data) {
          const request = getDB()
          request.onsuccess = function () {
            console.log("Database opened successfully");
            const db = request.result;
            const transaction = db.transaction("frames", "readwrite");
            const store = transaction.objectStore("frames");
            store.put(data, key);
            transaction.oncomplete = function () {
              db.close();
            };
          };
        }
        
        function getDB() {
          const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB ||
            window.shimIndexedDB;
          
          if (!indexedDB) {
            console.log("IndexedDB could not be found in this browser.");
          }
          
          return indexedDB.open("eduportal-data", 1);
        }

        function renderPage(num) {
          pageRendering = true;
          pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport({scale: document.getElementById('scale').value});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            var renderTask = page.render(renderContext);

            renderTask.promise.then(function() {
              pageRendering = false;
              if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
              }
            });
          });

          document.getElementById('page_num').textContent = num;
        }

        function queueRenderPage(num) {
          if (pageRendering) {
            pageNumPending = num;
          } else {
            renderPage(num);
          }
        }

        function onPrevPage() {
          if (pageNum <= 1) {
          return;
        }
          pageNum--;
          queueRenderPage(pageNum);
        }
        document.getElementById('prev').addEventListener('click', onPrevPage);

        function onNextPage() {
          if (pageNum >= pdfDoc.numPages) {
            return;
          }
          pageNum++;
          queueRenderPage(pageNum);
        }
        document.getElementById('next').addEventListener('click', onNextPage);

        pdfjsLib.getDocument({ data: atob('${base64content}') }).promise.then(function(pdfDoc_) {
          pdfDoc = pdfDoc_;
          storeData(${key}, pdfDoc);
          document.getElementById('page_count').textContent = pdfDoc.numPages;

          // Initial/first page rendering
          renderPage(pageNum);
        });
      </script>
    </body>
    </html>`;
  }
}
