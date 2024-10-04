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
    const optionADueToday = searchParams.get('optionADueToday') || '0'
    const optionBDueToday = searchParams.get('optionBDueToday') || '0'
    const optionCDueToday = searchParams.get('optionCDueToday') || '0'
    const optionAMonthly = searchParams.get('optionAMonthly') || '0'
    const optionBMonthly = searchParams.get('optionBMonthly') || '0'
    const optionCMonthly = searchParams.get('optionCMonthly') || '0'
    const fee = searchParams.get('fee') || '250'
    const numberOfPayments = searchParams.get('paymentOptions') || '6'
  
    //Fazer Verificação pra gerar imagem de acordo com entrada
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
          <img src="http://localhost:3000/proposta-psd-pt-3ops.png" alt="proposta" />
          <div tw=" flex absolute top-100 left-35 w-[150] overflow-hidden">
            <p tw="text-2xl font-bold text-black  text-right overflow-hidden">
              {customerName.length > 45
                ? customerName.slice(0, 45)
                : customerName}
            </p>
          </div>
          <div tw="absolute top-[118] left-[35] flex  overflow-hidden w-[150]">
            <p tw="text-2xl font-bold text-black  text-right overflow-hidden">
              {vehicles.length > 40 ? vehicles.slice(0, 40) : vehicles}
            </p>
          </div>
          <div tw="absolute top-[137] left-[35] flex overflow-hidden w-[150] ">
            <p tw="text-2xl font-bold text-black  text-right">
              {address.length > 40 ? address.slice(0, 40) : address}
            </p>
          </div>
          <div tw="flex absolute top-[138] right-[190]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              ${optionAMonthly}
            </p>
          </div>
          <div tw="flex absolute top-[138] right-[148]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              ${parseInt(optionADueToday) + parseInt(fee)}
            </p>
          </div>
          <div tw="flex absolute top-[138] right-[105]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              $
              {(
                parseFloat(optionADueToday) +
                parseFloat(fee) +
                parseFloat(optionAMonthly) * (parseInt(numberOfPayments) - 1)
              ).toFixed(2)}
            </p>
          </div>

          <div tw="flex absolute top-[172] right-[148]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              ${parseInt(optionBDueToday) + parseInt(fee)}
            </p>
          </div>
          <div tw="flex absolute top-[172] right-[190]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              ${optionBMonthly}
            </p>
          </div>
          <div tw="flex absolute top-[172] right-[105]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              $
              {(
                parseFloat(optionBDueToday) +
                parseFloat(fee) +
                parseFloat(optionBMonthly) * (parseInt(numberOfPayments) - 1)
              ).toFixed(2)}
            </p>
          </div>
          <div tw="flex absolute top-[206] right-[148]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              ${parseInt(optionCDueToday) + parseInt(fee)}
            </p>
          </div>

          <div tw="flex absolute top-[206] right-[190]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              ${optionCMonthly}
            </p>
          </div>
          <div tw="flex absolute top-[206] right-[105]  items-left flex-start w-[40]  justify-center items-center">
            <p tw="text-3xl font-bold text-black  text-right">
              $
              {(
                parseFloat(optionCDueToday) +
                parseFloat(fee) +
                parseFloat(optionCMonthly) * (parseInt(numberOfPayments) - 1)
              ).toFixed(2)}
            </p>
          </div>
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
