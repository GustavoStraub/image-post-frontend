import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function Home() {
  const [state, setstate] = useState('')
  const [fotos, setfotos] = useState([])
  const [reload, setreload] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:4000/posts")
      .then((response) => {
        setfotos(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }, [reload])
  console.log(fotos)
  function onFormSubmit(e) {
    e.preventDefault()
    const data = new FormData()
    data.append('file', state)
    axios.post("http://localhost:4000/posts", data)
      .then((response) => {
        setreload(!reload)
      }).then(e.target.value = null)
      .catch((error) => {
      });
    console.log(state)
  }

  function deletePhoto(id) {
    axios.delete(`http://localhost:4000/posts/${id}`)
      .then(res => setreload(!reload))
      .catch(() => alert('deu ruim'))
  }
  return (
    <div>
      <Head>
        <title>Image-Post-Frontend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className='form' onSubmit={onFormSubmit} encType="multipart/form-data">
        <input id='inputfile' type="file" name="myImage" accept="image/*" onChange={(e) => setstate(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <div className='Galeria'>
        {fotos.map(foto =>
          <img className='Foto' onClick={() => { deletePhoto(foto._id) }} key={foto._id} src={foto.url} />
        )}
      </div>
    </div>
  )
}
