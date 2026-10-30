import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

import { MODULES, CURRENT_USER } from './data'
import { Login, Home, AppLayout } from './components/shell'
import { GenericPage } from './components/ui'
import {
  ReportsDash,
  ReportNew,
  RegisterDash,
  PilgrimsDash,
  WebsiteDash,
  HaircutDash,
} from './screens/screens-a'
import { ServicesDash, MessagesDash, UsersDash, PrintingDash } from './screens/screens-b'

const app = new Hono()

/* ---------------------------------------------------------------- shell */
app.use(
  '*',
  jsxRenderer(({ children, title }) => (
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title ? `${title} — المنار للحج والعمرة` : 'المنار للحج والعمرة — نظام الإدارة'}</title>
        <meta
          name="description"
          content="نظام المنار المتكامل لإدارة بلاغات الحجاج، التسجيل، الحجوزات، الخدمات، الرسائل والمطبوعات."
        />
        <link rel="icon" href="/static/img/logo-manar.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="/static/css/app.css" />
      </head>
      <body>
        {children}
        <div class="toast-wrap" id="toast-wrap" aria-live="polite" />
        <script src="/static/js/app.js" defer />
      </body>
    </html>
  ))
)

/* ---------------------------------------------------------------- auth */
const SESSION_COOKIE = 'manar_session'
const DEMO_PASSWORDS = new Set(['manar1448', '123456', 'demo'])

function isAuthed(c: any) {
  const v = getCookie(c, SESSION_COOKIE)
  return v === 'active'
}

function requireAuth(c: any) {
  if (!isAuthed(c)) return c.redirect('/login', 302)
  return null
}

/* -------------------------------------------------------------- screens */
type ScreenFn = () => any

const SCREENS: Record<string, Record<string, ScreenFn>> = {
  reports: { dash: ReportsDash, new: ReportNew },
  register: { dash: RegisterDash },
  pilgrims: { dash: PilgrimsDash },
  website: { dash: WebsiteDash },
  haircut: { dash: HaircutDash },
  services: { dash: ServicesDash },
  messages: { dash: MessagesDash },
  users: { dash: UsersDash },
  printing: { dash: PrintingDash },
}

/* --------------------------------------------------------------- routes */
app.get('/', (c) => c.redirect(isAuthed(c) ? '/home' : '/login', 302))

app.get('/login', (c) => {
  if (isAuthed(c)) return c.redirect('/home', 302)
  return c.render(<Login />, { title: 'تسجيل الدخول' })
})

app.post('/login', async (c) => {
  const body = await c.req.parseBody()
  const username = String(body.username ?? '').trim()
  const password = String(body.password ?? '')

  if (!username || !DEMO_PASSWORDS.has(password)) {
    return c.render(<Login error="اسم المستخدم أو كلمة المرور غير صحيحة" username={username} />, {
      title: 'تسجيل الدخول',
    })
  }

  if (body.remember) {
    setCookie(c, SESSION_COOKIE, 'active', { path: '/', maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: 'Lax' })
  } else {
    setCookie(c, SESSION_COOKIE, 'active', { path: '/', httpOnly: true, sameSite: 'Lax' })
  }
  return c.redirect('/home', 302)
})

app.get('/logout', (c) => {
  deleteCookie(c, SESSION_COOKIE, { path: '/' })
  return c.redirect('/login', 302)
})

app.get('/home', (c) => {
  const guard = requireAuth(c)
  if (guard) return guard
  return c.render(<Home />, { title: 'الرئيسية' })
})

/* ----------------------------------------------------- module routes */
for (const mod of MODULES) {
  app.get(`/${mod.id}`, (c) => c.redirect(`/${mod.id}/dash`, 302))
  app.get(`/${mod.id}/:page`, (c) => {
    const guard = requireAuth(c)
    if (guard) return guard

    const pageId = c.req.param('page')
    const item = mod.menu.find((m) => m.id === pageId) ?? mod.menu[0]
    const Screen = SCREENS[mod.id]?.[item.id]

    const body = Screen ? <Screen /> : <GenericPage itemLabel={item.label} sub={mod.full} title={mod.id} children={item.children} />

    return c.render(
      <AppLayout mod={mod} page={item.id} pageLabel={item.label}>
        {body}
      </AppLayout>,
      { title: `${item.label} · ${mod.title}` }
    )
  })
}

/* ------------------------------------------------------------- api ---- */
app.get('/api/health', (c) => c.json({ status: 'ok', user: CURRENT_USER.name }))

app.get('/api/modules', (c) => c.json(MODULES))

app.notFound((c) =>
  c.render(
    <div class="empty-state" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <h1 style="font-size:22px;margin-bottom:8px">الصفحة غير موجودة</h1>
      <p style="color:var(--muted);margin-bottom:20px">تعذّر العثور على المسار المطلوب.</p>
      <a class="btn btn-gold" href="/home">العودة للرئيسية</a>
    </div>,
    { title: 'خطأ 404' }
  )
)

export default app
