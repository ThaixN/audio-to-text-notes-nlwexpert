import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: number
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  // o note [] fala que o array de notas vai ter o formato de cima, com id, date e content.
  // está criando um estado que armazena as notas escritas pelo usuário.
  // toda vez que der f5, as notas já saçvas irão continuar aparecendo. 
})
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
    // cria uma função para uma nota criada e coloca ela antes das antigas.
  
    localStorage.setItem('notes', JSON.stringify(notesArray))
    // Está convertendo o array em texto. JSON.stringify transforma o array em string para poder ser salvo no local storage.
    // JSON = JavaScript Object Notation 
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes
    // se a busca não estiver vazia, ele filtra as notas que contém a busca. Se estiver vazia, ele retorna todas as notas.
    // toLocaleLowerCase transforma todas as letras em minúsculas, para que a busca não seja case sensitive.

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
          onChange={handleSearch}
        />
      </form>   

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        {/* grid cols determina o número de colunas que vai ter no grid */}
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} />
        })}
      </div>
    </div>
  )
}  
  // /* Se cria componentes em duas situações: ou quando algo repete muito na tela(ex:notecard) ou quando você quer deixar um componente menor, mais simples, pra o código não ficar poluído.*/}