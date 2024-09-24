import { createCanvas } from 'canvas'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    // Validação do corpo da requisição
    const proposalBodySchema = z.object({
      customersNames: z.string(),
      vehicles: z.string(),
      monthlyValueLiability: z.coerce.number(),
    })

    const { customersNames, monthlyValueLiability } = proposalBodySchema.parse(
      await req.json(),
    )

    // Criação da imagem com Canvas
    const canvas = createCanvas(800, 600)
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Text
    ctx.fillStyle = '#000'
    ctx.font = '24px Arial'
    ctx.fillText(`Customer: ${customersNames}`, 50, 100)
    ctx.fillText(`Liability: ${monthlyValueLiability}`, 50, 150)

    // Converte para imagem em Base64
    const buffer = canvas.toBuffer('image/png')
    const base64Image = buffer.toString('base64')
    const imageUrl = `data:image/png;base64,${base64Image}`

    // Retorna a imagem gerada
    const response = {
      success: true,
      imageUrl,
      message: `Proposal created for ${customersNames} with a liability of $${monthlyValueLiability}`,
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid data provided.' },
      { status: 400 },
    )
  }
}
