import { ExitIcon } from "@radix-ui/react-icons"
import { deleteCookie } from "cookies-next"
import { Button } from "../ui/button.jsx"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie("jwt", { path: "/" })
    deleteCookie("user", { path: "/" })

    toast.success("Logged out", {
      icon: "🚀",
    })

    router.push("/")
  }

  return (
    <motion.div
      className="relative flex"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="default"
        className="rounded-full bg-red-500  hover:bg-red-600 text-white shadow-lg"
        onClick={handleLogout}
      >
        Exit Chat
        <ExitIcon className="w-8 h-5" />
      </Button>
    </motion.div>
  )
}

export default Logout

