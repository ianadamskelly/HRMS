import { redirect } from 'next/navigation';

export default function ExitManagementPage() {
  redirect('/dashboard/exit-management/resignation-termination');
}
