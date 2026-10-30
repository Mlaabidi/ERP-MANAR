import { Icon } from './icons'
import { initials as ini } from '../data'

/* ------------------------------------------------------------------ KPI */
export function Kpi(props: {
  label: string
  value: string
  icon: string
  delta?: string
  tone?: 'bad' | 'ok'
  hero?: boolean
}) {
  const deltaColor = props.hero ? 'var(--gold-300)' : props.tone === 'bad' ? 'var(--bad)' : 'var(--ok)'
  return (
    <div class={`card kpi fade${props.hero ? ' hero' : ''}`}>
      <div class="l">
        <span class="ic"><Icon name={props.icon} size={18} /></span>
        {props.label}
      </div>
      <div class="v">{props.value}</div>
      {props.delta && (
        <div class="d"><b style={`color:${deltaColor}`}>{props.delta}</b></div>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- donut */
export function Donut(props: {
  data: { v: number; c: string }[]
  size?: number
  thick?: number
  center?: string
  sub?: string
}) {
  const size = props.size ?? 170
  const thick = props.thick ?? 22
  const total = props.data.reduce((a, b) => a + b.v, 0) || 1
  const r = (size - thick) / 2
  const C = 2 * Math.PI * r
  let off = 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${props.center ?? total} ${props.sub ?? ''}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line-2)" stroke-width={thick} />
      {props.data.map((d) => {
        const len = (d.v / total) * C
        const el = (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={d.c}
            stroke-width={thick}
            stroke-dasharray={`${Math.max(len - 3, 0)} ${C}`}
            stroke-dashoffset={-off}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )
        off += len
        return el
      })}
      <text x="50%" y="48%" text-anchor="middle" font-size="30" font-weight="600" fill="var(--ink)" font-family="Tajawal">
        {props.center ?? total}
      </text>
      <text x="50%" y="62%" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Alexandria">
        {props.sub}
      </text>
    </svg>
  )
}

/* ---------------------------------------------------------------- bars */
export function Bars(props: { data: { l: string; v: number; hi?: boolean }[]; h?: number }) {
  const h = props.h ?? 200
  const max = Math.max(...props.data.map((d) => d.v)) || 1
  return (
    <div class="bars" style={`height:${h}px`}>
      {props.data.map((d) => (
        <div class="col">
          <span class="val">{d.v}</span>
          <div
            class={`bar${d.hi ? ' hi' : ''}`}
            style={`height:${Math.round((d.v / max) * (h - 60))}px`}
          />
          <span class="lb">{d.l}</span>
        </div>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------- pager */
export function Pager(props: { total: string; from?: string; to?: string; pages?: number }) {
  const pages = props.pages ?? 3
  return (
    <div class="pager">
      <span>
        عرض <span class="num">{props.from ?? '1'}–{props.to ?? '10'}</span> من{' '}
        <span class="num">{props.total}</span>
      </span>
      <div class="pg">
        <span class="off">‹</span>
        <span class="on num">1</span>
        {Array.from({ length: pages - 1 }, (_, i) => (
          <a href="#" class="num">{i + 2}</a>
        ))}
        <span>…</span>
        <a href="#">›</a>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- who */
export function Who(props: { name: string; sub?: any }) {
  return (
    <div class="who">
      <div class="avatar">{ini(props.name)}</div>
      <div>
        <div class="nm">{props.name}</div>
        {props.sub && <div class="sub">{props.sub}</div>}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- badge */
export function Badge(props: { cls: string; children: any }) {
  return <span class={`badge ${props.cls}`}>{props.children}</span>
}

/* ----------------------------------------------------------- page-head */
export function PageHead(props: { title: string; sub?: string; actions?: any }) {
  return (
    <div class="page-h fade">
      <div>
        <h1>{props.title}</h1>
        {props.sub && <p>{props.sub}</p>}
      </div>
      {props.actions && <div class="acts">{props.actions}</div>}
    </div>
  )
}

/* ------------------------------------------------------- generic page */
export function GenericPage(props: {
  title: string
  sub: string
  itemLabel: string
  children?: string[]
}) {
  const rows = props.children ?? ['عنصر 1', 'عنصر 2', 'عنصر 3', 'عنصر 4', 'عنصر 5']
  return (
    <>
      <PageHead
        title={props.itemLabel}
        sub={props.sub}
        actions={
          <>
            <a class="btn btn-ghost" href={`?module=${props.title}&page=export`}>
              <Icon name="download" />تصدير
            </a>
            <button class="btn btn-gold" data-toast="تم إنشاء عنصر جديد">
              <Icon name="plus" />إضافة
            </button>
          </>
        }
      />
      <div class="card fade">
        <div class="toolbar">
          <div class="search" style="width:280px">
            <Icon name="search" />
            <input class="inp" placeholder="بحث…" data-filter-table />
          </div>
          <div class="grow" />
          <button class="btn btn-ghost btn-sm" data-toast="تم تحديث التصفية">
            <Icon name="filter" />تصفية
          </button>
        </div>
        <div class="scroll-x">
          <table class="tbl" data-filterable>
            <thead>
              <tr>
                <th>#</th>
                <th>الاسم</th>
                <th>آخر تحديث</th>
                <th>بواسطة</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr data-row>
                  <td class="num dim">{i + 1}</td>
                  <td class="strong">{c}</td>
                  <td class="num dim">1448-05-{String(10 + i).padStart(2, '0')}</td>
                  <td>—</td>
                  <td>
                    <Badge cls={i % 3 ? 'b-ok' : 'b-mute'}>{i % 3 ? 'مفعّل' : 'مسودة'}</Badge>
                  </td>
                  <td>
                    <button class="btn btn-ghost btn-sm btn-icon" data-toast="خيارات العنصر">
                      <Icon name="more" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={String(rows.length)} from="1" to={String(rows.length)} pages={1} />
      </div>
    </>
  )
}
