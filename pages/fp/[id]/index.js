import { useRouter } from 'next/router';
import Link from 'next/link';

export default function FPPost() {
  const router = useRouter();
  console.log(router.query)
  return (
    <>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
      <Link href="/home" >
        <button>Back</button>
      </Link>
      </>
  );
}