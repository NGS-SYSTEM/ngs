'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const endpoint = 'https://trello-j9ex.onrender.com/edit'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [cardId, setCardId] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (e) => {
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
      <div className="flex justify-center mt-12 text-3xl">
        <div className="flex space-x-3 items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="./ngs.png" className="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-blue-600">NGS Backoffice</h1>
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
            className="bg-blue-600 flex items-center"
            onClick={handleEditCard}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              'Editar Card'
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
