
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Settings,
  Home
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package }, 
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Back to Site', path: '/', icon: Home }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md">
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-corporate-dark">Admin Panel</h2>
        <p className="text-sm text-gray-500">Manage your website content</p>
      </div>
      <nav className="mt-4">
        <ul className="space-y-1 px-2">
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-corporate text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
