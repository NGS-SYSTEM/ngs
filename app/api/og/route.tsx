import { ImageResponse } from 'next/og'
export const config = {
  runtime: 'edge',
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Obter dados do formulário
    const customerName =
      searchParams.get('customersNames')?.slice(0, 100) || 'Cliente'
    const vehicles =
      searchParams.get('vehicles')?.slice(0, 100) || 'Modelo do Carro'
    const address =
      searchParams.get('address')?.slice(0, 100) || 'Endereço não informado'
    const monthlyValueLiability =
      searchParams.get('monthlyValueLiability') || '0'
    const optionADueToday = searchParams.get('optionADueToday') || '0'
    const optionBDueToday = searchParams.get('optionBDueToday') || '0'
    const optionCDueToday = searchParams.get('optionCDueToday') || '0'
    const optionAMonthly = searchParams.get('optionAMonthly') || '0'
    const optionBMonthly = searchParams.get('optionBMonthly') || '0'
    const optionCMonthly = searchParams.get('optionCMonthly') || '0'
    const fee = searchParams.get('fee') || '0'
    const isFinanciado =
      searchParams.get('isFinanciado') === 'true' ? 'Financiado' : 'Quitado'
    const language = searchParams.get('language') || 'Português'

    // Gerar a imagem com os dados capturados
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            fontFamily: 'monospace',
          }}
        >
          <img src="http://localhost:3000/proposta.png" alt="proposta" />
          <p tw="text-2xl font-bold text-black absolute top-100 left-35 text-right">
            {customerName}
          </p>
          <p tw="text-2xl font-bold text-black absolute top-[118] left-[35] text-right">
            {address}
          </p>
          <p tw="text-2xl font-bold text-black absolute top-[137] left-[35] text-right">
            {vehicles}
          </p>
          <div tw="flex absolute top-[140] right-[212]  items-center flex-start">
            <p tw="text-3xl font-bold text-black  text-right">
              ${optionAMonthly}
            </p>
          </div>
          {/* <p tw="text-3xl font-bold text-black absolute top-[139] right-[172] text-left">
            {optionADueToday}$
          </p>
          <p tw="text-3xl font-bold text-black absolute top-[173] right-[222] text-right">
            ${optionBDueToday}
          </p>
          <p tw="text-3xl font-bold text-black absolute top-[173] right-[172] text-right">
            ${optionBMonthly}
          </p>
          <p tw="text-3xl font-bold text-black absolute top-[207] right-[222] text-right">
            ${optionCDueToday}
          </p>
          <p tw="text-3xl font-bold text-black absolute top-[207] right-[172] text-right">
            ${optionCMonthly}
          </p> */}
        </div>
      ),
      {
        width: 1920,
        height: 1080,
      },
    )
  } catch (error) {
    return new Response('Erro ao gerar imagem', { status: 500 })
  }
}
