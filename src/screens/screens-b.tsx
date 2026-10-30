import { Icon } from '../components/icons'
import { Kpi, Who, Badge, PageHead, Pager } from '../components/ui'
import { NAMES, MODULES, SERVICE_TYPES, SERVICE_STATUS, ROLES } from '../data'
import { Logo } from '../components/shell'

/* =====================================================================
   3.7 SERVICES — لوحة إدارة الخدمات
   ===================================================================== */
export function ServicesDash() {
  const amounts = ['850', '300', '1,200', '150']
  const top = [
    ['هدي (أضحية)', 212],
    ['نقل خاص', 96],
    ['ترقية سكن', 64],
    ['عربة كبار السن', 46],
  ] as [string, number][]

  return (
    <>
      <PageHead
        title="لوحة إدارة الخدمات"
        sub="طلبات الخدمات الإضافية من الحجاج"
        actions={
          <>
            <a class="btn btn-ghost" href="/services/catalog"><Icon name="layers" />قائمة الخدمات</a>
            <a class="btn btn-gold" href="/services/add"><Icon name="plus" />إضافة خدمة</a>
          </>
        }
      />

      <div class="kpis">
        <Kpi hero label="طلبات جديدة" value="37" icon="sync" delta="منذ آخر دخول" />
        <Kpi label="قيد التنفيذ" value="52" icon="hourglass" />
        <Kpi label="منفّذة" value="418" icon="check" delta="+21 اليوم" />
        <Kpi label="إيرادات الخدمات" value="184K" icon="ticket" delta="ر.س هذا الموسم" />
      </div>

      <div class="g2">
        <div class="card fade">
          <div class="toolbar">
            <div class="seg" data-seg data-name="serviceStatus">
              <button type="button" class="on">الكل</button>
              <button type="button">جديد</button>
              <button type="button">قيد التنفيذ</button>
              <button type="button">منفّذ</button>
            </div>
            <div class="grow" />
            <div class="search" style="width:220px">
              <Icon name="search" />
              <input class="inp" placeholder="بحث…" data-filter-table />
            </div>
          </div>
          <div class="scroll-x">
            <table class="tbl" data-filterable>
              <thead>
                <tr>
                  <th>الطلب</th>
                  <th>الحاج</th>
                  <th>الخدمة</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {NAMES.slice(0, 7).map((n, i) => {
                  const svcType = SERVICE_TYPES[i % 4]
                  const st = SERVICE_STATUS[i % 4]
                  return (
                    <tr data-row data-status={st.label}>
                      <td class="num strong">S-{3120 - i}</td>
                      <td><Who name={n} /></td>
                      <td><Badge cls={svcType.cls}>{svcType.label}</Badge></td>
                      <td class="num">{amounts[i % 4]} ر.س</td>
                      <td><Badge cls={st.cls}>{st.label}</Badge></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card fade">
          <div class="card-h"><h3>الأكثر طلباً</h3></div>
          <div class="card-b gauge-list">
            {top.map(([l, v]) => (
              <div>
                <div class="row-h">
                  <span>{l}</span>
                  <span>{v}</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style={`width:${(v / 2.2).toFixed(1)}%`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* =====================================================================
   3.8 MESSAGES — رسالة جديدة
   ===================================================================== */
export function MessagesDash() {
  const sample =
    'عزيزي الحاج {الاسم}، نذكّركم بموعد التحرك إلى عرفات الساعة 6:00 صباحاً من بوابة المخيم {المخيم}. تقبّل الله منا ومنكم.'
  const vars = ['{الاسم}', '{المخيم}', '{الحافلة}', '{رقم الحجز}']

  return (
    <>
      <PageHead
        title="رسالة جديدة"
        sub="إرسال رسائل نصية وتنبيهات لحجاج المنار"
        actions={
          <>
            <a class="btn btn-ghost" href="/messages/live"><Icon name="hourglass" />متابعة مباشرة</a>
          </>
        }
      />

      <div class="g2" style="align-items:start">
        <div class="card fade">
          <div class="card-b">
            <form id="message-form" novalidate>
              <div class="form-grid">
                <div class="field">
                  <label for="recipients">المستلمون</label>
                  <select id="recipients" class="inp">
                    <option>جميع الحجاج (1,387)</option>
                    <option>حسب الجنسية</option>
                    <option>حسب المخيم</option>
                    <option>حسب الحافلة</option>
                  </select>
                </div>

                <div class="field">
                  <label>القناة</label>
                  <div class="seg" style="width:fit-content" data-seg data-name="channel">
                    <button type="button" class="on">SMS</button>
                    <button type="button">واتساب</button>
                    <button type="button">إشعار</button>
                  </div>
                </div>

                <div class="field full">
                  <label for="template">القالب</label>
                  <select id="template" class="inp" data-template-select>
                    <option value="move">تذكير بموعد التحرك</option>
                    <option value="welcome">ترحيب</option>
                    <option value="eid">تهنئة بالعيد</option>
                  </select>
                </div>

                <div class="field full">
                  <label for="msg-text">نص الرسالة</label>
                  <textarea id="msg-text" class="inp" data-msg-text rows={4}>{sample}</textarea>
                  <div class="var-chips">
                    {vars.map((t) => (
                      <button type="button" class="badge b-gold" data-insert-var={t}>{t}</button>
                    ))}
                    <span class="meta" data-msg-meta>
                      {sample.length} حرف · 3 رسالة
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label>موعد الإرسال</label>
                  <div class="seg" style="width:fit-content" data-seg data-name="sendTime">
                    <button type="button" class="on">الآن</button>
                    <button type="button">جدولة</button>
                  </div>
                </div>
              </div>

              <div class="form-foot">
                <button class="btn btn-ghost" type="button" data-toast="تم حفظ الرسالة كمسودة">
                  حفظ كمسودة
                </button>
                <button class="btn btn-gold" type="submit">
                  <Icon name="message" />إرسال إلى 1,387
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="card fade">
          <div class="card-h"><h3>معاينة</h3></div>
          <div class="card-b">
            <div class="preview-panel">
              <div class="preview-brand">AL-MANAR</div>
              <div class="bubble" data-msg-preview>
                {sample
                  .replace('{الاسم}', 'محمد')
                  .replace('{المخيم}', '12')
                  .replace('{الحافلة}', '07')
                  .replace('{رقم الحجز}', 'H48-1387')}
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-top:18px;font-size:12.5px">
              <div class="kv" style="border-top:0;padding-top:0">
                <span>رصيد الرسائل</span>
                <span class="num">24,500</span>
              </div>
              <div class="kv">
                <span>تكلفة تقديرية</span>
                <span class="num">2,774 رسالة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* =====================================================================
   3.9 USERS — لوحة إدارة العاملين
   ===================================================================== */
export function UsersDash() {
  const people = ['وليد الشميمري', ...NAMES.slice(0, 7)]

  return (
    <>
      <PageHead
        title="لوحة إدارة العاملين"
        sub="المستخدمون والصلاحيات على البرامج"
        actions={
          <>
            <a class="btn btn-gold" href="/users/new"><Icon name="userPlus" />مستخدم جديد</a>
          </>
        }
      />

      <div class="card fade">
        <div class="toolbar">
          <div class="search" style="width:280px">
            <Icon name="search" />
            <input class="inp" placeholder="الاسم أو اسم المستخدم…" data-filter-table />
          </div>
          <select class="inp" style="width:160px">
            <option>كل الأدوار</option>
            {ROLES.map((r) => <option>{r.label}</option>)}
          </select>
          <div class="grow" />
          <span class="hint"><span class="num">64</span> مستخدماً</span>
        </div>

        <div class="scroll-x">
          <table class="tbl" data-filterable>
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>اسم الدخول</th>
                <th>الدور</th>
                <th>البرامج المتاحة</th>
                <th>آخر دخول</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {people.map((n, i) => {
                const role = ROLES[i ? (i % 3) + 1 : 0]
                const modCount = i ? (i % 4) + 1 : 9
                const tiles = MODULES.slice(0, modCount).slice(0, 5)
                return (
                  <tr data-row>
                    <td><Who name={n} sub={<span class="num">05{551234567 + i * 1111}</span>} /></td>
                    <td class="num dim" style="direction:ltr;text-align:right">user{100 + i}</td>
                    <td><Badge cls={role.cls}>{role.label}</Badge></td>
                    <td>
                      <div class="mod-tiles">
                        {tiles.map((m) => (
                          <span class="tile" title={m.title}><Icon name={m.icon} size={14} /></span>
                        ))}
                        {modCount > 5 && <span class="more">+{modCount - 5}</span>}
                      </div>
                    </td>
                    <td class="num dim">{i ? `قبل ${i * 3} ساعات` : 'الآن'}</td>
                    <td><Badge cls={i === 5 ? 'b-bad' : 'b-ok'}>{i === 5 ? 'موقوف' : 'نشط'}</Badge></td>
                    <td>
                      <button class="btn btn-ghost btn-sm btn-icon" data-toast={`خيارات ${n}`}>
                        <Icon name="more" size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Pager total="64" pages={3} />
      </div>
    </>
  )
}

/* =====================================================================
   3.10 PRINTING — لوحة الطباعة
   ===================================================================== */
export function PrintingDash() {
  return (
    <>
      <PageHead
        title="لوحة الطباعة"
        sub="طباعة بطاقات الحجاج والظروف"
        actions={
          <>
            <a class="btn btn-ghost" href="/printing/bg"><Icon name="image" />رفع خلفية البطاقة</a>
            <button class="btn btn-gold" data-toast="جارٍ إرسال 24 بطاقة إلى الطابعة…">
              <Icon name="printer" />طباعة المحدد (<span data-print-count>24</span>)
            </button>
          </>
        }
      />

      <div class="g2" style="align-items:start">
        <div class="card fade">
          <div class="toolbar">
            <select class="inp" style="width:170px">
              <option>المخيم: منى 12</option>
              <option>المخيم: منى 04</option>
              <option>المخيم: عرفات 09</option>
            </select>
            <select class="inp" style="width:170px">
              <option>الحافلة: الكل</option>
              <option>الحافلة: 01</option>
              <option>الحافلة: 02</option>
            </select>
            <div class="grow" />
            <div class="seg" data-seg data-name="printKind">
              <button type="button" class="on">بطاقات</button>
              <button type="button">ظروف</button>
            </div>
          </div>

          <div class="scroll-x">
            <table class="tbl">
              <thead>
                <tr>
                  <th><input type="checkbox" data-check-all aria-label="تحديد الكل" /></th>
                  <th>الحاج</th>
                  <th>رقم الحجز</th>
                  <th>الحافلة</th>
                  <th>حالة الطباعة</th>
                </tr>
              </thead>
              <tbody>
                {NAMES.slice(0, 8).map((n, i) => (
                  <tr>
                    <td>
                      <input type="checkbox" data-row-check checked={i < 5} aria-label={`تحديد ${n}`} />
                    </td>
                    <td><Who name={n} /></td>
                    <td class="num">H48-{1300 + i * 7}</td>
                    <td class="num">{String((i % 4) + 1).padStart(2, '0')}</td>
                    <td>
                      <Badge cls={i % 3 === 0 ? 'b-ok' : 'b-mute'}>{i % 3 === 0 ? 'طُبعت' : 'لم تُطبع'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card fade">
          <div class="card-h">
            <h3>معاينة البطاقة</h3>
            <span class="badge b-mute">CR80</span>
          </div>
          <div class="card-b">
            <div class="id-card">
              <div class="band"><Logo h={30} /></div>
              <div class="body">
                <div class="photo"><Icon name="user" size={36} /></div>
                <div class="nm">{NAMES[0]}</div>
                <div class="bk">H48-1300</div>
              </div>
              <div class="foot">
                <div>
                  <div class="k">المخيم</div>
                  <b>12</b>
                </div>
                <div>
                  <div class="k">الحافلة</div>
                  <b>01</b>
                </div>
                <div>
                  <div class="k">الجنسية</div>
                  <b>سعودي</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
