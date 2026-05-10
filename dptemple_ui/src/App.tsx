import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import MainLayout from '@/components/layout/MainLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import Events from '@/pages/Events'
import EventDetail from '@/pages/EventDetail'
import News from '@/pages/News'
import NewsDetail from '@/pages/NewsDetail'
import DharmaTalks from '@/pages/DharmaTalks'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminEvents from '@/pages/admin/AdminEvents'
import AdminNews from '@/pages/admin/AdminNews'
import AdminVideos from '@/pages/admin/AdminVideos'
import AdminNotifications from '@/pages/admin/AdminNotifications'
import AdminContact from '@/pages/admin/AdminContact'
import AdminCategories from '@/pages/admin/AdminCategories'
import CreateCategory from '@/pages/admin/CreateCategory'
import AdminTags from '@/pages/admin/AdminTags'
import CreateTag from '@/pages/admin/CreateTag'
import CreateEvent from '@/pages/admin/CreateEvent'
import CreateNews from '@/pages/admin/CreateNews'
import CreateVideo from '@/pages/admin/CreateVideo'
import CreateNotification from '@/pages/admin/CreateNotification'
import Notifications from '@/pages/Notifications'
import NotificationDetail from '@/pages/NotificationDetail'
import NotFoundPage from '@/pages/NotFoundPage'

// Root wrap AuthProvider bên trong router context để useNavigate hoạt động
function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/home" replace /> },
          { path: 'home', element: <HomePage /> },
          { path: 'events', element: <Events /> },
          { path: 'events/:id', element: <EventDetail /> },
          { path: 'news', element: <News /> },
          { path: 'news/:id', element: <NewsDetail /> },
          { path: 'dharma-talks', element: <DharmaTalks /> },
          { path: 'about', element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: 'notifications', element: <Notifications /> },
          { path: 'notifications/:id', element: <NotificationDetail /> },
          // ✏️ Thêm route mới tại đây
        ],
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'events', element: <AdminEvents /> },
          { path: 'events/create', element: <CreateEvent /> },
          { path: 'news', element: <AdminNews /> },
          { path: 'news/create', element: <CreateNews /> },
          { path: 'videos', element: <AdminVideos /> },
          { path: 'videos/create', element: <CreateVideo /> },
          { path: 'notifications', element: <AdminNotifications /> },
          { path: 'notifications/create', element: <CreateNotification /> },
          { path: 'contact', element: <AdminContact /> },
          { path: 'categories', element: <AdminCategories /> },
          { path: 'categories/create', element: <CreateCategory /> },
          { path: 'tags', element: <AdminTags /> },
          { path: 'tags/create', element: <CreateTag /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
