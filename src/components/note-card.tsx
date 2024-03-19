import * as Dialog from '@radix-ui/react-dialog'
// pega todas as exportações que esse radix ui dialog faz e coloca dentro do objeto chamadodialog
import { formatDistanceToNow} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'
// importa o ícone x do pacote lucide react.

interface NoteCardProps {
  // vai servir para mudar as propriedades de um note para outro. Vai ser diferente: data, texto (content) 
  note: {
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>    
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        {/* hover ring adiciona uma borda pequena quando vc passa o mouse pelos note cards */}
        {/*focus aplica o css so quando clica no elemento. focus visible só ativa quando navega pelo teclado. */}
        <span className='text-sm font-medium text-slate-300'>
              {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          {note.content}
        </p>

        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
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

          <div className='flex-1 flex-col gap-3 p-5'>
            {/* flex-q quer dizer que quer que essa div ocupe o máximo do tamanho do modal */}
            <span className='text-sm font-medium text-slate-300'>
              {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
              {/* add suffix adiciona um prefixo "há 2 hrs" "há um dia" */}
            </span>

            <p className='text-sm leading-6 text-slate-400'>
              {note.content}
            </p>
          </div>

          <button
            type="button"
            className= 'w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
            // o "group" transforma tudo em um grupo
          >
            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
            {/* o hover underline cria um sublinhado no texto. Com o group na frente, quando passar o mouse em qualquer lugar do botão, vai aparecer o sublinhado */}
          </button>

        </Dialog.Content>
      </Dialog.Portal>
      {/* o portal teleporta o conteúdo para a raiz da aplicação*/}
    </Dialog.Root>
  )
}

// propriedade é tudo que muda o visual/comportamento do componente
{/* w é a largura e h a altura */}
