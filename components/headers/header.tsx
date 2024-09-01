import {
  SquareUserRound,
  CircleDollarSign,
  ComputerIcon,
  Handshake,
  Car,
} from 'lucide-react'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { ModeToggle } from '../theme/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { useTheme } from 'next-themes'

export function Header() {
  // const { theme } = useTheme()
  return (
    <div className="flex flex-col items-center">
      <div className="flex  justify-center mt-12 text-3xl">
        <div className="flex space-x-3 items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="./ngs.png" className="" />
            <AvatarFallback>NGS</AvatarFallback>
          </Avatar>
          <h1 className={`text-3xl font-bold tracking-tight `}>
            NGS Backoffice
          </h1>
          <ModeToggle />
        </div>
      </div>
      <div className="border-b">
        <div className="flex h-16 items-center gap-6 px-6">
          <Car className="h-10 w-10" />

          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center  lg:space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-4 lg:space-x-6 text-2xl gap-2 "
            >
              <ComputerIcon className="h-6 w-6" />
              Trello
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-4 lg:space-x-6 text-2xl gap-2 "
            >
              <Handshake className="h-6 w-6" />
              Proposta
            </Link>
            <Link
              href="/financeiras"
              className="flex items-center space-x-4 lg:space-x-6 text-2xl gap-2"
            >
              <CircleDollarSign />
              Financeiras
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  )
}
