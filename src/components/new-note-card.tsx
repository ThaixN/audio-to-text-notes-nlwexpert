import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent,useState } from 'react'
import { toast } from 'sonner'


interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard ({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  // Variável: deveria mostrar o onboarding?
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnBoarding(false)
    // passa de true para false quando o usuário clicar no botão.
  }
  
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    
    if (event.target.value === '') {
      setShouldShowOnBoarding(true)
      // função para quando apagar o texto da nota, voltar para a tela anterior.
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      return
      // se o conteúdo estiver vazio, ele não salva a nota.
    }

    onNoteCreated(content)

    setContent('')
    setShouldShowOnBoarding(true)
    toast.success('Nota criada com sucesso!')
  }

  function handleStartRecordind() {
    
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window 
    // verifica se o navegador suporta a API de reconhecimento de voz 
    || 'webkitSpeechRecognition' in window
    
    if (!isSpeechRecognitionAPIAvailable) {
      alert('Seu navegador não suporta a API de reconhecimento de voz')
      return
    }

    setIsRecording(true)
    setShouldShowOnBoarding(false)
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
  
    speechRecognition = new SpeechRecognitionAPI()
    
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    // grava até que fale manualmente para ele parar de gravar.
    speechRecognition.maxAlternatives = 1
    // quantidade de alternativas que ele pode dar para a transcrição do áudio.
    speechRecognition.interimResults = true
    // vai transferindo pra texto enquanto eu estiver falando, e não só quando parar de falar.
  
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text,result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }
    
    speechRecognition.start()
  }

  

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }  
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-y-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        {/* space-y-3 cria um espaçamento entre as divs filhos// P é a quantidade de pixels de distancia (x4). Se for 20 pixels, você coloca p-5* */}
        <span className='text-sm font-medium text-slate-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>
    
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
        {/* o inset com fixed faz com que ocupe a tela toda, o bg black/60 dá 60% de opacidade */}
        <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover-text-slate-100'>
            {/* o absolute right e top 0 colocam o X para o canto direito. Padding-1.5 dá um padding de 6px. o slate 800 coloca um plano de fundo no botão.*/}
            {/* hover slate 100 muda a cor do quadrado toda vez que o mouse passa por ele.*/}
            <X className='size=5'/>
            {/* size=5 quer dizer que tanto altura quanto largura seria 5 (20px) */}
          </Dialog.Close>

          <form className='flex-1 flex flex-col'>

            <div className='flex flex-1 flex-col gap-3 p-5'>
              {/* flex-q quer dizer que quer que essa div ocupe o máximo do tamanho do modal */}
              <span className='text-sm font-medium text-slate-300'>
                Adicionar nota
                {/* add suffix adiciona um prefixo "há 2 hrs" "há um dia" */}
              </span>

              {shouldShowOnBoarding ? (
                <p className='text-sm leading-6 text-slate-400'>
                  Comece <button type= "button" onClick={handleStartRecordind} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                </p>
              ) : (
                <textarea 
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  // Quando clicar em "utilize apenas texto", vai mudar e aparecer a text area
                  onChange={handleContentChanged}
                  value={content}
                  // o value content fala que toda vez que digita e salva a nota, limpa a area de texto.

                />
                )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick= {handleStopRecording}
                className= 'w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100'
                // o "group" transforma tudo em um grupo.
                // Hover:bg-line-500 é a cor que fica o fundo quando a pessoa passar p mouse perto do botão.
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className= 'w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
                // o "group" transforma tudo em um grupo.
                // Hover:bg-line-500 é a cor que fica o fundo quando a pessoa passar p mouse perto do botão.
              >
                Salvar notas
                {/* Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>? */}
                {/* o hover underline cria um sublinhado no texto. Com o group na frente, quando passar o mouse em qualquer lugar do botão, vai aparecer o sublinhado */}
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}