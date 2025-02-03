import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.role !== 'admin') {
    return <div>You are not authorized to view this page</div>;
  }

  return <div>Welcome to the Admin Dashboard</div>;
}