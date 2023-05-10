import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router";
import { useEffect } from "react"

export default function Main() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return (
    <>
      {user ? <div>Main</div> : null}
    </>
  )
}
