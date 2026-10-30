import { Icon } from './icons'
import { MODULES, CURRENT_USER, HIJRI_DATE, HIJRI_SHORT, CLOCK, type ModuleDef } from '../data'

export const LOGO = '/static/img/logo-manar.png'

export function Logo(props: { h?: number }) {
  return <img src={LOGO} alt="المنار للحج والعمرة" style={`height:${props.h ?? 40}px;display:block`} />
}

/* =====================================================================
   LOGIN
   ===================================================================== */
export function Login(props: { error?: string; username?: string }) {
  return (
    <div class="login">
      <div class="login-form">
        <div class="login-box fade">
          <Logo h={52} />
          <h1>إدارة الأنظمة</h1>
          <div class="lead">سجّل دخولك وابدأ إدارة خدماتك الآن</div>

          {props.error && <div class="alert-bad" role="alert">{props.error}</div>}

          <form method="post" action="/login" class="login-fields">
            <div class="field">
              <label for="username">اسم المستخدم</label>
              <input
                id="username"
                name="username"
                class="inp"
                value={props.username ?? 'w.alshammari'}
                autocomplete="username"
                dir="ltr"
                style="text-align:right"
              />
            </div>
            <div class="field">
              <label for="password">كلمة المرور</label>
              <input
                id="password"
                name="password"
                class="inp"
                type="password"
                value="manar1448"
                autocomplete="current-password"
                dir="ltr"
                style="text-align:right"
              />
            </div>
            <div class="login-row">
              <label>
                <input type="checkbox" name="remember" value="1" checked /> تذكرني
              </label>
              <a href="#" data-toast="سيتم إرسال رابط استعادة كلمة المرور إلى بريدك">نسيت كلمة المرور؟</a>
            </div>
            <button class="btn btn-gold login-submit" type="submit">تسجيل الدخول</button>
          </form>

          <div class="login-note">
            دخول تجريبي: <code>w.alshammari</code> / <code>manar1448</code>
          </div>
        </div>
      </div>

      <div class="login-art">
        <div class="kicker">نظام المنار المتكامل</div>
        <h2>منصة واحدة لإدارة رحلة الحاج من التسجيل حتى العودة</h2>
        <p>البلاغات، التسجيل، الحجوزات، الخدمات، الرسائل والمطبوعات — في واجهة موحّدة.</p>
      </div>
    </div>
  )
}

/* =====================================================================
   HOME — module launcher
   ===================================================================== */
export function Home() {
  return (
    <div class="home">
      <div class="home-hero">
        <div class="home-bar">
          <div class="lg"><Logo /></div>
          <div class="right">
            <button class="btn btn-glass btn-icon" aria-label="التنبيهات" data-toast="لديك 4 تنبيهات جديدة">
              <Icon name="bell" />
            </button>
            <a class="btn btn-glass" href="/logout"><Icon name="logout" />تسجيل الخروج</a>
          </div>
        </div>

        <div class="home-hi fade">
          <div class="k">مرحباً بك</div>
          <h1>{CURRENT_USER.name}</h1>
          <div class="d">
            <span><Icon name="shield" size={16} />{CURRENT_USER.roleLong}</span>
            <span><Icon name="calendar" size={16} /><span class="num">{HIJRI_DATE}</span></span>
            <span><Icon name="clock" size={16} /><span class="num">{CLOCK}</span></span>
          </div>
        </div>
      </div>

      <div class="home-grid">
        {MODULES.map((m, i) => (
          <a
            class="mod fade"
            href={`/${m.id}/dash`}
            style={`animation-delay:${i * 30}ms`}
            aria-label={m.title}
          >
            <div class="mod-ic"><Icon name={m.icon} size={26} /></div>
            <div>
              <div class="k">برنامج إدارة</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
            {m.badge && <span class="badge b-bad nb">جديد</span>}
            <Icon name="chevL" class="go" />
          </a>
        ))}
      </div>
    </div>
  )
}

/* =====================================================================
   SIDEBAR
   ===================================================================== */
function Sidebar(props: { mod: ModuleDef; page: string }) {
  const { mod, page } = props
  return (
    <aside class="side" id="sidebar">
      <div class="side-logo">
        <div class="lg"><Logo h={36} /></div>
      </div>

      <div class="side-modwrap">
        <button
          class="side-mod"
          id="module-switch"
          aria-expanded="false"
          aria-controls="module-switcher"
          type="button"
        >
          <div class="ic"><Icon name={mod.icon} /></div>
          <div>
            <div class="t">{mod.title}</div>
            <div class="s">تبديل البرنامج</div>
          </div>
          <Icon name="chevD" size={16} class="sw" />
        </button>
        <div class="switcher" id="module-switcher" hidden>
          {MODULES.map((m) => (
            <a href={`/${m.id}/dash`} class={m.id === mod.id ? 'on' : ''}>
              <Icon name={m.icon} size={18} />
              {m.title}
            </a>
          ))}
        </div>
      </div>

      <nav class="side-nav" aria-label="قائمة البرنامج">
        <div class="side-cap">القائمة</div>
        {mod.menu.map((it) => {
          const hasKids = !!it.children
          return (
            <div>
              <a
                class={`nav-i${page === it.id ? ' on' : ''}`}
                href={`/${mod.id}/${it.id}`}
                {...(hasKids ? { 'data-submenu': it.id, 'aria-expanded': 'false' } : {})}
              >
                <Icon name={it.icon} size={19} />
                {it.label}
                {hasKids && <Icon name="chevL" size={15} class="chev" />}
              </a>
              {hasKids && (
                <div class="nav-sub" id={`sub-${it.id}`} hidden>
                  {it.children!.map((c) => (
                    <a href={`/${mod.id}/${it.id}#${encodeURIComponent(c)}`}>{c}</a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div class="side-foot">
        <a class="nav-i" href="/home"><Icon name="grid" size={19} />العودة للرئيسية</a>
        <a class="nav-i" href="/logout"><Icon name="logout" size={19} />تسجيل الخروج</a>
        <div class="side-user">
          <div class="avatar">{CURRENT_USER.initials}</div>
          <div>
            <div class="n">{CURRENT_USER.name}</div>
            <div class="r">{CURRENT_USER.role}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

/* =====================================================================
   APP LAYOUT
   ===================================================================== */
export function AppLayout(props: {
  mod: ModuleDef
  page: string
  pageLabel: string
  children: any
}) {
  const { mod, page, pageLabel } = props
  return (
    <>
      <div class="scrim" id="scrim"></div>
      <div class="app">
        <Sidebar mod={mod} page={page} />
        <div class="main">
          <header class="top">
            <button class="hamb" id="nav-toggle" aria-label="فتح القائمة" type="button">
              <Icon name="menu" />
            </button>
            <div class="crumb">
              <span>{mod.full}</span>
              <Icon name="chevL" size={14} />
              <b>{pageLabel}</b>
            </div>
            <div class="grow" />
            <div class="search top-search">
              <Icon name="search" />
              <input class="inp" placeholder="بحث برقم الحاج أو الاسم…" data-global-search />
            </div>
            <div class="top-date">
              <b class="num">{HIJRI_SHORT}</b>
              <br />
              <span class="num">الجمعة {CLOCK}</span>
            </div>
            <button class="bell" aria-label="التنبيهات" data-toast="لديك 4 تنبيهات جديدة">
              <Icon name="bell" />
              <i />
            </button>
          </header>
          <main class="content" key={`${mod.id}-${page}`}>
            {props.children}
          </main>
        </div>
      </div>
    </>
  )
}
