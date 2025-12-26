import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useUserStore } from "../store/userStore"
import Loading from "../components/ui/Loading"

const AuthCallback = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !authUser) {
          console.error("Auth error:", authError)
          navigate("/login", { replace: true })
          return
        }

        let profile = null

        const { data: existingProfile, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (fetchError && fetchError.code === "PGRST116") {
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              id: authUser.id,
              email: authUser.email,
              full_name: authUser.user_metadata?.full_name || "",
              has_completed_onboarding: false,
            })
            .select()
            .single()

          if (createError) {
            console.error("Error creating profile:", createError)
          } else {
            profile = newProfile
          }
        } else if (fetchError) {
          console.error("Error fetching profile:", fetchError)
        } else {
          profile = existingProfile
        }

        setUser({
          id: authUser.id,
          email: authUser.email!,
          fullName: profile?.full_name || "",
          hasCompletedOnboarding: profile?.has_completed_onboarding || false,
          avatar: authUser.user_metadata?.avatar_url || "",
        })

        if (profile?.has_completed_onboarding) {
          navigate("/dashboard/earn-rewards", { replace: true })
        } else {
          navigate("/onboarding", { replace: true })
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        navigate("/login", { replace: true })
      }
    }

    handleAuth()
  }, [navigate, setUser])

  return <Loading message="Signing you in..." />
}

export default AuthCallback
