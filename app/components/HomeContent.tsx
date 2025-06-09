
const HomeContent = () => {
  return (
    <div className="flex flex-col items-center justify-between py-4 max-w-screen min-h-[90vh] overflow-y-hidden ">
      <div className="mt-20">
        <h1 className="text-[#565869] text-4xl font-bold">brAIn</h1>
      </div>
      <div className="w-full md:max-w-[70%] text-[#c5c5d2] p-4 md:p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 m-2 md:flex-1 border-slate-400 border rounded-xl cursor-pointer hover:bg-zinc-600">
            <h3 className="text-base font-medium">Who</h3>
            <p className="text-sm font-thin">is Muhammed Emir Baysal?</p>
          </div>
          <div className="p-3 m-2 md:flex-1 border-slate-400 border rounded-xl cursor-pointer hover:bg-zinc-600">
            <h3 className="text-base font-medium">Write an essay</h3>
            <p className="text-sm font-thin">about baby sharks</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row ">
          <div className="p-3 m-2 md:flex-1 border-slate-400 border rounded-xl cursor-pointer hover:bg-zinc-600 hidden md:block">
            <h3 className="text-base font-medium">Give me the recipe</h3>
            <p className="text-sm font-thin">of a delicious Cornish pasty</p>
          </div>
          <div className="p-3 m-2 md:flex-1 border-slate-400 border rounded-xl cursor-pointer hover:bg-zinc-600 hidden md:block">
            <h3 className="text-base font-medium">Make up a story</h3>
            <p className="text-sm font-thin">about two parakeets</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContent
