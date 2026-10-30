// Module registry — mirrors the legacy ERP structure (source of truth for navigation).
// Full menu trees are reproduced from the design handoff (erp/data.jsx).

export type MenuItem = {
  id: string
  label: string
  icon: string
  children?: string[]
}

export type ModuleDef = {
  id: string
  title: string
  full: string
  board: string
  icon: string
  desc: string
  badge?: string
  menu: MenuItem[]
}

export const MODULES: ModuleDef[] = [
  {
    id: 'reports',
    title: 'بلاغات الحجاج',
    full: 'برنامج إدارة بلاغات الحجاج',
    board: 'لوحة المؤشرات الرئيسية',
    icon: 'flag',
    desc: 'استقبال البلاغات ومتابعة معالجتها',
    menu: [
      { id: 'dash', label: 'لوحة المؤشرات الرئيسية', icon: 'chart' },
      { id: 'new', label: 'بلاغ جديد', icon: 'flag' },
      { id: 'list', label: 'عرض البلاغات', icon: 'flagFill' },
      { id: 'sup', label: 'مشرفو اللجان', icon: 'phone' },
      { id: 'perf', label: 'الأداء', icon: 'bars' },
      { id: 'pil', label: 'عرض الحجاج', icon: 'users' },
      { id: 'lists', label: 'إدارة القوائم', icon: 'list', children: ['تصنيفات البلاغات', 'اللجان', 'الأولويات'] },
      { id: 'texts', label: 'إضافة النصوص', icon: 'text' },
    ],
  },
  {
    id: 'register',
    title: 'تسجيل الحجاج',
    full: 'برنامج إدارة تسجيل الحجاج',
    board: 'لوحة إعلانات المكتب',
    icon: 'userPlus',
    desc: 'مكتب التسجيل وتوزيع المواقع',
    menu: [
      { id: 'dash', label: 'لوحة الإعلانات', icon: 'megaphone' },
      { id: 'sites', label: 'توزيع المواقع', icon: 'pin' },
      { id: 'cancel', label: 'الإلغاء', icon: 'x' },
    ],
  },
  {
    id: 'pilgrims',
    title: 'حجاج المنار',
    full: 'برنامج إدارة حجاج المنار',
    board: 'إدارة حجاج المنار',
    icon: 'users',
    desc: 'الحجوزات، نسك، والحافلات',
    badge: 'N',
    menu: [
      { id: 'dash', label: 'عرض الحجوزات', icon: 'list' },
      { id: 'nusuk', label: 'تجهيز بيانات نسك', icon: 'upload', children: ['رفع ملف نسك', 'مطابقة البيانات', 'سجل الرفع'] },
      { id: 'settings', label: 'إعدادات', icon: 'gear', children: ['الباقات', 'المخيمات', 'الجنسيات'] },
      { id: 'buses', label: 'حافلات', icon: 'bus', children: ['توزيع الحافلات', 'السائقون'] },
      { id: 'edits', label: 'تعديلات', icon: 'edit', children: ['طلبات التعديل', 'سجل التعديلات'] },
      { id: 'newb', label: 'حجز جديد', icon: 'plus' },
    ],
  },
  {
    id: 'website',
    title: 'الموقع الإلكتروني',
    full: 'برنامج إدارة الموقع الإلكتروني',
    board: 'إدارة موقع المنار',
    icon: 'globe',
    desc: 'محتوى الموقع والبرامج',
    menu: [
      { id: 'dash', label: 'الصور المتحركة', icon: 'film', children: ['عرض الشرائح', 'إضافة شريحة'] },
      { id: 'pages', label: 'نصوص الصفحات', icon: 'doc', children: ['من نحن', 'الشروط والأحكام', 'الأسئلة الشائعة'] },
      { id: 'hajj', label: 'برنامج الحج', icon: 'kaaba', children: ['الباقات', 'الأسعار'] },
      { id: 'media', label: 'المركز الإعلامي', icon: 'megaphone', children: ['الأخبار', 'معرض الصور'] },
      { id: 'umrah', label: 'برنامج العمرة', icon: 'list', children: ['الباقات', 'الأسعار'] },
    ],
  },
  {
    id: 'haircut',
    title: 'حلاقة الحجاج',
    full: 'برنامج إدارة حلاقة الحجاج',
    board: 'عدّاد الحلاقة',
    icon: 'scissors',
    desc: 'عدّاد مباشر لمواقع الحلاقة',
    menu: [
      { id: 'dash', label: 'العدّاد', icon: 'scissors' },
      { id: 'log', label: 'سجل العمليات', icon: 'clock' },
      { id: 'links', label: 'الروابط', icon: 'link' },
    ],
  },
  {
    id: 'services',
    title: 'خدمات الحجاج',
    full: 'برنامج إدارة خدمات الحجاج',
    board: 'لوحة إدارة الخدمات',
    icon: 'hand',
    desc: 'الخدمات الإضافية والطلبات',
    menu: [
      { id: 'dash', label: 'الطلبات', icon: 'sync' },
      { id: 'catalog', label: 'قائمة الخدمات', icon: 'layers' },
      { id: 'add', label: 'إضافة الخدمات', icon: 'plus' },
      { id: 'settings', label: 'إعدادات', icon: 'gear' },
    ],
  },
  {
    id: 'messages',
    title: 'رسائل الحجاج',
    full: 'برنامج إدارة رسائل الحجاج',
    board: 'إدارة رسائل حجاج المنار',
    icon: 'message',
    desc: 'الرسائل النصية والتنبيهات',
    menu: [
      { id: 'dash', label: 'رسالة جديدة', icon: 'plus' },
      { id: 'setup', label: 'إعداد الرسائل', icon: 'gear' },
      { id: 'updates', label: 'مراجعة تحديثات الحجاج', icon: 'sync' },
      { id: 'view', label: 'عرض الرسائل', icon: 'eye' },
      { id: 'nat', label: 'الجنسيات', icon: 'flagNat' },
      { id: 'pil', label: 'عرض الحجاج', icon: 'users' },
      { id: 'live', label: 'متابعة الرسائل مباشر', icon: 'hourglass' },
    ],
  },
  {
    id: 'users',
    title: 'إدارة المستخدمين',
    full: 'برنامج إدارة المستخدمين',
    board: 'لوحة إدارة العاملين',
    icon: 'shield',
    desc: 'العاملون والصلاحيات',
    menu: [
      { id: 'dash', label: 'عرض المستخدمين', icon: 'users' },
      { id: 'new', label: 'مستخدم جديد', icon: 'userPlus' },
      { id: 'photo', label: 'تدوير صورة المستخدم', icon: 'rotate' },
    ],
  },
  {
    id: 'printing',
    title: 'المطبوعات',
    full: 'برنامج إدارة المطبوعات',
    board: 'لوحة الطباعة',
    icon: 'printer',
    desc: 'البطاقات والظروف',
    menu: [
      { id: 'dash', label: 'طباعة بطائق', icon: 'card' },
      { id: 'tpl', label: 'تجهيز نموذج البطاقات', icon: 'layers' },
      { id: 'bg', label: 'رفع خلفية البطاقة', icon: 'image' },
      { id: 'envtpl', label: 'تجهيز نموذج الظروف', icon: 'envelope' },
      { id: 'env', label: 'طباعة ظروف', icon: 'printer' },
    ],
  },
]

export const NAMES = [
  'محمد عبدالله القحطاني',
  'فاطمة أحمد الزهراني',
  'عبدالرحمن سعيد الغامدي',
  'نورة خالد العتيبي',
  'سلمان فهد الدوسري',
  'هند ناصر الشهري',
  'يوسف علي المالكي',
  'ريم عمر الحربي',
  'خالد إبراهيم السبيعي',
  'منيرة سعد القرني',
  'أحمد حسن الشمري',
  'لطيفة صالح العنزي',
]

export const NATS = ['سعودي', 'مصري', 'باكستاني', 'إندونيسي', 'أردني', 'سوداني', 'يمني', 'مغربي']

export const PACKAGES = ['المنار الذهبية', 'المنار الفضية', 'الاقتصادية']
export const PACKAGE_KEYS = ['gold', 'silver', 'eco']

export const BOOKING_STATUS = [
  { label: 'مؤكد', cls: 'b-ok' },
  { label: 'بانتظار السداد', cls: 'b-warn' },
  { label: 'مرفوع لنسك', cls: 'b-info' },
  { label: 'ملغى', cls: 'b-bad' },
]

export const REPORT_CATEGORIES = ['سكن', 'نقل', 'إعاشة', 'صحي', 'أخرى']
export const PRIORITIES = [
  { label: 'عاجل', cls: 'b-bad' },
  { label: 'متوسط', cls: 'b-warn' },
  { label: 'منخفض', cls: 'b-mute' },
]
export const REPORT_STATUS = [
  { label: 'جديد', cls: 'b-info' },
  { label: 'قيد المعالجة', cls: 'b-warn' },
  { label: 'محوّل للجنة', cls: 'b-gold' },
  { label: 'مغلق', cls: 'b-ok' },
]

export const SERVICE_TYPES = [
  { label: 'هدي (أضحية)', cls: 'b-gold' },
  { label: 'نقل خاص', cls: 'b-info' },
  { label: 'ترقية سكن', cls: 'b-ok' },
  { label: 'عربة كبار السن', cls: 'b-warn' },
]
export const SERVICE_STATUS = [
  { label: 'جديد', cls: 'b-info' },
  { label: 'قيد التنفيذ', cls: 'b-warn' },
  { label: 'منفّذ', cls: 'b-ok' },
  { label: 'مرفوض', cls: 'b-bad' },
]
export const ROLES = [
  { label: 'مدير', cls: 'b-gold' },
  { label: 'مشرف لجنة', cls: 'b-info' },
  { label: 'موظف تسجيل', cls: 'b-mute' },
  { label: 'مشرف حافلة', cls: 'b-mute' },
]

export const CURRENT_USER = {
  name: 'وليد الشميمري',
  initials: 'ولش',
  role: 'مدير',
  roleLong: 'مدير النظام',
  username: 'w.alshammari',
}

export const HIJRI_DATE = '18 جمادى الأولى 1448هـ'
export const HIJRI_SHORT = '18-05-1448هـ'
export const CLOCK = '12:14'

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
}

/** Deterministic pseudo-random helper so mock rows stay stable between renders. */
export function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]
}
