import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Mail,
  FileText,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function AdminPage() {
  const { user, token, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' | 'users' | 'quotes'
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const isAdmin = user && user.role === 'admin';

  // Fetch all admin data
  const fetchAdminData = React.useCallback(async () => {
    if (!token || !isAdmin) return;

    setLoadingData(true);
    setActionMessage(null);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [contactsRes, usersRes, quotesRes] = await Promise.all([
        fetch('/api/admin/contacts', { headers }),
        fetch('/api/admin/users', { headers }),
        fetch('/api/admin/quotes', { headers }),
      ]);

      if (contactsRes.ok) {
        const data = await contactsRes.json();
        setContacts(data.contacts || []);
      }
      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users || []);
      }
      if (quotesRes.ok) {
        const data = await quotesRes.json();
        setQuotes(data.quotes || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setActionMessage({ type: 'error', text: 'Failed to load administration data.' });
    } finally {
      setLoadingData(false);
    }
  }, [token, isAdmin]);

  useEffect(() => {
    if (isAdmin && token) {
      fetchAdminData();
    }
  }, [isAdmin, token, fetchAdminData]);

  // Handle contact deletion
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete contact submission');
      }

      setContacts((prev) => prev.filter((c) => (c._id || c.id) !== id));
      setActionMessage({ type: 'success', text: 'Contact submission deleted successfully.' });
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message || 'Error deleting submission' });
    } finally {
      setDeletingId(null);
    }
  };

  // Auth Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500">
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Verifying admin credentials...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Unauthorized State (401)
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              401 — Admin Access Required
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              This area is restricted to administrators. Please sign in with an administrator account to view submissions and platform records.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/login">
                <Button className="w-full">Sign In with Admin Account</Button>
              </Link>
              <Link to="/">
                <Button variant="secondary" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filtered collections based on search
  const filteredContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuotes = quotes.filter(
    (q) =>
      q.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.serviceRequired?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.budget?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Administrator</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Administration Panel
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage contact inquiries, registered accounts, and quote requests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={fetchAdminData}
                isLoading={loadingData}
                icon={RefreshCw}
              >
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Action Notification */}
          {actionMessage && (
            <div
              className={`mb-6 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs ${
                actionMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                  : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {actionMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <span>{actionMessage.text}</span>
              </div>
              <button
                onClick={() => setActionMessage(null)}
                className="font-bold underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Metrics summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div
              onClick={() => setActiveTab('contacts')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Contact Form Submissions
                </span>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {contacts.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Inquiries received</div>
            </div>

            <div
              onClick={() => setActiveTab('users')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Registered Users
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {users.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Accounts in database</div>
            </div>

            <div
              onClick={() => setActiveTab('quotes')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Quote Requests
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {quotes.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Enterprise requests</div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {/* Table controls & search */}
            <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'contacts'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Contacts ({contacts.length})
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'users'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Users ({users.length})
                </button>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'quotes'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Quotes ({quotes.length})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* TAB 1: Contacts Table */}
            {activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold">Name</th>
                      <th className="px-6 py-3.5 font-semibold">Email & Phone</th>
                      <th className="px-6 py-3.5 font-semibold">Subject & Message</th>
                      <th className="px-6 py-3.5 font-semibold">Date Submitted</th>
                      <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                          No contact form submissions found.
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.map((c) => {
                        const id = c._id || c.id;
                        return (
                          <tr key={id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                              {c.name}
                            </td>
                            <td className="px-6 py-4">
                              <div>{c.email}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{c.phone}</div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <div className="font-semibold text-slate-800 dark:text-slate-200">
                                {c.subject}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                {c.message}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteContact(id)}
                                disabled={deletingId === id}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                                title="Delete submission"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>{deletingId === id ? 'Deleting...' : 'Delete'}</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: Users Table */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold">User</th>
                      <th className="px-6 py-3.5 font-semibold">Email</th>
                      <th className="px-6 py-3.5 font-semibold">Role</th>
                      <th className="px-6 py-3.5 font-semibold">Account Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const id = u._id || u.id;
                        return (
                          <tr key={id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                              {u.name}
                            </td>
                            <td className="px-6 py-4 font-mono text-[11px]">{u.email}</td>
                            <td className="px-6 py-4">
                              <Badge variant={u.role === 'admin' ? 'indigo' : 'slate'}>
                                {u.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: Quotes Table */}
            {activeTab === 'quotes' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold">Client</th>
                      <th className="px-6 py-3.5 font-semibold">Email & Phone</th>
                      <th className="px-6 py-3.5 font-semibold">Service Required</th>
                      <th className="px-6 py-3.5 font-semibold">Budget</th>
                      <th className="px-6 py-3.5 font-semibold">Details</th>
                      <th className="px-6 py-3.5 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                          No quote requests found.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => {
                        const id = q._id || q.id;
                        return (
                          <tr key={id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                              {q.name}
                            </td>
                            <td className="px-6 py-4">
                              <div>{q.email}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{q.phone}</div>
                            </td>
                            <td className="px-6 py-4 font-medium text-indigo-600 dark:text-indigo-400">
                              {q.serviceRequired}
                            </td>
                            <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                              {q.budget}
                            </td>
                            <td className="px-6 py-4 max-w-xs text-slate-500 dark:text-slate-400 truncate">
                              {q.message || '—'}
                            </td>
                            <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                              {new Date(q.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
