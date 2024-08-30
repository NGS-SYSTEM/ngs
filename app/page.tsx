'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { useTheme } from 'next-themes' // Assumindo que você está usando next-themes

const endpoint = 'https://trello-j9ex.onrender.com/edit'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [cardId, setCardId] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const { theme } = useTheme() // Obtém o tema atual

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardId(e.target.value)
  }

  const handleEditCard = async () => {
    if (cardId === '') {
      setShowAlert(true)
      return
    }

    try {
      setLoading(true)
      setShowAlert(false)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: cardId }),
      })

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Erro ao editar o card!',
          description: 'Ocorreu um erro ao tentar editar o card.',
        })
        throw new Error('Falha ao editar o card')
      }
      console.log(response)

      const data = await response.json()
      toast({
        variant: 'default',
        title: 'Card alterado com sucesso!',
      })
      console.log(data)
    } catch (error) {
      console.error('Erro:', error)
      alert('Ocorreu um erro ao editar o card')
    } finally {
      setLoading(false)
      setCardId('')
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center mt-40 text-3xl">
        <div className="flex space-x-3 items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="./ngs.png" className="" />
            <AvatarFallback>NGS</AvatarFallback>
          </Avatar>
          <h1
            className={`text-3xl font-bold tracking-tight ${
              theme === 'light' ? 'text-blue-600' : 'text-blue-300'
            }`}
          >
            NGS Backoffice
          </h1>
          <ModeToggle />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Card ID"
            value={cardId}
            onChange={handleInputChange}
          />
          <Button
            type="button"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center"
            onClick={handleEditCard}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <h1 className=" font-bold -tracking-tight">EDITAR CARD</h1>
            )}
          </Button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Alert variant="destructive" className="max-w-md w-full">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Por favor, insira um Card ID antes de continuar.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
