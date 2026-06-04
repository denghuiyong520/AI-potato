import { redirect } from 'next/navigation'

// With localePrefix:'always', root / has no locale segment.
// Redirect to default locale so app/[locale]/page.tsx handles the request.
export default function RootPage() {
  redirect('/en')
}
