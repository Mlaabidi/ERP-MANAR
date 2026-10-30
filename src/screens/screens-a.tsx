import { Icon } from '../components/icons'
import { Kpi, Donut, Bars, Pager, Who, Badge, PageHead } from '../components/ui'
import { NAMES, NATS, PACKAGES, BOOKING_STATUS, PRIORITIES, REPORT_CATEGORIES } from '../data'

/* =====================================================================
   3.1 REPORTS — لوحة المؤشرات الرئيسية
   ===================================================================== */
export function ReportsDash() {
  const cats = [
    { l: 'سكن', v: 42, c: 'var(--navy-800)' },
    { l: 'نقل', v: 31, c: 'var(--gold)' },
    { l: 'إعاشة', v: 22, c: 'var(--navy-600)' },
    { l: 'صحي', v: 12, c: 'var(--gold-300)' },
    { l: 'أخرى', v: 9, c: '#C9D3E3' },
  ]

  const rows = [
    { id: 'B-2041', n: NAMES[0], cat: 'سكن', loc: 'مخيم 12 — منى', pri: PRIORITIES[0], st: 'قيد المعالجة', stCls: 'b-warn' },
    { id: 'B-2040', n: NAMES[1], cat: 'نقل', loc: 'حافلة 07', pri: PRIORITIES[1], st: 'جديد', stCls: 'b-info' },
    { id: 'B-2039', n: NAMES[2], cat: 'إعاشة', loc: 'مخيم 04 — عرفات', pri: PRIORITIES[2], st: 'مغلق', stCls: 'b-ok' },
    { id: 'B-2038', n: NAMES[3], cat: 'صحي', loc: 'مخيم 12 — منى', pri: PRIORITIES[0], st: 'محوّل للجنة', stCls: 'b-gold' },
    { id: 'B-2037', n: NAMES[4], cat: 'سكن', loc: 'مخيم 09 — منى', pri: PRIORITIES[1], st: 'مغلق', stCls: 'b-ok' },
  ]

  return (
    <>
      <PageHead
        title="لوحة المؤشرات الرئيسية"
        sub="متابعة لحظية لبلاغات الحجاج خلال موسم 1448هـ"
        actions={
          <>
            <div class="seg" data-seg>
              <button type="button">اليوم</button>
              <button type="button" class="on">الأسبوع</button>
              <button type="button">الموسم</button>
            </div>
            <a class="btn btn-gold" href="/reports/new"><Icon name="plus" />بلاغ جديد</a>
          </>
        }
      />

      <div class="kpis">
        <Kpi hero label="إجمالي عدد البلاغات" value="116" icon="flag" delta="+14 منذ الأمس" />
        <Kpi label="قيد المعالجة" value="23" icon="hourglass" delta="متوسط 38 دقيقة" />
        <Kpi label="بلاغات مغلقة" value="87" icon="check" delta="75% نسبة الإغلاق" />
        <Kpi label="بلاغات عاجلة مفتوحة" value="6" icon="bell" delta="تحتاج متابعة" tone="bad" />
      </div>

      <div class="g2">
        <div class="card fade">
          <div class="card-h">
            <div>
              <h3>البلاغات حسب اليوم</h3>
              <div class="sub">أيام التشريق — الذروة يوم النحر</div>
            </div>
          </div>
          <div class="card-b">
            <Bars
              data={[
                { l: '7 ذو الحجة', v: 8 },
                { l: '8 التروية', v: 14 },
                { l: '9 عرفة', v: 22 },
                { l: '10 النحر', v: 31, hi: true },
                { l: '11', v: 19 },
                { l: '12', v: 13 },
                { l: '13', v: 9 },
              ]}
            />
          </div>
        </div>

        <div class="card fade">
          <div class="card-h"><h3>حسب التصنيف</h3></div>
          <div class="card-b" style="display:flex;flex-direction:column;align-items:center;gap:18px">
            <Donut data={cats.map((c) => ({ v: c.v, c: c.c }))} sub="بلاغ" />
            <div class="legend" style="width:100%">
              {cats.map((c) => (
                <div>
                  <i style={`background:${c.c}`} />
                  {c.l}
                  <b>{c.v}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div class="card fade">
        <div class="card-h">
          <h3>أحدث البلاغات</h3>
          <a class="btn btn-ghost btn-sm" href="/reports/list">عرض الكل</a>
        </div>
        <div class="card-b" style="padding:16px 0 0">
          <div class="scroll-x">
            <table class="tbl">
              <thead>
                <tr>
                  <th>رقم البلاغ</th>
                  <th>الحاج</th>
                  <th>التصنيف</th>
                  <th>الموقع</th>
                  <th>الأولوية</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr>
                    <td class="num strong">{r.id}</td>
                    <td><Who name={r.n} /></td>
                    <td>{r.cat}</td>
                    <td class="dim">{r.loc}</td>
                    <td><Badge cls={r.pri.cls}>{r.pri.label}</Badge></td>
                    <td><Badge cls={r.stCls}>{r.st}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

/* =====================================================================
   3.2 REPORTS — بلاغ جديد
   ===================================================================== */
export function ReportNew() {
  const points: [string, string][] = [
    ['الباقة', 'المنار الذهبية'],
    ['المخيم', 'منى — 12'],
    ['الحافلة', '07'],
    ['الجوال', '0551234567'],
    ['بلاغات سابقة', '1'],
  ]

  return (
    <>
      <PageHead title="بلاغ جديد" sub="تسجيل بلاغ وإحالته إلى اللجنة المختصة" />

      <div class="g2" style="align-items:start">
        <div class="card fade">
          <div class="card-b">
            <form id="report-form" novalidate>
              <div class="form-grid">
                <div class="field">
                  <label for="pil-id">رقم الحاج / الهوية <i>*</i></label>
                  <div class="search">
                    <Icon name="search" />
                    <input id="pil-id" name="pilId" class="inp num" value="1094523817" inputmode="numeric" />
                  </div>
                </div>

                <div class="field">
                  <label for="pil-name">اسم الحاج</label>
                  <input id="pil-name" class="inp" value={NAMES[0]} readonly />
                </div>

                <div class="field">
                  <label for="cat">التصنيف <i>*</i></label>
                  <select id="cat" name="category" class="inp">
                    {REPORT_CATEGORIES.map((c) => <option>{c}</option>)}
                  </select>
                </div>

                <div class="field">
                  <label>الأولوية</label>
                  <div class="seg" style="width:fit-content" data-seg data-name="priority">
                    <button type="button">منخفض</button>
                    <button type="button">متوسط</button>
                    <button type="button" class="on">عاجل</button>
                  </div>
                </div>

                <div class="field">
                  <label for="loc">الموقع</label>
                  <select id="loc" name="location" class="inp">
                    <option>مخيم 12 — منى</option>
                    <option>مخيم 04 — عرفات</option>
                    <option>مخيم 09 — منى</option>
                    <option>حافلة 07</option>
                  </select>
                </div>

                <div class="field">
                  <label for="committee">إحالة إلى</label>
                  <select id="committee" name="committee" class="inp">
                    <option>لجنة السكن</option>
                    <option>لجنة النقل</option>
                    <option>لجنة الإعاشة</option>
                    <option>اللجنة الصحية</option>
                  </select>
                </div>

                <div class="field full">
                  <label for="desc">وصف البلاغ <i>*</i></label>
                  <textarea id="desc" name="description" class="inp" rows={4}>تعطل جهاز التكييف في الخيمة رقم 3 منذ صلاة الفجر.</textarea>
                </div>

                <div class="field full">
                  <label>المرفقات</label>
                  <label class="drop" for="att">
                    <Icon name="upload" size={26} />
                    <div>اسحب صوراً أو مرفقات هنا، أو <b style="color:var(--gold-700)">تصفّح</b></div>
                    <input id="att" type="file" multiple hidden />
                  </label>
                </div>
              </div>

              <div class="form-foot">
                <a class="btn btn-ghost" href="/reports/dash">إلغاء</a>
                <button class="btn btn-gold" type="submit"><Icon name="check" />حفظ وإحالة</button>
              </div>
            </form>
          </div>
        </div>

        <div class="card fade">
          <div class="card-h"><h3>بيانات الحاج</h3></div>
          <div class="card-b" style="display:flex;flex-direction:column;gap:14px">
            <Who name={NAMES[0]} sub="سعودي · 54 سنة" />
            {points.map(([k, v]) => (
              <div class="kv">
                <span>{k}</span>
                <span class="num">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* =====================================================================
   3.3 REGISTRATION — لوحة إعلانات المكتب
   ===================================================================== */
export function RegisterDash() {
  const prev = [
    'تحديث مواعيد استلام البطاقات',
    'إغلاق التسجيل للباقة الاقتصادية',
    'اجتماع المشرفين — الخميس',
  ]

  return (
    <>
      <PageHead
        title="لوحة إعلانات المكتب"
        sub="إعلانات خاصة بمكتب التسجيل"
        actions={
          <>
            <a class="btn btn-ghost" href="/register/sites"><Icon name="pin" />توزيع المواقع</a>
            <button class="btn btn-gold" data-toast="نموذج إعلان جديد جاهز للنشر"><Icon name="plus" />إعلان جديد</button>
          </>
        }
      />

      <div class="g2" style="align-items:start">
        <div class="card media-card fade">
          <div class="media-head announce-head">
            <div class="inner">
              <span class="badge b-gold">إعلان مثبّت</span>
              <h2>عيدكم مبارك</h2>
              <div class="sub">كل عام وأنتم بخير</div>
            </div>
          </div>
          <div class="card-b" style="display:flex;justify-content:space-between;align-items:center">
            <span style="color:var(--muted)">مع تحيات مكتب التسجيل بالمنار</span>
            <span class="num" style="color:var(--muted);font-size:12px">1448-05-18</span>
          </div>
        </div>

        <div class="stack">
          <Kpi hero label="مسجّلون اليوم" value="142" icon="userPlus" delta="من 1,387 حاجاً" />
          <Kpi label="مواقع موزّعة" value="96%" icon="pin" delta="57 بانتظار التوزيع" />
          <div class="card fade">
            <div class="card-h"><h3>إعلانات سابقة</h3></div>
            <div class="card-b list-mini">
              {prev.map((t, i) => (
                <div class="item">
                  <Icon name="megaphone" size={16} />
                  {t}
                  <span class="when">05-{12 - i * 2}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* =====================================================================
   3.4 PILGRIMS — إدارة حجاج المنار
   ===================================================================== */
export function PilgrimsDash() {
  return (
    <>
      <PageHead
        title="إدارة حجاج المنار"
        sub="الحجوزات وحالة الرفع إلى منصة نسك"
        actions={
          <>
            <a class="btn btn-ghost" href="/pilgrims/nusuk"><Icon name="upload" />تجهيز بيانات نسك</a>
            <a class="btn btn-gold" href="/pilgrims/newb"><Icon name="plus" />حجز جديد</a>
          </>
        }
      />

      <div class="kpis">
        <Kpi hero label="إجمالي الحجوزات" value="1,387" icon="users" delta="+38 هذا الأسبوع" />
        <Kpi label="مرفوعة لنسك" value="1,204" icon="upload" delta="87%" />
        <Kpi label="بانتظار السداد" value="94" icon="hourglass" delta="مبلغ 612,000 ر.س" tone="bad" />
        <Kpi label="الحافلات المخصصة" value="28" icon="bus" delta="بسعة 50 راكباً" />
      </div>

      <div class="card fade">
        <div class="toolbar">
          <div class="search" style="width:300px">
            <Icon name="search" />
            <input class="inp" placeholder="رقم الحجز، الهوية، الاسم…" data-filter-table />
          </div>
          <select class="inp" style="width:170px" data-filter-package>
            <option value="">كل الباقات</option>
            {PACKAGES.map((p) => <option>{p}</option>)}
          </select>
          <select class="inp" style="width:150px" data-filter-status>
            <option value="">كل الحالات</option>
            {BOOKING_STATUS.map((s) => <option>{s.label}</option>)}
          </select>
          <div class="grow" />
          <button class="btn btn-ghost btn-sm" data-toast="جارٍ تصدير 1,387 صفاً إلى Excel…">
            <Icon name="download" />Excel
          </button>
        </div>

        <div class="scroll-x">
          <table class="tbl" data-filterable>
            <thead>
              <tr>
                <th><input type="checkbox" data-check-all aria-label="تحديد الكل" /></th>
                <th>رقم الحجز</th>
                <th>الحاج</th>
                <th>الجنسية</th>
                <th>الباقة</th>
                <th>المخيم</th>
                <th>الحافلة</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {NAMES.slice(0, 10).map((n, i) => {
                const s = BOOKING_STATUS[i % 4]
                return (
                  <tr data-row data-package={PACKAGES[i % 3]} data-status={s.label}>
                    <td><input type="checkbox" data-row-check aria-label={`تحديد ${n}`} /></td>
                    <td class="num strong">H48-{1387 - i}</td>
                    <td><Who name={n} sub={<span class="num">{1094523817 + i * 731}</span>} /></td>
                    <td>{NATS[i % 8]}</td>
                    <td>{PACKAGES[i % 3]}</td>
                    <td class="num">منى {(i % 6) + 4}</td>
                    <td class="num">{String((i % 9) + 1).padStart(2, '0')}</td>
                    <td><Badge cls={s.cls}>{s.label}</Badge></td>
                    <td>
                      <button class="btn btn-ghost btn-sm btn-icon" data-toast={`خيارات الحجز ${n}`}>
                        <Icon name="more" size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Pager total="1,387" pages={3} />
        <div class="pager" style="display:none" data-selection-bar>
          <span>تم تحديد <b class="num" data-selected-count>0</b> حجزاً</span>
        </div>
      </div>
    </>
  )
}

/* =====================================================================
   3.5 WEBSITE — الصور المتحركة
   ===================================================================== */
export function WebsiteDash() {
  const slides = [
    'رحلة الإيمان تبدأ من هنا',
    'باقات الحج 1448هـ',
    'برامج العمرة الرمضانية',
    'خدمات كبار السن',
  ]

  return (
    <>
      <PageHead
        title="إدارة موقع المنار"
        sub="الصور المتحركة في الصفحة الرئيسية"
        actions={
          <>
            <button class="btn btn-ghost" data-toast="فتح معاينة الموقع في نافذة جديدة"><Icon name="eye" />معاينة الموقع</button>
            <button class="btn btn-gold" data-toast="أضف شريحة جديدة"><Icon name="plus" />إضافة شريحة</button>
          </>
        }
      />

      <div class="g2e">
        {slides.map((s, i) => (
          <div class="card media-card fade">
            <div
              class="media-head"
              style={`background-image:url(/static/img/bg.jpg);background-position:${20 + i * 20}% ${30 + i * 10}%`}
            >
              <h3>{s}</h3>
              <span class="badge b-gold num ord">{i + 1}</span>
            </div>
            <div class="card-b" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <Badge cls={i < 3 ? 'b-ok' : 'b-mute'}>{i < 3 ? 'منشورة' : 'مخفية'}</Badge>
              <span style="color:var(--muted);font-size:12px">
                آخر تعديل <span class="num">1448-05-{10 + i}</span>
              </span>
              <div style="margin-right:auto;display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" data-toast={`تعديل الشريحة ${i + 1}`}>
                  <Icon name="edit" size={15} />تعديل
                </button>
                <button class="btn btn-ghost btn-sm btn-icon" data-toast="خيارات الشريحة">
                  <Icon name="more" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* =====================================================================
   3.6 HAIRCUT COUNTER
   ===================================================================== */
export function HaircutDash() {
  const ops = [
    { v: '+5', who: 'مشرف 1', at: '12:14' },
    { v: '+1', who: 'مشرف 2', at: '12:12' },
    { v: '+10', who: 'مشرف 3', at: '12:10' },
    { v: '-1', who: 'مشرف 1', at: '12:08' },
    { v: '+3', who: 'مشرف 4', at: '12:06' },
  ]

  return (
    <>
      <PageHead
        title="عدّاد حلاقة الحجاج"
        sub="موقع الحلاقة — منى، البوابة الشرقية"
        actions={
          <>
            <button class="btn btn-ghost" data-toast="نسخ رابط الإدارة إلى الحافظة"><Icon name="link" />رابط الإدارة</button>
            <button class="btn btn-ghost" data-toast="نسخ رابط الحاج إلى الحافظة"><Icon name="link" />رابط الحاج</button>
          </>
        }
      />

      <div class="g2" style="align-items:stretch">
        <div class="card counter-card fade" data-counter>
          <div class="counter-label">عدد الحجاج المنجَز</div>
          <div class="counter-value" data-counter-value data-total="1520">1,387</div>
          <div class="counter-ctrls">
            <button class="btn btn-glass btn-icon sq" data-counter-step="-1" aria-label="إنقاص">
              <Icon name="minus" size={26} />
            </button>
            <input
              class="counter-step num"
              data-counter-step-input
              value="1"
              inputmode="numeric"
              aria-label="مقدار التغيير"
            />
            <button class="btn btn-gold btn-icon sq" data-counter-step="1" aria-label="زيادة">
              <Icon name="plus" size={26} />
            </button>
          </div>
        </div>

        <div class="stack">
          <Kpi label="المتبقي" value="133" icon="hourglass" delta="من 1,520 حاجاً مسجلاً" />
          <Kpi label="المعدل الحالي" value="46/س" icon="clock" delta="+8 عن الساعة الماضية" />
          <div class="card fade">
            <div class="card-h"><h3>آخر العمليات</h3></div>
            <div class="card-b counter-ops">
              {ops.map((o) => (
                <div>
                  <span class={o.v.startsWith('-') ? 'minus' : 'plus'}>{o.v}</span>
                  <span class="who">{o.who}</span>
                  <span class="at">{o.at}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
