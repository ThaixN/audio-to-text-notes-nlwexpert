import { useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export function App() {
  const [notes, setNotes] = useState([
    { id: 1, date: new Date(), content: 'Hello World'},
    { id: 2, date: new Date(), content: 'Nota 2'},
  ])
  // está criando um estado que armazena as notas escritas pelo usuário.

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      {/* o space-y-6 determina um espaçamento entre todos os itens, com uma altura de 6 */}
      <img src={logo} alt='NLW Expert' />
      {/* no react a { serve para colocar js dentro do html */}
    
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque suas notas...'
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"  
          //tracking muda o espaçamento entre as fontes e o tight deixa uma mais grudada na outra 
        />
      </form>   

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        {/* grid cols determina o número de colunas que vai ter no grid */}
        <NewNoteCard />

        {notes.map(note =>{
          return <NoteCard note={note} />
        })}
      </div>
    </div>
  )
}  
  // /* Se cria componentes em duas situações: ou quando algo repete muito na tela(ex:notecard) ou quando você quer deixar um componente menor, mais simples, pra o código não ficar poluído.*/}