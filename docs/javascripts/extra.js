/* Premium JS Extensions for JavaScript course website */
document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Disable Grammarly on details/summary elements to prevent blue pencil icon
  function disableGrammarly() {
    const targets = document.querySelectorAll("details, summary");
    targets.forEach(function (el) {
      el.setAttribute("data-gramm", "false");
      el.setAttribute("data-gramm_editor", "false");
      el.setAttribute("data-enable-grammarly", "false");
      el.setAttribute("spellcheck", "false");
    });
  }

  // 2. Setup Quick Code Box in header next to search box
  function setupFixedCodebox() {
    const searchContainer = document.querySelector(".md-search");
    if (searchContainer && !document.getElementById("toggle-fixed-codebox")) {
      const btn = document.createElement("button");
      btn.id = "toggle-fixed-codebox";
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="margin-right: 4px;"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm-3-8h6v2H9v-2zm0-4h6v2H9V8z"/></svg>
        <span>Code Box</span>
      `;
      // Insert right after search container
      searchContainer.parentNode.insertBefore(btn, searchContainer.nextSibling);
      
      btn.addEventListener("click", toggleFixedCodebox);
    }
    if (!document.getElementById("fixed-codebox")) {
      // Dynamically detect if the current page is a subpage (one level down from root)
      const pathParts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
      const jsIndex = pathParts.indexOf('javascript');
      let isSubpage = false;
      if (jsIndex !== -1) {
        if (pathParts.length > jsIndex + 1 && pathParts[jsIndex + 1] !== 'index.html') {
          isSubpage = true;
        }
      } else {
        if (pathParts.length > 0 && pathParts[0] !== 'index.html') {
          isSubpage = true;
        }
      }
      const iframeSrc = isSubpage ? "../playground_embed.html" : "playground_embed.html";

      const box = document.createElement("div");
      box.id = "fixed-codebox";
      box.innerHTML = `
        <div class="codebox-resize-handle" id="codebox-resize-handle"></div>
        <div style="background: #21252b; padding: 6px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #181a1f; user-select: none; margin-top: 6px; height: 32px;">
          <div style="display: flex; align-items: center; gap: 6px; color: #9da5b4; font-family: monospace; font-size: 11px; font-weight: bold; uppercase tracking-wider;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#ffd600" style="vertical-align: middle;"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm-3-8h6v2H9v-2zm0-4h6v2H9V8z"/></svg>
            <span style="vertical-align: middle;">Quick Playground (test.js)</span>
          </div>
          <button id="close-fixed-codebox" style="background: transparent; border: none; color: #abb2bf; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 2px; border-radius: 4px; transition: all 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
        <div style="flex: 1; position: relative; background: #181a1f;">
          <iframe id="fixed-codebox-iframe" src="${iframeSrc}" style="width: 100%; height: 100%; border: none;"></iframe>
        </div>
      `;
      document.body.appendChild(box);

      // Event listeners for close button
      document.getElementById("close-fixed-codebox").addEventListener("click", function() {
        box.style.display = "none";
      });

      // Simple drag resize logic
      const resizeHandle = document.getElementById("codebox-resize-handle");
      let isResizing = false;
      
      resizeHandle.addEventListener("mousedown", function(e) {
        isResizing = true;
        document.body.style.userSelect = "none";
        document.body.style.cursor = "ns-resize";
      });

      document.addEventListener("mousemove", function(e) {
        if (!isResizing) return;
        const height = window.innerHeight - e.clientY;
        if (height > 150 && height < window.innerHeight * 0.85) {
          box.style.height = height + "px";
        }
      });

      document.addEventListener("mouseup", function() {
        isResizing = false;
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      });
    }
  }

  function toggleFixedCodebox() {
    const box = document.getElementById("fixed-codebox");
    if (box) {
      if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    }
  }

  // 3. Inject "Try It" buttons to all JavaScript code blocks in the course content
  function addTryItButtons() {
    const codeBlocks = document.querySelectorAll("pre > code.language-javascript");
    codeBlocks.forEach(function (codeEl) {
      const preEl = codeEl.parentNode;
      
      // Check if button already exists
      if (preEl.querySelector(".btn-try-it")) return;

      const btn = document.createElement("button");
      btn.className = "btn-try-it";
      btn.title = "โหลดโค้ดนี้เข้ากล่องเขียนโค้ด";
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="vertical-align: middle; margin-right: 2px;"><path d="M8 5v14l11-7z"/></svg>
        <span>Try It</span>
      `;
      
      // Style button dynamically
      preEl.style.position = "relative";
      btn.style.position = "absolute";
      btn.style.right = "4.5em"; // Position it left of the default copy button
      btn.style.top = "0.5em";
      btn.style.zIndex = "10";
      btn.style.background = "rgba(255, 214, 0, 0.1)";
      btn.style.border = "1px solid rgba(255, 214, 0, 0.4)";
      btn.style.color = "#ffd600";
      btn.style.padding = "3px 8px";
      btn.style.borderRadius = "4px";
      btn.style.fontSize = "10px";
      btn.style.fontWeight = "bold";
      btn.style.cursor = "pointer";
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.transition = "all 0.2s";

      btn.onmouseover = function() {
        btn.style.background = "rgba(255, 214, 0, 0.25)";
        btn.style.borderColor = "rgba(255, 214, 0, 0.6)";
      };
      btn.onmouseout = function() {
        btn.style.background = "rgba(255, 214, 0, 0.1)";
        btn.style.borderColor = "rgba(255, 214, 0, 0.4)";
      };

      btn.addEventListener("click", function() {
        const codeText = codeEl.textContent;
        
        // Open the fixed code box
        const box = document.getElementById("fixed-codebox");
        if (box) {
          box.style.display = "flex";
        }
        
        // Post the code content to the iframe
        const iframe = document.getElementById("fixed-codebox-iframe");
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: "LOAD_CODE",
            code: codeText
          }, "*");
        }
      });

      preEl.appendChild(btn);
    });
  }

  // Initial runs
  disableGrammarly();
  setupFixedCodebox();
  addTryItButtons();

  // Run on mutations (MkDocs instant navigation support)
  const observer = new MutationObserver(function() {
    disableGrammarly();
    setupFixedCodebox();
    addTryItButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
