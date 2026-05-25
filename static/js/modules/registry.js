// Tool Registry — safe plugin system for adding tools without breaking existing code

var TOOL_REGISTRY = [];

function registerTool(def) {
  if (!def.id || !def.name || !def.create) return;
  TOOL_REGISTRY.push(def);
}

// Called after DOM loads, before any tool is accessed
function initToolRegistry() {
  TOOL_REGISTRY.forEach(function(tool) {
    tool._error = null;
    tool._initialized = false;
    tool._container = null;
    try {
      // Create tab button in the right location
      if (tool.tab === 'texttools') {
        // Find the Text Tools tab bar and add a button
        var bars = document.querySelectorAll('#tab-texttools .nb-tabs-bar');
        if (bars.length > 0) {
          var btn = document.createElement('button');
          btn.className = 'nb-tab-btn';
          btn.setAttribute('data-tt-tool', tool.id);
          btn.textContent = tool.name;
          btn.addEventListener('click', function() { switchRegistryTool(tool); });
          bars[0].appendChild(btn);
        }
        // Create the content container
        var div = document.createElement('div');
        div.className = 'nb-tool-content';
        div.id = 'tt-pane-' + tool.id;
        div.style.display = 'none';
        // Find the parent container and append
        var parentDiv = document.querySelector('#tab-texttools > div');
        if (parentDiv) {
          parentDiv.appendChild(div);
        }
        tool._container = div;
      }
    } catch(e) {
      tool._error = 'Failed to register: ' + e.message;
    }
  });
}

function switchRegistryTool(tool) {
  if (!tool || !tool._container) return;
  try {
    document.querySelectorAll('#tab-texttools .nb-tool-content').forEach(function(p) {
      p.classList.remove('active');
      p.style.display = 'none';
    });
    document.querySelectorAll('#tab-texttools .nb-tab-btn').forEach(function(b) {
      b.classList.remove('active');
      if (b.getAttribute('data-tt-tool') === tool.id) b.classList.add('active');
    });
    tool._container.classList.add('active');
    tool._container.style.display = 'block';
    if (!tool._initialized) {
      tool._initialized = true;
      try {
        tool.create(tool._container);
      } catch(e) {
        tool._error = 'Failed to create: ' + e.message;
        showToolError(tool._container, tool._error);
      }
      if (tool.init) {
        try { tool.init(); } catch(e) { tool._error = 'Init error: ' + e.message; }
      }
    }
  } catch(e) {
    if (tool._container) showToolError(tool._container, 'Switch error: ' + e.message);
  }
}
      if (tool.init) {
        try { tool.init(); } catch(e) { tool._error = 'Init error: ' + e.message; }
      }
    }
  } catch(e) {
    if (tool._container) showToolError(tool._container, 'Switch error: ' + e.message);
  }
}

function showToolError(container, msg) {
  while (container.firstChild) container.removeChild(container.firstChild);
  var err = document.createElement('div');
  err.style.cssText = 'color:var(--amber);font-size:11px;padding:12px';
  err.textContent = 'Tool error: ' + msg;
  container.appendChild(err);
}

// Auto-init after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initToolRegistry, 500);
  });
} else {
  setTimeout(initToolRegistry, 500);
}
