// 创建一个全局单例来管理 Dify 聊天机器人

let isInitialized = false
let scriptLoaded = false

/**
 * 初始化 Dify 聊天机器人
 */
export function initDifyChatbot() {
  console.log('Dify初始化检查', { isInitialized, scriptLoaded })

  // 如果已经初始化，则不重复初始化
  if (isInitialized) {
    console.log('Dify已经初始化，显示聊天机器人')
    showChatbot()
    return
  }

  // 配置 Dify 聊天机器人
  window.difyChatbotConfig = {
    token: 'XpcO5MZAwCOFvAEu',
    baseUrl: 'http://difychat.by.takin.cc',
  }

  // 如果脚本已加载，直接显示聊天机器人
  if (scriptLoaded) {
    console.log('脚本已加载，直接显示聊天机器人')
    showChatbot()
    isInitialized = true
    return
  }

  // 加载脚本
  console.log('加载 Dify 脚本')
  const script = document.createElement('script')
  script.src = 'http://difychat.by.takin.cc/embed.min.js'
  script.id = 'XpcO5MZAwCOFvAEu'
  script.defer = true

  script.onload = () => {
    console.log('Dify脚本加载完成')
    scriptLoaded = true
    isInitialized = true

    // 添加自定义样式
    addCustomStyles()
  }

  script.onerror = error => {
    console.error('Dify脚本加载失败:', error)
    isInitialized = false
    scriptLoaded = false
  }

  document.body.appendChild(script)
}

/**
 * 添加自定义样式
 */
function addCustomStyles() {
  // 检查是否已存在样式
  if (document.querySelector('style[data-dify-style]')) {
    return
  }

  const style = document.createElement('style')
  style.setAttribute('data-dify-style', 'true')
  style.textContent = `
    #dify-chatbot-bubble-button {
      background-color: #1C64F2 !important;
    }
    #dify-chatbot-bubble-window {
      width: 24rem !important;
      height: 40rem !important;
    }
  `
  document.head.appendChild(style)
}

/**
 * 显示聊天机器人
 */
function showChatbot() {
  // 这里可以添加显示聊天机器人的逻辑
  // 如果 Dify 提供了 API 来显示聊天机器人，可以在这里调用
  console.log('尝试显示聊天机器人')

  // 如果 Dify 没有提供显示 API，可以尝试通过模拟点击聊天按钮来显示
  const chatButton = document.getElementById('dify-chatbot-bubble-button')
  if (chatButton && chatButton.style.display === 'none') {
    chatButton.style.display = 'flex'
  }
}

/**
 * 隐藏聊天机器人
 */
export function hideChatbot() {
  console.log('隐藏聊天机器人')

  // 隐藏聊天按钮和窗口
  const chatButton = document.getElementById('dify-chatbot-bubble-button')
  if (chatButton) {
    chatButton.style.display = 'none'
  }

  const chatWindow = document.getElementById('dify-chatbot-bubble-window')
  if (chatWindow) {
    chatWindow.style.display = 'none'
  }
}

/**
 * 重置聊天机器人状态
 */
export function resetChatbot() {
  console.log('重置聊天机器人状态')
  isInitialized = false
}
