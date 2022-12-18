import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {Configuration, OpenAIApi} from "openai"
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

const home = () => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [isLoading, setLoading] = useState(false)
  const [tanya, setTanya] = useState()
  const [jawaban, setJawaban] = useState()
  const [alert, setAlert] = useState()

  const jawab = (e) =>{
    e.preventDefault()
    if(!tanya){
      setAlert("isi dulu pertanyaannya")
      setJawaban()
    } else {
      search(tanya, setJawaban)
      setAlert()
      setLoading(true)
    }
  }
  
  async function search(text, setJawaban) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2048,
    });
    setJawaban(response.data)
    response.data.choices.map((choice) => {
      console.log(choice.text)
    });
    setLoading(false)
  }

  
  return (
    <>
      <div className="container p-5">
        <div className="shadow-lg p-5 rounded-2 bg-white">
          <h2 className="text-center mb-3">DI JAWABIN AI</h2>
          <form onSubmit={jawab}>
            <div className="input-group mb-3">
              <input
                id="userInput"
                type="text"
                className="form-control"
                onChange={(e) => setTanya(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </form>
          {alert && <p className="alert alert-danger">{alert}</p>}
          <h3 className="fst-italic">Jawaban :</h3>
          {isLoading ?
            <Loading/>:""         
          }
          <div className="w-75">
            {jawaban?.choices.map((choice) => {
              return <p>{choice.text}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default home
