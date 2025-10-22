import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='flex justify-center items-center p-6 bg-blue-50'>
          <div className="container ">
              <p>Vite + React</p>
              <button
                  className="btn btn-primary"
                  onClick={() => setCount((count) => count + 1)}>
                  count is {count}
              </button>
          </div>
      </div>
  )
}

export default App
