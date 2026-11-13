export const dashboardStats = [
  { id: 'students', label: 'Total Students', value: '1,284', delta: '+46 this week', tone: 'purple' },
  { id: 'teachers', label: 'Total Teachers', value: '326', delta: '+12 this week', tone: 'gold' },
  { id: 'parents', label: 'Total Parents', value: '918', delta: '+31 this week', tone: 'purple' },
  { id: 'requests', label: 'Pending Requests', value: '47', delta: 'Needs review', tone: 'gold' },
  { id: 'bookings', label: 'Active Bookings', value: '192', delta: 'This month', tone: 'purple' },
  { id: 'packages', label: 'Total Packages', value: '64', delta: '8 featured', tone: 'gold' },
] as const

export const recentRequests = [
  {
    id: 'REQ-2041',
    student: 'Aisha Al-Ahmad',
    subject: 'IGCSE Mathematics',
    city: 'Kuwait City',
    package: '12-session pack',
    status: 'Pending',
    submitted: '12 min ago',
  },
  {
    id: 'REQ-2038',
    student: 'Yousef Mansour',
    subject: 'Arabic Literature',
    city: 'Hawalli',
    package: 'Weekly tutoring',
    status: 'Matched',
    submitted: '41 min ago',
  },
  {
    id: 'REQ-2034',
    student: 'Maya Chen',
    subject: 'SAT English',
    city: 'Salmiya',
    package: 'Exam intensive',
    status: 'Pending',
    submitted: '1 hr ago',
  },
  {
    id: 'REQ-2031',
    student: 'Fahad Al-Qattan',
    subject: 'Physics HL',
    city: 'Jahra',
    package: '8-session pack',
    status: 'Accepted',
    submitted: '2 hrs ago',
  },
  {
    id: 'REQ-2027',
    student: 'Huda Nasser',
    subject: 'Quran & Tajweed',
    city: 'Farwaniya',
    package: 'Family plan',
    status: 'Pending',
    submitted: '3 hrs ago',
  },
]

export const recentUsers = [
  { name: 'Sara Ibrahim', role: 'Teacher', city: 'Kuwait City', joined: 'Today' },
  { name: 'Noura Al-Dosari', role: 'Parent', city: 'Salmiya', joined: 'Today' },
  { name: 'Daniel Ruiz', role: 'Student', city: 'Hawalli', joined: 'Yesterday' },
  { name: 'Layla Faris', role: 'Teacher', city: 'Ahmadi', joined: 'Yesterday' },
  { name: 'Karim Haddad', role: 'Parent', city: 'Kuwait City', joined: '2 days ago' },
]

export const activityFeed = [
  { title: 'Teacher accepted a Physics request', time: '8 min ago' },
  { title: 'New 12-session SAT package published', time: '26 min ago' },
  { title: 'Parent booked Thursday evening session', time: '1 hr ago' },
  { title: 'Subject catalog updated with IB Biology', time: '3 hrs ago' },
  { title: 'Weekly platform report generated', time: '5 hrs ago' },
]

export const notifications = [
  { title: '4 requests waiting longer than 2 hours', time: 'Just now' },
  { title: 'Teacher verification pending: Sara Ibrahim', time: '20 min ago' },
  { title: 'Booking conflict flagged in Salmiya', time: '1 hr ago' },
]
