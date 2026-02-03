export function serveLandingPage(): Response {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitPro - GitHub 加速镜像</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%238b5cf6'/%3E%3Cstop offset='100%25' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='20' fill='url(%23g)'/%3E%3Cpath d='M50 15C30.67 15 15 30.67 15 50c0 15.53 10.06 28.68 24.02 33.33 1.76.31 2.42-.75 2.42-1.67 0-.84-.04-3.6-.04-6.54-8.83 1.62-11.12-2.15-11.82-4.13-.4-1.01-2.11-4.13-3.6-4.96-1.23-.66-2.99-2.29-.04-2.33 2.77-.04 4.75 2.55 5.41 3.6 3.16 5.32 8.22 3.82 10.24 2.9.31-2.29 1.23-3.82 2.24-4.7-7.83-.88-16-3.91-16-17.36 0-3.82 1.36-6.98 3.6-9.44-.35-.88-1.58-4.48.35-9.31 0 0 2.95-.92 9.67 3.6 2.81-.79 5.8-1.19 8.79-1.19s5.98.4 8.79 1.19c6.72-4.56 9.67-3.6 9.67-3.6 1.93 4.83.7 8.43.35 9.31 2.24 2.46 3.6 5.58 3.6 9.44 0 13.49-8.22 16.48-16.04 17.36 1.27 1.1 2.37 3.21 2.37 6.5 0 4.7-.04 8.48-.04 9.67 0 .92.66 2.02 2.42 1.67C74.94 78.68 85 65.49 85 50c0-19.33-15.67-35-35-35z' fill='white'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      width: 100%;
      max-width: 900px;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(40px) saturate(120%);
      -webkit-backdrop-filter: blur(40px) saturate(120%);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 48px;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.15),
        inset 0 0 80px rgba(255, 255, 255, 0.1);
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .logo {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
    }
    
    .logo svg {
      width: 32px;
      height: 32px;
      fill: white;
    }
    
    .title-group h1 {
      font-size: 28px;
      font-weight: 700;
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .title-group p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 4px;
    }
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(34, 197, 94, 0.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(34, 197, 94, 0.5);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      color: #4ade80;
      margin-left: auto;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .input-section {
      margin-bottom: 32px;
    }
    
    .input-wrapper {
      display: flex;
      gap: 12px;
    }
    
    .input-group {
      flex: 1;
      position: relative;
    }
    
    .input-prefix {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      pointer-events: none;
    }
    
    input {
      width: 100%;
      padding: 16px 16px 16px 160px;
      font-size: 15px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: white;
      outline: none;
      transition: all 0.2s ease;
    }
    
    input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    input:focus {
      border-color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.25);
    }
    
    .btn {
      padding: 16px 32px;
      font-size: 15px;
      font-weight: 600;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(139, 92, 246, 0.5);
    }
    
    .btn-primary:active {
      transform: translateY(0);
    }
    
    .usage-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .usage-item {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .usage-item:hover {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.4);
    }
    
    .usage-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .usage-code {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 13px;
      color: white;
      word-break: break-all;
    }
    
    .usage-arrow {
      color: #06b6d4;
      margin: 0 4px;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 640px) {
      .features {
        grid-template-columns: 1fr;
      }
    }
    
    .feature {
      text-align: center;
    }
    
    .feature-icon {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
    }
    
    .feature-icon svg {
      width: 24px;
      height: 24px;
      stroke: white;
      fill: none;
    }
    
    .feature h3 {
      font-size: 14px;
      font-weight: 600;
      color: white;
      margin-bottom: 4px;
    }
    
    .feature p {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .footer {
      text-align: center;
      margin-top: 24px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
    
    .footer a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
    }
    
    .footer a:hover {
      color: white;
    }
    
    @media (max-width: 640px) {
      .card {
        padding: 24px;
      }
      
      .header {
        flex-wrap: wrap;
      }
      
      .status-badge {
        margin-left: 0;
        margin-top: 12px;
      }
      
      .input-wrapper {
        flex-direction: column;
      }
      
      input {
        padding-left: 16px;
      }
      
      .input-prefix {
        display: none;
      }
      
      .usage-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>
        <div class="title-group">
          <h1>GitPro</h1>
          <p>GitHub 加速镜像服务</p>
        </div>
        <div class="status-badge">
          <span class="status-dot"></span>
          <span>在线</span>
        </div>
      </div>
      
      <div class="input-section">
        <div class="input-wrapper">
          <div class="input-group">
            <span class="input-prefix">gitpro.nilpo.app/</span>
            <input type="text" id="repoInput" placeholder="owner/repo" autocomplete="off">
          </div>
          <button class="btn btn-primary" onclick="goToRepo()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            访问
          </button>
        </div>
      </div>
      
      <div class="usage-grid">
        <div class="usage-item" onclick="copyToClipboard('https://gitpro.nilpo.app/user/repo')">
          <div class="usage-label">仓库克隆</div>
          <div class="usage-code">
            gitpro.nilpo.app/<span style="color: #06b6d4">user/repo</span>
          </div>
        </div>
        <div class="usage-item" onclick="copyToClipboard('https://gitpro.nilpo.app/raw/user/repo/main/file.txt')">
          <div class="usage-label">Raw 文件</div>
          <div class="usage-code">
            gitpro.nilpo.app/<span style="color: #f472b6">raw</span>/user/repo/main/file
          </div>
        </div>
        <div class="usage-item" onclick="copyToClipboard('https://gitpro.nilpo.app/api/repos/user/repo')">
          <div class="usage-label">API 接口</div>
          <div class="usage-code">
            gitpro.nilpo.app/<span style="color: #a78bfa">api</span>/repos/user/repo
          </div>
        </div>
        <div class="usage-item" onclick="copyToClipboard('git clone https://gitpro.nilpo.app/user/repo.git')">
          <div class="usage-label">Git Clone</div>
          <div class="usage-code">
            git clone https://gitpro.nilpo.app/user/repo.git
          </div>
        </div>
      </div>
      
      <div class="features">
        <div class="feature">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h3>极速加速</h3>
          <p>全球 CDN 节点加速</p>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3>安全可靠</h3>
          <p>无需登录，开箱即用</p>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <h3>全面代理</h3>
          <p>支持仓库/Raw/API/Releases</p>
        </div>
      </div>
      
      <div class="footer">
        <p>由 <a href="https://nilpo.app" target="_blank">nilpo.app</a> 提供服务 · 部署于 Deno Deploy</p>
      </div>
    </div>
  </div>
  
  <script>
    function goToRepo() {
      const input = document.getElementById('repoInput');
      const value = input.value.trim();
      if (value) {
        window.location.href = '/' + value;
      }
    }
    
    document.getElementById('repoInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') goToRepo();
    });
    
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        const items = document.querySelectorAll('.usage-item');
        items.forEach(item => {
          if (item.onclick.toString().includes(text)) {
            const original = item.querySelector('.usage-label').textContent;
            item.querySelector('.usage-label').textContent = '已复制!';
            setTimeout(() => {
              item.querySelector('.usage-label').textContent = original;
            }, 1500);
          }
        });
      });
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
