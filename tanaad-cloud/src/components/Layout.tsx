import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NAV_SECTIONS = [
  {
    title: 'Main',
    items: [
      { to: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    ],
  },
  {
    title: 'Management',
    items: [
      { to: '/students', icon: 'fas fa-users', label: 'Students' },
      { to: '/courses', icon: 'fas fa-book', label: 'Courses' },
    ],
  },
  {
    title: 'Financial',
    items: [
      { to: '/payments', icon: 'fas fa-money-bill-wave', label: 'Payments' },
    ],
  },
  {
    title: 'Academic',
    items: [
      { to: '/exams', icon: 'fas fa-clipboard-list', label: 'Exams' },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/settings', icon: 'fas fa-cog', label: 'Settings' },
      { to: '/users', icon: 'fas fa-user-shield', label: 'Users' },
    ],
  },
];

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="Tanaad College" />
          <h2>Hello {user?.username || 'Admin'} !!</h2>
        </div>
        <div className="sidebar-menu">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="menu-title">{section.title}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `menu-item${isActive ? ' active' : ''}`
                  }
                >
                  <i className={item.icon}></i> {item.label}
                </NavLink>
              ))}
            </div>
          ))}
          <button
            onClick={logout}
            className="menu-item"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 'inherit', fontFamily: 'inherit' }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
