import { getSession } from "next-auth/react";  // For server-side session fetching
import { useSession } from "next-auth/react";  // For client-side session fetching

export default function AdminPage({ session }) {
  const { data: clientSession } = useSession();
  const currentSession = session || clientSession;

  if (!currentSession || currentSession.user.role !== 'admin') {
    return <div>You are not authorized to view this page</div>;
  }

  return <div>Welcome to the Admin Dashboard</div>;
}

// Server-side session fetching for Next.js pages
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
