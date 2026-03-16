import fs from 'node:fs'

const checks = []

const routerText = fs.readFileSync('src/router/index.ts', 'utf8')
checks.push({
  name: 'NoAuth 路由应使用动态导入组件',
  pass: routerText.includes(
    "component: () => import('../views/NoAuthView.vue')",
  ),
})

const accessText = fs.readFileSync('src/access/index.ts', 'utf8')
checks.push({
  name: '未登录跳转应指向 /user/login',
  pass: accessText.includes("path: '/user/login'"),
})

const requestText = fs.readFileSync('src/request.ts', 'utf8')
checks.push({
  name: '请求拦截器注释拼写应为 lies',
  pass: requestText.includes(
    'that lies within the range of 2xx causes this function to trigger',
  ),
})

const failed = checks.filter(item => !item.pass)
for (const item of checks) {
  console.log(`${item.pass ? '✅' : '❌'} ${item.name}`)
}

if (failed.length > 0) {
  console.error(`\n${failed.length} guardrail check(s) failed.`)
  process.exit(1)
}

console.log('\nAll guardrail checks passed.')
