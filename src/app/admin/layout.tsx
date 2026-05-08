import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-3 shadow-sm">
        <nav className="mx-auto flex max-w-4xl items-center gap-6 text-sm font-medium text-gray-600">
          <span className="mr-auto font-bold text-gray-900">Wedding Admin</span>
          <Link href="/admin/guests" className="hover:text-gray-900">
            Khách
          </Link>
          <Link href="/admin/rsvp" className="hover:text-gray-900">
            RSVP
          </Link>
          <Link href="/admin/wishes" className="hover:text-gray-900">
            Lời chúc
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w px-6 py-8">{children}</main>
    </div>
  );
}
